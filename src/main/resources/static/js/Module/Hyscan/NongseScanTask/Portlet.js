Ext.define('Module.Hyscan.NongseScanTask.Portlet', {
    extend: 'Module.Hyscan.Public.TaskPortlet',

    VIEW: {
        'Module.Hyscan.NongseScanTask.view.Panel': LABEL.grid,
        'Module.Hyscan.Public.view.ScanTaskDataGrid': HYSCAN_LABLE.dataInfo
    },

    title: MODULE_NAME['Module.Hyscan.NongseScanTask'],

    moduleName: 'Module.Hyscan.NongseScanTask',

    moduleSessionView: 'Module.Hyscan.NongseScanTaskCurrentView',

    dataObj: Module.Hyscan.NongseScanTask.Data,

    configObj: Module.Hyscan.NongseScanTask.Config,

    defaultView: 'Module.Hyscan.NongseScanTask.view.Panel',

    supportView: ['Module.Hyscan.NongseScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],

    appId: 'nongse'

});