Ext.define('Module.Hyscan.Public.view.ScanTaskResultGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Module.Hyscan.Public.Tools'
    ],

    task: null,

    listView: null,

    initComponent: function () {
        var columns = [];
        columns.push(
            new Ext.grid.RowNumberer({
                width: 40
            }),
            {
                text: TASK_RESULT_PROPERTY.type, sortable: false,
                width: 80,
                menuDisabled: true, dataIndex: 'type', align: 'center',
                renderer: function (v) {
                    return TASK_RESULT_TYPE[v] || v;
                }
            },
            {
                text: TASK_RESULT_PROPERTY.source, width: 80, dataIndex: 'source',
                menuDisabled: true, align: 'center'
            },
            {
                text: TASK_RESULT_PROPERTY.use, width: 80, dataIndex: 'use',
                menuDisabled: true, align: 'center',
                renderer: Soul.util.RendererUtil.getBoolean
            },
            {
                text: TASK_RESULT_PROPERTY.addTime, width: 200, dataIndex: 'addTime',
                menuDisabled: true, align: 'center',
                renderer: Soul.util.RendererUtil.getDateInfo2
            },
            {
                text: HYSCAN_LABLE.setDefaultResult,
                xtype: 'actioncolumn',
                width: 80,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        icon: "/img/icon/setup.png",
                        tooltip: HYSCAN_LABLE.setDefaultResult,
                        scope: this,
                        handler: this.onSetDefaultClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    }]
            },
            {
                text: LABEL.del,
                xtype: 'actioncolumn',
                width: 60,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        icon: "/img/icon/del.png",
                        tooltip: LABEL.del,
                        scope: this,
                        handler: this.onDeleteClick,
                        isDisabled: function (v, r, c, item, r) {
                            return r.data.use
                        }
                    }]
            }
        );

        if (this.customColumns) {
            Ext.each(this.customColumns, function (column) {
                columns.push(column)
            })

        }

        var me = this;
        var paramFields = ["id", "source", 'use', 'taskId', 'type', 'addTime', "result0", "result1", "result2", "result3", "result4", "result5", "result6", "result7", "result8", "result9"];

        var paramStore = new Ext.create('Ext.data.Store', {
            storeId: 'paramStore',
            fields: paramFields
        });

        Ext.apply(this, {
            viewConfig: {
                enableTextSelection: true,
                emptyText: HYSCAN_LABLE.noResult
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    //     {
                    //     text: HYSCAN_LABLE.inputResult,
                    //     icon: '/img/icon/add.png',
                    //     handler: function () {
                    //
                    //     }
                    // },
                    {
                        text: HYSCAN_LABLE.calResult,
                        icon: '/img/icon/cal.png',
                        handler: function () {
                            Module.Hyscan.Public.Opt.calResultRet(me.task, function () {
                                me.loadData(me)
                            });
                        }
                    }]
            }],
            store: paramStore,
            columns: columns
        });
        this.callParent(arguments);
    },

    onSetDefaultClick: function (grid, rowIdx, colIdx, item, e, record, row) {
        var me = this;
        Soul.Ajax.request({
            url: "/app/scanTask/result/" + me.task.id + "/default",
            method: "post",
            params: {
                id: record.data.id
            },
            success: function () {
                me.loadData(me)
            }
        })
    },

    onDeleteClick: function (grid, rowIdx, colIdx, item, e, record, row) {
        var me = this;
        Soul.Ajax.request({
            url: "/admin/taskResult/" + record.data.id,
            method: "delete",
            confirm: HYSCAN_LABLE.confirmToDelTask,
            successMsg: HYSCAN_LABLE.delSuccess,
            success: function () {
                me.loadData(me)
            }
        })
    },

    loadData: function (scope) {
        var me = scope || this;
        var tools = Module.Hyscan.Public.Tools;
        if (me.task != null) {
            Soul.Ajax.request({
                url: '/app/scanTask/result/' + me.task.id,
                loadMask: HYSCAN_LABLE.loading,
                successMsg: HYSCAN_LABLE.loadComplete,
                success: function (ret) {
                    me.store.loadData(ret);
                },
                failure: function () {
                }
            });
        }
    },


    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.loadData()
    }
});
