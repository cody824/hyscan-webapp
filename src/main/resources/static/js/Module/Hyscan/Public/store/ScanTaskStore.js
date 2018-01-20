Ext.define('Module.Hyscan.Public.store.ScanTaskStore', {
	extend	: 'Ext.data.Store',
	requires  : [
		'Module.Hyscan.Public.model.ScanTaskModel'
	],
	model	 : 'Module.Hyscan.Public.model.ScanTaskModel',
	initFilter : false,
	proxy: {
		type: 'rest',
		headers : {
			"Content-Type": "application/json; charset=utf-8", 
			Accept : 'application/json'
		},
		extraParams : {
			filter : {}
		},
		api: {
			read: '/app/scanTask/'
		},
		reader: {
			type: 'json',
			root: 'data',
			totalProperty : 'total'
		},
		listeners:{
			exception:function( theproxy, response, operation, options ){
				Soul.util.MessageUtil.parseResponse(response);
			}
		}
	}, 
	remoteSort: true,
	listeners:{
		load : function(store, records, successful, operation, eOpts){
			
		}
	}
});