Ext.define('Module.Hyscan.MaterialAlgo.Portlet', {
	extend : 'Soul.view.ModulePortlet',

 	VIEW : {
        'Module.Hyscan.MaterialAlgo.view.Panel': '表格模式'
	},
    
	title: "材质检测算法",

    moduleName: 'Module.Hyscan.MaterialAlgo',
    
    moduleSessionView : 'Module.Hyscan.MaterialAlgoCurrentView',
    
    dataObj : Module.Hyscan.MaterialAlgo.Data,
    
    configObj : Module.Hyscan.MaterialAlgo.Config,
	
    defaultView : 'Module.Hyscan.MaterialAlgo.view.Panel',
	
    supportView :['Module.Hyscan.MaterialAlgo.view.Panel'],

    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
    }
});
