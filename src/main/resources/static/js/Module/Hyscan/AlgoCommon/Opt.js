Ext.define('Module.Hyscan.AlgoCommon.Opt', {
    singleton: true,

    requires: [
        'Soul.util.HelpUtil',
        'Soul.util.ObjectView',
        'Soul.view.WizardWindow',
        'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox'
    ],

    views: [],

    showDictWin: function (appId, dataType) {
        var dictGrid = Ext.create('Module.Hyscan.AlgoCommon.view.DictGrid', {
            width: 500,
            height: 400,
            appId: appId,
            dataType: dataType
        });
        var win = new Ext.Window({
            title: HYSCAN_LABLE["dictEdit"],
            items: dictGrid,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center'
        });
        win.show();
    },

    showEditWin: function (record, appId, dataType, callback) {
        var configType = "resultDict";
        var formpanel = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            width: 500,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                width: 400,
                allowBlank: false
            },
            items: [{
                name: 'dataType',
                fieldLabel: HYSCAN_LABLE["dataType"],
                value: dataType,
                readOnly: true
            }, {
                name: 'key',
                xtype: 'numberfield',
                fieldLabel: HYSCAN_LABLE["value"],

            }, {
                name: 'value',
                fieldLabel: HYSCAN_LABLE["showValue"]
            }]
        });
        if (record != null) {
            formpanel.down('[name=key]').setReadOnly(true);
        }
        record = record || {data: {}};
        record.data.dataType = dataType;

        formpanel.getForm().setValues(record.data);

        var win = new Ext.Window({
            title: HYSCAN_LABLE["dictEdit"],
            items: formpanel,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: LABEL.save,
                handler: function () {
                    if (!formpanel.getForm().isValid()) return;

                    var params = formpanel.getForm().getValues();
                    params.key = params.dataType + "." + params.key;

                    Soul.Ajax.request({
                        url: '/globalconfig/' + configType + '/' + appId + "/",
                        method: 'post',
                        params: {
                            value: params.value,
                            key: params.key
                        },
                        success: function () {
                            callback();
                            win.close();
                        }
                    });
                }
            }, {
                text: LABEL.cancel,
                handler: function () {
                    win.close();
                }
            }]
        });

        win.show();
    },

    doDelIndex: function (record, appId, dataType, callback) {

        Soul.Ajax.request({
            url: '/globalconfig/resultDict/' + appId + '?key=' + record.data.dataType + "." + record.data.key,
            method: 'delete',
            confirm: HYSCAN_LABLE["deleteConfig"],
            headers: {
                Accept: 'application/json'
            },
            success: function (response, opts) {
                callback();
            }
        });
    }
});