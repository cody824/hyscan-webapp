Ext.define('Module.Hyscan.User.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],
	
	showProperties : [ 'name', 'email', 'status', 'registAppId',
	               			'registdate', 'updatedate', 'field1', 'field2', 'field3', 'type',
	               			'source'],

	getRendererConfig : function() {
		var ret = {
				registdate : Module.Hyscan.User.Renderer.translateCtime,
				updatedate : Module.Hyscan.User.Renderer.translateCtime,
				status : Module.Hyscan.User.Renderer.translateIsStatus
		};
		return ret;
	},

	initConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
	}
});
