Ext.define('Module.Hyscan.Public.TaskPortlet', {
    extend: 'Soul.view.ModulePortlet',
    alias: 'widget.hyscantaskportlet',

    requires: ["Module.Hyscan.Public.Opt"],

    havUpdateButton: false,

    appId: null,

    initComponent: function () {
        this.callParent(arguments);
    },

    buildDataOptMenu: function () {
        var me = this;
        return Ext.create('Ext.menu.Menu', {
            name: 'datapt',
            style: {
                overflow: 'visible'     // For the Combo popup
            },
            items: [
                {
                    text: HYSCAN_LABLE.exportJsonDataFile,
                    disabled: false,
                    name: 'exportData',
                    icon: "/img/icon/json.png",
                    handler: function () {
                        me.doExport("json");
                    },
                    scope: this
                },
                {
                    text: HYSCAN_LABLE.exportTxtDataFile,
                    disabled: false,
                    name: 'exportData',
                    icon: "/img/icon/txt.png",
                    handler: function () {
                        me.doExport("txt");
                    },
                    scope: this
                },
                {
                    text: HYSCAN_LABLE.exportExcelDataFile,
                    disabled: false,
                    name: 'exportData',
                    icon: "/img/icon/excel.png",
                    handler: function () {
                        me.doExport("excel");
                    },
                    scope: this
                }
            ]
        });
    },

    doExport: function (type) {
        var me = this;
        var view = me.currentView;
        var item = me.getComponent(me.id + '-' + me.currentView);
        if (Ext.String.endsWith(view, ".view.Panel")) {
            var grid = item.tabs.getActiveTab() || item.tabs.getComponent(0);
            if (grid == null) {
                Ext.Msg.alert(LABEL.error, HYSCAN_LABLE.noSelectDataSet);
                return;
            }
            var model = grid.title;
            var appId = me.appId;
            var filter = grid.store.proxy.extraParams;

            Soul.Ajax.request({
                url: '/app/scanTask/export/',
                successMsg: HYSCAN_LABLE.buildZipComplete,
                loadMask: HYSCAN_LABLE.buildZip,
                params: {
                    exportType: type,
                    filter: filter,
                    model: model,
                    appId: appId
                },
                timeout: 1000 * 60 * 10,
                method: 'post',
                success: function (ret) {
                    Module.Hyscan.Public.Opt.showDownloadWin(ret);
                }
            });
        } else {
            var task = item.task;
            Soul.Ajax.request({
                url: '/app/scanTask/export/' + task.id,
                successMsg: HYSCAN_LABLE.buildZipComplete,
                loadMask: HYSCAN_LABLE.buildZip,
                timeout: 1000 * 60 * 10,
                params: {
                    exportType: type,
                },
                method: 'post',
                success: function (ret) {
                    Module.Hyscan.Public.Opt.showDownloadWin(ret);
                }
            });
        }
    },

    initToolbar: function () {
        var toolbar = this.callParent(arguments),
            optMenu = {
                text: LABEL.operation,
                iconCls: 'pool_setting',
                menu: this.buildDataOptMenu()
            };

        toolbar.push(optMenu);
        return toolbar;
    }
});