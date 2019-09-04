Ext.define('Module.Hyscan.SpDevice.Opt', {
    singleton: true,

    addEditWin: function (spDevice, cb) {

        var items = [];

        items.push({
            name: 'address',
            fieldLabel: SPDEVICE_PROPERTY['address']
        });

        items.push({
            name: 'firmware',
            fieldLabel: SPDEVICE_PROPERTY['firmware']
        });

        items.push({
            name: 'model',
            fieldLabel: SPDEVICE_PROPERTY['model']
        });


        var formPanel = new Ext.FormPanel({
            labelWidth: 60,
            frame: true,
            width: 500,
            maxHeight: 800,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false,
                width: 400
            },
            items: items
        });
        var name = "SpDevice";
        var title = "新建" + name;
        var method = "post";
        var url = "/spDevice/"
        if (spDevice) {
            formPanel.getForm().setValues(spDevice);
            title = "编辑" + name;
            method = "put";
            url += spDevice['serial'];
        }

        var win = new Ext.Window({
            title: title,
            items: formPanel,
            stateful: false,
            autoDestroy: true,
            maxHeight: 500,
            overflowY: 'auto',
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: LABEL.save,
                handler: function () {
                    if (!formPanel.getForm().isValid()) return;
                    var params = formPanel.getForm().getValues();
                    Soul.Ajax.request({
                        url: url,
                        method: method,
                        loadMask: true,
                        jsonData: params,
                        success: function (response, opts) {
                            win.close();
                            if (typeof cb == "function")
                                cb();
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

    delete: function (spDevice, cb) {
        Soul.Ajax.request({
            url: '/admin/spDevice/' + spDevice.serial,
            method: 'delete',
            confirm: "确认要删除吗？",
            success: function (response, opts) {
                if (typeof cb == "function")
                    cb();
            }
        });
    },

    showSpConfig: function (spDevice) {

        var formPanel = new Ext.FormPanel({
            frame: true,
            width: 500,
            maxHeight: 800,
            layout: 'column',//重点
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: true,
                columnWidth: .99,
                labelWidth: 65,
                anchor: '90%'
                // width: 350
            },
            items: [{
                name: 'darkCurrent',
                xtype: 'textarea',
                allowBlank: false,
                readOnly: true,
                height: 200,

                fieldLabel: TASK_DATA_PROPERTY.darkCurrent
            }, {
                name: 'whiteboardData',
                xtype: 'textarea',
                allowBlank: false,
                readOnly: true,
                height: 200,
                fieldLabel: TASK_DATA_PROPERTY.whiteboardData
            }]
        });

        formPanel.getForm().setValues(spDevice);

        var win = new Ext.Window({
            title: HYSCAN_LABLE.spSetup,
            items: formPanel,
            stateful: false,
            layout: 'fit',
            autoDestroy: true,
            maxHeight: 500,
            overflowY: 'auto',
            bodyStyle: 'padding:5px',
            modal: true,
        });

        win.show();


    }
});