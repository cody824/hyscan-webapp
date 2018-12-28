Ext.define('Module.Hyscan.WQScanTask.Portlet', {
    extend: 'Module.Hyscan.Public.TaskPortlet',

	requires  : [
        'Module.Hyscan.Public.Opt'
 	],
 		
 	VIEW : {
        'Module.Hyscan.WQScanTask.view.Panel': LABEL.grid,
        'Module.Hyscan.Public.view.ScanTaskDataGrid': HYSCAN_LABLE.dataInfo
	},

    title: MODULE_NAME['Module.Hyscan.WQScanTask'],

	moduleName : 'Module.Hyscan.WQScanTask',
    
    moduleSessionView : 'Module.Hyscan.WQScanTaskCurrentView',
    
    dataObj : Module.Hyscan.WQScanTask.Data,
    
    configObj : Module.Hyscan.WQScanTask.Config,
	
    defaultView : 'Module.Hyscan.WQScanTask.view.Panel',

    supportView: ['Module.Hyscan.WQScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],

    appId: 'shuise'

});