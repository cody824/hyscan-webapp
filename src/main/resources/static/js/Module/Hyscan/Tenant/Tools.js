Ext.define('Module.Hyscan.Tenant.Tools', {
    singleton: true,

    requires: [
        'Soul.util.ObjectView'
    ],

    showUserInEast: function (id) {
        var me = this;
        Soul.Ajax.request({
            url: '/security/ud/' + id,
            method: 'get',
            success: function (ret) {
                var property = me.getUserPropertyGrid(ret);
                var avatar = ret.avatar || ret.avatarHd || "/img/defaultLogo.png";
                var panel = Ext.create('Ext.panel.Panel', {
                    items: [
                        Ext.create('Ext.Img', {
                            src: avatar,
                        }),
                        property
                    ]
                });
                Soul.util.ObjectView.showInEast(panel, ret.fullName);

            }
        })
    },

    getUserPropertyGrid: function (user) {
        var property = Soul.util.ObjectView.getObjectPropertyGrid(user, Module.Hyscan.Tenant.Config.getRendererConfig(),
            USER_PROPERTY, Module.Hyscan.Tenant.Config.showProperties, {
                iconCls: 'md-user'
            });
        return property;
    },

    constructor: function () {
        this.callParent(arguments);
    }

});
