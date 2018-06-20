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
		var columns = new Array();
		var renders = Module.Hyscan.WqAlgo.Renderer;

		columns.push(
            // new Ext.grid.RowNumberer(),
			{
				text: "序号",width: 80, sortable: false,
				menuDisabled:true, dataIndex: 'seq', align : 'center'
			},
			{
                text: "算法key", flex: 1, width: 80, dataIndex: 'key',
				menuDisabled:true, align : 'center',editor: {
                    xtype: 'textfield',
                    maxLength : 20,
                    allowBlank: false
                }
			},
			{
                text: "显示名", flex: 1, width: 100, dataIndex: 'chineseName',
				menuDisabled:true, align : 'center',
                editor: {
                    xtype: 'textfield',
                    maxLength : 6,
                    allowBlank: false
                }
			},
            // {
            // 	text: "光谱索引",  flex:1, dataIndex:'waveIndex',
            // 	menuDisabled:true, align : 'center',
            //    editor: {
            //        xtype: 'textfield',
            //        regex : /([0-9]+,)*[0-9]+/,
            //        regexText : '请输入多个数字中间用","号间隔',
            //        allowBlank: false,
            //    }
            // },
			{
				text: "小数保留", width: 80, dataIndex:'decimal',
				menuDisabled:true, align : 'center', editor: {
                    xtype: 'numberfield',
                    maxValue: 4,
                    minValue: 0,
                    allowBlank: false
                }
			},
            {
                text: "单位", width: 80, dataIndex:'unit',
                menuDisabled:true, align : 'center', editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            }, {
                text: "操作",
	            xtype: 'actioncolumn',
	            width: 80,
	            sortable : false,
	            editor: false,
	            align: 'center',
	            items: [
                    {
                        icon: '/img/icon/fileoperation.png',
                        tooltip: '字典配置',
                        name: 'view',
                        scope: this,
                        hidden: true,
                        handler: this.onDictClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    },
                    {
	                icon: '/img/icon/del.png',
	                tooltip: '删除',
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
				emptyText : "没有算法配置",
                plugins: {
                    ptype: 'gridviewdragdrop',
                    dragText: '移动顺序'
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
                    text: '保存',
                    handler : me.doSave,
                    scope : me
                },{
                    icon : '/img/icon/reset.png',
                    text: '重置',
                    handler : me.doReset,
                    scope : me
                },{
                    icon : '/img/icon/add.png',
                    text: '增加',
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
        })
        storeData = Ext.Array.sort(storeData, function (a, b) {
			return a.seq > b.seq;
        })
        me.orgData = storeData;
		me.store.loadData(storeData);
	},

    doSave : function(){
	    var me  = this;
        var algos = {};
        var orgData = [];
	    me.store.each(function (r) {
            var data = r.data;
            // if(!Array.isArray(data.waveIndex)){
            //     var waveIndex = data.waveIndex.split(',');
            //     data.waveIndex = [];
            //     Ext.each(waveIndex, function (index) {
            //         var i = parseInt(index);
            //         if (isNaN(i) || i < 0){
            //             Soul.util.MessageUtil.showErrorInfo("错误", data.key + "输入了无效的索引值");
            //             return;
            //         }
            //         data.waveIndex.push(i);
            //     });
            // }
            data.chineseName = data.chineseName.replace(new RegExp(" ","gm"), "&nbsp;");
            if (data.unit.length == 0)
                data.unit = " ";
            data.unit = data.unit.replace(new RegExp(" ","gm"), "&nbsp;");
            algos[r.data.key] = r.data;
            orgData.push(r.data);
        });
        Soul.Ajax.request({
            url: '/app/algo-config/',
            successMsg : '载入完成',
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
