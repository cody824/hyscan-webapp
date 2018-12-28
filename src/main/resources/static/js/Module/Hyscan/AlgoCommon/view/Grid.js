Ext.define('Module.Hyscan.AlgoCommon.view.Grid', {
	extend : 'Ext.grid.Panel',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Soul.util.ObjectView',
        'Module.Hyscan.AlgoCommon.Opt',
		'Soul.ux.grid.feature.Searching'
	],

	wdItems : [],
	
	itemcontextmenuFunction : function(view,record,htmlElement,index,event,eopts){
		event.preventDefault();
		var me = this;
		if (me.contextMenu != null)
			me.contextMenu.showAt(event.getXY());
	},

	initComponent : function() {
        var columns = [];

		columns.push(
            // new Ext.grid.RowNumberer(),
			{
                text: HYSCAN_LABLE.seq, width: 80, sortable: false,
				menuDisabled:true, dataIndex: 'seq', align : 'center'
			},
			{
                text: HYSCAN_LABLE.algoKey, flex: 1, width: 80, dataIndex: 'key',
				menuDisabled:true, align : 'center',editor: {
                    xtype: 'textfield',
                    maxLength : 20,
                    allowBlank: false
                }
			},
			{
                text: HYSCAN_LABLE.chineseName, flex: 1, width: 100, dataIndex: 'chineseName',
				menuDisabled:true, align : 'center',
                editor: {
                    xtype: 'textfield',
                    maxLength : 6,
                    allowBlank: false
                }
			},
			{
                text: HYSCAN_LABLE.decimal, width: 80, dataIndex: 'decimal',
				menuDisabled:true, align : 'center', editor: {
                    xtype: 'numberfield',
                    maxValue: 4,
                    minValue: 0,
                    allowBlank: false
                }
			},
            {
                text: HYSCAN_LABLE.unit, width: 80, dataIndex: 'unit',
                menuDisabled:true, align : 'center', editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }, {
                text: LABEL.operation,
	            xtype: 'actioncolumn',
	            width: 80,
	            sortable : false,
	            editor: false,
	            align: 'center',
	            items: [
                    {
                        icon: '/img/icon/fileoperation.png',
                        tooltip: HYSCAN_LABLE.dictConfig,
                        name: 'view',
                        scope: this,
                        hidden: true,
                        handler: this.onDictClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    },
                    {
	                icon: '/img/icon/del.png',
                        tooltip: LABEL.del,
	                name: 'view',
	                scope: this,
	                handler: this.onDelClick,
	                isDisabled: function (v, r, c, item, r) {
	                }
	            }]
	        }
		);
		
		var me = this;
		var paramStore = new Ext.create('Ext.data.Store', {
			storeId : 'paramStore',
			fields : ['seq', 'key', 'chineseName', 'waveIndex', 'unit', 'decimal']
		});

		
		Ext.apply(this, {
			// selModel: sm,
			viewConfig : {
                emptyText: HYSCAN_LABLE.noAc,
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragText: HYSCAN_LABLE.moveSeq
                }
			},
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1
                })
            ],
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [{
                    icon : '/img/icon/save.png',
                    text: LABEL.save,
                    handler : me.doSave,
                    scope : me
                },{
                    icon : '/img/icon/reset.png',
                    text: LABEL.reset,
                    handler : me.doReset,
                    scope : me
                },{
                    icon : '/img/icon/add.png',
                    text: LABEL.add,
                    handler : me.doAdd,
                    scope : me
                }]
            }],
			store : paramStore,
			columns : columns,
			listeners : {
				itemcontextmenu : me.itemcontextmenuFunction
			}
		});
		this.callParent(arguments);
	},
	
	loadData : function(data){
		var me = this;
		data = data || me.wdItems;
		var storeData = [];
        Ext.Object.each(data, function (key, value) {
            value.chineseName = value.chineseName.replace(new RegExp("&nbsp;","gm"), " ");
            value.unit = value.unit.replace(new RegExp("&nbsp;","gm"), " ");
			storeData.push(value);
        });
        storeData = Ext.Array.sort(storeData, function (a, b) {
			return a.seq > b.seq;
        });
        me.orgData = storeData;
		me.store.loadData(storeData);
	},

    doSave : function(){
	    var me  = this;
        var algos = {};
        var orgData = [];
	    me.store.each(function (r) {
            var data = r.data;
            data.chineseName = data.chineseName.replace(new RegExp(" ","gm"), "&nbsp;");
            if (data.unit.length == 0)
                data.unit = " ";
            data.unit = data.unit.replace(new RegExp(" ","gm"), "&nbsp;");
            algos[r.data.key] = r.data;
            orgData.push(r.data);
        });
        Soul.Ajax.request({
            url: '/app/algo-config/',
            successMsg: HYSCAN_LABLE.loadComplete,
            method : 'post',
            jsonData : {
                appId: me.appId,
                model : me.title,
                algos: algos
            },
            success : function(ret){
                me.orgData = orgData;
            }
        });
    },

    doReset : function(){
	    var me = this;
	    me.store.loadData(me.orgData);
    },

    doAdd : function(){
        var me = this;
        me.store.add({
            seq : me.store.count(),
            decimal : 2
        });
    },
	
	onDelClick : function(view ,rowIndex, colIndex, item, e, record, row){
		var me = this;
		me.store.removeAt(rowIndex);
	},

    onDictClick: function (view, rowIndex, colIndex, item, e, record, row) {
        var me = this;
        Module.Hyscan.AlgoCommon.Opt.showDictWin(me.appId, record.data.key);
    },

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        this.loadData();
        var gridView = this.getView();
        gridView.on('drop', function(node, data, overModel, dropPosition, eOpts) {
            // console.log(node, data, overModel, dropPosition, eOpts)
            var datas = [];
            var seq = 0;
            me.store.each(function(r){
               var data = r.data;
               data.seq = seq++;
               datas.push(data);
            });
            me.store.loadData(datas);
        });
    }
});
