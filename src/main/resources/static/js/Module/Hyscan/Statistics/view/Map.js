Ext.define('Module.Hyscan.Statistics.view.Map', {
    extend: 'Ext.panel.Panel',

    requires: [
        'Module.Hyscan.Statistics.Tools',
        'Module.Hyscan.Statistics.Opt'
    ],

    html: "<div id='map-container' style='height: 100%;'></div>",


    showType: "annotation",

    appId: "all",

    appDict: {},

    mapInit: false,

    initComponent: function () {

        var me = this;

        var defaultValue = "all";
        var appData = Ext.clone(supportApps);
        Ext.Object.each(appData, function (key, value) {
            appData[key] = APPID_VIEW[key];
        });
        if (me.attributeCount(supportApps) == 1) {
            Ext.Object.each(supportApps, function (key, value) {
                defaultValue = key;
                me.appId = key;
                return false;
            })
        } else if (me.attributeCount(supportApps) > 1) {
            appData.all = LABEL.all;
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
                        text: HYSCAN_LABLE.annotation,
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
                        xtype: 'button',
                        text: HYSCAN_LABLE.hotspot,
                        icon: "/img/icon/hotspot.png",
                        toggleGroup: 'showTypee',
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
                        xtype: "button", text: HYSCAN_LABLE.latestTaskPonit, icon: '/img/icon/location.png',
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
                        fieldLabel: HYSCAN_LABLE.appType,
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
                                        Ext.Msg.alert(HYSCAN_LABLE.notice, HYSCAN_LABLE.hotspotMustSelectOneApp);
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
                        fieldLabel: HYSCAN_LABLE.index,
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
                                    Ext.Msg.alert(HYSCAN_LABLE.notice, HYSCAN_LABLE.hotspotMustSelectOneApp);
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
                        fieldLabel: HYSCAN_LABLE.showNum,
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
                        xtype: "button", text: HYSCAN_LABLE.reload, icon: '/img/icon/loading.png',
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
        var map = new BMap.Map("map-container", {
            enableMapClick: false,
            maxZoom: 21
        });
        var centerPoint = sessionStorage.getItem("mapCenter");
        var mapZoom = sessionStorage.getItem("mapZoom") || 15;
        var lng = 116.404;
        var lat = 39.915;
        if (centerPoint && centerPoint !== "undefined") {
            centerPoint = JSON.parse(centerPoint);
            // console.log(centerPoint);
            //修正初始坐标不准确问题
            lng = me.fixLng(mapZoom, centerPoint.lng);// - 0.056593;
            // lat = centerPoint.lat;
            lat = me.fixLat(mapZoom, centerPoint.lat)// + 0.031054;
        }
        var point = new BMap.Point(lng, lat);

        map.enableScrollWheelZoom(true);
        map.addControl(new BMap.ScaleControl());
        var opts = {type: BMAP_NAVIGATION_CONTROL_SMALL};
        map.addControl(new BMap.NavigationControl(opts));
        map.addControl(new BMap.OverviewMapControl());
        map.addEventListener("dragend", function () {
            me.loadTaskInfo(me);
        });
        map.addEventListener("zoomend", function () {
            if (me.mapInit) {
                me.loadTaskInfo(me);
            }
        });
        map.addEventListener("tilesloaded", function () {

            // console.log(me.map.getCenter());
            // console.log(me.map.getZoom());
            sessionStorage.setItem("mapZoom", me.map.getZoom());
            sessionStorage.setItem("mapCenter", JSON.stringify(me.map.getCenter()));
            if (!me.mapInit) {
                me.loadTaskInfo(me);
                me.mapInit = true;
            }
        });
        me.map = map;
        // map.centerAndZoom(point, mapZoom);
        map.centerAndZoom("北京");
        me.loadResult();
    },

    fixLng: function (zoom, lng) {
        return lng - Math.pow(2, 19 - zoom) * 0.00353707795;
    },

    fixLat: function (zoom, lat) {
        return lat + Math.pow(2, 19 - zoom) * 0.001939599;
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
                if (ret) {
                    if (ret.lon <= -350 || ret.lon > 360 || ret.lat > 84.602 || ret.lat < -80.786393) {
                        Soul.uiModule.Message.msg(HYSCAN_LABLE.notice, HYSCAN_LABLE.invalidLBS);
                    } else {
                        var point = new BMap.Point(ret.lon, ret.lat);
                        me.map.centerAndZoom(point, 15);
                    }
                }
            },
            failure: function (resp, e) {
                Soul.uiModule.Message.msg("", HYSCAN_LABLE.noTaskFound)
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
            loadMask: HYSCAN_LABLE.loading,
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
        if (me.heatmapOverlay) {
            me.heatmapOverlay.hide();
        }
        updateTaskView(me.map, me.map.getZoom(), me.taskData, function (tasks) {
            Module.Hyscan.Statistics.Opt.showTasksWin(tasks);
        });
    },

    showHotspot: function () {
        var me = this;
        me.map.clearOverlays();
        me.heatmapOverlay = new BMapLib.HeatmapOverlay({"radius": 30, "visible": true, "opacity": 70});
        me.map.addOverlay(me.heatmapOverlay);

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
            if (obj.hasOwnProperty(i)) {
                count++;
            }
        }
        return count;
    },

    updateView: function (scope) {
        var me = scope || this;
    }
});