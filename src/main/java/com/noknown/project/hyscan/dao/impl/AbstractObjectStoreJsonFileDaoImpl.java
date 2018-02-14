package com.noknown.project.hyscan.dao.impl;

import com.noknown.framework.common.base.BaseObjJsonRepoImpl;
import com.noknown.project.hyscan.dao.ScanTaskDataRepo;
import com.noknown.project.hyscan.model.ScanTaskData;
import org.springframework.stereotype.Component;

/**
 * @author guodong
 */
@Component
public class AbstractObjectStoreJsonFileDaoImpl extends BaseObjJsonRepoImpl<ScanTaskData> implements ScanTaskDataRepo {
}
