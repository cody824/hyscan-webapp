Ext.define('Module.Hyscan.MaterialAlgo.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	
	requires  : [
		'Module.Hyscan.MaterialAlgo.Operation',
		'Module.Hyscan.MaterialAlgo.Data',
 	],
 		
 	VIEW : {
        'Module.Hyscan.MaterialAlgo.view.Panel' : "表单模式"
	},
    
	title: "材质检测算法",
	
	iconCls : 'md-MaterialAlgo',
			
	moduleName : 'Module.Hyscan.MaterialAlgo',
    
    moduleSessionView : 'Module.Hyscan.MaterialAlgoCurrentView',
    
    dataObj : Module.Hyscan.MaterialAlgo.Data,
    
    configObj : Module.Hyscan.MaterialAlgo.Config,
	
    defaultView : 'Module.Hyscan.MaterialAlgo.view.Panel',
	
    supportView :['Module.Hyscan.MaterialAlgo.view.Panel'],

    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

    buildParamType : function() {
    	var menu = Ext.create('Ext.menu.Menu', {
    		id : 'paramtype',
    		name : 'paramtype',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: []
	    });
		return menu;
    },


    initToolbar : function(){
		var toolbar = this.callParent(arguments);
		return toolbar;
    }
});
