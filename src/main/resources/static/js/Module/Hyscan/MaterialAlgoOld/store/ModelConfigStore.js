Ext.define('Module.Hyscan.MaterialAlgo.store.ModelConfigStore', {
	extend	: 'Ext.data.ArrayStore',
	
	fields	 : ["model", "desc", "radianceParams", "spectralRange", "wavelengths", "olderLevelNormData", "materialNormData", "materialThreshold"]
});