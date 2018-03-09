Ext.define('Module.Hyscan.Public.view.ScanTaskDataGrid', {
	extend : 'Ext.grid.Panel',

	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Hyscan.WQScanTask.Renderer',
		'Module.Hyscan.Public.Tools'
	],
	
	task : null,

	listView : null,
	
	initComponent : function() {
		var columns = new Array();
		columns.push(
            new Ext.grid.RowNumberer({
                width: 40
            }),
			{
				text: "波长",flex:1, sortable: false, 
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
				text: "反射率", flex:1, dataIndex:'reflectivity', 
				menuDisabled:true, align : 'center',
				renderer : function(v){
					var show = Ext.Number.toFixed(parseFloat(v), 2);
                    return '<span data-qtip="' + v + '">' + show + '</span>';
				}
			},
			{
				text: "辐亮度", flex:1, dataIndex:'radiance', 
				menuDisabled:true, align : 'center'
			},
			{
				text: "去除包格线", flex:1, dataIndex:'rmPacketLine', 
				menuDisabled:true, align : 'center',
				renderer : function(v){
					var show = Ext.Number.toFixed(parseFloat(v), 2);
					return '<span data-qtip="'+ v +'">' + show + '</span>';
				}
			},
			{
				text: "暗电流", flex:1, dataIndex:'darkCurrent', 
				menuDisabled:true, align : 'center'
			},
			{
				text: "白板数据", flex:1, dataIndex:'whiteboardData', 
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
				emptyText : "请选择任务"
			},
			dockedItems: [{
		        xtype: 'toolbar',
		        dock: 'top',
		        items: [{
		            text: '返回任务列表',
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
			Soul.Ajax.request({
				url : '/app/scanTask/data/' + me.task.id,
				loadMask : '数据载入中',
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
        	Soul.uiModule.Message.msg('提示', '请返回选择任务');
        }
    }
});
