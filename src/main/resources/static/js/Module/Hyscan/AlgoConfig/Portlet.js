Ext.define('Module.Hyscan.AlgoConfig.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sanoticeportlet',
	
	requires  : [
		'Module.Hyscan.AlgoConfig.Operation',
		'Module.Hyscan.AlgoConfig.Data',
 	],
 		
 	VIEW : {
		'Module.Hyscan.AlgoConfig.view.Grid': '表格'
	},
    
	title: "算法管理",
			
	moduleName : 'Module.Hyscan.AlgoConfig',
    
    moduleSessionView : 'Module.Hyscan.AlgoConfigCurrentView',
    
    dataObj : Module.Hyscan.AlgoConfig.Data,
    
    configObj : Module.Hyscan.AlgoConfig.Config,
	
    defaultView : 'Module.Hyscan.AlgoConfig.view.Grid',
	
    supportView :['Module.Hyscan.AlgoConfig.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'algooperation',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: "上传算法",
					disabled: false,
					name: 'uploadAlgo',
					iconCls: 'x-add-icon'
				},{
					text: "设置为当前算法",
					disabled: true,
					name: 'useAlgo',
					iconCls: 'extensive-edit'
				},{
					text: "删除算法",
					disabled: true,
					name: 'delAlgo',
					iconCls: 'x-del-icon'
				}]
		});
		return menu;
	},
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments);
	    var paramCombox = {
	        text: "操作",
	        icon : '/img/icon/show.png',
	        menu: this.buildOptMenu()
	    };

		toolbar.push(paramCombox);
		return toolbar;
    }
});
