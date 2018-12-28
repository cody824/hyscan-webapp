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
    }
});
