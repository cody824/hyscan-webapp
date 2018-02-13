package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.base.BaseServiceImpl;
import com.noknown.framework.common.exception.DAOException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.util.BaseUtil;
import com.noknown.framework.common.util.FileUtil;
import com.noknown.framework.common.util.JsonUtil;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.dao.ScanTaskDao;
import com.noknown.project.hyscan.dao.ScanTaskDataRepo;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.DownloadInfo;
import com.noknown.project.hyscan.service.ScanTaskService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;

@Service
public class ScanTaskServiceImpl extends BaseServiceImpl<ScanTask, String> implements ScanTaskService {

	@Autowired
	private ScanTaskDao taskDao;

	@Autowired
	private ScanTaskDataRepo taskDataDao;

	@Value("${hyscan.tmpDir:/var/hyscan/tmp/}")
	private String tmpDir;
	

	@Override
	public void removeTask(String taskId) throws DAOException {
		taskDao.delete(taskId);
		taskDataDao.delete(taskId);
	}

	@Override
	public ScanTask get(String taskId) {
		return taskDao.findOne(taskId);
	}
	
	@Override
	public ScanTaskData getData(String taskId) throws DAOException {
		return taskDataDao.get(taskId);
	}

	@Override
	public JpaRepository<ScanTask, String> getRepository() {
		return taskDao;
	}

	@Override
	public JpaSpecificationExecutor<ScanTask> getSpecificationExecutor() {
		return taskDao;
	}


	@Override
	public void saveScanTaskData(ScanTaskData data) throws DAOException {
		taskDataDao.save(data);
		
	}

	@Override
	public DownloadInfo exportScanTaskPackage(SQLFilter filter) throws ServiceException, DAOException {
		Collection<ScanTask> taskList = this.find(filter);
		String taskKey = BaseUtil.getTimeCode(new Date());
		File dir = new File(tmpDir, taskKey);
		if (dir.exists()) {
			FileUtil.delFile(dir.getAbsolutePath());
		}
		dir.mkdirs();
		for (ScanTask scanTask : taskList) {
			exportOne(scanTask, dir);
		}
		File zipFile = new File(tmpDir, taskKey + ".zip");
		try {
			FileUtil.zip(zipFile.getAbsolutePath(), dir);
		} catch (Exception e) {
			e.printStackTrace();
			throw  new ServiceException("压缩包生成失败：" + e.getLocalizedMessage());
		}
		try {
			FileUtils.deleteDirectory(dir);
		} catch (IOException e) {
			e.printStackTrace();
		}
		freeSpaceIfNeeded();
		DownloadInfo downloadInfo = new DownloadInfo();
		downloadInfo.setBuildDate(new Date())
				.setFilePath(zipFile.getAbsolutePath())
				.setSize(zipFile.length())
				.setTaskNum(taskList.size());
		return downloadInfo;
	}

	@Override
	public DownloadInfo exportScanTask(String taskId) throws ServiceException, DAOException {
		ScanTask task = taskDao.findOne(taskId);
		if (task == null) {
			throw new ServiceException("任务不存在", 404);
		}
		String taskKey = BaseUtil.getTimeCode(new Date());
		File dir = new File(tmpDir, taskKey);
		if (dir.exists()) {
			FileUtil.delFile(dir.getAbsolutePath());
		}
		dir.mkdirs();
		File taskDir = exportOne(task, dir);
		File zipFile = new File(tmpDir, taskKey + ".zip");
		try {
			FileUtil.zip(zipFile.getAbsolutePath(), taskDir);
		} catch (Exception e) {
			e.printStackTrace();
			throw  new ServiceException("压缩包生成失败：" + e.getLocalizedMessage());
		}
		freeSpaceIfNeeded();
		try {
			FileUtils.deleteDirectory(dir);
		} catch (IOException e) {
			e.printStackTrace();
		}
		DownloadInfo downloadInfo = new DownloadInfo();
		downloadInfo.setBuildDate(new Date())
				.setFilePath(zipFile.getAbsolutePath())
				.setSize(zipFile.length())
				.setTaskNum(1);
		return downloadInfo;
	}

	private File exportOne(ScanTask scanTask, File dir) throws ServiceException, DAOException {
		File taskDir = new File(dir, scanTask.getId());
		taskDir.mkdirs();
		String infoStr = JsonUtil.toJson(scanTask);
		File infoFile = new File(taskDir, "info.json");
		try {
			FileUtils.write(infoFile, infoStr);
		} catch (IOException e) {
			e.printStackTrace();
			throw new ServiceException("写文件错误：" + e.getLocalizedMessage());
		}
		if (StringUtil.isNotBlank(scanTask.getImagePath())){
			File imgFile = new File(taskDir, "image.png");
			FileUtil.httpDownload(scanTask.getImagePath(), imgFile.getAbsolutePath());
		}
		ScanTaskData taskData = taskDataDao.get(scanTask.getId());
		if (taskData != null){
			String dataStr = JsonUtil.toJson(taskData);
			File dataFile = new File(taskDir, "data.json");
			try {
				FileUtils.write(dataFile, dataStr);
			} catch (IOException e) {
				e.printStackTrace();
				throw new ServiceException("写文件错误：" + e.getLocalizedMessage());
			}
		}
		return taskDir;
	}

	private synchronized void freeSpaceIfNeeded() {
		if (freeRun) {
			return;
		}
		Runnable runnable = new CacheClean();
		Thread thread = new Thread(runnable);
		freeRun = true;
		thread.start();
	}

	private  boolean freeRun = false;

	class CacheClean implements Runnable {

		@Override
		public void run() {
			File file = new File(tmpDir);
			if (file.exists() && file.isDirectory()) {
				File[] fs = file.listFiles((dir, name) -> name.endsWith(".zip"));
				if (fs == null) {
					return;
				}
				long now = System.currentTimeMillis();
				long keepSec = 1000 * 60 * 60;
				for (File f : fs) {
					if (now - f.lastModified() > keepSec){
						FileUtils.deleteQuietly(f);
					}
				}

			}
		}
	}


}
