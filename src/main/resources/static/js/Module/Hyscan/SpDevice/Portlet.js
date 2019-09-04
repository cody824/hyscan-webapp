Ext.define('Module.Hyscan.SpDevice.Portlet', {
    extend: 'Soul.view.ModulePortlet',

    requires: [
        'Module.Hyscan.SpDevice.Opt',
        'Module.Hyscan.SpDevice.Data',
        'Module.Hyscan.SpDevice.store.Store'
    ],

    VIEW: {
        'Module.Hyscan.SpDevice.view.Grid': LABEL.grid
    },

    title: MODULE_NAME["Module.Hyscan.SpDevice"],

    moduleName: 'Module.Hyscan.SpDevice',

    moduleSessionView: 'Module.Hyscan.SpDeviceCurrentView',

    dataObj: Module.Hyscan.SpDevice.Data,

    configObj: Module.Hyscan.SpDevice.Config,

    defaultView: 'Module.Hyscan.SpDevice.view.Grid',

    supportView: ['Module.Hyscan.SpDevice.view.Grid'],

    havUpdateButton: false,

    buildOptMenu: function () {
        var menu = Ext.create('Ext.menu.Menu', {
            name: 'absMenu',
            style: {
                overflow: 'visible'     // For the Combo popup
            },
            items: [
                // {
                //     text: "增加",
                //     disabled: false,
                //     name: 'add',
                //     icon: '/img/icon/add.png'
                // }, {
                //     text: "编辑",
                //     disabled: true,
                //     name: 'edit',
                //     needSelect: true,
                //     icon: '/img/icon/change.png'
                // },
                {
                    text: "删除",
                    disabled: true,
                    name: 'delete',
                    needSelect: true,
                    icon: '/img/icon/del.png'
                }
            ]
        });
        return menu;
    },

    initToolbar: function () {
        var toolbar = this.callParent(arguments),
            optMenu = {
                text: "操作",
                iconCls: 'pool_setting',
                menu: this.buildOptMenu()
            };
        toolbar.push(optMenu);
        return toolbar;
    }
});