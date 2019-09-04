Ext.define('Module.Hyscan.Public.Opt', {
    singleton: true,

    requires: [],

    showDownloadWin: function (downloadInfo) {

        var infoGrid = Ext.create('Soul.view.PropertyGrid', {
            width: 300,
            propertyNames: {
                "size": HYSCAN_LABLE.fileSize,
                "taskNum": HYSCAN_LABLE.taskNum
            },
            customRenderers: {
                "size" : Soul.util.RendererUtil.getCapacityStrFormBytes
            },
            properties : ["taskNum", "size"],
            source: downloadInfo
        });

        var win = new Ext.Window({
            title: HYSCAN_LABLE.downloadDataNum,
            items: infoGrid,
            stateful : false,
            autoDestroy:true,
            bodyStyle: 'padding:5px',
            modal:true,
            buttonAlign: 'center',
            buttons: [{
                text: HYSCAN_LABLE.download,
                href : downloadInfo.url,
                hrefTarget : '_blank'
            }, {
                text: LABEL.cancel,
                handler: function(){
                    win.close();
                }
            }]
        });
        win.show();
    },

    showResultRet: function (task, customColumns) {
        var infoGrid = Ext.create('Module.Hyscan.Public.view.ScanTaskResultGrid', {
            width: 800,
            height: 400,
            task: task,
            customColumns: customColumns
        });
        var win = new Ext.Window({
            title: HYSCAN_LABLE.resultSet + "[" + task.id + "]",
            items: infoGrid,
            layout: 'fit',
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true
        });
        win.show();
    }

    ,

    calResultRet: function (task, cb) {

        var algoFields = ["version", "path", "name", "valid"];
        var algoStore = new Ext.create('Ext.data.Store', {
            fields: algoFields,
        });

        var configUrl = '/globalconfig/algoConfig/hyscan?fetch=true';
        Soul.Ajax.restAction(configUrl, 'get', null, null, function (ret) {
            ret = ret || {};
            var algoList = [];
            var currentAlgoVersion = ret.currentAlgoVersion;
            Ext.Object.each(ret, function (k, v, self) {
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
                    if (algo.valid) {
                        algoList.push(algo);
                    }
                }
            });
            algoStore.loadData(algoList);
        }, HYSCAN_LABLE.loadingAlgo, null);


        var formPanel = new Ext.FormPanel({
            frame: true,
            width: 300,
            maxHeight: 800,
            layout: 'column',//重点
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: true,
                columnWidth: .99,
                labelWidth: 65,
                anchor: '90%'
                // width: 350
            },
            items: [{
                name: 'algo',
                xtype: 'combo',
                allowBlank: false,
                fieldLabel: HYSCAN_LABLE.algoVersion,
                store: algoStore,
                queryMode: 'local',
                displayField: 'version',
                valueField: 'version'
            }, {
                xtype: 'checkbox',
                name: 'use',
                fieldLabel: HYSCAN_LABLE.defaultResult,
            }]
        });

        var win = new Ext.Window({
            title: HYSCAN_LABLE.calResult + "[" + task.id + "]",
            items: formPanel,
            layout: 'fit',
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: HYSCAN_LABLE.cal,
                icon: '/img/icon/cal.png',
                handler: function () {
                    var vaules = formPanel.getForm().getValues();
                    Soul.Ajax.request({
                        url: '/app/analysis/task/' + task.id,
                        method: 'post',
                        loadMask: HYSCAN_LABLE.caling,
                        successMsg: HYSCAN_LABLE.calComplete,
                        params: vaules,
                        success: function () {
                            cb();
                            win.close();
                        }
                    })
                }
            }, {
                text: LABEL.cancel,
                handler: function () {
                    win.close();
                }
            }]
        });
        win.show();
    }
});
