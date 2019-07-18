package com.noknown.project.hyscan.repositories.jpa;

import com.noknown.project.hyscan.model.AppEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;


/**
 * (AppEvent)表数据库访问层
 *
 * @author makejava
 * @since 2019-06-02 21:26:37
 */
public interface AppEventRepo extends JpaRepository<AppEvent, Integer>, JpaSpecificationExecutor<AppEvent> {


}