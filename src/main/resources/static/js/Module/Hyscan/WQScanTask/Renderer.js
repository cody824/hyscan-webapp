Ext.define('Module.Hyscan.WQScanTask.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Hyscan.WQScanTask.Tools'
  	],

	constructor : function() {
		this.config = {
			ctime : Soul.util.RendererUtil.getDateInfo2,
		};
		this.callParent(arguments);
	}

});