Ext.define('Module.Hyscan.Statistics.Tools', {
    singleton: true,

    showTaskInEast: function (task) {
        var me = this;
        var property = me.getTaskPropertyGrid(task);
        var image = task.imagePath || "/img/defaultLogo.png";
        var panel = Ext.create('Ext.panel.Panel', {
            items: [
                Ext.create('Ext.Img', {
                    src: image,
                    height: 128,
                    maxWidth: 128
                }),
                property
            ]
        });
        Soul.util.ObjectView.showInEast(panel, task.id);
    },

    getTaskPropertyGrid: function (task) {
        var property = Soul.util.ObjectView.getObjectPropertyGrid(task, {
                appId: function (val) {
                    return Soul.util.RendererUtil.qtip(APPID_VIEW[val] || val);
                },
                id: Soul.util.RendererUtil.qtip,
                city: Soul.util.RendererUtil.qtip,
                address: Soul.util.RendererUtil.qtip,
                deviceModel: Soul.util.RendererUtil.qtip,
                deviceSerial: Soul.util.RendererUtil.qtip,
                scanTarget: Soul.util.RendererUtil.qtip,
                scanTime: function (val) {
                    return Soul.util.RendererUtil.qtip(val)
                }
            },
            TASK_PROPERTY, ["id", "appId", "city", "address", "deviceModel", "deviceSerial", "scanTarget", "scanTime"], {
                iconCls: 'md-user'
            });
        return property;
    },

});
