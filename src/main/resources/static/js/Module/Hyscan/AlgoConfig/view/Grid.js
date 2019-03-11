Ext.define('Module.Hyscan.AlgoConfig.view.Grid', {
	extend : 'Ext.grid.Panel',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Hyscan.AlgoConfig.Data',
		'Module.Hyscan.AlgoConfig.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
	
	itemcontextmenuFunction : function(view,record,htmlElement,index,event,eopts){
		event.preventDefault();
		var me = this;
		if (me.contextMenu != null)
			me.contextMenu.showAt(event.getXY());
	},

	initComponent : function() {
        var columns = [];
		var renders = Module.Hyscan.AlgoConfig.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{
                text: AC_PROPERTY.version, width: 150, sortable: false,
				menuDisabled:true, dataIndex: 'version', align : 'center'
			},
			{
                text: AC_PROPERTY.path, flex: 1, dataIndex: 'path',
				menuDisabled:true, align : 'center'
			},
			{
                text: AC_PROPERTY.name, flex: 1, dataIndex: 'name',
				menuDisabled:true, align : 'center'
			},
			{
                text: AC_PROPERTY.current, width: 100, dataIndex: 'current',
				menuDisabled:true, align : 'center',
				renderer : function(v){
                    var show = HYSCAN_LABLE.currentAlgo;
					if (!v){
						show = "";
					}
					return show;
				}
			},
			{
                text: AC_PROPERTY.valid, width: 80, dataIndex: 'valid',
				menuDisabled:true, align : 'center',
				renderer : function(v){
                    var show = HYSCAN_LABLE.valid;
					if (!v){
                        show = "<span style='color:red;'>" + HYSCAN_LABLE.invalid + "</span>";
					}
					return show;
				}
			}, {
                text: LABEL.del,
	            xtype: 'actioncolumn',
	            width: 50,
	            sortable : false,
	            editor: false,
	            align: 'center',
	            items: [{
	                icon: '/img/icon/del.png',
                    tooltip: LABEL.del,
	                name: 'view',
	                scope: this,
	                handler: this.onDelClick,
	                isDisabled: function (v, r, c, item, r) {
	                }
	            }]
            }, {
                text: HYSCAN_LABLE.test,
                xtype: 'actioncolumn',
                width: 50,
                sortable: false,
                editor: false,
                align: 'center',
                items: [{
                    icon: '/img/icon/update.png',
                    tooltip: HYSCAN_LABLE.test,
                    name: 'view',
                    scope: this,
                    handler: this.onTestClick,
                    isDisabled: function (v, r, c, item, r) {
                    }
                }]
            }
		);
		
		var me = this;
		me.contextMenu = me.portlet.buildOptMenu();
		var sm = new Ext.selection.CheckboxModel({
			'mode':'SINGLE',
			listeners: {
				selectionchange: function(sm2) {
					var records = sm2.getSelection();
					
					var delRight = me.contextMenu.down('menuitem[name=delAlgo]');
					var currentRight = me.contextMenu.down('menuitem[name=useAlgo]');
					var delUp = me.portlet.down('menuitem[name=delAlgo]');
					var currentUp = me.portlet.down('menuitem[name=useAlgo]');
					if (sm2.getCount() > 0) {
						delRight.enable();
						currentRight.enable();
						delUp.enable();
						currentUp.enable();
					} else {
						delRight.disable();
						currentRight.disable();
						delUp.disable();
						currentUp.disable()
					}
				}
			}
		});
		
		
		var paramStore = new Ext.create('Ext.data.Store', {
			storeId : 'paramStore',
			fields : ['version', 'path', 'name', 'current', 'valid']
		});

		
		Ext.apply(this, {
			selModel: sm,
			viewConfig : {
                emptyText: HYSCAN_LABLE.noAc,
                enableTextSelection: true
			},
			store : paramStore,
			columns : columns,
			listeners : {
				itemcontextmenu : me.itemcontextmenuFunction
			}
		});
		this.callParent(arguments);
	},
	
	loadData : function(){
		var me = this;
		var configUrl = '/globalconfig/algoConfig/hyscan?fetch=true';
		Soul.Ajax.restAction(configUrl, 'get', null, null, function(ret){
			ret = ret || {};
			var algoList = [];
			var currentAlgoVersion = ret.currentAlgoVersion;
			Ext.Object.each(ret, function(k, v, self) {
				var pns = v.split(',');
				if (k.indexOf('algo_') == 0 && pns.length == 2) {
					var algo = {};
					var version = k.substring(5);
					algo.valid = true;
					if (version.indexOf('_invalid') > 0) {
						version = version.substring(0, version.indexOf('_invalid'));
						algo.valid = false;
					}
					algo.version = version;
					algo.path = pns[0];
					algo.name = pns[1];
					if (currentAlgoVersion && currentAlgoVersion == version)
						algo.current = true;
					else
						algo.current = false;
					algoList.push(algo);
				}
			});
			me.store.loadData(algoList);
        }, HYSCAN_LABLE.loadingAlgo, null);
	},
	
	onDelClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		var opt = Module.Hyscan.AlgoConfig.Operation;
		opt.doDelAlgo(record, function () {
			me.loadData(me);
		});
		
	},

    onTestClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var me = this;
        var opt = Module.Hyscan.AlgoConfig.Operation;
        opt.showTestWin(record.data)
    },

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        this.loadData();
        var callbackFun = function(){
			me.loadData(me);
		};

		var sm = me.selModel;
		var uploadRight = me.contextMenu.down('menuitem[name=uploadAlgo]');
		var delRight = me.contextMenu.down('menuitem[name=delAlgo]');
		var currentRight = me.contextMenu.down('menuitem[name=useAlgo]');
		
		var uploadUp = me.portlet.down('menuitem[name=uploadAlgo]');
		var delUp = me.portlet.down('menuitem[name=delAlgo]');
		var currentUp = me.portlet.down('menuitem[name=useAlgo]');
		

		var uploadAlgoFunc = function(e, eOpts){
			Module.Hyscan.AlgoConfig.Operation.showUploadWin(callbackFun);
		};
		uploadRight.on('click', uploadAlgoFunc);
		uploadUp.on('click', uploadAlgoFunc);


		var delAlgoFunc = function(item, e, eOpts){
			var records = sm.getSelection();
			Module.Hyscan.AlgoConfig.Operation.doDelAlgo(records[0], callbackFun);
		};
		delRight.on('click', delAlgoFunc);
		delUp.on('click', delAlgoFunc);

        
		var currentFunc = function(item, e, eOpts){
			var records = sm.getSelection();
        	Module.Hyscan.AlgoConfig.Operation.doSetAlgoCurrent(records[0], callbackFun);
        };
        currentRight.on('click', currentFunc);
        currentUp.on('click', currentFunc);


    }
});
