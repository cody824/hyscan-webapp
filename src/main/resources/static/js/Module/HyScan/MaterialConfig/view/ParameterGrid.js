Ext.define('Module.Hyscan.MaterialConfig.view.ParameterGrid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.noticegrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Hyscan.MaterialConfig.Data',
		'Module.Hyscan.MaterialConfig.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
	
	initComponent : function() {
		var columns = new Array();
		var renders = Module.Hyscan.MaterialConfig.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
				text: "索引",flex:1, sortable: false, 
				menuDisabled:true, dataIndex: 'key', align : 'center'
			},
			{
				text: "材料", flex:1, dataIndex:'value', 
				menuDisabled:true, align : 'center'
			}
		);
		
		var me = this;
		me.contextMenu = Module.Hyscan.MaterialConfig.Tools.buildParamOptMenu();
		var sm = new Ext.selection.CheckboxModel({
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					
					rightEI = me.contextMenu.down('menuitem[name=editparam]');
					rightDI = me.contextMenu.down('menuitem[name=delparam]');
					var editIndex = me.portlet.down('menuitem[name=editIndex]');
					var delIndex = me.portlet.down('menuitem[name=delIndex]');
					if (sm2.getCount() == 1) {
						rightEI.enable();
						rightDI.enable();
						editIndex.enable();
						delIndex.enable();
					} else {
						rightEI.disable();
						rightDI.disable();
						editIndex.disable();
						delIndex.disable();
					}
				}
			}
		});
		
		var paramFields = [];
		paramFields.push('key');
		paramFields.push('value');
	
		
		var paramStore = new Ext.create('Ext.data.Store', {
			storeId : 'paramStore',
			fields : paramFields
		});

		
		Ext.apply(this, {
			selModel: sm,
			viewConfig : {
				emptyText : PARAMETER_MESSAGE.noParameter
			},
			store : paramStore,
			columns : columns
		});
		this.loadData();
		this.callParent(arguments);
	},
	
	loadData : function(){
		var me = this;
		var configUrl = '/globalconfig/materialConfig/hyscan?fetch=true';
	
		Soul.Ajax.restAction(configUrl, 'get', null, null, function(ret){
			console.log(ret);
			var paramData = [];
			Ext.Object.each(ret, function(k, v, self) {
				var param = {};
				param['key'] = k;
				param['value'] = v;
				paramData.push(param);
			});
			me.store.loadData(paramData);
	
		}, null, null);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
        
        var callbackFun = function(){
			me.loadData(me);
		};

		var sm = me.selModel;
		var editparamItem = me.contextMenu.down('menuitem[name=editparam]');
		var addparamItem = me.contextMenu.down('menuitem[name=addparam]');
		var delparamItem = me.contextMenu.down('menuitem[name=delparam]');
		
		var createIndex = me.portlet.down('menuitem[name=createIndex]');
		var editIndex = me.portlet.down('menuitem[name=editIndex]');
		var delIndex = me.portlet.down('menuitem[name=delIndex]');
		
        
		var editparamFunc = function(item, e, eOpts){
			var records = sm.getSelection();
        	Module.Hyscan.MaterialConfig.Operation.showEditWin(records[0], callbackFun);
        };
        editparamItem.on('click', editparamFunc);
        editIndex.on('click', editparamFunc);

        var addparamFunc = function(e, eOpts){
        	Module.Hyscan.MaterialConfig.Operation.showEditWin(null, callbackFun);
        };
        addparamItem.on('click', addparamFunc);
        createIndex.on('click', addparamFunc);

        var delparamFunc = function(item, e, eOpts){
        	var records = sm.getSelection();
        	Module.Hyscan.MaterialConfig.Operation.doDelIndex(records[0], callbackFun);
        };
        delparamItem.on('click', delparamFunc);
        delIndex.on('click', delparamFunc);
    }
});
