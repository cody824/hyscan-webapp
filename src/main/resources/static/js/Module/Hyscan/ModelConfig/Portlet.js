Ext.define('Module.Hyscan.ModelConfig.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	
	requires  : [
		'Module.Hyscan.ModelConfig.Operation',
		'Module.Hyscan.ModelConfig.Data',
 	],
 		
 	VIEW : {
		'Module.Hyscan.ModelConfig.view.Grid' : "表格显示"
	},
    
	title: "型号配置",
	
	moduleName : 'Module.Hyscan.ModelConfig',
    
    moduleSessionView : 'Module.Hyscan.ModelConfigCurrentView',
    
    dataObj : Module.Hyscan.ModelConfig.Data,
    
    configObj : Module.Hyscan.ModelConfig.Config,
	
    defaultView : 'Module.Hyscan.ModelConfig.view.Grid',
	
    supportView :['Module.Hyscan.ModelConfig.view.Grid'],
    
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
    
	buildModelOptMenu : function(){
		var menu = Ext.create('Ext.menu.Menu', {
			name : 'modeloperation',
			style: {
				overflow: 'visible'
			},
			items: [{
					text: "新建型号",
					disabled: false,
					name: 'createModel',
					iconCls: 'x-add-icon'
				},{
					text: "编辑型号",
					disabled: true,
					name: 'editModel',
					iconCls: 'extensive-edit'
				},{
					text: "删除型号",
					disabled: true,
					name: 'delModel',
					iconCls: 'x-del-icon'
				}]
		});
		return menu;
	},
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments);
	    var modelOpt = {
	        text: "操作",
	        icon : '/img/icon/show.png',
	        menu: this.buildModelOptMenu()
	    };

		toolbar.push(modelOpt);
		return toolbar;
    }
});
