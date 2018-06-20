Ext.define('Module.Hyscan.MeiseScanTask.Portlet', {
    extend: 'Module.Hyscan.Public.TaskPortlet',

    VIEW: {
        'Module.Hyscan.MeiseScanTask.view.Panel': '表格模式',
        'Module.Hyscan.Public.view.ScanTaskDataGrid': '数据信息'
    },

    title: "煤色监测扫描任务",

    moduleName: 'Module.Hyscan.MeiseScanTask',

    moduleSessionView: 'Module.Hyscan.MeiseScanTaskCurrentView',

    dataObj: Module.Hyscan.MeiseScanTask.Data,

    configObj: Module.Hyscan.MeiseScanTask.Config,

    defaultView: 'Module.Hyscan.MeiseScanTask.view.Panel',

    supportView: ['Module.Hyscan.MeiseScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid']

});