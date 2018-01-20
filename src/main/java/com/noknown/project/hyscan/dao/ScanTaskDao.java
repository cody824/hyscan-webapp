package com.noknown.project.hyscan.dao;

import com.noknown.project.hyscan.model.ScanTask;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


public interface ScanTaskDao extends JpaRepository<ScanTask, String>,JpaSpecificationExecutor<ScanTask>{

}
