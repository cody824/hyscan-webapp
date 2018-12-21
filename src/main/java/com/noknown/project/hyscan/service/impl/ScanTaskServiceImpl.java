package com.noknown.project.hyscan.service.impl;

import com.noknown.framework.common.base.BaseServiceImpl;
import com.noknown.framework.common.exception.DaoException;
import com.noknown.framework.common.exception.ServiceException;
import com.noknown.framework.common.util.BaseUtil;
import com.noknown.framework.common.util.FileUtil;
import com.noknown.framework.common.util.JsonUtil;
import com.noknown.framework.common.util.StringUtil;
import com.noknown.framework.common.util.excel.ExcelHandle;
import com.noknown.framework.common.web.model.SQLFilter;
import com.noknown.project.hyscan.dao.ScanTaskDao;
import com.noknown.project.hyscan.dao.ScanTaskDataRepo;
import com.noknown.project.hyscan.model.ScanTask;
import com.noknown.project.hyscan.model.ScanTaskData;
import com.noknown.project.hyscan.pojo.DownloadInfo;
import com.noknown.project.hyscan.pojo.ExportRow;
import com.noknown.project.hyscan.service.ScanTaskService;
import com.noknown.project.hyscan.util.AlgoUtil;
import org.apache.commons.io.FileUtils;
import org.apache.poi.ss.usermodel.Workbook;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Service;

import java.io.*;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

/**
 * @author guodong
 */
@Service
public class ScanTaskServiceImpl extends BaseServiceImpl<ScanTask, String> implements ScanTaskService {

	private final Logger logger = LoggerFactory.getLogger(getClass());

	@Autowired
	private ScanTaskDao taskDao;

	@Autowired
	private ScanTaskDataRepo taskDataDao;

	@Value("${hyscan.tmpDir:/var/hyscan/tmp/}")
	private String tmpDir;

	private DateTimeFormatter df = DateTimeFormatter.ofPattern("yyyy/MM/dd hh:mm:ss");

	@Value("${hyscan.export.excelTpl:/var/hyscan/excelTpl/taskData.xlsx}")
	private String excelTpl;


	@Override
	public void removeTask(String taskId) throws DaoException {
		taskDao.deleteById(taskId);
		taskDataDao.delete(taskId);
	}

	@Override
	public ScanTask get(String taskId) {
		return taskDao.findById(taskId).orElse(null);
	}

