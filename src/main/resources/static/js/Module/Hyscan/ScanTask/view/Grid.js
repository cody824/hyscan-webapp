Ext.define('Module.Hyscan.ScanTask.view.Grid', {
    extend: 'Soul.view.AdvanceSearchGrid',
    alias: 'widget.orderstatisticsgrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn',
        'Module.Hyscan.ScanTask.Data',
        'Module.Hyscan.ScanTask.Renderer',
        'Module.Hyscan.ScanTask.Tools',
        'Module.Hyscan.ScanTask.Config'
    ],

    checkIndexes: ['status','busType', 'money'],
    disableIndexes: [],

    customFilter : [],


    initComponent: function () {
        var columns = new Array();
        var renders = Module.Hyscan.ScanTask.Renderer;
        //var comboData = Module.Hyscan.ScanTask.Config.COMBO_DATA;

        columns.push(
        		new Ext.grid.RowNumberer(),
//            {
//                text: "任务序列号",
//                dataIndex: 'id',
//                searchType: 'string',
//                align: 'center',
//                width: 200
//            },
			{
			    text: "任务数据",
			    xtype: 'actioncolumn',
			    width: 80,
			    sortable : false,
			    editor: false,
			    align: 'center',
			    items: [{
			        icon: '/img/icon/document-export.png',
			        tooltip: '任务数据',
			        name: 'view',
			        scope: this,
			        handler: this.onDataClick,
			        isDisabled: function (v, r, c, item, r) {
			        }
			    }]
			}, {

                text: "扫描用户ID",
	            dataIndex: 'userId',
	            searchType: 'number',
	            align: 'center',
	            width: 80
	        }, {
                text: "扫描时间",
	            dataIndex: 'scanTime',
	            searchType: 'date',
	            align: 'center',
	            width: 150
	        },{
                text: "所在地区",
	            dataIndex: 'city',
	            searchType: 'string',
	            align: 'center',
	            width: 90,
		        renderer : function(value, meta, record){
	        		var address = record.get('address');
	        		address = address || value;
		            return '<span data-qtip="'+ address +'">'+value+'</span>';
		        }
	        }, {
	            text: "老化等级",
	            dataIndex: 'level',
	            searchType: 'number',
	            align: 'center',
	            width: 100
	        }, {
                text: "材质",
	            dataIndex: 'material',
	            searchType: 'string',
	            align: 'center',
	            width: 100
	        }, {
                text: "设备名称",
	            dataIndex: 'scanTarget',
	            searchType: 'string',
	            align: 'center',
	            width: 100
	        }, {
	            text: "图片",
	            dataIndex: 'imagePath',
	            searchType: 'string',
	            align: 'center',
	            width: 80,
	            renderer:function(value, metaData, record){ 
	            	if (!value)
	            		return "没有图片";
	            	var id = metaData.record.id;//Ext.id();  
                    metaData.tdAttr = 'data-qtip="双击查看大图"';  
                    Ext.defer(function(){
                    	Ext.EventManager.addListener(id, 'dblclick', function(e, a){
                    		console.log(a.naturalWidth, a.naturalHeight);
                            var win_Watch = Ext.create('Ext.Window', {  
                                width: a.naturalWidth,  
                                height: a.naturalHeight,  
                                minHeight: 300,  
                                minWidth: 300 * a.naturalWidth / a.naturalHeight,  
                                maxHeight: 600 ,  
                                maxWidth: 600 * a.naturalWidth / a.naturalHeight,
                                maximizable: true,  
                                title: '图片大图',  
                                layout: "fit",                        //窗口布局类型  
                                modal: true, //是否模态窗口，默认为false  
                                resizable: false,  
                                //closeAction: 'hide',  
                                plain: true,  
                                draggable: true,  
                                border: false,  
                                items: [  
                                    Ext.create('Ext.Img', {  
                                        src: value  
                                    })  
                                ]  
                            });  
                            win_Watch.show();  
                    	})
                    }, 500)
                    
                     var img = Ext.create('Ext.Img', {  
                            height: 30,  
                            //width: 80,  
                            src: value,
                            alt : '没有图片',
                            listeners: {  
                                scope:this,  
                                el: {  
                                    dblclick: function (e, a) {  
                                    	
                                    }  
                                }  
                            }  
                              
                        })  
                    return "<img src='" + value + "' width='30px', height='30px' id='" + id + "'>";  
	            } 
	        }, {
	            text: "光谱仪型号",
	            dataIndex: 'deviceModel',
	            searchType: 'string',
	            align: 'center',
	            width: 80
	        }, {
                text: "光谱仪序列号",
	            dataIndex: 'deviceSerial',
	            searchType: 'string',
	            align: 'center',
	            width: 100
	        },{
                text: "固件版本",
	            dataIndex: 'deviceFirmware',
	            searchType: 'string',
	            align: 'center',
	            width: 80
	        }
        );

        var me = this;
        
        var now = new Date();
        var todayBegin = Ext.Date.clearTime(now);
        var todayEnd = Ext.Date.add(todayBegin, Ext.Date.DAY, 1);
        var yesterdayBegin = Ext.Date.subtract(todayBegin, Ext.Date.DAY, 1);
        var yesterdayEnd = todayBegin;
        var weekBegin = Ext.Date.subtract(now, Ext.Date.DAY, 7);
        var weekEnd = now;
        var monthBegin = Ext.Date.getFirstDateOfMonth(now);
        var monthEnd = Ext.Date.getLastDateOfMonth(now);
        monthEnd = Ext.Date.add(monthEnd, Ext.Date.DAY, 1);
        var lastMonthBegin = Ext.Date.getFirstDateOfMonth(Ext.Date.subtract(monthBegin, Ext.Date.DAY, 1));
        var lastMonthEnd = Ext.Date.getLastDateOfMonth(Ext.Date.subtract(monthBegin, Ext.Date.DAY, 1));
        lastMonthEnd = Ext.Date.add(lastMonthEnd, Ext.Date.DAY, 1);
        

        var todayFilter = {
	    	searchText : '今天', 
	    	icon : '/img/icon/quota.png',
	    	name : 'todayOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'scanTime',
		    	logicalOp : 'between',
		    	value : [todayBegin, todayEnd]
	    	}]
	    };
	    var yesterdayFilter = {
	    	searchText : '昨天', 
	    	icon : '/img/icon/quota.png',
	    	name : 'yesterdayOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'scanTime',
		    	logicalOp : 'between',
		    	value : [yesterdayBegin, yesterdayEnd]
	    	}]
	    };
        

        var weekOderFilter = {
	    	searchText : '最近7天', 
	    	icon : '/img/icon/quota.png',
	    	name : 'weekOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'scanTime',
		    	logicalOp : 'between',
		    	value : [weekBegin, weekEnd]
	    	}]
	    };
	    var monthOderFilter = {
	    	searchText : '本月', 
	    	icon : '/img/icon/quota.png',
	    	name : 'monthOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'scanTime',
		    	logicalOp : 'between',
		    	value : [monthBegin, monthEnd]
	    	}]
	    }
	    var lastMonthOderFilter = {
	    	searchText : '上月', 
	    	icon : '/img/icon/quota.png',
	    	name : 'lastmonthOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'scanTime',
		    	logicalOp : 'between',
		    	value : [lastMonthBegin, lastMonthEnd]
	    	}]
	    };
	    me.customFilter = [];
	    me.customFilter.push(todayFilter);
	    me.customFilter.push(yesterdayFilter);
	    me.customFilter.push(weekOderFilter);
        me.customFilter.push(monthOderFilter);
        me.customFilter.push(lastMonthOderFilter);
        
        var store = Ext.create('Module.Hyscan.ScanTask.store.ScanTaskStore');

        Ext.apply(this, {
            columns: columns,
            viewConfig: {
                emptyText: "没有扫描任务",
                enableTextSelection:true  
            },
            store: store
        });

        this.callParent(arguments);
    },
    
	onDataClick : function(view ,rowIndex, colIndex, item, e, record, row){
    	var me = this;
    	me.portlet.gotoView("Module.Hyscan.ScanTask.view.DataGrid", {task: record.data, title : record.data.id + "任务数据"}, me.portlet);
	},

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
    }
});