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
            fieldLabel: "管理员",
            store: store,
            displayField: 'fullName',
            valueField: "id",
            name: "adminId",
            allowBlank: false,
            gridConfig: {
                hideHeaders: false,
                columns: [
                    {header: '登录名', dataIndex: 'nick', menuDisabled: true},
                    {header: '昵称', dataIndex: 'fullName', menuDisabled: true}
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

        var appStore = Ext.create('Ext.data.Store', {
            fields: ['key', 'name'],
            data: [
                {"key": "caizhi", "name": "Hyscan"},
                {"key": "shuise", "name": "水色"},
                {"key": "meise", "name": "煤色"},
                {"key": "nongse", "name": "农色"}
            ]
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
                fieldLabel: "名称"
            }, adminCombox, {
                name: 'description',
                xtype: 'textareafield',
                grow: true,
                fieldLabel: "备注"
            }, {
                name: 'serials',
                xtype: 'textareafield',
                blankText: '中间用","隔开',
                grow: true,
                regex: /^\d+(,\d+)*$/,
                regexText: '序列号都是数字，多个序列号中间用","隔开',
                fieldLabel: "设备序列号"
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

        var title = "新建租户";
        var method = "post";
        var url = "/admin/tenant/";
        if (tenant) {
            title = "编辑租户";
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
                text: "保存",
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
                        loadMask: "处理中",
                        successMsg: "保存成功",
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
