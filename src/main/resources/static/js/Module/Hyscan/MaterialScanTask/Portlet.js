Ext.define('Module.Hyscan.MaterialScanTask.Portlet', {
	extend : 'Soul.view.ModulePortlet',
	alias : 'widget.wqstportlet',
	
	requires  : [
		'Module.Hyscan.MaterialScanTask.Operation',
		'Module.Hyscan.MaterialScanTask.Data',
        'Module.Hyscan.Public.Opt'
 	],
 		
 	VIEW : {
        'Module.Hyscan.MaterialScanTask.view.Panel': LABEL.grid,
        'Module.Hyscan.Public.view.ScanTaskDataGrid': HYSCAN_LABLE.dataInfo
	},

    title: MODULE_NAME["Module.Hyscan.MaterialScanTask"],

	moduleName : 'Module.Hyscan.MaterialScanTask',
    
    moduleSessionView : 'Module.Hyscan.MaterialScanTaskCurrentView',
    
    dataObj : Module.Hyscan.MaterialScanTask.Data,
    
    configObj : Module.Hyscan.MaterialScanTask.Config,
	
    defaultView : 'Module.Hyscan.MaterialScanTask.view.Panel',
	
    supportView :['Module.Hyscan.MaterialScanTask.view.Panel', 'Module.Hyscan.Public.view.ScanTaskDataGrid'],
    
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
                    text: HYSCAN_LABLE.exportData,
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
		if (view == "Module.Hyscan.MaterialScanTask.view.Panel") {
			var grid = item.tabs.getActiveTab() || item.tabs.getComponent(0);
			if (grid == null) {
                Ext.Msg.alert(LABEL.error, HYSCAN_LABLE.noSelectDataSet);
				return;
			}
			var model = grid.title;
			var appId = "material";
			var filter = grid.store.proxy.extraParams;

            Soul.Ajax.request({
                url : '/app/scanTask/export/',
                successMsg: HYSCAN_LABLE.buildZipComplete,
                loadMask: HYSCAN_LABLE.buildZip,
                params : {
					filter : filter,
                    appId : appId,
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
                successMsg: HYSCAN_LABLE.buildZipComplete,
                loadMask: HYSCAN_LABLE.buildZip,
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
                text: LABEL.operation,
                iconCls: 'pool_setting',
                menu: this.buildDataOptMenu()
            };

        toolbar.push(optMenu);
		return toolbar;
	}
});