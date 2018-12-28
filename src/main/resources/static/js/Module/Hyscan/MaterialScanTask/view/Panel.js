Ext.define('Module.Hyscan.MaterialScanTask.view.Panel', {
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
            url : '/app/materialAlgoConfig/',
            successMsg: HYSCAN_LABLE.loadComplete,
            method : 'get',
            success : function(ret){
                if (ret.length > 0) {
                    me.tabs.removeAll(true);
                    var customColumns = [];
                    customColumns.push({
                        text: HYSCAN_LABLE.agingLevel,
                        dataIndex : 'level',
                        align : 'center',
                        searchType : 'number',
                        width : 80
                    });
                    customColumns.push({
                        text: HYSCAN_LABLE.material,
                        dataIndex: 'material',
                        searchType: 'string',
                        align: 'center',
                        width: 100
                    });

                	Ext.each(ret, function(mac){
                		var grid = Ext.create('Module.Hyscan.Public.view.ScanTaskGrid', {
                            customColumns : customColumns,
                            appId : 'material',
                			title : mac.model
						});
                		me.tabs.add(grid);
					});
                	me.tabs.setActiveTab(0);
                } else {
                    me.tabs.add({
                        title: HYSCAN_LABLE.noConfig,
                        html: HYSCAN_LABLE.noConfigMsg
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