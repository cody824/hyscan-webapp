Ext.define('Module.Hyscan.MaterialConfig.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sanoticeportlet',
	
	requires  : [
		'Module.Hyscan.MaterialConfig.Operation',
		'Module.Hyscan.MaterialConfig.Data',
 	],
 		
 	VIEW : {
		'Module.Hyscan.MaterialConfig.view.ParameterGrid': '材料索引'
	},
    
	title: "材料索引",
			
	icon : '/img/icon/repository.png',
	
	moduleName : 'Module.Hyscan.MaterialConfig',
    
    moduleSessionView : 'Module.Hyscan.MaterialConfigCurrentView',
    
    dataObj : Module.Hyscan.MaterialConfig.Data,
    
    configObj : Module.Hyscan.MaterialConfig.Config,
	
    defaultView : 'Module.Hyscan.MaterialConfig.view.ParameterGrid',
	
    supportView :['Module.Hyscan.MaterialConfig.view.ParameterGrid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

	buildOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'modeloperation',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: "新建索引",
					disabled: false,
					name: 'createIndex',
					iconCls: 'x-add-icon'
				},{
					text: "编辑索引",
					disabled: true,
					name: 'editIndex',
					iconCls: 'extensive-edit'
				},{
					text: "删除索引",
					disabled: true,
					name: 'delIndex',
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
