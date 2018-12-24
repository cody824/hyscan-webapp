Ext.define('Module.Hyscan.Statistics.view.Map', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Module.Hyscan.Statistics.Tools'
    ],

    html: "<div id='map-container' style='height: 100%;'></div>",


    showType: "annotation",

    appId: "all",

    appDict: {},

    initComponent: function () {

        var me = this;

        var defaultValue = "all";
        var appData = Ext.clone(supportApps);
        if (me.attributeCount(supportApps) == 1) {
            Ext.Object.each(supportApps, function (key, value) {
                defaultValue = key;
                me.appId = key;
                return false;
            })
        } else if (me.attributeCount(supportApps) > 1) {
            appData = Ext.clone(supportApps);
            appData.all = "全部";
            defaultValue = "all";
        }

        var appStore = Ext.create('Ext.data.ArrayStore', {
            fields: ['value', 'name'],
            data: Soul.util.RendererUtil.buildComBo(appData)
        });

        var indexStore = Ext.create('Ext.data.ArrayStore', {
            fields: ['value', 'name']
        });


        Ext.apply(this, {
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'button',
                        pressed: true,
                        text: '任务标注',
                        icon: "/img/icon/annotation.png",
                        toggleGroup: 'showTypee',
                        toggleHandler: function (btn, state) {
                            if (state) {
                                me.showType = "annotation";
                                me.showAnnotation();
                                me.down('[name=hotspot-index]').hide();
                            }
                        }
                    },
                    {
                        xtype: 'button', text: '热力图', icon: "/img/icon/hotspot.png", toggleGroup: 'showTypee',
                        toggleHandler: function (btn, state) {
                            if (state) {
                                me.showType = "hotspot";
                                if (me.markerClusterer) {
                                    me.markerClusterer.clearMarkers();
                                }
                                me.down('[name=hotspot-index]').show();
                                me.showHotspot();
                            }
                        }
                    }, "-", {
                        xtype: "button", text: "定位最近任务", icon: '/img/icon/location.png',
                        handler: function () {
                            me.gotoLatest();
                        }
                    }
                ]
            }, {
                xtype: 'toolbar',
                dock: 'top',
                items: [
                    {
                        xtype: 'combo',
                        name: 'appId',
                        fieldLabel: "APP类型",
                        labelAlign: 'right',
                        labelWidth: 50,
                        width: 130,
                        store: appStore,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        value: defaultValue,
                        editable: false,
                        allowBlank: true,
                        listeners: {
                            change: function (cb, newValue, oldValue) {
                                me.appId = newValue;
                                if (me.showType == "annotation") {
                                    me.loadTaskInfo(me, true);
                                } else if (me.showType == "hotspot") {
                                    if (me.appId == "all") {
                                        Ext.Msg.alert("注意", "热力图模式必须选择唯一的APP");
                                        this.setValue(oldValue);
                                        return;
                                    }
                                    me.down('[name=hotspot-index]').setValue("");
                                    me.down('[name=hotspot-index]').store.loadData([]);
                                }
                            }
                        }
                    }, {
                        xtype: 'combo',
                        name: 'hotspot-index',
                        fieldLabel: "指标",
                        labelAlign: 'right',
                        labelWidth: 50,
                        width: 130,
                        store: indexStore,
                        queryMode: 'local',
                        displayField: 'name',
                        valueField: 'value',
                        editable: false,
                        allowBlank: true,
                        hidden: true,
                        listeners: {
                            expand: function (field, op) {
                                var data = [];
                                if (me.appId == "all") {
                                    Soul.uiModule.Message.msg("注意", "热力图模式必须选择唯一的APP");
                                } else {
                                    var config = me.acConfig[me.appId];
                                    if (config) {
                                        Ext.Object.each(config, function (key, value) {
                                            if (value.algos) {
                                                Ext.Object.each(value.algos, function (name, property) {
                                                    data.push({
                                                        name: property.chineseName.replace(new RegExp("&nbsp;", "gm"), " "),
                                                        value: "result" + (property.seq + 1)
                                                    })
                                                });
                                            }
                                            return false;
                                        })
                                    }
                                }
                                if (data.length == 0) {
                                    data.push({
                                        name: '-',
                                        value: ''
                                    })
                                }
                                field.store.loadData(data);
                            },
                            change: function (cb, newValue) {
                                me.showHotspot();
                            }
                        }
                    }, {
                        xtype: 'numberfield',
                        name: 'limit',
                        fieldLabel: "显示数量",
                        labelAlign: 'right',
                        labelWidth: 60,
                        width: 130,
                        allowBlank: true,
                        value: 1000,
                        listeners: {
                            change: function (cb, newValue) {

                            }
                        }
                    }, "-", {
                        xtype: "button", hidden: true, text: "重新载入", icon: '/img/icon/loading.png',
                        handler: function () {
                            me.loadTaskInfo(me, true);
                        }
                    }
                ]
            }]
        });

        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);

        // me.down('[name=appId]').setValue("all");

        var map = new BMap.Map("map-container", {
            enableMapClick: false,
            maxZoom: 21
        });
        // 创建地图实例
        var centerPoint = sessionStorage.getItem("mapCenter");
        var mapZoom = sessionStorage.getItem("mapZoom") || 15;
        var lng = 116.404;
        var lat = 39.915;
        if (centerPoint) {
            centerPoint = JSON.parse(centerPoint);
            lng = centerPoint.lng;
            lat = centerPoint.lat;
        }
        var point = new BMap.Point(lng, lat);

        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.ScaleControl());
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL};
        map.addControl(new BMap.NavigationControl(opts));


        map.addControl(new BMap.OverviewMapControl());
        map.addEventListener("dragend", function () {
            sessionStorage.setItem("mapCenter", JSON.stringify(me.center));
            me.loadTaskInfo(me);
        });
        map.addEventListener("zoomend", function () {
            sessionStorage.setItem("mapZoom", this.getZoom());
            me.loadTaskInfo(me);
        });
        map.addEventListener("tilesloaded", function () {
            me.loadTaskInfo(me);
        });
        me.map = map;
        // 创建点坐标
        map.centerAndZoom(point, 15);
        me.loadResult();
    },

    gotoLatest: function () {
        var me = this;
        var params = {};
        if (me.appId !== "all") {
            params.appId = me.appId;
        }
        Soul.Ajax.request({
            url: '/app/scanTask/info/latest',
            method: 'get',
            params: params,
            quiet: true,
            parseFailure: false,
            success: function (ret) {
                console.log(ret);
                if (ret) {
                    if (ret.lon <= -350 || ret.lon > 360 || ret.lat > 84.602 || ret.lat < -80.786393) {
                        Soul.uiModule.Message.msg("注意", "无效的LBS信息");
                    } else {
                        var point = new BMap.Point(ret.lon, ret.lat);
                        me.map.centerAndZoom(point, 15);
                    }
                }
            },
            failure: function (resp, e) {
                Soul.uiModule.Message.msg("", "没有相关任务")
            }
        })
    },

    loadTaskInfo: function (scope, force) {
        var me = scope || this;
        var filter = new SQLFilter();
        var bounds = me.map.getBounds();

        me.center = bounds.getCenter();


        var latTop = bounds.getNorthEast().lat;
        var latBottom = bounds.getSouthWest().lat;
        var lonLeft = bounds.getSouthWest().lng;
        var lonRight = bounds.getNorthEast().lng;


        if (Math.abs(me.latTop - latTop) < 0.003 && Math.abs(me.latBottom - latBottom) < 0.003
            && Math.abs(me.lonLeft - lonLeft) < 0.003 && Math.abs(me.lonRight - lonRight) < 0.003 && me.taskData && !force) {
            if (me.showType == "annotation") {
                me.showAnnotation();
            } else if (me.showType == "hotspot") {
                me.showHotspot();
            } else {
                me.showAnnotation();
            }
            return;
        }

        me.latTop = latTop;
        me.latBottom = latBottom;
        me.lonLeft = lonLeft;
        me.lonRight = lonRight;

        var sel = [];
        sel.push(new SQLExpression("and", "lon", "between", [lonLeft, lonRight], false));
        sel.push(new SQLExpression("and", "lat", "between", [latBottom, latTop], false));

        if (me.appId !== "all") {
            sel.push(new SQLExpression("and", "appId", "=", [me.appId], false))
        }

        if (sel.length > 0)
            filter.buildBySe(sel);
        var f = filter.getFilter();

        var limit = me.down("[name=limit]").getValue() || 1000;

        Soul.Ajax.request({
            url: '/app/scanTask/',
            method: 'get',
            params: {
                filter: Ext.encode(f),
                start: 0,
                limit: limit
            },
            loadMask: "载入任务数据",
            quiet: true,
            success: function (ret) {
                if (ret && ret.data) {
                    me.taskData = ret.data;
                    if (me.showType == "annotation") {
                        me.showAnnotation();
                    } else if (me.showType == "hotspot") {
                        me.showHotspot();
                    } else {
                        me.showAnnotation();
                    }
                }
            }
        })
    },

    showAnnotation: function () {
        var me = this;
        var markers = [];
        var pt, marker;
        Ext.each(me.taskData, function (task) {
            pt = new BMap.Point(task.lon, task.lat);
            marker = new BMap.Marker(pt);
            marker.task = task;
            marker.addEventListener("click", function () {
                Module.Hyscan.Statistics.Tools.showTaskInEast(this.task);
            });
            markers.push(marker);
        });
        if (me.heatmapOverlay) {
            me.heatmapOverlay.hide();
        }

        if (me.markerClusterer) {
            me.markerClusterer.clearMarkers();
            me.markerClusterer.addMarkers(markers);
        } else {
            me.markerClusterer = new BMapLib.MarkerClusterer(me.map, {markers: markers});
        }

    },

    showHotspot: function () {
        var me = this;


        if (!me.heatmapOverlay) {
            me.heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 30, "visible": true, "opacity": 70});
            me.map.addOverlay(me.heatmapOverlay);
        }
        me.heatmapOverlay.setDataSet({
            max: 300,
            data: []
        });
        var indexCombo = me.down('[name=hotspot-index]');
        var indexSeq = indexCombo.getValue();
        if (!indexSeq) {
            return;
        }

        var data = [];
        Ext.each(me.taskData, function (task) {
            data.push({
                lng: task.lon,
                lat: task.lat,
                count: task[indexSeq]
            });
        });
        me.heatmapOverlay.setDataSet({
            max: 300,
            data: data
        });
        me.heatmapOverlay.show();
    },

    loadResult: function () {
        var me = this;
        me.acConfig = {};

        Soul.Ajax.request({
            url: '/app/algo-config/',
            quiet: true,
            method: 'get',
            success: function (ret) {
                if (ret.length > 0) {
                    Ext.each(ret, function (ac) {
                        me.acConfig[ac.appId] = {};
                        me.acConfig[ac.appId][ac.model] = ac;
                    })
                }
            }
        });
    },

    attributeCount: function (obj) {
        var count = 0;
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {  // 建议加上判断,如果没有扩展对象属性可以不加
                count++;
            }
        }
        return count;
    },

    updateView: function (scope) {
        var me = scope || this;
    }
});