package com.noknown.project.hyscan.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.noknown.project.hyscan.model.ScanTask;


public interface ScanTaskDao extends JpaRepository<ScanTask, String>{

}
