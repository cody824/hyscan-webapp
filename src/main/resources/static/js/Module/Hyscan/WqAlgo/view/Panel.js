Ext.define('Module.Hyscan.WqAlgo.view.Panel', {
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
                // bodyPadding: 10
            },
            items: [{
                title  : "没有配置",
                html : "没有型号配置存在"
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

    loadWgAlgoConfig : function(){
        var me = this;
        Soul.Ajax.request({
            url : '/app/wdAlgoConfig/',
            successMsg : '载入完成',
            method : 'get',
            success : function(ret){
                // me.store.loadData(ret);
                if (ret.length > 0) {
                    me.tabs.removeAll(true);
                    Ext.each(ret, function(wdac){
                        var grid = Ext.create('Module.Hyscan.WqAlgo.view.Grid', {
                            wdItems : wdac.wdAlgos,
                            title : wdac.model
                        });
                        me.tabs.add(grid);
                        // grid.loadData(wdac.wdAlgos);
                    });

                }
                Soul.Ajax.request({
                    url : '/app/modelConfig/',
                    successMsg : '载入完成',
                    method : 'get',
                    success : function (models) {
                        if (models.length > 0){
                            if (ret.length == 0)
                                me.tabs.removeAll(true);

                            Ext.each(models, function (mc) {
                                var exist = false;
                                Ext.each(ret, function(wdac){
                                    if (mc.model == wdac.model){
                                        exist = true;
                                        return false;
                                    }
                                });
                                if (!exist) {
                                    var grid = Ext.create('Module.Hyscan.WqAlgo.view.Grid', {
                                        title : mc.model
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