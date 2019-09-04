package com.noknown.project.hyscan.repositories.jpa;

import com.noknown.project.hyscan.model.SpDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/**
 * (SpDevice)表数据库访问层
 *
 * @author makejava
 * @since 2019-09-03 20:52:38
 */
public interface SpDeviceRepo extends JpaRepository<SpDevice, String>, JpaSpecificationExecutor<SpDevice> {


}