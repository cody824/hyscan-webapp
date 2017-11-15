Ext.define('Module.Hyscan.ScanTask.Config', {
	singleton : true,

	requires : [ 'Soul.util.RendererUtil' ],

	COMBO_DATA : {},

	getRendererConfig : function() {
		var ret = {};
		return ret;
	},

	initConfig : function() {
	},

	buildComboConfig : function() {
	},

	constructor : function() {
		this.callParent(arguments);
		this.buildComboConfig();
	}
});