Ext.define('Module.Hyscan.MaterialScanTask.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.wqstportlet',
	
	requires  : [
		'Module.Hyscan.MaterialScanTask.Operation',
		'Module.Hyscan.MaterialScanTask.Data',
        'Module.Hyscan.Public.Opt'
 	],
 		
 	VIEW : {
        'Module.Hyscan.MaterialScanTask.view.Panel' : '表格模式',
		'Module.Hyscan.MaterialScanTask.view.DataGrid' : '数据信息'
	},
    
	title: "材质检测扫描任务",

	iconCls : 'md-MaterialScanTask',
	
	moduleName : 'Module.Hyscan.MaterialScanTask',
    
    moduleSessionView : 'Module.Hyscan.MaterialScanTaskCurrentView',
    
    dataObj : Module.Hyscan.MaterialScanTask.Data,
    
    configObj : Module.Hyscan.MaterialScanTask.Config,
	
    defaultView : 'Module.Hyscan.MaterialScanTask.view.Panel',
	
    supportView :['Module.Hyscan.MaterialScanTask.view.Panel', 'Module.Hyscan.MaterialScanTask.view.DataGrid'],
    
    havUpdateButton : false,
    
	initComponent : function() {
    	this.callParent(arguments);
	},

    buildDataOptMenu : function(){
        var menu = Ext.create('Ext.menu.Menu', {
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
        return menu;
    },

	doExport : function(){
		var me = this;
		var view = me.currentView;
		var item = me.getComponent(me.id + '-' + me.currentView);
		if (view == "Module.Hyscan.MaterialScanTask.view.Panel") {
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
					model : model
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
		var me = this;
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