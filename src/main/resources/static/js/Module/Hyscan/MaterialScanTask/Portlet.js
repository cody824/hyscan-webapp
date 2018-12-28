Ext.define('Module.Hyscan.MaterialScanTask.Portlet', {

    extend: 'Module.Hyscan.Public.TaskPortlet',

    VIEW: {
        'Module.Hyscan.MaterialScanTask.view.Panel': LABEL.grid,
        'Module.Hyscan.Public.view.ScanTaskDataGrid': HYSCAN_LABLE.dataInfo
    },

    title: MODULE_NAME['Module.Hyscan.MaterialScanTask'],

    moduleName: 'Module.Hyscan.MaterialScanTask',

    moduleSessionView: 'Module.Hyscan.MaterialScanTask',

    dataObj: Module.Hyscan.MaterialScanTask.Data,

    configObj: Module.Hyscan.MaterialScanTask.Config,

    defaultView: 'Module.Hyscan.MaterialScanTask.view.Panel',

    supportView: ['Module.Hyscan.MaterialScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],

    appId: 'caizhi'
});