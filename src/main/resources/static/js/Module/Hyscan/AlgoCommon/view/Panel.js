Ext.define('Module.Hyscan.AlgoCommon.view.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Ext.tab.*',
        'Ext.ux.TabCloseMenu'
    ],

    initComponent: function () {
        var tabs = Ext.createWidget('tabpanel', {
            activeTab: 0,
            defaults: {
                // bodyPadding: 10
            },
            items: [{
                title: HYSCAN_LABLE["noConfig"],
                html: HYSCAN_LABLE["noConfigMsg"]
            }]
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

    loadWgAlgoConfig: function () {
        var me = this;

        Soul.Ajax.showLoadBar(HYSCAN_LABLE.algoLoading);

        Soul.Ajax.request({
            url: '/app/algo-config/',
            successMsg: HYSCAN_LABLE["loadComplete"],
            quiet: true,
            method: 'get',
            failure: function () {
                Soul.Ajax.hideLoadBar();
            },
            success: function (ret) {
                Soul.Ajax.hideLoadBar();
                if (ret.length > 0) {
                    me.tabs.removeAll(true);
                    Ext.each(ret, function (algoConfig) {
                        if (me.appId == algoConfig.appId) {
                            var grid = Ext.create('Module.Hyscan.AlgoCommon.view.Grid', {
                                appId: algoConfig.appId,
                                wdItems: algoConfig.algos,
                                title: algoConfig.model
                            });
                            me.tabs.add(grid);
                        }
                    });
                }
                Soul.Ajax.showLoadBar(HYSCAN_LABLE.modelLoading);
                Soul.Ajax.request({
                    url: '/app/modelConfig/',
                    successMsg: HYSCAN_LABLE["loadComplete"],
                    quiet: true,
                    method: 'get',
                    failure: function () {
                        Soul.Ajax.hideLoadBar();
                    },
                    success: function (models) {
                        Soul.Ajax.hideLoadBar();
                        if (models.length > 0) {
                            if (ret.length == 0)
                                me.tabs.removeAll(true);

                            Ext.each(models, function (mc) {
                                var exist = false;
                                Ext.each(ret, function (wdac) {
                                    if (mc.model == wdac.model && wdac.appId == me.appId) {
                                        exist = true;
                                        return false;
                                    }
                                });
                                if (!exist) {
                                    var grid = Ext.create('Module.Hyscan.AlgoCommon.view.Grid', {
                                        appId: me.appId,
                                        title: mc.model
                                    });
                                    me.tabs.add(grid);
                                }
                            })

                        }

                    }
                });

            }
        });
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.loadWgAlgoConfig();
    }
});