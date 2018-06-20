Ext.define('Module.Hyscan.Public.view.ScanTaskPanel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn'
    ],

    customFilter: [],


    initComponent: function () {
        var tabs = Ext.createWidget('tabpanel', {
            activeTab: 0
        });

        Ext.apply(this, {
            layout: 'fit',
            items: [
                tabs
            ]
        });
        this.tabs = tabs;
        this.callParent(arguments);
    },

    loadResult: function (dict) {
        var me = this;
        Soul.Ajax.request({
            url: '/app/algo-config/',
            successMsg: '载入完成',
            method: 'get',
            success: function (ret) {
                if (ret.length > 0) {
                    me.tabs.removeAll(true);
                    Ext.each(ret, function (wdac) {
                        if (wdac.appId != me.appId) {
                            return true;
                        }
                        var customColumns = [];
                        Ext.Object.each(wdac.algos, function (key, value) {
                            value.chineseName = value.chineseName.replace(new RegExp("&nbsp;", "gm"), " ");
                            value.unit = value.unit.replace(new RegExp("&nbsp;", "gm"), " ");
                            var column = {
                                text: value.chineseName,
                                dataIndex: "result" + value.seq,
                                align: 'center',
                                searchType: 'number',
                                width: 80,
                                seq: value.seq,
                                renderer: function (v) {
                                    var dictValue = null;
                                    if (dict[value.key] && dict[value.key][v]) {
                                        dictValue = dict[value.key][v];
                                    }
                                    return dictValue || parseFloat(v).toFixed(parseInt(value.decimal)) + value.unit;
                                }
                            };
                            if (dict[value.key]) {
                                column.searchType = 'combo';
                                var comboData = [];
                                Ext.Object.each(dict[value.key], function (key, value) {
                                    var data = [key, value];
                                    comboData.push(data);
                                });
                                column.comboData = comboData
                            }
                            customColumns.push(column);
                        })
                        customColumns = Ext.Array.sort(customColumns, function (a, b) {
                            return a.seq > b.seq;
                        })
                        var grid = Ext.create('Module.Hyscan.Public.view.ScanTaskGrid', {
                            title: wdac.model,
                            appId: me.appId,
                            customColumns: customColumns
                        });
                        me.tabs.add(grid);
                    });
                    me.tabs.setActiveTab(0);
                } else {
                    me.tabs.add({
                        title: "没有配置",
                        html: "没有型号配置存在"
                    });
                    me.tabs.setActiveTab(0);
                }
            }
        });
    },

    loadDict: function (cb) {
        var me = this;
        var configUrl = '/globalconfig/resultDict/' + me.appId + '?fetch=true';

        Soul.Ajax.request({
            url: configUrl,
            quiet: true,
            success: function (ret) {
                var dict = {};
                if (ret != null) {
                    Ext.Object.each(ret, function (k, v, self) {
                        var keys = k.split('.');
                        dict[keys[0]] = dict[keys[0]] || {};
                        dict[keys[0]][keys[1]] = v;
                    });
                }
                cb(dict);
            }
        });
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.loadDict(function (dict) {
            me.loadResult(dict);
        })
    }
});