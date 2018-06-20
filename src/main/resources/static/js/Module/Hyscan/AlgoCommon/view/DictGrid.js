Ext.define('Module.Hyscan.AlgoCommon.view.DictGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Module.Hyscan.MaterialConfig.Data',
        'Module.Hyscan.MaterialConfig.Renderer',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    itemcontextmenuFunction: function (view, record, htmlElement, index, event, eopts) {
        event.preventDefault();
        var me = this;
        if (me.contextMenu != null)
            me.contextMenu.showAt(event.getXY());
    },

    initComponent: function () {
        var columns = new Array();
        var renders = Module.Hyscan.MaterialConfig.Renderer;
        columns.push(
            new Ext.grid.RowNumberer(),
            {
                text: "数据类型", flex: 1, sortable: false,
                menuDisabled: true, dataIndex: 'dataType', align: 'center'
            },
            {
                text: "数值", flex: 1, sortable: false,
                menuDisabled: true, dataIndex: 'key', align: 'center'
            },
            {
                text: "显示值", flex: 1, dataIndex: 'value',
                menuDisabled: true, align: 'center'
            }
        );

        var me = this;
        me.contextMenu = me.buildOptMenu();
        var sm = new Ext.selection.CheckboxModel({
            mode: 'SINGLE',
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();

                    var rightEI = me.contextMenu.down('menuitem[name=editIndex]');
                    var rightDI = me.contextMenu.down('menuitem[name=delIndex]');
                    var editIndex = me.down('menuitem[name=editIndex]');
                    var delIndex = me.down('menuitem[name=delIndex]');
                    if (sm2.getCount() == 1) {
                        rightEI.enable();
                        rightDI.enable();
                        editIndex.enable();
                        delIndex.enable();
                    } else {
                        rightEI.disable();
                        rightDI.disable();
                        editIndex.disable();
                        delIndex.disable();
                    }
                }
            }
        });

        var paramFields = [];
        paramFields.push('dataType');
        paramFields.push('key');
        paramFields.push('value');


        var paramStore = new Ext.create('Ext.data.Store', {
            storeId: 'paramStore',
            fields: paramFields
        });


        Ext.apply(this, {
            selModel: sm,
            viewConfig: {
                emptyText: "没有字典配置"
            },
            store: paramStore,
            columns: columns,
            dockedItems: [{
                dock: 'top',
                xtype: 'toolbar',
                items: me.initToolbar()
            }],
            listeners: {
                itemcontextmenu: me.itemcontextmenuFunction
            }
        });
        this.loadData();
        this.callParent(arguments);
    },

    loadData: function () {
        var me = this;
        var configUrl = '/globalconfig/resultDict/' + me.appId + '?fetch=true';

        Soul.Ajax.request({
            url: configUrl,
            successMsg: '载入成功',
            success: function (ret) {
                if (ret != null) {
                    var paramData = [];
                    Ext.Object.each(ret, function (k, v, self) {
                        var param = {};
                        if (k.indexOf(me.dataType) != 0) {
                            return;
                        }
                        var keys = k.split('.');
                        param['dataType'] = keys[0];
                        param['key'] = keys[1];
                        param['value'] = v;
                        paramData.push(param);
                    });
                    me.store.loadData(paramData);
                }
            }
        });
    },


    initToolbar: function () {
        var me = this,
            toolbar = new Array();
        var paramCombox = {
            text: "操作",
            icon: '/img/icon/show.png',
            menu: this.buildOptMenu()
        };
        toolbar.push(paramCombox);
        return toolbar;
    },

    buildOptMenu: function () {
        var menu = Ext.create('Ext.menu.Menu', {
            name: 'modeloperation',
            style: {
                overflow: 'visible'
            },
            items: [{
                text: "新建索引",
                disabled: false,
                name: 'createIndex',
                iconCls: 'x-add-icon'
            }, {
                text: "编辑索引",
                disabled: true,
                name: 'editIndex',
                iconCls: 'extensive-edit'
            }, {
                text: "删除索引",
                disabled: true,
                name: 'delIndex',
                iconCls: 'x-del-icon'
            }]
        });
        return menu;
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        var callbackFun = function () {
            me.loadData(me);
        };

        var sm = me.selModel;
        var editparamItem = me.contextMenu.down('menuitem[name=editIndex]');
        var addparamItem = me.contextMenu.down('menuitem[name=createIndex]');
        var delparamItem = me.contextMenu.down('menuitem[name=delIndex]');

        var createIndex = me.down('menuitem[name=createIndex]');
        var editIndex = me.down('menuitem[name=editIndex]');
        var delIndex = me.down('menuitem[name=delIndex]');


        var editparamFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            Module.Hyscan.AlgoCommon.Opt.showEditWin(records[0], me.appId, me.dataType, callbackFun);
        };
        editparamItem.on('click', editparamFunc);
        editIndex.on('click', editparamFunc);

        var addparamFunc = function (e, eOpts) {
            Module.Hyscan.AlgoCommon.Opt.showEditWin(null, me.appId, me.dataType, callbackFun);
        };
        addparamItem.on('click', addparamFunc);
        createIndex.on('click', addparamFunc);

        var delparamFunc = function (item, e, eOpts) {
            var records = sm.getSelection();
            Module.Hyscan.AlgoCommon.Opt.doDelIndex(records[0], me.appId, me.dataType, callbackFun);
        };
        delparamItem.on('click', delparamFunc);
        delIndex.on('click', delparamFunc);
    }
});
