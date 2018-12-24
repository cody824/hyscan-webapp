Ext.define('Module.Hyscan.Statistics.store.Store', {
    singleton: true,
    extend: 'Ext.data.Store',
    requires: [
        'Module.Hyscan.Statistics.model.Model',
    ],

    model: 'Module.Hyscan.Statistics.model.Model',
    storeId: 'Module.Hyscan.Statistics.store.Store',
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
            read: '/admin/tenant/'
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