	@Override
	public ScanTaskData getData(String taskId) throws DaoException {
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
	public void saveScanTaskData(ScanTaskData data) throws DaoException {
		taskDataDao.save(data);

	}

	@Override
	public DownloadInfo exportScanTaskPackage(SQLFilter filter, String type) throws ServiceException, DaoException {
		Collection<ScanTask> taskList = this.find(filter);
		String taskKey = BaseUtil.getTimeCode(new Date());
		File dir = new File(tmpDir, taskKey);
		if (dir.exists()) {
			FileUtil.delFile(dir.getAbsolutePath());
		}
		dir.mkdirs();
		for (ScanTask scanTask : taskList) {
			if ("json".equals(type)) {
				exportJson(scanTask, dir);
			} else if ("txt".equals(type)) {
				exportTxt(scanTask, dir);
			} else if ("excel".equals(type)) {
				exportExcel(scanTask, dir);
			} else {
				exportJson(scanTask, dir);
			}
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
	public DownloadInfo exportScanTask(String taskId, String type) throws ServiceException, DaoException {
		ScanTask task = taskDao.findById(taskId).orElse(null);
		if (task == null) {
			throw new ServiceException("任务不存在", 404);
		}
		String taskKey = BaseUtil.getTimeCode(new Date());
		File dir = new File(tmpDir, taskKey);
		if (dir.exists()) {
			FileUtil.delFile(dir.getAbsolutePath());
		}
		dir.mkdirs();
		File taskDir;
		if ("json".equals(type)) {
			taskDir = exportJson(task, dir);
		} else if ("txt".equals(type)) {
			taskDir = exportTxt(task, dir);
		} else if ("excel".equals(type)) {
			taskDir = exportExcel(task, dir);
		} else {
			taskDir = exportJson(task, dir);
		}
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

	@Override
	public List<ScanTask> findByUserId(Integer userId, String appId) {
		return taskDao.findByUserIdAndAppId(userId, appId);
	}

	private File exportJson(ScanTask scanTask, File dir) throws ServiceException, DaoException {
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

	private File exportTxt(ScanTask scanTask, File dir) throws ServiceException, DaoException {
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
		if (StringUtil.isNotBlank(scanTask.getImagePath())) {
			File imgFile = new File(taskDir, "image.png");
			FileUtil.httpDownload(scanTask.getImagePath(), imgFile.getAbsolutePath());
		}
		ScanTaskData taskData = taskDataDao.get(scanTask.getId());
		if (taskData != null) {
			if (taskData.check()) {
				Integer[] range = taskData.getRange();
				Double[] wavelength = new Double[taskData.getDn().length];
				int index = 0;
				for (int i = range[0]; i <= range[1]; i++) {
					wavelength[index++] = 1.9799 * i - 934.5831;
				}
				double[] reflectivity = AlgoUtil.getReflectivity(taskData.getDn(), taskData.getDarkCurrent(), taskData.getWhiteboardData());
				StringBuilder stringBuilder = new StringBuilder("波长,DN,反射率,暗电流,白板数据\n");
				for (int i = 0; i < taskData.getDn().length; i++) {
					stringBuilder.append(wavelength[i] + ",");
					stringBuilder.append(taskData.getDn()[i] + ",");
					stringBuilder.append(reflectivity[i] + ",");
					stringBuilder.append(taskData.getDarkCurrent()[i] + ",");
					stringBuilder.append(taskData.getWhiteboardData()[i] + "\n");
				}
				String dataStr = stringBuilder.toString();
				File dataFile = new File(taskDir, "data.csv");
				try {
					FileUtils.write(dataFile, dataStr);
				} catch (IOException e) {
					e.printStackTrace();
					throw new ServiceException("写文件错误：" + e.getLocalizedMessage());
				}
			} else {
				logger.warn("采集任务{}数据格式不正确", scanTask.getId());
			}
		}
		return taskDir;
	}

	private File exportExcel(ScanTask scanTask, File dir) throws ServiceException, DaoException {
		File taskDir = new File(dir, scanTask.getId());
		taskDir.mkdirs();
		if (StringUtil.isNotBlank(scanTask.getImagePath())) {
			File imgFile = new File(taskDir, "image.png");
			FileUtil.httpDownload(scanTask.getImagePath(), imgFile.getAbsolutePath());
		}
		ExcelHandle handle = new ExcelHandle();
		JSONParser parser = new JSONParser();
		ScanTaskData taskData = taskDataDao.get(scanTask.getId());
		if (taskData != null) {
			if (taskData.check()) {
				Integer[] range = taskData.getRange();
				Double[] wavelength = new Double[taskData.getDn().length];
				int index = 0;
				for (int i = range[0]; i <= range[1]; i++) {
					wavelength[index++] = 1.9799 * i - 934.5831;
				}
				double[] reflectivity = AlgoUtil.getReflectivity(taskData.getDn(), taskData.getDarkCurrent(), taskData.getWhiteboardData());
				List<ExportRow> exportRows = new ArrayList<>(wavelength.length);
				for (int i = 0; i < taskData.getDn().length; i++) {
					ExportRow row = new ExportRow().setDarkCurrent(taskData.getDarkCurrent()[i])
							.setDn(taskData.getDn()[i])
							.setWavelength(wavelength[i])
							.setWhiteboardData(taskData.getWhiteboardData()[i])
							.setReflectivity(reflectivity[i]);
					exportRows.add(row);
				}

				String dataStr = JsonUtil.toJson(exportRows);
				if (dataStr == null) {
					throw new ServiceException("生成信息失败");
				}
				String infoStr = JsonUtil.toJson(scanTask);

				File dataFile = new File(taskDir, "data.xlsx");
				try (OutputStream os = new FileOutputStream(dataFile)) {
					Object objs = parser.parse(new StringReader(dataStr));
					JSONArray dataJson = (JSONArray) objs;
					JSONObject infoJson = (JSONObject) parser.parse(new StringReader(infoStr));
					LocalDateTime applyTime = LocalDateTime.ofEpochSecond(Long.parseLong(infoJson.get("scanTime").toString()) / 1000, 0, ZoneOffset.ofHours(8));
					infoJson.put("scanTime", df.format(applyTime));
					JSONObject dataMap = new JSONObject();
					dataMap.put("data", dataJson);
					dataMap.put("info", infoJson);
					handle.writeData(excelTpl, dataMap);
					Workbook wb = handle.getTempWorkbook(excelTpl);
					handle.readClose(excelTpl);
					wb.write(os);
					os.flush();
				} catch (IOException | ParseException e) {
					e.printStackTrace();
					throw new ServiceException("写文件错误：" + e.getLocalizedMessage());
				}
			} else {
				logger.warn("采集任务{}数据格式不正确", scanTask.getId());
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
