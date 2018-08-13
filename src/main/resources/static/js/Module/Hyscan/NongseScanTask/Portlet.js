Ext.define('Module.Hyscan.NongseScanTask.Portlet', {
    extend: 'Module.Hyscan.Public.TaskPortlet',

    VIEW: {
        'Module.Hyscan.NongseScanTask.view.Panel': '表格模式',
        'Module.Hyscan.Public.view.ScanTaskDataGrid': '数据信息'
    },

    title: "农色监测扫描任务",

    moduleName: 'Module.Hyscan.NongseScanTask',

    moduleSessionView: 'Module.Hyscan.NongseScanTaskCurrentView',

    dataObj: Module.Hyscan.NongseScanTask.Data,

    configObj: Module.Hyscan.NongseScanTask.Config,

    defaultView: 'Module.Hyscan.NongseScanTask.view.Panel',

    supportView: ['Module.Hyscan.NongseScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],

    appId: 'nongse'

});