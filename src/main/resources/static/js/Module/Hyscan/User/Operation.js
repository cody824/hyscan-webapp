Ext.define('Module.Hyscan.User.Operation', {
    singleton: true,

    showApiKey: function (user) {

        Soul.Ajax.request({
            url: "/security/api/key/?userId=" + user.id,
            method: 'get',
            success: function (ret) {
                console.log(ret);
                ret = ret || {"accessKey": "", "securityKey": ""};
                var infoGrid = Ext.create('Soul.view.PropertyGrid', {
                    width: 300,
                    propertyNames: {
                        "accessKey": "访问KEY",
                        "securityKey": "安全秘钥"
                    },
                    customRenderers: {
                        "size": Soul.util.RendererUtil.getCapacityStrFormBytes
                    },
                    properties: ["accessKey", "securityKey"],
                    source: ret
                });

                var win = new Ext.Window({
                    title: "ApiKey",
                    items: infoGrid,
                    stateful: false,
                    autoDestroy: true,
                    bodyStyle: 'padding:5px',
                    modal: true,
                    buttonAlign: 'center',
                    buttons: [{
                        text: "生成新的安全秘钥",
                        handler: function () {
                            Soul.Ajax.request({
                                url: "/security/api/key/?userId=" + user.id,
                                method: 'post',
                                success: function (ret) {
                                    delete ret.createTime;
                                    delete ret.enable;
                                    delete ret.userId;
                                    infoGrid.setSource(ret);
                                }
                            });
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


    }
});
