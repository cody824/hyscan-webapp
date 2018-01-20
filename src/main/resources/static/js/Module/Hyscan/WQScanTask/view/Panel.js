Ext.define('Module.Hyscan.WQScanTask.view.Panel', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn'
    ],

    customFilter : [],


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

    loadResult : function(){
        var me = this;
        Soul.Ajax.request({
            url : '/app/wdAlgoConfig/',
            successMsg : '载入完成',
            method : 'get',
            success : function(ret){
                if (ret.length > 0) {
                    me.tabs.removeAll(true);
                	Ext.each(ret, function(wdac){
                        var customColumns = [];
                        Ext.Object.each(wdac.wdAlgos, function (key, value) {
                            value.chineseName = value.chineseName.replace(new RegExp("&nbsp;","gm"), " ");
                            value.unit = value.unit.replace(new RegExp("&nbsp;","gm"), " ");
                            customColumns.push({
                                text : value.chineseName,
                                dataIndex : "result" + value.seq,
                                align : 'center',
                                searchType : 'number',
                                width : 80,
                                seq : value.seq,
                                renderer : function(v){
                                    return parseFloat(v).toFixed(parseInt(value.decimal)) + value.unit;
                                }
                            });
                        })
                        customColumns = Ext.Array.sort(customColumns, function (a, b) {
                            return a.seq > b.seq;
                        })
                		var grid = Ext.create('Module.Hyscan.Public.view.ScanTaskGrid', {
                			title : wdac.model,
                            appId : 'wq',
                            customColumns : customColumns
						});
                		me.tabs.add(grid);
					});
                	me.tabs.setActiveTab(0);
                } else {
                    me.tabs.add({
                        title  : "没有配置",
                        html : "没有型号配置存在"
                    });
                    me.tabs.setActiveTab(0);
                }
            }
        });
	},

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.loadResult();
    }
});