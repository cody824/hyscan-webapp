Ext.define('Module.Hyscan.AlgoConfig.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sanoticeportlet',
	
	requires  : [
		'Module.Hyscan.AlgoConfig.Operation',
		'Module.Hyscan.AlgoConfig.Data',
 	],
 		
 	VIEW : {
        'Module.Hyscan.AlgoConfig.view.Grid': LABEL.grid
	},

    title: MODULE_NAME["Module.Hyscan.AlgoConfig"],
			
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
                text: HYSCAN_LABLE.uploadAlgo,
					disabled: false,
					name: 'uploadAlgo',
					iconCls: 'x-add-icon'
				},{
                text: HYSCAN_LABLE.useAlgo,
					disabled: true,
					name: 'useAlgo',
					iconCls: 'extensive-edit'
				},{
                text: HYSCAN_LABLE.delAlgo,
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
            text: LABEL.operation,
	        icon : '/img/icon/show.png',
	        menu: this.buildOptMenu()
	    };

		toolbar.push(paramCombox);
		return toolbar;
    }
});
