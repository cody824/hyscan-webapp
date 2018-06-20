Ext.define('Module.Hyscan.MaterialAlgo.view.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        // 'Module.Archive.system.Data',
        // 'Module.Archive.system.Renderer',
        'Soul.util.ObjectView',
        'Ext.tab.*',
        'Ext.ux.TabCloseMenu'
    ],

    initComponent: function () {
        var tabs = Ext.createWidget('tabpanel', {
            activeTab: 0,
            defaults: {
                bodyPadding: 10
            },
            items: [{
                title: "没有配置",
                html: "没有型号配置存在"
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
        Soul.Ajax.request({
            url: '/app/materialAlgoConfig/',
            successMsg: '载入完成',
            method: 'get',
            success: function (ret) {
                Soul.Ajax.request({
                    url: '/app/modelConfig/',
                    successMsg: '载入完成',
                    method: 'get',
                    success: function (models) {
                        if (models.length > 0) {
                            me.tabs.removeAll(true);
                            Ext.each(models, function (mc) {
                                var exist = null;
                                Ext.each(ret, function (mac) {
                                    if (mc.model == mac.model) {
                                        exist = mac;
                                        return false;
                                    }
                                });
                                if (exist == null) {
                                    var grid = Ext.create('Module.Hyscan.MaterialAlgo.view.MACForm', {
                                        title: mc.model,
                                        model: mc
                                    });
                                    me.tabs.add(grid);
                                } else {
                                    var grid = Ext.create('Module.Hyscan.MaterialAlgo.view.MACForm', {
                                        data: exist,
                                        title: mc.model,
                                        model: mc
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