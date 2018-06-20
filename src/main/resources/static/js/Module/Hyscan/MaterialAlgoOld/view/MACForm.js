Ext.define('Module.Hyscan.MaterialAlgo.view.MACForm', {
    extend: 'Ext.form.Panel',

    requires: [
        // 'Module.Archive.storeage.store.StoreStore',
        // 'Module.Archive.storeage.Config'
    ],

    uses: [
        // 'Module.Archive.storeage.store.StoreStore'
    ],

    frame: true,
    // title: '',
    labelAlign: 'center',
    labelWidth: 90,
    waitMsgTarget: true,
    trackResetOnLoad: true,
    defaults: {
        xtype: 'textfield',
        labelAlign: 'right',
        allowBlank: false,
        width: 400
    },
    items: [
        {
            name: 'olderLevelNormData',
            xtype: 'textarea',
            allowBlank: false,
            fieldLabel: "标准光谱数据"
        }, {
            name: 'materialThreshold',
            xtype: 'numberfield',
            allowBlank: false,
            fieldLabel: "材料检测阈值"
        }, {
            // Fieldset in Column 1 - collapsible via toggle button
            xtype: 'fieldset',
            columnWidth: 0.5,
            title: '材质光谱数据',
            collapsible: true,
            defaultType: 'textarea',
            defaults: {anchor: '100%'},
            layout: 'anchor',
            items: [{
                xtype: 'fieldcontainer',
                fieldLabel: '',
                labelWidth: 100,
                layout: 'hbox',
                items: [{
                    name: 'materialNormData',
                    xtype: 'textarea',
                    allowBlank: false,
                    flex: 1
                }, {
                    xtype: 'splitter'
                }, {
                    iconCls: 'x-add-icon',
                    xtype: 'button',
                    handler: function (addBtn) {
                        var formpanel = addBtn.up('form');

                        formpanel.down('fieldset').add({
                            xtype: 'fieldcontainer',
                            fieldLabel: '',
                            labelWidth: 100,
                            layout: 'hbox',
                            items: [{
                                name: 'materialNormData',
                                xtype: 'textarea',
                                flex: 1
                            }, {
                                xtype: 'splitter'
                            }, {
                                iconCls: 'x-del-icon',
                                xtype: 'button',
                                handler: function (delBtn) {
                                    var cner = delBtn.up('fieldcontainer');
                                    var fset = delBtn.up('fieldset');
                                    fset.remove(cner);
                                }
                            }]
                        })
                    }

                }]
            }]
        }
    ],

    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                icon: "/img/icon/save.png",
                text: '保存配置',
                formBind: true, //only enabled once the form is valid
                disabled: true,
                handler: function () {
                    var me = this;
                    var params = this.up('form').getForm().getValues();
                    var form = this.up('form').getForm();
                    var formPanel = this.up('form');
                    if (form.isValid()) {
                        if (!form.isDirty()) {
                            Soul.uiModule.Message.msg("", "没有变化");
                            //me.disable();
                            return;
                        }


                    }

                    var dataNum = formPanel.model.wavelengths.length;
                    params.model = formPanel.model.model;


                    var olderLevelNormData = [];
                    if (Ext.isArray(params.olderLevelNormData)) {
                        for (var i = 0; i < params.olderLevelNormData.length; i++) {
                            var strs = params.olderLevelNormData[i];
                            var array = strs.split(',');
                            if (dataNum != array.length) {
                                Soul.util.MessageUtil.showErrorInfo("错误", "数据长度不正确，请检查后再次提交");
                                return;
                            }
                            olderLevelNormData.push(array);
                        }
                    } else {
                        var array = params.olderLevelNormData.split(',');
                        if (dataNum != array.length) {
                            Soul.util.MessageUtil.showErrorInfo("错误", "数据长度不正确，请检查后再次提交");
                            return;
                        }
                        olderLevelNormData.push(array);
                    }
                    params.olderLevelNormData = olderLevelNormData;

                    var materialNormData = [];
                    if (Ext.isArray(params.materialNormData)) {
                        for (var i = 0; i < params.materialNormData.length; i++) {
                            var strs = params.materialNormData[i];
                            var array = strs.split(',');
                            materialNormData.push(array);
                            if (dataNum != array.length) {
                                Soul.util.MessageUtil.showErrorInfo("错误", "数据长度不正确，请检查后再次提交");
                                return;
                            }
                        }
                    } else {
                        var array = params.materialNormData.split(',');
                        materialNormData.push(array);
                        if (dataNum != array.length) {
                            Soul.util.MessageUtil.showErrorInfo("错误", "数据长度不正确，请检查后再次提交");
                            return;
                        }
                    }
                    params.materialNormData = materialNormData;
                    Soul.Ajax.request({
                        url: '/app/materialAlgoConfig/',
                        method: 'post',
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            Accept: 'application/json'
                        },
                        jsonData: params,
                        success: function (response, opts) {
                        },
                        failure: function (response, opts) {
                            console.log('server-side failure with status code ' + response.status);
                        }

                    });

                }
            }, {
                icon: "/img/icon/reset.png",
                text: '重置',
                handler: function () {
                    this.up('form').getForm().reset();
                }
            }]
        }
    ],

    loadData: function () {
        var me = this;
        var form = me.getForm();
        form.setValues(me.data);
        if (me.data && me.data.materialNormData && me.data.materialNormData.length > 1) {
            for (var i = 1; i < me.data.materialNormData.length; i++) {
                me.down('fieldset').add({
                    xtype: 'fieldcontainer',
                    fieldLabel: '',
                    labelWidth: 100,
                    layout: 'hbox',
                    items: [{
                        name: 'materialNormData',
                        xtype: 'textarea',
                        value: record.data.materialNormData[i],
                        flex: 1
                    }, {
                        xtype: 'splitter'
                    }, {
                        iconCls: 'x-del-icon',
                        xtype: 'button',
                        handler: function (delBtn) {
                            var cner = delBtn.up('fieldcontainer');
                            var fset = delBtn.up('fieldset');
                            fset.remove(cner);
                        }
                    }]
                })
            }
        }
    },

    afterRender: function () {
        this.callParent(arguments);
        this.loadData();
    }
});