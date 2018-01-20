Ext.define('Module.Hyscan.MaterialAlgo.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Hyscan.MaterialAlgo.Tools'
  	],
  	
	constructor : function() {
        this.callParent(arguments);
   	}
});