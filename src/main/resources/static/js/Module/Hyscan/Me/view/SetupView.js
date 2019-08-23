Ext.define('Module.Hyscan.Me.view.SetupView', {
    extend: 'Soul.view.SetupNaviPanel',

    requires: [],

    HELPMESSAGE: {
        'Module.Hyscan.Me.view.PasswdForm': '修改登录密码',
        // 'Module.Hyscan.Me.view.BaseInfoForm': '修改个人基本信息，用户名，邮箱等',
        'Module.Hyscan.Me.view.APIKeyForm': '配置生成API Key'
    },

    initComponent: function () {
        var me = this;


        this.callParent(arguments);
    },

    afterRender: function () {
        var me = this;
        me.callParent(arguments);
    }
});
