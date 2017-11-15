Ext.define('Module.Hyscan.User.store.UserStore', {
	singleton : true,
    extend    : 'Ext.data.Store',
    requires  : [
    	'Module.Hyscan.User.model.UserModel',
    ],
    
    model     : 'Module.Hyscan.User.model.UserModel',
    storeId   : 'Module.Hyscan.User.store.UserStore',
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
        	read: '/security/user/'
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

