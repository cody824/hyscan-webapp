(function (window) {
    var annotations = []; //标注列表
    var updateInterval = null; //更新间隔
    var inUpdate = false; //是否在更新
    //比例尺，单位米(21级到3级)
    var SCALE = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000, 2000000];

    window.updateTaskView = function (map, zoomLevel, tasks, clickHandler) {
        if (updateInterval != null) {
            clearInterval(updateInterval);
        }
        updateInterval = setInterval(function () {
            if (inUpdate)
                return;
            inUpdate = true;
            clearInterval(updateInterval);
            updateInterval = null;
            if (tasks != null)
                updateAnnotations(map, zoomLevel, tasks, clickHandler);
            inUpdate = false;
        }, 1000);
    };

    function updateAnnotations(map, zoomLevel, tasks, clickHandler) {
        map.clearOverlays();
        annotations = [];
        tasks = tasks || [];
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            var an = getAnnotation(task, zoomLevel);
            an.tasks.push(task);
        }
        for (var i = 0; i < annotations.length; i++) {
            var length = annotations[i].tasks.length;
            if (length < 10) {
                annotations[i].icon = '/img/annotation/' + length + '.png';
            } else if (length >= 10 && length < 50) {
                annotations[i].icon = '/img/annotation/10+.png';
            } else if (length >= 50 && length < 100) {
                annotations[i].icon = '/img/annotation/50+.png';
            } else if (length >= 100) {
                annotations[i].icon = '/img/annotation/100+.png';
            }
        }
        for (var i = 0; i < annotations.length; i++) {
            addAnnotation(map, annotations[i], clickHandler);
        }
        //updateBubble(map);
    }

    function addAnnotation(map, annotation, clickHandler) {
        var myIcon = new BMap.Icon(annotation.icon, new BMap.Size(36, 44), {
            imageSize: new BMap.Size(36, 44)
        });
        // 创建标注对象并添加到地图
        var point = new BMap.Point(annotation.lon, annotation.lat);
        var marker = new BMap.Marker(point, {
            icon: myIcon,
            title: Ext.String.format(HYSCAN_LABLE.taskNumMsg, annotation.tasks.length)
        });

        marker.addEventListener("click", function (type, target, point, pixel, overlay) {
            clickHandler(annotation.tasks);
        });
        map.addOverlay(marker);
    }

    function getAnnotation(point, zoomLevel) {
        var annotation = null;
        var minDis = 10000000;
        for (var i = 0; i < annotations.length; i++) {
            var an = annotations[i];
            var dis = getDistance(point, an);
            if (dis < minDis) {
                minDis = dis;
                annotation = an;
            }
        }
        var scale = SCALE[21 - parseInt(zoomLevel)];
        if (minDis > scale * 0.5) {
            annotation = null;
        }
        if (annotation == null) { //没找到标注点，新建标注点
            annotation = {
                lon: point.lon,
                lat: point.lat,
                tasks: []
            };
            annotations.push(annotation);
        }
        return annotation;
    }

    /**
     * 地球半径
     */
    var EARTHRADIUS = 6370996.81;

    /**
     * 计算两点之间的距离,两点坐标必须为经纬度
     * @param {point1} Point 点对象
     * @param {point2} Point 点对象
     * @returns {Number} 两点之间距离，单位为米
     */
    function getDistance(point1, point2) {
        if (!point1 || !point2)
            return 0;
        point1.lon = _getLoop(point1.lon, -180, 180);
        point1.lat = _getRange(point1.lat, -74, 74);
        point2.lon = _getLoop(point2.lon, -180, 180);
        point2.lat = _getRange(point2.lat, -74, 74);
        var x1, x2, y1, y2;
        x1 = degreeToRad(point1.lon);
        y1 = degreeToRad(point1.lat);
        x2 = degreeToRad(point2.lon);
        y2 = degreeToRad(point2.lat);
        return EARTHRADIUS * Math.acos((Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)));
    }

    /**
     * 将度转化为弧度
     * @param {degree} Number 度
     * @returns {Number} 弧度
     */
    function degreeToRad(degree) {
        return Math.PI * degree / 180;
    }

    /**
     * 将v值限定在a,b之间，纬度使用
     */
    function _getRange(v, a, b) {
        if (a != null) {
            v = Math.max(v, a);
        }
        if (b != null) {
            v = Math.min(v, b);
        }
        return v;
    }


    /**
     * 将v值限定在a,b之间，经度使用
     */
    function _getLoop(v, a, b) {
        while (v > b) {
            v -= b - a
        }
        while (v < a) {
            v += b - a
        }
        return v;
    }

})(window);
