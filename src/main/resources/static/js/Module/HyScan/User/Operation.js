
Ext.define('Module.Hyscan.User.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Hyscan.User.store.UserStore',
		'Module.Soul.group.store.GroupStore',
		'Module.Soul.role.store.RoleStore',
		'Module.Soul.group.Renderer',
		'Module.Soul.role.Renderer'
	],
	
	getOperationForUser : function(user){
		user.httpParams = new Object();
		user.httpMethod = new Object();
		user.requestBody = new Object();
		user.methodConfirm = new Object();
		user.methodConfirm["lockuser"] = {
			"put" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmLockUsers, user.name)
			},
			"delete" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmUnLockUsers, user.name)
			}
		};
		user.methodConfirm["resetPwd"] = {
			"put" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmRestUsersPasswd, user.name)
			}
		};
		if (user.status == Module.Hyscan.User.model.UserModel.LOCKED) {
			user.httpMethod["lockuser"] = "delete";
		} else  {
			user.httpMethod["lockuser"] = "put";
		}
		user.httpMethod["resetPwd"]="put";
	},
	
	doLockUsersFunction : function(records, callbackFn){
		var requestBody = [];
		Ext.each(records, function(r, i, rs){
			requestBody.push(r.data.name);
		});
		var method = "put";
		var user = records[0].data;
		var confirm = {
			"put" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmLockUsers, requestBody)
			},
			"delete" : {
				msg : Ext.String.format(USERMANAGE_MESSAGE.confirmUnLockUsers, requestBody)
			}
		};
		if (user.status == Module.Hyscan.User.model.UserModel.LOCKED) {
			method = "delete";
		} 
		
		Soul.Ajax.confirmRestAction("/suresecurity/lockedUser/", method, {}, requestBody,  callbackFn, null, null, confirm);
		
	},
