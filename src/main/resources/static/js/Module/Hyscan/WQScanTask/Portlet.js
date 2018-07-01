Ext.define('Module.Hyscan.WQScanTask.Portlet', {
    extend: 'Module.Hyscan.Public.TaskPortlet',

	requires  : [
        'Module.Hyscan.Public.Opt'
 	],
 		
 	VIEW : {
        'Module.Hyscan.WQScanTask.view.Panel' : '表格模式',
		'Module.Hyscan.Public.view.ScanTaskDataGrid' : '数据信息'
	},
    
	title: "水质监测扫描任务",

	moduleName : 'Module.Hyscan.WQScanTask',
    
    moduleSessionView : 'Module.Hyscan.WQScanTaskCurrentView',
    
    dataObj : Module.Hyscan.WQScanTask.Data,
    
    configObj : Module.Hyscan.WQScanTask.Config,
	
    defaultView : 'Module.Hyscan.WQScanTask.view.Panel',

    supportView: ['Module.Hyscan.WQScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],

    appId: 'shuise'

});