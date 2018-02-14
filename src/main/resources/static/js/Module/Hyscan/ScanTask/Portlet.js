Ext.define('Module.Hyscan.ScanTask.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.ciportlet',
	
	requires  : [
		'Module.Hyscan.ScanTask.Operation',
		'Module.Hyscan.ScanTask.Data'
 	],
 		
 	VIEW : {
		'Module.Hyscan.ScanTask.view.Grid' : '表格模式',
		'Module.Hyscan.ScanTask.view.DataGrid' : '数据信息'
	},
    
	title: "扫描任务",

	moduleName : 'Module.Hyscan.ScanTask',
    
    moduleSessionView : 'Module.Hyscan.ScanTaskCurrentView',
    
    dataObj : Module.Hyscan.ScanTask.Data,
    
    configObj : Module.Hyscan.ScanTask.Config,
	
    defaultView : 'Module.Hyscan.ScanTask.view.Grid',
	
    supportView :['Module.Hyscan.ScanTask.view.Grid', 'Module.Hyscan.ScanTask.view.DataGrid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

    initToolbar : function(){
		var me = this;
		var toolbar = this.callParent(arguments);
		return toolbar;
	}
});