// doDeleteUsersFunction : function(records,callbackFn){
// var requestBody=[];
// Ext.each(records, function(r, i, rs){
// requestBody.push(r.data.name);
// });
// var method="delete";
// var confirm={
// "delete" : {
// msg : Ext.String.format(USERMANAGE_MESSAGE.confirmDelUsers, requestBody)
// }
// };
// Soul.Ajax.confirmRestAction("suresecurity/deleteUser/", method, {},
// requestBody, callbackFn, null, null, confirm);
// },
	doResetPasswordFunction : function(records,callbackFn){
		Ext.QuickTips.init();
		var userForm = new Ext.FormPanel( {
			labelWidth : 75,
			frame : true,
			bodyStyle : 'padding:5px 5px 0',
			waitMsgTarget : true,
			defaults : {
				width : 370
			},
			defaultType : 'textfield',
			items : [{
				fieldLabel : USERMANAGE_SELF_HELP.newPwd,
				name : 'newPwd',
				emptyText: USERMANAGE_SELF_HELP.newPwd,
				inputType: 'password',
				regex : /^[\s\S]{0,20}$/,
				regexText : '密码长度不能超过20个字符',
				msgTarget:"side",
				maxLength:50,
				allowBlank : false
			}
			]
		});
		var newFormWin  = 	Ext.create('Ext.window.Window', {
			region:'center',
			buttonAlign: 'center',
			title: USERMANAGE_LABEL.resetPwd,
			autoHeight:true,
			width: 400,
			layout: 'form',
			maximizable:true,
			minimizable:true,
			closeAction:'hide',
			constrainHeader:true,
			defaultButton:0,
			resizable:true,
			resizeHandles:'se',
			modal:true,
			plain:true,
			animateTarget:'target',
			items :userForm,
			buttons : [ {
				text : LABEL.save,
				handler : function(){
					var formValid = userForm.form.isValid();
					if(formValid){
						var userId = 0;
						var oldPwd ="";
						Ext.each(records, function(r, i, rs){
							userId = r.data.id;
							oldPwd = r.data.password;
						});

						SureAjax.ajax({
							url : '/suresecurity/user/'+userId+'/password',
							type : "PUT",
							headers : {
								Accept : "application/json"
							},
							data:{oldPassword:oldPwd,newPassword:calcMD5(userForm.form.findField('newPwd').getValue())},
							success : callbackFn
						});
						userForm.form.reset();
						newFormWin.hide();
					}
				}
			}, {
				text : LABEL.cancel,
				handler : function() {
					userForm.form.reset();
					newFormWin.hide();
				}
			}]
		}).show();
	},
	doAddUserToGroupFunction : function(me,callbackFn){
		var sm = me.selModel;
		var records = sm.getSelection();
		var columns = new Array();
		var renders = Module.Soul.group.Renderer;
		columns.push(
				new Ext.grid.RowNumberer(),
				{text: GROUP_PROPERTY.name,sortable: true,dataIndex: 'name', searchType : 'string',
					renderer : function(v, u,r, rowIndex, columnIndex, s){
						u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
						return (Soul.util.GridRendererUtil.getLinkName(Module.Soul.group.Renderer.geGroupName(v, u,r, rowIndex, columnIndex - 1, s)));
					},
					flex : 1},
				{
						text: GROUP_PROPERTY.cName, width: 200, searchType : 'string',
					sortable: false, menuDisabled:true, dataIndex: 'cName'
				}, {
					text : GROUP_PROPERTY.status,width : 60, dataIndex:'status',  menuDisabled:true, searchType : 'number',
					renderer: function(val, u,r, rowIndex, columnIndex, s){
						return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
					},
					align : 'center'
				}, {
					text : GROUP_PROPERTY.comment, width : 200, dataIndex:'comment',  menuDisabled:true, searchType : 'string',
					align : 'center'
				}
			);
			
			var store = Ext.create('Ext.data.Store', {
				checkIndexes : ['name'],
			    model: 'Module.Soul.group.model.GroupModel',
			    storeId:'Module.Soul.group.model.user.userStore',
			    proxy: {
			         type: 'rest',
			         headers : {
			         	"Content-Type": "application/json; charset=utf-8", 
			         	Accept : 'application/json'
			         },
			         url: '/suresecurity/user/'+records[0].data.id+'/group',
			         extraParams : {
			        	 isExitSelf : true
			         },
			         reader: {
			             type: 'json',
			             root: 'data'
			         }
			     },
			     autoLoad: true
			});
			var selGroups;
			var sm1 = new Ext.selection.CheckboxModel({
				listeners: {
					selectionchange: function(sm2) {
						//when select checkbox do......
						selGroups = sm2.getSelection();
						rightAddGroupMI = pal.contextMenu.down('menuitem[name=addUserToGroup]');
						if (sm2.getCount() > 0) {
							rightAddGroupMI.enable();

						} else {
							rightAddGroupMI.disable();
						}
						
					}
				}
			});
			
			var pal = Ext.create('Soul.view.SearchGrid', {
				checkIndexes : ['name'],
			    store: Ext.data.StoreManager.lookup('Module.Soul.group.model.user.userStore'),
			    columns: columns,
			    width: 600,
			    height: 275,
			    selModel: sm1,	    	
			    renderTo: Ext.getBody()
			});
			pal.contextMenu=Ext.create('Ext.menu.Menu', {
	    		name : 'useroperation',
		        style: {
		            overflow: 'visible'     // For the Combo popup
		        },
		        items: [
		               {
						text: USERMANAGE_LABEL.addUsersToGroup,
						disabled:true,
						name : 'addUserToGroup',
						iconCls : 'x-add-icon'
					}]
			});
			rightAddGroupMI=pal.contextMenu.down('menuitem[name=addUserToGroup]');
			rightAddGroupMI.on('click',function(){
				var requestBody = [];
        		var names = [];
        		var userid=[];
        		var groupid=[];
        		Ext.each(selGroups, function(r, i, rs){
        			groupid.push(r.data.id);
        			names.push(r.data.name);
        		});
        		Ext.each(records, function(r, i, rs){
        			userid.push(r.data.id);
        		});
        		requestBody.push(groupid);
        		requestBody.push(userid);
        		var confirm = {
        				"put" : {
        					msg : Ext.String.format(USERMANAGE_MESSAGE.addUserToGroup, records[0].data.name, names)
        				}
        			};
            	Soul.Ajax.confirmRestAction("/suresecurity/user/group","put",{},requestBody,function(){
            		pal.updateView(pal);
            	},GROUP_MESSAGE.load,null,confirm);
			});
			Ext.create('Ext.window.Window', {
	    	    id:'operUser',
				modal:true,  //弹出时其他界面无法操作
				plain:true,
	    		title: '操作用户',
	    	    bodyPadding: 5,
	    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
	    	    layout: 'anchor',
	    	    defaults: {
	    	        anchor: '100%'
	    	    },
	    	    
	    	    items:pal,
	    	    tbar: [
	    	           { xtype: 'button',iconCls: 'x-add-icon', text:USERMANAGE_LABEL.addMapping ,listeners:{
	    	        	   click:function(){
	    	        		   if(selGroups == undefined || selGroups.length == 0){
	    	        			   Ext.Msg.alert(USERMANAGE_LABEL.operation,USERMANAGE_MESSAGE.noSelectForUpdate);
	    	        			   return;
	    	        		   }
	    	        	 		var requestBody = [];
	    	            		var names = [];
	    	            		var userNames = [];
	    	            		var userid=[];
	    	            		var groupid=[];
	    	            		Ext.each(selGroups, function(r, i, rs){
	    	            			groupid.push(r.data.id);
	    	            			names.push(r.data.name);
	    	            		});
	    	            		Ext.each(records, function(r, i, rs){
	    	            			userNames.push(r.data.name);
	    	            			userid.push(r.data.id);
	    	            		});
	    	            		requestBody.push(groupid);
	    	            		requestBody.push(userid);
	    	            		var confirm = {
	    	            				"put" : {
	    	            					msg : Ext.String.format(USERMANAGE_MESSAGE.addUserToGroup, userNames, names)
	    	            				}
	    	            			};
	    	                	Soul.Ajax.confirmRestAction("/suresecurity/user/"+userid[0]+"/group/","put",{},groupid,function(){
	    	                		pal.updateView(pal);
	    	                	},GROUP_MESSAGE.load,null,confirm);
	    	                	
	    	        	   }
	    	           }}
	    	         ]
	    	  
	    	}).show();

	},
