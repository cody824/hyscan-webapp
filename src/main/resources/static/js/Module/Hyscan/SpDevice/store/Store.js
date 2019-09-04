Ext.define('Module.Hyscan.SpDevice.store.Store', {
    singleton: true,
    extend: 'Ext.data.Store',
    requires: [
        'Module.Hyscan.SpDevice.model.Model',
    ],

    model: 'Module.Hyscan.SpDevice.model.Model',
    storeId: 'Module.Hyscan.SpDevice.store.Store',
    proxy: {
        type: 'rest',
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            Accept: 'application/json'
        },
        extraParams: {
            filter: {}
        },
        api: {
            read: '/admin/spDevice/'
        },
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        },
        listeners: {
            exception: function (theproxy, response, operation, options) {
                Soul.util.MessageUtil.parseResponse(response);
            }
        }
    },
    remoteSort: true,
    listeners: {
        load: function (store, records, successful, operation, eOpts) {
        }
    }
});