Ext.define('Module.Hyscan.Tenant.Opt', {
    singleton: true,

    requires: ["Ext.ux.Rixo.form.field.GridPicker"],


    createEditWin: function (tenant, cb) {

        Ext.define('UDModel', {
            extend: 'Ext.data.Model',
            fields: [
                "id", "nick", "fullName", "result"
            ]
        });

        var store = new Ext.data.Store({
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
                    read: '/admin/user-detail/'
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
            model: "UDModel"
        });

        var adminCombox = Ext.widget('gridpicker', {
            queryMode: 'remote',
            typeAhead: true,
            labelAlign: 'right',
            fieldLabel: HYSCAN_LABLE.admin,
            store: store,
            displayField: 'fullName',
            valueField: "id",
            name: "adminId",
            allowBlank: false,
            gridConfig: {
                hideHeaders: false,
                columns: [
                    {header: HYSCAN_LABLE.loginName, dataIndex: 'nick', menuDisabled: true},
                    {header: HYSCAN_LABLE.fullName, dataIndex: 'fullName', menuDisabled: true}
                ],

                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        Ext.create("Ext.PagingToolbar", {
                            dock: 'bottom',
                            store: store,
                            displayInfo: true,
                            emptyMsg: LABEL.emptyMsg
                        })
                    ]
                }],
                store: store
            }
        });

        var appData = [];
        Ext.Object.each(APPID_VIEW, function (key, value) {
            appData.push({
                key: key, name: value
            })
        });

        var appStore = Ext.create('Ext.data.Store', {
            fields: ['key', 'name'],
            data: appData
        });

        var form = Ext.create("Ext.form.Panel", {
            labelWidth: 60,
            frame: true,
            width: 400,
            maxHeight: 500,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false,
                width: 350
            },
            items: [{
                name: 'name',
                fieldLabel: TENANT_PROPERTY.name
            }, adminCombox, {
                name: 'description',
                xtype: 'textareafield',
                grow: true,
                fieldLabel: TENANT_PROPERTY.description
            }, {
                name: 'serials',
                xtype: 'textareafield',
                blankText: HYSCAN_LABLE.serialsBlankText,
                grow: true,
                regex: /^[0123456789ABCDEFabcdef]+(,[0123456789ABCDEFabcdef]+)*$/,
                regexText: HYSCAN_LABLE.serialsReg,
                fieldLabel: TENANT_PROPERTY.serials
            }, {
                name: 'appIds',
                xtype: 'combo',
                allowBlank: false,
                store: appStore,
                queryMode: 'local',
                displayField: 'name',
                multiSelect: true,
                valueField: 'key',
                fieldLabel: "APP"
            }]
        });

        var title = HYSCAN_LABLE.addTenant;
        var method = "post";
        var url = "/admin/tenant/";
        if (tenant) {
            title = HYSCAN_LABLE.editTenant;
            method = "put";
            url += tenant.id;
            form.getForm().setValues(tenant);
            adminCombox.setValue(tenant.adminName);
            form.down("[name=appIds]").setValue(tenant.appIds.split(","));
        }
        var win = new Ext.Window({
            title: title,
            items: [form],
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: LABEL.save,
                handler: function () {
                    if (!form.getForm().isValid()) return;
                    var params = form.getForm().getValues();
                    if (typeof(params.adminId) === "string") {
                        if (tenant) {
                            params.adminId = tenant.adminId;
                            params.adminName = tenant.adminName;
                        }
                    } else {
                        var record = adminCombox.findRecordByValue(adminCombox.getValue());
                        params.adminName = record.data.fullName;
                    }
                    params.appIds = params.appIds.join(",");
                    // console.log(params);
                    // return;
                    Soul.Ajax.request({
                        url: url,
                        method: method,
                        jsonData: params,
                        loadMask: HYSCAN_LABLE.processing,
                        successMsg: HYSCAN_LABLE.saveComplete,
                        success: function () {
                            win.close();
                            cb();
                        }
                    })
                }
            }]
        });
        win.show();
    }


});