doAddUserToRoleFunction : function(me,callbackFn){

		var sm = me.selModel;
		var records = sm.getSelection();
		var columns = new Array();
		var renders = Module.Soul.role.Renderer;
		columns.push(
				new Ext.grid.RowNumberer(),//行数
				{text: ROLE_PROPERTY.name,sortable: true,dataIndex: 'name', searchType : 'string',
					renderer : function(v, u,r, rowIndex, columnIndex, s){
						u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
						return (Soul.util.GridRendererUtil.getLinkName(Module.Soul.role.Renderer.getRoleName(v, u,r, rowIndex, columnIndex - 1, s)));
					},
					flex : 1},
				{
						text: ROLE_PROPERTY.cName,width: 200, searchType : 'string',
					sortable: false,
					menuDisabled:true,
					dataIndex: 'cName'
				},{
					text : ROLE_PROPERTY.status,width : 60, dataIndex:'status',  
					menuDisabled:true, 
					searchType : 'number',
					renderer: function(val, u,r, rowIndex, columnIndex, s){
						return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
					},
					align : 'center'
				},{
					text : ROLE_PROPERTY.comment, width : 200, dataIndex:'comment',  
					menuDisabled:true, 
					searchType : 'string',
					align : 'center'
				}
				
			);
			
			var store = Ext.create('Ext.data.Store', {
				checkIndexes : ['name'],
			    model: 'Module.Soul.role.model.RoleModel',
			    storeId:'Module.Soul.role.model.user.userStore',
			    proxy: {
			         type: 'rest',
			         headers : {
			         	"Content-Type": "application/json; charset=utf-8", 
			         	Accept : 'application/json'
			         },
			         url: '/suresecurity/user/'+records[0].data.id+'/role/',
			         extraParams : {
			        	 isExitSelf : true
			         },
			         reader: {
			             type: 'json',
			             root: 'data'
			         }
			     },
			     autoLoad: true
			});
			var selRoles;
			var sm1 = new Ext.selection.CheckboxModel({
				listeners: {
					selectionchange: function(sm2) {
						//when select checkbox do......
						selRoles = sm2.getSelection();
						rightAddRoleMI = pal.contextMenu.down('menuitem[name=addUserToRole]');
						if (sm2.getCount() > 0) {
							rightAddRoleMI.enable();

						} else {
							rightAddRoleMI.disable();
						}
					}
				}
			});
			
			var pal = Ext.create('Soul.view.SearchGrid', {
				checkIndexes : ['name'],
			    store: Ext.data.StoreManager.lookup('Module.Soul.role.model.user.userStore'),
			    columns: columns,
			    width: 600,
			    height: 275,
			    selModel: sm1,	 
			    renderTo: Ext.getBody()
			});
			pal.contextMenu=Ext.create('Ext.menu.Menu', {
	    		name : 'useroperation',
		        style: {
		            overflow: 'visible'     // For the Combo popup
		        },
		        items: [
		               {
						text: USERMANAGE_LABEL.addUsersToRole,
						disabled:true,
						name : 'addUserToRole',
						iconCls : 'x-add-icon'
					}]
			});
			rightAddRoleMI=pal.contextMenu.down('menuitem[name=addUserToRole]');
			rightAddRoleMI.on('click',function(){
				var requestBody = [];
        		var names = [];
        		var userNames = [];
        		var userid=[];
        		var roleid=[];
        		var isture=true;
        		Ext.each(selRoles, function(r, i, rs){
        			if(r.data.status!=0){
        				Ext.Msg.alert(USERMANAGE_LABEL.operation,USERMANAGE_MESSAGE.mustactivation);
        				isture=false;
        			}
        			roleid.push(r.data.id);
        			names.push(r.data.name);
        		});
        		Ext.each(records, function(r, i, rs){
        			userNames.push(r.data.name);
        			userid.push(r.data.id);
        		});
        		if(!isture) return;
        		requestBody.push(roleid);
        		requestBody.push(userid);
        		var confirm = {
        				"put" : {
        					msg : Ext.String.format(USERMANAGE_MESSAGE.addUserToRole,userNames , names)
        				}
        			};
            	Soul.Ajax.confirmRestAction("/suresecurity/user/"+userid[0]+"/role","put",{},roleid,function(){
            		pal.updateView(pal);
            	},GROUP_MESSAGE.load,null,confirm);
			});
			
			Ext.create('Ext.window.Window', {
	    	    id:'operUser',
	    		title: '操作用户',
				modal:true,
				plain:true,
	    	    bodyPadding: 5,
	    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
	    	    layout: 'anchor',
	    	    defaults: {
	    	        anchor: '100%'
	    	    },
	    	    
	    	    items:pal,
	    	    tbar: [
	    	           { xtype: 'button',iconCls: 'x-add-icon', text:USERMANAGE_LABEL.addMapping ,listeners:{
	    	        	   click:function(){
	    	        		   if(selRoles == undefined || selRoles.length == 0){
	    	        			   Ext.Msg.alert(USERMANAGE_LABEL.operation,USERMANAGE_MESSAGE.noSelectForUpdate);
	    	        			   return;
	    	        		   }
	    	        	 		var requestBody = [];
	    	            		var names = [];
	    	            		var userNames = [];
	    	            		var userid=[];
	    	            		var roleid=[];
	    	            		var isture=true;
	    	            		Ext.each(selRoles, function(r, i, rs){
	    	            			if(r.data.status!=0){
	    	            				Ext.Msg.alert(USERMANAGE_LABEL.operation,USERMANAGE_MESSAGE.mustactivation);
	    	            				isture=false;
	    	            			}
	    	            			roleid.push(r.data.id);
	    	            			names.push(r.data.name);
	    	            		});
	    	            		Ext.each(records, function(r, i, rs){
	    	            			userNames.push(r.data.name);
	    	            			userid.push(r.data.id);
	    	            		});
	    	            		if(!isture) return;
	    	            		requestBody.push(roleid);
	    	            		requestBody.push(userid);
	    	            		var confirm = {
	    	            				"put" : {
	    	            					msg : Ext.String.format(USERMANAGE_MESSAGE.addUserToRole,userNames , names)
	    	            				}
	    	            			};
	    	                	Soul.Ajax.confirmRestAction("/suresecurity/user/"+userid[0]+"/role/","put",{},roleid,function(){
	    	                		pal.updateView(pal);
	    	                	},GROUP_MESSAGE.load,null,confirm);
	    	                	
	    	        	   }
	    	           }}
	    	         ]
	    	  
	    	}).show();

	},
	docheckGroupFunction: function(me , callbackFun){
		var sm = me.selModel;
		var records = sm.getSelection();
		var columns = new Array();
		var operation='group';
		var renders = Module.Soul.group.Renderer;
		columns.push(
				new Ext.grid.RowNumberer(),
				{text: GROUP_PROPERTY.name,sortable: true,dataIndex: 'name', searchType : 'string',
					renderer : function(v, u,r, rowIndex, columnIndex, s){
						u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
						return (Soul.util.GridRendererUtil.getLinkName(Module.Soul.group.Renderer.geGroupName(v, u,r, rowIndex, columnIndex - 1, s)));
					},
					flex : 1},
				{
						text: GROUP_PROPERTY.cName, width: 200, searchType : 'string',
					sortable: false, menuDisabled:true, dataIndex: 'cName'
				}, {
					text : GROUP_PROPERTY.status,width : 60, dataIndex:'status',  menuDisabled:true, searchType : 'number',
					renderer: function(val, u,r, rowIndex, columnIndex, s){
						return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
					},
					align : 'center'
				}, {
					text : GROUP_PROPERTY.comment, width : 200, dataIndex:'comment',  menuDisabled:true, searchType : 'string',
					align : 'center'
				}
			);
			
			var store = Ext.create('Ext.data.Store', {
				checkIndexes : ['name'],
			    model: 'Module.Soul.group.model.GroupModel',
			    storeId:'Module.Soul.group.model.user.userStore',
			    proxy: {
			         type: 'rest',
			         headers : {
			         	"Content-Type": "application/json; charset=utf-8", 
			         	Accept : 'application/json'
			         },
			         url: records[0].data.links[operation],
			         reader: {
			             type: 'json',
			             root: 'data'
			         }
			     },
			     autoLoad: true
			});
			var selGroups;
			var sm1 = new Ext.selection.CheckboxModel({
				listeners: {
					selectionchange: function(sm2) {
						//when select checkbox do......
						selGroups = sm2.getSelection();
						rightAddGroupMI = pal.contextMenu.down('menuitem[name=removeUserToGroup]');
						if (sm2.getCount() > 0) {
							rightAddGroupMI.enable();

						} else {
							rightAddGroupMI.disable();
						}
						
					}
				}
			});
			
			var pal = Ext.create('Soul.view.SearchGrid', {
				checkIndexes : ['name'],
			    store: Ext.data.StoreManager.lookup('Module.Soul.group.model.user.userStore'),
			    columns: columns,
			    width: 600,
			    height: 275,
			    selModel: sm1,	    	
			    renderTo: Ext.getBody()
			});
			pal.contextMenu=Ext.create('Ext.menu.Menu', {
	    		name : 'useroperation',
		        style: {
		            overflow: 'visible'     // For the Combo popup
		        },
		        items: [
		               {
						text: USERMANAGE_LABEL.delGroup,
						disabled:true,
						name : 'removeUserToGroup',
						iconCls : 'delete'
					}]
			});
			rightAddGroupMI=pal.contextMenu.down('menuitem[name=removeUserToGroup]');
			rightAddGroupMI.on('click',function(){
				 var requestBody = [];
	           		var names = [];
	           		var groupid=[];
	           		var isture=true;
	           		Ext.each(selGroups, function(r, i, rs){
	           			groupid.push(r.data.id);
	           			names.push(r.data.name);
	           		});
	           		if(!isture) return;
	           		requestBody.push(groupid);
	           		var confirm = {
	           				"delete" : {
	           					msg : Ext.String.format(USERMANAGE_MESSAGE.removeUserToGroup,records[0].data.name , names)
	           				}
	           			};
	               	Soul.Ajax.confirmRestAction(records[0].data.links[operation],"delete",{},requestBody,function(){
	               		pal.updateView(pal);
	               	},'操作成功',null,confirm);
			});
			Ext.create('Ext.window.Window', {
	    	    id:'operUser',
				modal:true,  //弹出时其他界面无法操作
				plain:true,
	    		title: '操作用户',
	    	    bodyPadding: 5,
	    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
	    	    layout: 'anchor',
	    	    defaults: {
	    	        anchor: '100%'
	    	    },
	    	    
	    	    items:pal,
	    	    tbar: [
	    	           { xtype: 'button',iconCls: 'delete', text:USERMANAGE_LABEL.delGroup ,listeners:{
	    	        	   click:function(){
	    	        		   if(selGroups == undefined || selGroups.length == 0){
	    	        			   Ext.Msg.alert(USERMANAGE_LABEL.operation,USERMANAGE_MESSAGE.noSelectForUpdate);
	    	        			   return;
	    	        		   }
	    	        		   var requestBody = [];
		    	           		var names = [];
		    	           		var groupid=[];
		    	           		Ext.each(selGroups, function(r, i, rs){
		    	           			groupid.push(r.data.id);
		    	           			names.push(r.data.name);
		    	           		});
		    	           		requestBody.push(groupid);
		    	           		var confirm = {
		    	           				"delete" : {
		    	           					msg : Ext.String.format(USERMANAGE_MESSAGE.removeUserToGroup,records[0].data.name , names)
		    	           				}
		    	           			};
		    	               	Soul.Ajax.confirmRestAction(records[0].data.links[operation],"delete",{},groupid,function(){
		    	               		pal.updateView(pal);
		    	               	},'操作成功',null,confirm);
	    	                	
	    	        	   }
	    	           }}
	    	         ]
	    	  
	    	}).show();

	},
	docheckRoleFunction: function(me , callbackFun){
		var sm = me.selModel;
		var records = sm.getSelection();   
		var operation = 'role';
		var columns = new Array();
		var renders = Module.Soul.role.Renderer;
		columns.push(
				new Ext.grid.RowNumberer(),//行数
				{text: ROLE_PROPERTY.name,sortable: true,dataIndex: 'name', searchType : 'string',
					renderer : function(v, u,r, rowIndex, columnIndex, s){
						u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
						return (Soul.util.GridRendererUtil.getLinkName(Module.Soul.role.Renderer.getRoleName(v, u,r, rowIndex, columnIndex - 1, s)));
					},
					flex : 1},
				{
						text: ROLE_PROPERTY.cName,width: 200, searchType : 'string',
					sortable: false,
					menuDisabled:true,
					dataIndex: 'cName'
				},{
					text : ROLE_PROPERTY.status,width : 60, dataIndex:'status',  
					menuDisabled:true, 
					searchType : 'number',
					renderer: function(val, u,r, rowIndex, columnIndex, s){
						return renders.translateIsStatus(val, u,r, rowIndex, columnIndex - 1, s);
					},
					align : 'center'
				},{
					text : ROLE_PROPERTY.comment, width : 200, dataIndex:'comment',  
					menuDisabled:true, 
					searchType : 'string',
					align : 'center'
				}
				
			);
			
			var store = Ext.create('Ext.data.Store', {
				checkIndexes : ['name'],
			    model: 'Module.Soul.role.model.RoleModel',
			    storeId:'Module.Soul.role.model.user.userStore',
			    proxy: {
			         type: 'rest',
			         headers : {
			         	"Content-Type": "application/json; charset=utf-8", 
			         	Accept : 'application/json'
			         },
			         url: records[0].data.links[operation],
			         reader: {
			             type: 'json',
			             root: 'data'
			         }
			     },
			     autoLoad: true
			});
			var selRoles;
			var sm1 = new Ext.selection.CheckboxModel({
				listeners: {
					selectionchange: function(sm2) {
						//when select checkbox do......
						selRoles = sm2.getSelection();
						rightAddRoleMI = pal.contextMenu.down('menuitem[name=removeUserToRole]');
						if (sm2.getCount() > 0) {
							rightAddRoleMI.enable();

						} else {
							rightAddRoleMI.disable();
						}
					}
				}
			});
			
			var pal = Ext.create('Soul.view.SearchGrid', {
				checkIndexes : ['name'],
			    store: Ext.data.StoreManager.lookup('Module.Soul.role.model.user.userStore'),
			    columns: columns,
			    width: 600,
			    height: 275,
			    selModel: sm1,	 
			    renderTo: Ext.getBody()
			});
			pal.contextMenu=Ext.create('Ext.menu.Menu', {
	    		name : 'useroperation',
		        style: {
		            overflow: 'visible'     // For the Combo popup
		        },
		        items: [
		               {
						text: USERMANAGE_LABEL.delRole,
						disabled:true,
						name : 'removeUserToRole',
						iconCls : 'delete'
					}]
			});
			rightAddRoleMI=pal.contextMenu.down('menuitem[name=removeUserToRole]');
			rightAddRoleMI.on('click',function(){
				var requestBody = [];
        		var names = [];
        		var roleid=[];
        		Ext.each(selRoles, function(r, i, rs){
        			roleid.push(r.data.id);
        			names.push(r.data.name);
        		});
        		requestBody.push(roleid);
        		var confirm = {
        				"delete" : {
        					msg : Ext.String.format(USERMANAGE_MESSAGE.removeUserToRole,records[0].data.name , names)
        				}
        			};
            	Soul.Ajax.confirmRestAction(records[0].data.links[operation],"delete",{},roleid,function(){
            		pal.updateView(pal);
            	},'操作成功',null,confirm);
			});
			
			Ext.create('Ext.window.Window', {
	    	    id:'operUser',
	    		title: '操作用户',
				modal:true,
				plain:true,
	    	    bodyPadding: 5,
	    	    // 表单域 Fields 将被竖直排列, 占满整个宽度
	    	    layout: 'anchor',
	    	    defaults: {
	    	        anchor: '100%'
	    	    },
	    	    
	    	    items:pal,
	    	    tbar: [
	    	           { xtype: 'button', iconCls: 'delete',text:USERMANAGE_LABEL.delRole ,listeners:{
	    	        	   click:function(){
	    	        		   if(selRoles == undefined || selRoles.length == 0){
	    	        			   Ext.Msg.alert(GROUP_LABEL.operationWarn,GROUP_MESSAGE.noSelectForUpdate);
	    	        			   return;
	    	        		   }
	    	        		var requestBody = [];
	    	           		var names = [];
	    	           		var roleid=[];
	    	           		Ext.each(selRoles, function(r, i, rs){
	    	           			roleid.push(r.data.id);
	    	           			names.push(r.data.name);
	    	           		});
	    	           		requestBody.push(roleid);
	    	           		var confirm = {
	    	           				"delete" : {
	    	           					msg : Ext.String.format(USERMANAGE_MESSAGE.removeUserToRole,records[0].data.name , names)
	    	           				}
	    	           			};
	    	               	Soul.Ajax.confirmRestAction(records[0].data.links[operation],"delete",{},roleid,function(){
	    	               		pal.updateView(pal);
	    	               	},'操作成功',null,confirm);
	    	                	
	    	        	   }
	    	           }}
	    	         ]
	    	  
	    	}).show();
	},
	doCreateUsersFunction : function( callbackFun){
		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			width: 280,
			frame: true,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 250
			},
			items:[{
				name: 'userPre',
				fieldLabel: USERMANAGE_LABEL.userPre,
				labelAlign: 'right',
				allowBlank: false

			},{
				xtype: 'numberfield',
				allowDecimals: false,
				minValue: 1,
				maxValue: 100000,
				step: 1,
				name: 'userNum',
				fieldLabel: USERMANAGE_LABEL.userNum,
				labelAlign: 'right',
				allowBlank: false

			},{
				name: 'pw',
				fieldLabel: USERMANAGE_LABEL.pw,
				labelAlign: 'right',
				readOnly: true,
				value:'默认随机密码',
				allowBlank: false
			},
				Module.Hyscan.User.Tools.getAppIDCombo('yearbook')
			]
		});

		var win = new Ext.Window({
			title: USERMANAGE_LABEL.createUser,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.apply,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;
					var params = formpanel.getForm().getValues();
					Soul.Ajax.restAction('/suresecurity/users', 'post', Ext.encode(params), null, callbackFun, null, null);
					win.close();
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},



});
