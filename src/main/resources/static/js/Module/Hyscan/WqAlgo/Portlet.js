Ext.define('Module.Hyscan.WqAlgo.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sanoticeportlet',
	
	requires  : [
		'Module.Hyscan.WqAlgo.Operation',
		'Module.Hyscan.WqAlgo.Data',
 	],
 		
 	VIEW : {
		'Module.Hyscan.WqAlgo.view.Panel' : '表格模式'
	},
    
	title: "水质监测算法",

	moduleName : 'Module.Hyscan.WqAlgo',
    
    moduleSessionView : 'Module.Hyscan.WqAlgoCurrentView',
    
    dataObj : Module.Hyscan.WqAlgo.Data,
    
    configObj : Module.Hyscan.WqAlgo.Config,
	
    defaultView : 'Module.Hyscan.WqAlgo.view.Panel',
	
    supportView :['Module.Hyscan.WqAlgo.view.Panel'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	}
});
