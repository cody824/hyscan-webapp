Ext.define('Module.Hyscan.Me.Portlet', {
    extend: 'Soul.view.ModulePortlet',

    requires: [
        'Module.Hyscan.Me.Operation',
        'Module.Hyscan.Me.Data',
        'Module.Hyscan.Me.store.UserDetailStore'
    ],

    VIEW: {
        'Module.Hyscan.Me.view.SetupView': '全部设置',
        'Module.Hyscan.Me.view.PasswdForm': '修改密码',
        // 'Module.Hyscan.Me.view.BaseInfoForm': '修改信息',
        'Module.Hyscan.Me.view.APIKeyForm': 'API KEY'
    },

    ICON: {
        'Module.Hyscan.Me.view.PasswdForm': '/img/icon32/key.png',
        // 'Module.Hyscan.Me.view.BaseInfoForm': '/img/icon32/info.png',
        'Module.Hyscan.Me.view.APIKeyForm': '/img/icon32/key.png'
    },

    title: USERMANAGE_LABEL.userInfo,

    moduleName: 'Module.Hyscan.Me',

    moduleSessionView: 'Module.Hyscan.MeCurrentView',

    dataObj: Module.Hyscan.Me.Data,

    configObj: Module.Hyscan.Me.Config,

    defaultView: 'Module.Hyscan.Me.view.SetupView',

    supportView: ['Module.Hyscan.Me.view.SetupView', 'Module.Hyscan.Me.view.PasswdForm', 'Module.Hyscan.Me.view.APIKeyForm'],

    havUpdateButton: false,

    initToolbar: function () {
        var me = this;
        var toolbar = this.callParent(arguments);
        toolbar.push({
            name: "navi",
            icon: '/img/icon/navigation.png',
            text: "全部设置",
            handler: function (btn, pressed, eObj) {
                me.down('toolbar').down('menuitem[view=Module.Hyscan.Me.view.SetupView]')
                    .setChecked(true);
            }
        });

        toolbar.push({
            name: "submit",
            icon: '/img/icon/submit.png',
            text: '提交'
        });
        toolbar.push({
            name: "reset",
            icon: '/img/icon/reset.png',
            text: '重置'
        });
        toolbar.push({
            name: "update",
            icon: '/img/icon/update.png',
            text: '更新配置'
        });
        return toolbar;
    }
});

