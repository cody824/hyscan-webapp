Ext.define('Module.Hyscan.ModelConfig.store.ModelConfigStore', {
	extend	: 'Ext.data.ArrayStore',
	
	fields	 : ["model", "desc", "radianceParams", "spectralRange", "wavelengths", "olderLevelNormData", "materialNormData", "materialThreshold"]
});