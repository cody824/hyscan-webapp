Ext.define('Module.Hyscan.MeiseScanTask.Portlet', {
    extend: 'Module.Hyscan.Public.TaskPortlet',

    VIEW: {
        'Module.Hyscan.MeiseScanTask.view.Panel': LABEL.grid,
        'Module.Hyscan.Public.view.ScanTaskDataGrid': HYSCAN_LABLE.dataInfo
    },

    title: MODULE_NAME['Module.Hyscan.MeiseScanTask'],

    moduleName: 'Module.Hyscan.MeiseScanTask',

    moduleSessionView: 'Module.Hyscan.MeiseScanTaskCurrentView',

    dataObj: Module.Hyscan.MeiseScanTask.Data,

    configObj: Module.Hyscan.MeiseScanTask.Config,

    defaultView: 'Module.Hyscan.MeiseScanTask.view.Panel',

    supportView: ['Module.Hyscan.MeiseScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],

    appId: 'meise'

});