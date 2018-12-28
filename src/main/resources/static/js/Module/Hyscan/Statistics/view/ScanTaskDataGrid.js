Ext.define('Module.Hyscan.Statistics.view.ScanTaskDataGrid', {
	extend : 'Ext.grid.Panel',

	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
        'Module.Hyscan.Public.Opt'
	],
	
	task : null,

    listView: null,
	
	initComponent : function() {
        var columns = [];
		columns.push(
            new Ext.grid.RowNumberer({
                width: 40
            }),
			{
                text: TASK_DATA_PROPERTY.wavelength, flex: 1, sortable: false,
				menuDisabled:true, dataIndex: 'wavelength', align : 'center',
				renderer : function(v){
					//return v;
					var show = Ext.Number.toFixed(parseFloat(v), 2);
					return '<span data-qtip="'+ v +'">' + show + 'nm</span>';
				}
			},
			{
				text: "DN", flex:1, dataIndex:'dn', 
				menuDisabled:true, align : 'center'
			},
			{
                text: TASK_DATA_PROPERTY.reflectivity, flex: 1, dataIndex: 'reflectivity',
				menuDisabled:true, align : 'center',
				renderer : function(v){
					var show = Ext.Number.toFixed(parseFloat(v), 2);
                    return '<span data-qtip="' + v + '">' + show + '</span>';
				}
			},
			{
                text: TASK_DATA_PROPERTY.radiance, flex: 1, dataIndex: 'radiance',
				menuDisabled:true, align : 'center'
			},
			{
                text: TASK_DATA_PROPERTY.rmPacketLine, flex: 1, dataIndex: 'rmPacketLine',
				menuDisabled:true, align : 'center',
				renderer : function(v){
					var show = Ext.Number.toFixed(parseFloat(v), 2);
					return '<span data-qtip="'+ v +'">' + show + '</span>';
				}
			},
			{
                text: TASK_DATA_PROPERTY.darkCurrent, flex: 1, dataIndex: 'darkCurrent',
				menuDisabled:true, align : 'center'
			},
			{
                text: TASK_DATA_PROPERTY.whiteboardData, flex: 1, dataIndex: 'whiteboardData',
				menuDisabled:true, align : 'center'
			}
		);
		
		var me = this;
		var paramFields = ["wavelength", "dn", 'reflectivity', 'radiance', 'rmPacketLine', 'darkCurrent', 'whiteboardData'];
	
		
		var paramStore = new Ext.create('Ext.data.Store', {
			storeId : 'paramStore',
            fields: paramFields,
            data: me.data
		});

		
		Ext.apply(this, {
			viewConfig : {
			enableTextSelection:true,
                emptyText: HYSCAN_LABLE.pleaseSelectTask
			},
            store: paramStore,

            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
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
            }],
			columns : columns
		});
		this.callParent(arguments);
	},

    doExport: function (type) {
        var me = this;
        Soul.Ajax.request({
            url: '/app/scanTask/export/' + me.task.id,
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
    },

});
