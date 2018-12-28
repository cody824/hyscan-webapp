Ext.define('Module.Hyscan.User.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [ 'fullName', 'email', 'mobile'],

	getRendererConfig : function() {
		var ret = {
				registdate : Module.Hyscan.User.Renderer.translateCtime,
            updatedate: Module.Hyscan.User.Renderer.translateCtime
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
