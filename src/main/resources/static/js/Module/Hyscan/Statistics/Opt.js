Ext.define('Module.Hyscan.Statistics.Opt', {
    singleton: true,

    requires: [
        'Module.Hyscan.Statistics.view.ScanTaskGrid',
        'Module.Hyscan.Public.Tools'
    ],

    showTasksWin: function (tasks, map) {

        var infoGrid = Ext.create('Module.Hyscan.Statistics.view.ScanTaskGrid', {
            width: 800,
            height: 475,
            data: tasks,
            map: map
        });

        var win = new Ext.Window({
            title: HYSCAN_LABLE.pointTaskList,
            items: infoGrid,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true
        });
        win.show();
    },

    showTaskDataWin: function (task) {

        var tools = Module.Hyscan.Public.Tools;

        Soul.Ajax.request({
            url: '/app/scanTask/data/' + task.id,
            loadMask: LABEL.loading,
            successMsg: HYSCAN_LABLE.loadComplete,
            success: function (ret) {
                var range = ret.range;
                var wavelength = [];
                for (var i = range[0]; i <= range[1]; i++) {
                    wavelength.push(1.9799 * i - 934.5831);
                }
                var radiance = tools.getRadiance(ret.dn, ret.radianceConfig[0], ret.radianceConfig[1]);
                var reflectivity = tools.getReflectivity(ret.dn, ret.darkCurrent, ret.whiteboardData);
                var refForRm = [];
                for (var i = 0; i < reflectivity.length; i++) {
                    refForRm.push(reflectivity[i])
                }
                var rmPacketLine = tools.getRmPacketLine(ret.dn, wavelength, refForRm);
                var datas = [];
                for (var i = 0; i < wavelength.length; i++) {
                    var data = {};
                    data.wavelength = wavelength[i];
                    data.dn = ret.dn[i];
                    data.darkCurrent = ret.darkCurrent[i];
                    data.whiteboardData = ret.whiteboardData[i];
                    data.reflectivity = reflectivity[i];
                    data.radiance = radiance[i];
                    data.rmPacketLine = rmPacketLine[i];
                    datas.push(data);//<Number
                }
                var dataGrid = Ext.create("Module.Hyscan.Statistics.view.ScanTaskDataGrid", {
                    width: 800,
                    height: 600,
                    task: task,
                    data: datas
                });
                var win = new Ext.Window({
                    title: HYSCAN_LABLE.taskData + "[" + task.id + "]",
                    items: dataGrid,
                    stateful: false,
                    autoDestroy: true,
                    bodyStyle: 'padding:5px',
                    modal: true
                });
                win.show();
            },
            failure: function () {

            }
        });
    },

    showMarkWin: function (ids, isAll, cb) {

        var form = Ext.create("Ext.form.Panel", {
            labelWidth: 60,
            frame: true,
            width: 400,
            maxHeight: 500,
            defaults: {
                xtype: 'textfield',
                labelAlign: 'right',
                allowBlank: false,
                width: 350
            },
            items: [{
                name: 'scanTarget',
                fieldLabel: TASK_PROPERTY.scanTarget
            }]
        });

        var win = new Ext.Window({
            title: HYSCAN_LABLE.markTask,
            items: form,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: LABEL.save,
                handler: function () {
                    if (!form.getForm().isValid()) return;
                    var params = form.getForm().getValues();
                    Soul.Ajax.request({
                        url: '/admin/scanTask/scanTarget/?scanTarget=' + params.scanTarget,
                        method: 'post',
                        jsonData: ids,
                        loadMask: LABEL.executing,
                        confirm: isAll ? "确认要标记该地点所有任务吗？" : "确认要标记所选任务吗？",
                        success: function () {
                            cb(params.scanTarget);
                            win.close();
                        }
                    })
                }
            }]
        });
        win.show();
    },

});
