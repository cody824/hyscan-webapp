Ext.define('Module.Hyscan.SchoolScanTask.Portlet', {
    extend: 'Module.Hyscan.Public.TaskPortlet',

    VIEW: {
        'Module.Hyscan.SchoolScanTask.view.Panel': LABEL.grid,
        'Module.Hyscan.Public.view.ScanTaskDataGrid': HYSCAN_LABLE.dataInfo
    },

    title: MODULE_NAME['Module.Hyscan.SchoolScanTask'],

    moduleName: 'Module.Hyscan.SchoolScanTask',

    moduleSessionView: 'Module.Hyscan.SchoolScanTaskCurrentView',

    dataObj: Module.Hyscan.SchoolScanTask.Data,

    configObj: Module.Hyscan.SchoolScanTask.Config,

    defaultView: 'Module.Hyscan.SchoolScanTask.view.Panel',

    supportView: ['Module.Hyscan.SchoolScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],

    appId: 'school'

});