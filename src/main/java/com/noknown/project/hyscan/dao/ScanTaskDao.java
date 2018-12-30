package com.noknown.project.hyscan.dao;

import com.noknown.project.hyscan.model.ScanTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;


public interface ScanTaskDao extends JpaRepository<ScanTask, String>,JpaSpecificationExecutor<ScanTask>{

	/**
	 * 获取用户所有的任务记录
	 *
	 * @param userId 用户ID
	 * @param appId  应用ID
	 * @return 任务记录
	 */
	List<ScanTask> findByUserIdAndAppId(Integer userId, String appId);

	/**
	 * 获取用户某个时间段内的任务记录
	 *
	 * @param userId 用户ID
	 * @param appId  应用ID
	 * @param begin  开始时间
	 * @param end    结束时间
	 * @return 任务记录
	 */
	List<ScanTask> findByUserIdAndAppIdAndScanTimeBetween(Integer userId, String appId, Date begin, Date end);

	/**
	 * 获取用户某个扫描任务的任务记录
	 *
	 * @param userId     用户ID
	 * @param appId      应用ID
	 * @param scanTarget 任务标注
	 * @return
	 */
	List<ScanTask> findByUserIdAndAppIdAndScanTarget(Integer userId, String appId, String scanTarget);

	/**
	 * 获取最新的任务
	 *
	 * @return
	 */
	ScanTask findFirstByOrderByScanTimeDesc();

	/**
	 * 获取appId的最新任务
	 *
	 * @param appId
	 * @return
	 */
	ScanTask findFirstByAppIdOrderByScanTimeDesc(String appId);


	/**
	 * 更新任务标记
	 *
	 * @param ids
	 * @param scanTarget
	 */
	@Modifying
	@Query("update ScanTask st set st.scanTarget = :scanTarget where st.id in :ids")
	void updateScanTargetById(@Param("ids") List<String> ids, @Param("scanTarget") String scanTarget);

}
