Ext.define('Module.Hyscan.Public.view.ScanTaskDataGrid', {
	extend : 'Ext.grid.Panel',

	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Hyscan.Public.Tools'
	],
	
	task : null,

	listView : null,
	
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
                text: TASK_DATA_PROPERTY.dn, flex: 1, dataIndex: 'dn',
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
			fields : paramFields
		});

		
		Ext.apply(this, {
			viewConfig : {
			enableTextSelection:true,
                emptyText: HYSCAN_LABLE.pleaseSelectTask
			},
			dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        items: [{
                    text: HYSCAN_LABLE.backToTaskList,
		            handler : function(){
			        	me.portlet.gotoView(me.portlet.defaultView, null, me.portlet);
		        	}
		        }]
		    }],
			store : paramStore,
			columns : columns
		});
		this.loadData();
		this.callParent(arguments);
	},
	
	loadData : function(scope){
		var me =  scope || this;
		var tools = Module.Hyscan.Public.Tools;
		if (me.task != null) {
            me.setTitle(HYSCAN_LABLE.taskData + "[" + me.task.id + "]");
			Soul.Ajax.request({
				url : '/app/scanTask/data/' + me.task.id,
                loadMask: HYSCAN_LABLE.loading,
                successMsg: HYSCAN_LABLE.loadComplete,
				success : function(ret){
					var range = ret.range;
					var wavelength = [];
                    for (var i = range[0]; i <= range[1]; i++) {
						wavelength.push(1.9799 * i - 934.5831);
			        }
					var radiance = tools.getRadiance(ret.dn, ret.radianceConfig[0], ret.radianceConfig[1]);
					var reflectivity = tools.getReflectivity(ret.dn, ret.darkCurrent, ret.whiteboardData);
                    var refForRm = [];
                    for (var i = 0; i < reflectivity.length; i++) {
                        refForRm.push(reflectivity[i])
                    }
                    var rmPacketLine = tools.getRmPacketLine(ret.dn, wavelength, refForRm);
					var datas = [];
					for (var i = 0; i < wavelength.length; i++){
						var data = {};
						data.wavelength = wavelength[i];
						data.dn = ret.dn[i];
						data.darkCurrent = ret.darkCurrent[i];
						data.whiteboardData = ret.whiteboardData[i];
						data.reflectivity = reflectivity[i];
						data.radiance = radiance[i];
						data.rmPacketLine = rmPacketLine[i];
						datas.push(data);//<Number
					}
					me.store.loadData(datas);
				},
				failure : function(){
                    me.portlet.gotoView(me.portlet.defaultView, null, me.portlet);
				}
			});
		} 
	},
	
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        if (me.task == null) {
            Soul.uiModule.Message.msg(HYSCAN_LABLE.notice, HYSCAN_LABLE.pleaseSelectTask);
            me.portlet.gotoView(me.portlet.defaultView, null, me.portlet);
        }
    },

    updateView: function (scope) {
        var me = scope || this;
        me.loadData();
    }
});
