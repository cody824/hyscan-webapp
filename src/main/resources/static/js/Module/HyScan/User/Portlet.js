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
			
	iconCls : 'md-User',
	
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
					text: USERMANAGE_LABEL.lockUser,
					disabled:true,
					name : 'lockuser',
					iconCls : 'lock'
				},{
					text: USERMANAGE_LABEL.resetPwd,
					disabled:true,
					name : 'resetuser',
					iconCls : 'update'
				},
//				{
//					text: USERMANAGE_LABEL.addUsersToGroup,
//					disabled:true,
//					name : 'addUserToGroup',
//					iconCls : 'x-add-icon'
//				},{
//					text: USERMANAGE_LABEL.addUsersToRole,
//					disabled:true,
//					name : 'addUserToRole',
//					iconCls : 'x-add-icon'
//				},{
//					text:'批量生成用户',
//					disabled:false,
//					name : 'createUsesBtn',
//					iconCls : 'x-add-icon'
//				}
//	                ,{
//					text: USERMANAGE_LABEL.modifyUser,
//					disabled:true,
//					name : 'updateuser',
//					iconCls : 'update'
//				},{
//					text: USERMANAGE_LABEL.newUser,
//					disabled:false,
//					name : 'adduser',
//					iconCls : 'x-add-icon'
//				}
				]
	    });
		return menu;
    },
     		
    initToolbar : function(){
		var toolbar = this.callParent(arguments),
			userMenu = {
	            text: USERMANAGE_LABEL.operation,
	            iconCls: 'pool_setting',  
	            menu: this.buildUserOptMenu()
	        };

		//toolbar.push(userMenu);
		return toolbar;
    }
});




