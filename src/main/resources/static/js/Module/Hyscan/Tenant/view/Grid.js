Ext.define('Module.Hyscan.Tenant.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Module.Hyscan.Tenant.Data',
        'Module.Hyscan.Tenant.Renderer',
        "Module.Hyscan.Tenant.Opt",
        'Module.Hyscan.Tenant.store.Store',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    initComponent: function () {
        var columns = [];
        var me = this;
        var callbackFun = function () {
            me.updateView(me);
        };
        var renders = Module.Hyscan.Tenant.Renderer;
        columns.push(
            // new Ext.grid.RowNumberer(),
            {
                text: "ID", sortable: true, dataIndex: 'id', searchType: 'number',
                width: 60
            },
            {
                text: "名称", width: 100, sortable: true, dataIndex: 'name', searchType: 'string'
            },
            {
                text: "说明", dataIndex: 'description', width: 200, searchType: 'string',
                renderer: Soul.util.RendererUtil.qtip
            },
            {
                text: "管理员", width: 100, searchType: 'string',
                sortable: false, menuDisabled: true, dataIndex: 'adminName'
            },
            {
                text: "设备序列号", width: 200, searchType: 'string', flex: 1,
                sortable: false, menuDisabled: true, dataIndex: 'serials',
                renderer: Soul.util.RendererUtil.qtip
            },
            {
                text: "支持APP", width: 200, searchType: 'string',
                sortable: false, menuDisabled: true, dataIndex: 'appIds',
                renderer: function (value, meta, record) {
                    if (value) {
                        var apps = value.split(",");
                        var ret = "";
                        Ext.each(apps, function (appId, index) {
                            if (index < (apps.length - 1)) {
                                ret += APPID_VIEW[appId] + " | "
                            } else {
                                ret += APPID_VIEW[appId]
                            }
                        });
                        return ret;
                    }
                }
            },
            {
                text: "编辑",
                xtype: 'actioncolumn',
                width: 60,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        icon: "/img/icon/fileoperation.png",
                        tooltip: '编辑租户属性',
                        scope: this,
                        handler: this.onEditClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    }]
            },
            {
                text: "删除",
                xtype: 'actioncolumn',
                width: 60,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        icon: "/img/icon/del.png",
                        tooltip: '删除',
                        scope: this,
                        handler: this.onDeleteClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    }]
            }
        );

        var sm = new Ext.selection.CheckboxModel({
            mode: 'SINGLE',
            listeners: {
                selectionchange: function (sm2) {

                }
            }
        });

        var me = this;

        me.contextMenu = me.portlet.buildUserOptMenu();
        Ext.apply(this, {
            selModel: sm,
            store: Ext.data.StoreManager.lookup("Module.Hyscan.Tenant.store.Store"),
            viewConfig: {
                emptyText: "没有租户"
            },
            columns: columns
        });
        this.callParent(arguments);
    },

    onEditClick: function (grid, rowIdx, colIdx, item, e, record, row) {
        var me = this;

        var callbackFn = function () {
            me.updateView(me);
        };

        Module.Hyscan.Tenant.Opt.createEditWin(record.data, callbackFn);
    },

    onSerialClick: function (grid, rowIdx, colIdx, item, e, record, row) {

    },

    onDeleteClick: function (grid, rowIdx, colIdx, item, e, record, row) {
        var me = this;
        Soul.Ajax.request({
            url: "/admin/tenant/" + record.data.id,
            method: "delete",
            confirm: "确认要删除租户吗？",
            successMsg: "删除成功",
            success: function () {
                me.updateView(me);
            }
        })
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        var callbackFn = function () {
            me.updateView(me);
        };

        me.addMenuHandler('add', function () {
            Module.Hyscan.Tenant.Opt.createEditWin(null, callbackFn);
        });

    }
});
