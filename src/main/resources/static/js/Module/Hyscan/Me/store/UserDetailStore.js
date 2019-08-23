Ext.define('Module.Hyscan.Me.store.UserDetailStore', {
    singleton: true,
    extend: 'Ext.data.Store',
    requires: [
        'Module.Hyscan.Me.model.UserDetailModel',
    ],

    model: 'Module.Hyscan.Me.model.UserDetailModel',
    storeId: 'Module.Hyscan.Me.store.UserDetailStore',
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
            read: '/user-detail/'
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

