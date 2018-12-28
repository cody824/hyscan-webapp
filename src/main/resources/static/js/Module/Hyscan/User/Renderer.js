Ext.define('Module.Hyscan.User.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Hyscan.User.Tools',
 		'Module.Hyscan.User.model.UserModel'
  	],

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
	
	getUserName : function(val, u,r, rowIndex, columnIndex, s) {
		if (val != null && val.length > 0) {
            var icon = '<img src="/img/icon/user.png"/>';
			return icon + '<a style="cursor:pointer;text-decoration:underline;font-style:italic;" onclick="Module.Hyscan.User.Tools.showUserInEast(\''+ r.data.id  +'\',event);">' + val + '</a>';
		} else
			return val;
	},
	
	constructor : function() {
        this.callParent(arguments);
        this.UM = Module.Hyscan.User.model.UserModel;
   	}
});