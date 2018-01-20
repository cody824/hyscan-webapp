Ext.define('Module.Hyscan.MaterialScanTask.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Hyscan.MaterialScanTask.Tools'
  	],

	constructor : function() {
		this.config = {
			ctime : Soul.util.RendererUtil.getDateInfo2,
		};
		this.callParent(arguments);
	}

});