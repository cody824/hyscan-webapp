Ext.define('Module.Hyscan.Me.view.BaseInfoForm', {
    extend: 'Soul.view.SetupFormPanel',

    requires: [
        'Soul.util.RendererUtil',
        'Soul.util.GridRendererUtil',
        'Module.Hyscan.Me.Data',
        'Module.Hyscan.Me.Renderer',
        'Module.Hyscan.Me.Operation',
        'Soul.util.ObjectView',
        'Soul.ux.grid.feature.Searching'
    ],

    defaults: {
        xtype: 'textfield',
        labelAlign: 'right',
        allowBlank: false,
        width: 350
    },


    initComponent: function () {

        this.items = [{
            name: 'id',
            hidden: true
        }, {
            name: 'nick',
            disabled: true,
            fieldLabel: "登录名"
        }, {
            name: 'fullName',
            fieldLabel: "姓名"
        }, /*{
            name: 'email',
            fieldLabel: "Email"
        },*/{
            name: 'mobile',
            fieldLabel: "手机"
        }];

        this.callParent(arguments);
        this.update();
    },

    userId: null,

    submit: function () {
        if (!this.getForm().isValid()) return;
        var me = this;
        Soul.Ajax.request({
            url: '/security/ud/' + me.userId,
            loadMask: '更新中',
            quiet: true,
            method: 'put',
            jsonData: me.getForm().getValues(),
            success: function (ret) {
                me.update();
            }
        })
    },

    update: function () {
        var me = this;
        Soul.Ajax.request({
            url: '/security/ud/loginInfo',
            loadMask: '载入配置',
            quiet: true,
            method: 'get',
            success: function (ret) {
                me.getForm().setValues(ret);
                me.userId = ret.id;
            }
        })
    }

});
