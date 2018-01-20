Ext.define('Module.Hyscan.WQScanTask.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.wqstportlet',
	
	requires  : [
		'Module.Hyscan.WQScanTask.Operation',
		'Module.Hyscan.WQScanTask.Data',
        'Module.Hyscan.Public.Opt'
 	],
 		
 	VIEW : {
        'Module.Hyscan.WQScanTask.view.Panel' : '表格模式',
		'Module.Hyscan.Public.view.ScanTaskDataGrid' : '数据信息'
	},
    
	title: "水质监测扫描任务",

	iconCls : 'md-WQScanTask',
	
	moduleName : 'Module.Hyscan.WQScanTask',
    
    moduleSessionView : 'Module.Hyscan.WQScanTaskCurrentView',
    
    dataObj : Module.Hyscan.WQScanTask.Data,
    
    configObj : Module.Hyscan.WQScanTask.Config,
	
    defaultView : 'Module.Hyscan.WQScanTask.view.Panel',
	
    supportView :['Module.Hyscan.WQScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

    buildDataOptMenu : function(){
        return Ext.create('Ext.menu.Menu', {
            name : 'datapt',
            style: {
                overflow: 'visible'     // For the Combo popup
            },
            items: [
                {
                    text: "导出数据",
                    disabled:false,
                    name : 'exportData',
                    iconCls : 'export',
					handler : this.doExport,
					scope : this
                }
            ]
        });
    },

	doExport : function(){
		var me = this;
		var view = me.currentView;
		var item = me.getComponent(me.id + '-' + me.currentView);
		if (view == "Module.Hyscan.WQScanTask.view.Panel") {
			var grid = item.tabs.getActiveTab() || item.tabs.getComponent(0);
			if (grid == null) {
                Ext.Msg.alert("错误", "没有选择数据集");
				return;
			}
			var model = grid.title;
			var appId = "wq";
			var filter = grid.store.proxy.extraParams;
			console.log(model, filter);

            Soul.Ajax.request({
                url : '/app/scanTask/export/',
                successMsg : '压缩包生成完成',
				loadMask : "生成压缩包",
                params : {
					filter : filter,
					model : model,
                    appId : appId
				},
                timeout : 1000 * 60 * 10,
				method : 'post',
                success : function(ret){
                    Module.Hyscan.Public.Opt.showDownloadWin(ret);
                }
            });
		} else {
			var task = item.task;
            Soul.Ajax.request({
                url : '/app/scanTask/export/' + task.id,
                successMsg : '压缩包生成完成',
                loadMask : "生成压缩包",
                timeout : 1000 * 60 * 10,
                method : 'post',
                success : function(ret){
                    Module.Hyscan.Public.Opt.showDownloadWin(ret);
                }
            });
		}
	},

    initToolbar : function(){
		var toolbar = this.callParent(arguments),
            optMenu = {
                text: "操作",
                iconCls: 'pool_setting',
                menu: this.buildDataOptMenu()
            };

        toolbar.push(optMenu);
		return toolbar;
	}
});