Ext.define('Module.Hyscan.Statistics.view.ScanTaskGrid', {
    extend: 'Ext.grid.Panel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching',
        'Soul.ux.grid.column.ComboColumn',
        'Module.Hyscan.Public.model.ScanTaskModel'
    ],


    initComponent: function () {
        var columns = [];
        columns.push(
        		new Ext.grid.RowNumberer(),
            {

                text: HYSCAN_LABLE.appType,
                dataIndex: 'appId',
                align: 'center',
                width: 70,
                renderer: function (val) {
                    return APPID_VIEW[val] || val;
                }
            },
			{
                text: HYSCAN_LABLE.taskData,
			    xtype: 'actioncolumn',
                width: 70,
			    sortable : false,
			    editor: false,
			    align: 'center',
			    items: [{
			        icon: '/img/icon/document-export.png',
                    tooltip: HYSCAN_LABLE.taskData,
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
                width: 70
	        }, {
                text: TASK_PROPERTY.scanTime,
	            dataIndex: 'scanTime',
	            searchType: 'date',
	            align: 'center',
                width: 140
	        },{
                text: TASK_PROPERTY.city,
	            dataIndex: 'city',
	            searchType: 'string',
	            align: 'center',
                width: 70,
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
                width: 70,
                renderer: Soul.util.RendererUtil.qtip
	        }, {
                text: TASK_PROPERTY.targetTypes,
                dataIndex: 'targetType',
                searchType: 'string',
                align: 'center',
                width: 70,
                renderer: Soul.util.RendererUtil.qtip
            }, {
                text: TASK_PROPERTY.imagePath,
                dataIndex: 'imagePath',
                searchType: 'string',
                align: 'center',
                width: 60,
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
                                layout: "fit",
                                modal: true,
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
                width: 70,
                renderer: Soul.util.RendererUtil.qtip
	        }, {
                text: TASK_PROPERTY.deviceSerial,
	            dataIndex: 'deviceSerial',
	            searchType: 'string',
	            align: 'center',
                width: 70,
                renderer: Soul.util.RendererUtil.qtip
	        },{
                text: TASK_PROPERTY.deviceFirmware,
	            dataIndex: 'deviceFirmware',
	            searchType: 'string',
	            align: 'center',
                width: 70,
                renderer: Soul.util.RendererUtil.qtip
	        }
        );

        var me = this;


        var store = Ext.create('Ext.data.Store', {
            autoLoad: true,
            model: 'Module.Hyscan.Public.model.ScanTaskModel',
            pageSize: 10,
            proxy: {
                type: 'memory',
                data: {
                    data: me.data
                },
                enablePaging: true,
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        });

        Ext.apply(this, {
            columns: columns,
            viewConfig: {
                emptyText: HYSCAN_LABLE.noScanTask,
                enableTextSelection:true  
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    Ext.create("Ext.PagingToolbar", {
                        dock: 'bottom',
                        store: store,
                        displayInfo: true,
                        width: "100%",
                        emptyMsg: LABEL.emptyMsg
                    })
                ]
            }],
            store: store
        });

        this.callParent(arguments);
    },
    
	onDataClick : function(view ,rowIndex, colIndex, item, e, record, row){
        Module.Hyscan.Statistics.Opt.showTaskDataWin(record.data);
	},

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    }
});