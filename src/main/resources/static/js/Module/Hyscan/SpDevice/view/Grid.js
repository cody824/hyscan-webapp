Ext.define('Module.Hyscan.SpDevice.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Module.Hyscan.SpDevice.Data',
        'Module.Hyscan.SpDevice.store.Store',
        'Module.Hyscan.SpDevice.Opt',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    initComponent: function () {
        var columns = new Array();
        var me = this;

        columns.push(new Ext.grid.RowNumberer());

        columns.push({
            text: SPDEVICE_PROPERTY['serial'], sortable: true, dataIndex: 'serial', searchType: 'string', flex: 1,
            width: 100
        });

        columns.push({
            text: SPDEVICE_PROPERTY['address'], sortable: true, dataIndex: 'address', searchType: 'string',
            width: 150
        });

        columns.push({
            text: SPDEVICE_PROPERTY['firmware'], sortable: true, dataIndex: 'firmware', searchType: 'string',
            width: 80
        });

        columns.push({
            text: SPDEVICE_PROPERTY['model'], sortable: true, dataIndex: 'model', searchType: 'string',
            width: 60
        });


        columns.push({
                text: HYSCAN_LABLE.spSetup,
                xtype: 'actioncolumn',
                width: 100,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        icon: '/img/icon/setup.png',
                        tooltip: '编辑',
                        name: 'view',
                        scope: this,
                        hidden: true,
                        handler: this.onSpConfigClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    }]
            },
            {
                text: "删除",
                xtype: 'actioncolumn',
                width: 65,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        icon: '/img/icon/del.png',
                        tooltip: '删除',
                        name: 'view',
                        scope: this,
                        hidden: true,
                        handler: this.onDeleteClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    }]
            })


        var sm = new Ext.selection.CheckboxModel({
            mode: 'SINGLE',
            listeners: {
                selectionchange: function (sm2) {
                    var records = sm2.getSelection();
                    var itemsR = me.contextMenu.query('menuitem[needSelect=true]');
                    var items = me.portlet.query('menuitem[needSelect=true]');

                    var mitemsR = me.contextMenu.query('menuitem[needSelectM=true]');
                    var mitems = me.portlet.query('menuitem[needSelectM=true]');
                    if (records.length == 1) {
                        Ext.each(items, function (item) {
                            item.enable();
                        });
                        Ext.each(itemsR, function (item) {
                            item.enable();
                        });
                        Ext.each(mitemsR, function (item) {
                            item.enable();
                        });
                        Ext.each(mitems, function (item) {
                            item.enable();
                        });
                    } else if (records.length > 1) {
                        Ext.each(mitemsR, function (item) {
                            item.enable();
                        });
                        Ext.each(mitems, function (item) {
                            item.enable();
                        });
                        Ext.each(items, function (item) {
                            item.disable();
                        });
                        Ext.each(itemsR, function (item) {
                            item.disable();
                        });
                    } else {
                        Ext.each(items, function (item) {
                            item.disable();
                        });
                        Ext.each(itemsR, function (item) {
                            item.disable();
                        });
                        Ext.each(mitemsR, function (item) {
                            item.disable();
                        });
                        Ext.each(mitems, function (item) {
                            item.disable();
                        });
                    }
                }
            }
        });

        me.contextMenu = me.portlet.buildOptMenu();
        Ext.apply(this, {
            selModel: sm,
            store: Ext.data.StoreManager.lookup("Module.Hyscan.SpDevice.store.Store"),
            viewConfig: {
                enableTextSelection: true,
                emptyText: "没有数据"
            },
            columns: columns
        });
        this.callParent(arguments);
    },


    onSpConfigClick: function (grid, rowIdx, colIdx, item, e, record, row) {
        Soul.Ajax.request({
            url: '/admin/spDevice/' + record.data.serial,
            method: 'get',
            loadMask: LABEL.load,
            success: function (ret) {
                if (ret) {
                    Module.Hyscan.SpDevice.Opt.showSpConfig(ret);
                } else {
                    Ext.Msg.alert(LABEL.warn, HYSCAN_LABLE.noSpConfig);
                }
            }
        })
    },

    onEditClick: function (grid, rowIdx, colIdx, item, e, record, row) {
        var me = this;
        var callbackFn = function () {
            me.updateView(me);
        };
        Module.Hyscan.SpDevice.Opt.addEditWin(record.data, callbackFn);
    },

    onDeleteClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var me = this;
        var callbackFn = function () {
            me.updateView(me);
        };
        Module.Hyscan.SpDevice.Opt.delete(record.data, callbackFn);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var sm = me.selModel;

        var callbackFn = function () {
            me.updateView(me);
            sm.deselectAll();
        };

        var sm = me.selModel;

        // me.addMenuHandler('add', function () {
        //     Module.Hyscan.SpDevice.Opt.addEditWin(null, callbackFn);
        // });
        //
        // me.addMenuHandler('edit', function () {
        //     var records = sm.getSelection();
        //     Module.Hyscan.SpDevice.Opt.addEditWin(records[0].data, callbackFn);
        // });

        me.addMenuHandler("delete", function () {
            var records = sm.getSelection();
            Module.Hyscan.SpDevice.Opt.delete(records[0].data, callbackFn);
        })
    }
});