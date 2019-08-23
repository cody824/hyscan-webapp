Ext.define('Module.Hyscan.Me.view.PasswdForm', {
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
            name: 'oldPassword',
            inputType: 'password',
            minLength: 6,
            maxLength: 30,
            fieldLabel: "旧密码"
        }, {
            name: 'newPassword',
            id: 'password',
            inputType: 'password',
            minLength: 6,
            maxLength: 30,
            fieldLabel: "新密码"
        }, {
            name: 'rePassword',
            inputType: 'password',
            passwordField: 'password',
            vtype: 'confirmPwd',
            fieldLabel: "确认密码"
        }];

        this.callParent(arguments);
    },

    submit: function () {
        if (!this.getForm().isValid()) return;
        var me = this;
        Soul.Ajax.request({
            url: '/security/user/password',
            loadMask: '更新中',
            method: 'put',
            successMsg: '修改成功',
            params: me.getForm().getValues(),
            success: function (ret) {
                me.reset();
            }
        })
    },

    updateView: function () {
        var me = this;
        me.callParent(arguments);
        me.updateButton.hide();
    }

});
