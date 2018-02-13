Ext.define('Module.Hyscan.ModelConfig.store.ModelConfigStore', {
	extend	: 'Ext.data.ArrayStore',

    fields: ["model", "desc", "dnMaxValue", "radianceParams", "spectralRange", "wavelengths", "olderLevelNormData", "materialNormData", "materialThreshold"]
});