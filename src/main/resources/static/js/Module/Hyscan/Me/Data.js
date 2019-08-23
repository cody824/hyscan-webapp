Ext.define('Module.Hyscan.Me.Data', {
    singleton: true,

    requires: [
        'Soul.Ajax',
        'Soul.util.ObjectView'
    ],

    loadData: function () {

    },

    updateAll: function (fn) {
        var callbackFn = function () {
            Soul.Ajax.executeFnAfterLoad(fn);
        };
        callbackFn();
    },

    constructor: function () {
        this.callParent(arguments);
    }

});	
