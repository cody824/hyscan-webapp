Ext.define('Module.Hyscan.Public.Opt', {
    singleton: true,

    requires: [],

    showDownloadWin: function (downloadInfo) {

        var infoGrid = Ext.create('Soul.view.PropertyGrid', {
            width: 300,
            propertyNames: {
                "size" : "文件大小",
                "taskNum" : "任务数目"
            },
            customRenderers: {
                "size" : Soul.util.RendererUtil.getCapacityStrFormBytes
            },
            properties : ["taskNum", "size"],
            source: downloadInfo
        });

        var win = new Ext.Window({
            title: "下载数据文件",
            items: infoGrid,
            stateful : false,
            autoDestroy:true,
            bodyStyle: 'padding:5px',
            modal:true,
            buttonAlign: 'center',
            buttons: [{
                text: "下载",
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
    }
});
