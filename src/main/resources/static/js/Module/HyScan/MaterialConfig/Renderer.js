Ext.define('Module.Hyscan.MaterialConfig.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Hyscan.MaterialConfig.Tools'
  	],
  	
	translateCtime : function(v){
		if (v == null || v == '')
			return '';
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},

	constructor : function() {
        this.callParent(arguments);
   	}
});