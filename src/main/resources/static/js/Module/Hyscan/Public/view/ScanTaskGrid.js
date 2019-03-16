Ext.define('Module.Hyscan.Public.view.ScanTaskGrid', {
    extend: 'Soul.view.AdvanceSearchGrid',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn'
    ],

    checkIndexes: ['status','busType', 'money'],
    disableIndexes: [],

    customFilter : [],

	customColumns : [],
	
    initComponent: function () {
        var columns = [];
        columns.push(
        		new Ext.grid.RowNumberer(),
			{
                text: HYSCAN_LABLE.taskData,
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

                text: TASK_PROPERTY.userId,
	            dataIndex: 'userId',
	            searchType: 'number',
	            align: 'center',
	            width: 80
	        }, {
                text: TASK_PROPERTY.scanTime,
	            dataIndex: 'scanTime',
	            searchType: 'date',
	            align: 'center',
	            width: 150
	        },{
                text: TASK_PROPERTY.city,
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
                text: TASK_PROPERTY.scanTarget,
	            dataIndex: 'scanTarget',
	            searchType: 'string',
	            align: 'center',
	            width: 100
	        }, {
                text: TASK_PROPERTY.targetType,
                dataIndex: 'targetType',
                searchType: 'string',
                align: 'center',
                width: 100
            }, {
                text: TASK_PROPERTY.imagePath,
                dataIndex: 'imagePath',
                searchType: 'string',
                align: 'center',
                width: 80,
                renderer: function (value, metaData, record) {
                    if (!value)
                        return HYSCAN_LABLE.noImg;
                    var id = metaData.record.id;//Ext.id();
                    metaData.tdAttr = 'data-qtip="' + HYSCAN_LABLE.doubleClickShowBigImg + '"';
                    Ext.defer(function(){
                        Ext.EventManager.addListener(id, 'dblclick', function (e, a) {
                            var win_Watch = Ext.create('Ext.Window', {
                                width: a.naturalWidth,
                                height: a.naturalHeight,
                                minHeight: 300,
                                minWidth: 300 * a.naturalWidth / a.naturalHeight,
                                maxHeight: 600,
                                maxWidth: 600 * a.naturalWidth / a.naturalHeight,
                                maximizable: true,
                                title: HYSCAN_LABLE.bigImg,
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
                    }, 500);

                    var img = Ext.create('Ext.Img', {
                        height: 30,
                        //width: 80,
                        src: value,
                        alt: HYSCAN_LABLE.noImg,
                        listeners: {
                            scope: this,
                            el: {
                                dblclick: function (e, a) {

                                }
                            }
                        }

                    });
                    return "<img src='" + value + "' width='30px', height='30px' id='" + id + "'>";
                }
            }, {
                text: TASK_PROPERTY.deviceModel,
	            dataIndex: 'deviceModel',
	            searchType: 'string',
	            align: 'center',
	            width: 80
	        }, {
                text: TASK_PROPERTY.deviceSerial,
	            dataIndex: 'deviceSerial',
	            searchType: 'string',
	            align: 'center',
	            width: 100
	        },{
                text: TASK_PROPERTY.deviceFirmware,
	            dataIndex: 'deviceFirmware',
	            searchType: 'string',
	            align: 'center',
	            width: 80
            },
            {
                text: LABEL.del,
                xtype: 'actioncolumn',
                width: 60,
                sortable: false,
                editor: false,
                align: 'center',
                items: [
                    {
                        icon: "/img/icon/del.png",
                        tooltip: LABEL.del,
                        scope: this,
                        handler: this.onDeleteClick,
                        isDisabled: function (v, r, c, item, r) {
                        }
                    }]
            }
        );

        if (this.customColumns) {
            Ext.each(this.customColumns, function(column){
                columns.push(column)
            })

        }

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
            searchText: HYSCAN_LABLE.today,
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
            searchText: HYSCAN_LABLE.yesterday,
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
            searchText: HYSCAN_LABLE.weekDay,
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
            searchText: HYSCAN_LABLE.thisMonths,
	    	icon : '/img/icon/quota.png',
	    	name : 'monthOrder',
	    	filter : [{
		    	relationOp : 'and',
		    	attr : 'scanTime',
		    	logicalOp : 'between',
		    	value : [monthBegin, monthEnd]
	    	}]
        };
	    var lastMonthOderFilter = {
            searchText: HYSCAN_LABLE.lastMonth,
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
        
        var store = Ext.create('Module.Hyscan.Public.store.ScanTaskStore');
        var proxy = store.getProxy();
        proxy.api.read = proxy.api.read + "?appId=" + me.appId + "&model=" + me.title;

        Ext.apply(this, {
            columns: columns,
            viewConfig: {
                emptyText: HYSCAN_LABLE.noTaskFound,
                enableTextSelection:true  
            },
            store: store
        });

        this.callParent(arguments);
    },
    
	onDataClick : function(view ,rowIndex, colIndex, item, e, record, row){
    	var me = this;
        var portlet = me.up("hyscantaskportlet");
        portlet.gotoView("Module.Hyscan.Public.view.ScanTaskDataGrid", {
        	task: record.data,
		}, portlet);
	},

    onDeleteClick: function (grid, rowIdx, colIdx, item, e, record, row) {
        var me = this;
        Soul.Ajax.request({
            url: "/app/scanTask/info/" + record.data.id,
            method: "delete",
            confirm: HYSCAN_LABLE.confirmToDelTenant,
            successMsg: HYSCAN_LABLE.delSuccess,
            success: function () {
                me.updateView(me);
            }
        })
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
        me.updateView(me);
    }
});