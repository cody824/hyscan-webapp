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
                /*{
                text: "设置/取消系统管理员",
                disabled:true,
                name : 'setAdmin',
                iconCls : 'lock'
            }, {
                text: "设置/取消HYSCAN管理员",
                disabled:true,
                name : 'setHyscanAdmin',
                iconCls : 'lock'
            },  {
                text: "设置/取消水色管理员",
                disabled:true,
                name : 'setWQAdmin',
                iconCls : 'lock'
            },  */{
                    text: "设置/取消应用管理员",
                    disabled: true,
                    name: 'setAppAdmin',
                    iconCls: 'lock'
                }, {
                    text: "生成APIKey",
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
	            text: "操作",
	            iconCls: 'pool_setting',  
	            menu: this.buildUserOptMenu()
	        };

		toolbar.push(userMenu);
		return toolbar;
    }
});




