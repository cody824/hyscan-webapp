Ext.define('Module.Hyscan.User.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Hyscan.User.Tools',
 		'Module.Hyscan.User.model.UserModel'
  	],
	translateIsStaff : function (v){
		if(v == this.UM.ADMIN_USER){
			return USERMANAGE_LABEL.staff;
		}else{
			return USERMANAGE_LABEL.commonUser;
		}
	},
	translateIsStatus : function(v){
		if(v == 0){
			return USERMANAGE_LABEL.active;
		} else if (v == 1){
			return USERMANAGE_LABEL.unactive;
		} else if (v == 2){
			return USERMANAGE_LABEL.lockStatus;
		} else {
			return USERMANAGE_LABEL.unknownStatus;
		}
	},
	translateCtime : function(v){
		if(v!=null&&v!=""){
			return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
		}
		return v;
	},
	translateCheckGroupIcon : function(val, u,r, rowIndex, columnIndex, s){
		u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.addUserToGroup, r.data.name) + '"'; 
		return Soul.util.GridRendererUtil.getPlusMgrInnerBox();
	},
	translateCheckRoleIcon : function(val, u,r, rowIndex, columnIndex, s){
		u.tdAttr = 'data-qtip="' +  Ext.String.format(USERMANAGE_MESSAGE.addUserToRole, r.data.name) + '"'; 
		return Soul.util.GridRendererUtil.getPlusMgrInnerBox();
	},
	translateAddToGroupIcon : function(val, u,r, rowIndex, columnIndex, s){
		if (r.data.role == this.UM.ADMIN_USER) {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.addUserToGroup, r.data.userName) + '"'; 
			return Soul.util.GridRendererUtil.getPlusMgrInnerBox();
		}
	},
	
	translateLockIcon : function(val, u,r, rowIndex, columnIndex, s, v){
		var user = r.data, me = this;
		var permitOk = me.isPermitOk(user, columnIndex, v);
		if (permitOk && user.status == this.UM.LOCKED) {
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.userIsLock, r.data.name) + '"'; 
			return Soul.util.GridRendererUtil.getLockedMgrInnerBox();
		} else if (permitOk && user.status != this.UM.LOCKED){
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.lockUser, r.data.name) + '"';
			return Soul.util.GridRendererUtil.getLockMgrInnerBox();
		} else {
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	
	translateResetPasswdIcon : function(val, u,r, rowIndex, columnIndex, s, v){
		var user = r.data, me = this;
		var permitOk = me.isPermitOk(user, columnIndex, v);
		if(permitOk){
			if (r.data.status == this.UM.LOCKED)
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.unLockUser, r.data.name) + '"';
			else
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.resetPasswd, r.data.name) + '"';
			return Soul.util.GridRendererUtil.getKeyMgrInnerBox();
		}else{
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	translateGroupIcon : function(val, u,r, rowIndex, columnIndex, s, v){
		var user = r.data, me = this;
		var permitOk = me.isPermitOk(user, columnIndex, v);
		if(permitOk){
			if (r.data.status == this.UM.LOCKED)
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.unLockUser, r.data.name) + '"';
			else
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.resetPasswd, r.data.name) + '"';
			return Soul.util.GridRendererUtil.getKeyMgrInnerBox();
		}else{
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	isUserEditAble : function(user){
		return true;
	},
	
	isPermitOk : function(user, columnIndex, v){
		var permitOk = true;
		var operation = v.panel.columns[columnIndex].operation;
		if (user.links[operation] == null)
			permitOk = false;
		return permitOk;
	},
	
	translateStaffIcon : function(v, u,r, rowIndex, columnIndex, s,view){
		var render = Module.Hyscan.User.Renderer;
		if(render.isUserEditAble(r.data)){
			if(v == this.UM.ADMIN_USER){
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.cancelAdmin, r.data.userName) + '"'; 
				return Soul.util.GridRendererUtil.getUserNoAdminInnerBox();
			}else if(v == this.UM.COMMON_USER){
				u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.setAdmin, r.data.userName) + '"'; 
				return Soul.util.GridRendererUtil.getUserAdminInnerBox();
			}
		}else{
			r.changeroleOperateAble = false;
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	
	translateDeleteIcon : function(val, u,r, rowIndex, columnIndex, s){
		var render = Module.Hyscan.User.Renderer;
		if(render.isUserEditAble(r.data)){
			u.tdAttr = 'data-qtip="' + Ext.String.format(USERMANAGE_MESSAGE.delUser, r.data.userName) + '"';
			return Soul.util.GridRendererUtil.getMinusMgrInnerBox();
		}else{
			u.tdAttr = 'data-qtip="' + LABEL.cannotOpretion + '"'; 
			return Soul.util.GridRendererUtil.getUnsupportMgrInnerBox();
		}
	},
	
	getUserName : function(val, u,r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
			var icon = '';
			if (r.data.type == "user")
				icon = '<img src="/img/icon/user.png"/>';
			else if (r.data.type == "app")
				icon = '<img src="/img/icon/view.png"/>';
			return icon + '<a style="cursor:pointer;text-decoration:underline;font-style:italic;" onclick="Module.Hyscan.User.Tools.showUserInEast(\''+ r.data.id  +'\',event);">' + val + '</a>';
		} else
			return val;
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Hyscan.User.model.UserModel;
   	}
});