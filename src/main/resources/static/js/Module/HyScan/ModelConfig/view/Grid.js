Ext.define('Module.Hyscan.ModelConfig.view.Grid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn'
    ],

    itemcontextmenuFunction : function(view,record,htmlElement,index,event,eopts){
		event.preventDefault();
		var me = this;
		if (me.contextMenu != null)
			me.contextMenu.showAt(event.getXY());
	},


    initComponent: function () {
		var me = this;
        var columns = new Array();
        columns.push(
        		new Ext.grid.RowNumberer(),
            {
                text: "型号",
                dataIndex: 'model',
                align: 'center',
                width: 100
            },{
                text: "说明",
	            dataIndex: 'desc',
	            align: 'center',
	            fix : 1,
	            width: 200
	        }, {
                text: "辐亮度参数",
	            dataIndex: 'radianceParams',
	            align: 'center',
	            width: 100
	        },{
                text: "坐标范围",
	            dataIndex: 'spectralRange',
	            align: 'center',
	            width: 100
	        },{
	            text: "波长范围",
	            dataIndex: 'wavelengths',
	            align: 'center',
	            width: 150
	        }, {
	            text: "标准光谱数据",
	            dataIndex: 'olderLevelNormData',
	            align: 'center',
	            width: 150
	        }, {
                text: "材质光谱数据",
	            dataIndex: 'materialNormData',
	            align: 'center',
	            width: 150
	        }, {
                text: "材质检测阈值",
	            dataIndex: 'materialThreshold',
	            align: 'center',
	            width: 100
	        }, {
                text: "删除",
	            xtype: 'actioncolumn',
	            width: 100,
	            sortable : false,
	            editor: false,
	            align: 'center',
	            items: [{
	                icon: '/img/icon/del.png',
	                tooltip: '删除',
	                name: 'view',
	                scope: this,
	                handler: this.onGoodsClick,
	                isDisabled: function (v, r, c, item, r) {
	                }
	            }]
	        }
        );
        
		var sm = new Ext.selection.CheckboxModel({
		    listeners: {
		        selectionchange: function (sm2) {
		            var records = sm2.getSelection();
		            
		    		var editModelR = me.contextMenu.down('menuitem[name=editModel]');
		    		var delModelR = me.contextMenu.down('menuitem[name=delModel]');
		    		
		    		var editModel = me.portlet.down('menuitem[name=editModel]');
		    		var delModel = me.portlet.down('menuitem[name=delModel]');
		            
		            if (records.length > 0){
		            	delModel.enable();
		            	delModelR.enable();
		            	if (records.length == 1){
		            		editModel.enable();
		            		editModelR.enable();
		            	} else {
		            		editModel.disable();
		            		editModelR.disable();
		            	}
		            } else {
		            	editModelR.disable();
		            	delModelR.disable();
		            	editModel.disable();
		            	delModel.disable();
		            }
		            	
		        }
		    }
		});
		me.contextMenu = me.portlet.buildModelOptMenu();
        var store = Ext.create('Module.Hyscan.ModelConfig.store.ModelConfigStore');
        Ext.apply(this, {
        	selModel: sm,
            columns: columns,
            viewConfig: {
                emptyText: "没有配置型号",
                enableTextSelection:true  
            },
            store: store,
			listeners : {
				itemcontextmenu : me.itemcontextmenuFunction
			}
        });
        me.reload();
        this.callParent(arguments);
    },

    onGoodsClick : function(view ,rowIndex, colIndex, item, e, record, row){
    	var me = this;
    	var opt = Module.Hyscan.ModelConfig.Operation;
    	opt.doRemoveModel([record], function () {
		    me.reload();
		    me.selModel.deselectAll();
		});
		
    },

    reload : function(){
    	var me = this;
		Soul.Ajax.request({
			url : '/app/modelConfig/',
			successMsg : '载入完成',
			method : 'get',
			success : function(ret){
				me.store.loadData(ret);
			}
		});
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        
        var opt = Module.Hyscan.ModelConfig.Operation;

		var sm = me.selModel;
		var callbackFn = function () {
		    me.reload();
		    sm.deselectAll();
		};
		
		var createModelR = me.contextMenu.down('menuitem[name=createModel]');
		var editModelR = me.contextMenu.down('menuitem[name=editModel]');
		var delModelR = me.contextMenu.down('menuitem[name=delModel]');
		
		var createModel = me.portlet.down('menuitem[name=createModel]');
		var editModel = me.portlet.down('menuitem[name=editModel]');
		var delModel = me.portlet.down('menuitem[name=delModel]');
		
		createModel.on('click', function(){
			opt.editModelWin(null, callbackFn);
		});
		createModelR.on('click', function(){
			opt.editModelWin(null, callbackFn);
		});
		
		editModel.on('click', function(){
			var records = sm.getSelection();
			opt.editModelWin(records[0], callbackFn);
		});
		editModelR.on('click', function(){
			var records = sm.getSelection();
			opt.editModelWin(records[0], callbackFn);
		});
        
		delModel.on('click', function(){
			var records = sm.getSelection();
			opt.doRemoveModel(records, callbackFn)
		});
		delModelR.on('click', function(){
			var records = sm.getSelection();
			opt.doRemoveModel(records, callbackFn)
		});

    }
});