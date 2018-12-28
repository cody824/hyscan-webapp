Ext.define('Module.Hyscan.User.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.sauserportlet',
	
	requires  : [
		'Module.Hyscan.User.Operation',
		'Module.Hyscan.User.Data',
		'Module.Hyscan.User.store.UserStore'
 	],
 		
 	VIEW : {
		'Module.Hyscan.User.view.Grid' : LABEL.grid
	},
    
	title: USERMANAGE_LABEL.userInfo,
			
	moduleName : 'Module.Hyscan.User',
    
    moduleSessionView : 'Module.Hyscan.UserCurrentView',
    
    dataObj : Module.Hyscan.User.Data,
    
    configObj : Module.Hyscan.User.Config,
	
    defaultView : 'Module.Hyscan.User.view.Grid',
	
    supportView :['Module.Hyscan.User.view.Grid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},
	
	buildUserOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'useroperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [
                {
                    text: HYSCAN_LABLE.createUser,
                    name: 'add',
                    hidden: !supportAddUser,
                    icon: '/img/icon/add.png'
                },
                {
                    text: HYSCAN_LABLE.setupAppAdmin,
                    disabled: true,
                    name: 'setAppAdmin',
                    iconCls: 'lock'
                }, {
                    text: HYSCAN_LABLE.buildApiKey,
                    disabled: true,
                    name: 'buildApiKey',
                    iconCls: 'lock'
                }

				]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			userMenu = {
                text: LABEL.operation,
	            iconCls: 'pool_setting',  
	            menu: this.buildUserOptMenu()
	        };

		toolbar.push(userMenu);
		return toolbar;
    }
});




