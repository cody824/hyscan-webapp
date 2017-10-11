Ext.define('Module.Hyscan.ScanTask.view.DataGrid', {
	//extend : 'Soul.view.SearchGrid',
	extend : 'Ext.grid.Panel',
	alias : 'widget.noticegrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Hyscan.ScanTask.Data',
		'Module.Hyscan.ScanTask.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
	
	task : null,
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Hyscan.ScanTask.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
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
					return '<span data-qtip="'+ v +'">' + show + '%</span>';
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
		//me.contextMenu = Module.Hyscan.ScanTask.Tools.buildParamOptMenu();
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					
				}
			}
		});
		
		var paramFields = ["wavelength", "dn", 'reflectivity', 'radiance', 'rmPacketLine', 'darkCurrent', 'whiteboardData'];
	
		
		var paramStore = new Ext.create('Ext.data.Store', {
			storeId : 'paramStore',
			fields : paramFields
		});

		
		Ext.apply(this, {
			selModel: sm,
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
			        	me.portlet.gotoView("Module.Hyscan.ScanTask.view.Grid", null, me.portlet);
		        	}
		        }]
		    }],
			store : paramStore,
			columns : columns
		});
		this.loadData();
		this.callParent(arguments);
	},
	
	loadData : function(){
		var me = this;
		var tools = Module.Hyscan.ScanTask.Tools;
		if (me.task != null) {
			Soul.Ajax.request({
				url : '/app/scanTask/data/' + me.task.id,
				loadMask : '数据载入中',
				success : function(ret){
					var range = ret.range;
					var wavelength = [];
					for (var i = range[0]; i < range[1]; i++) {
						wavelength.push(1.9799 * i - 934.5831);
			        }
					var radiance = tools.getRadiance(ret.dn, ret.radianceConfig[0], ret.radianceConfig[1]);
					var reflectivity = tools.getReflectivity(ret.dn, ret.darkCurrent, ret.whiteboardData);
					var rmPacketLine = tools.getRmPacketLine(ret.dn, wavelength, reflectivity);

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
					me.portlet.gotoView("Module.Hyscan.ScanTask.view.Grid", null, me.portlet);
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
        
        var callbackFun = function(){
			me.loadData(me);
		};

//		var sm = me.selModel;
//		var editparamItem = me.contextMenu.down('menuitem[name=editparam]');
//		var addparamItem = me.contextMenu.down('menuitem[name=addparam]');
//		var delparamItem = me.contextMenu.down('menuitem[name=delparam]');
//		
//		var createIndex = me.portlet.down('menuitem[name=createIndex]');
//		var editIndex = me.portlet.down('menuitem[name=editIndex]');
//		var delIndex = me.portlet.down('menuitem[name=delIndex]');
//		
//        
//		var editparamFunc = function(item, e, eOpts){
//			var records = sm.getSelection();
//        	Module.Hyscan.ScanTask.Operation.showEditWin(records[0], callbackFun);
//        };
//        editparamItem.on('click', editparamFunc);
//        editIndex.on('click', editparamFunc);
//
//        var addparamFunc = function(e, eOpts){
//        	Module.Hyscan.ScanTask.Operation.showEditWin(null, callbackFun);
//        };
//        addparamItem.on('click', addparamFunc);
//        createIndex.on('click', addparamFunc);
//
//        var delparamFunc = function(item, e, eOpts){
//        	var records = sm.getSelection();
//        	Module.Hyscan.ScanTask.Operation.doDelIndex(records[0], callbackFun);
//        };
//        delparamItem.on('click', delparamFunc);
//        delIndex.on('click', delparamFunc);
    }
});
