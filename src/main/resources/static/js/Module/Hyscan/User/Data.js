Ext.define('Module.Hyscan.User.Data', {
    singleton: true, 
    
   	requires  : [
   		'Soul.Ajax',
   		'Soul.util.ObjectView'
   	],
   	
   	getUserByName : function(name){
   		var store = Ext.data.StoreManager.lookup("Module.Hyscan.User.store.UserStore");
   		var rs = store.data.items;
   		var user = null;
   		Ext.each(rs, function(r, i, s){
   			if (r.data.name == name) {
   				user = r.data;
   				return false;
   			}
   		});
   		return user;
   	},
   	
   	loadData : function(){
   		return;
   	},

   	updateAll : function(fn){
    	var callbackFn = function(){
    		Soul.Ajax.executeFnAfterLoad(fn);
    	};
    	callbackFn();
    },
        
	constructor : function() {
        this.callParent(arguments);
    }
    
});	
