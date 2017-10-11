Ext.define('Module.Hyscan.ModelConfig.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Hyscan.ModelConfig.Tools'
  	],
  	
	constructor : function() {
        this.callParent(arguments);
   	}
});