Ext.define('Module.Hyscan.Tenant.Portlet', {
    extend: 'Soul.view.ModulePortlet',
    alias: 'widget.sauserportlet',

    requires: [
        'Module.Hyscan.Tenant.Data'
    ],

    VIEW: {
        'Module.Hyscan.Tenant.view.Grid': LABEL.grid
    },

    title: MODULE_NAME["Module.Hyscan.Tenant"],

    moduleName: 'Module.Hyscan.Tenant',

    moduleSessionView: 'Module.Hyscan.TenantCurrentView',

    dataObj: Module.Hyscan.Tenant.Data,

    configObj: Module.Hyscan.Tenant.Config,

    defaultView: 'Module.Hyscan.Tenant.view.Grid',

    supportView: ['Module.Hyscan.Tenant.view.Grid'],

    havUpdateButton: false,

    initComponent: function () {
        this.callParent(arguments);
    },

    buildUserOptMenu: function () {
        var menu = Ext.create('Ext.menu.Menu', {
            name: 'useroperation',
            style: {
                overflow: 'visible'     // For the Combo popup
            },
            items: [{
                text: HYSCAN_LABLE.addTenant,
                name: 'add',
                icon: '/img/icon/add.png'
            }]
        });
        return menu;
    },

    initToolbar: function () {
        var toolbar = this.callParent(arguments),
            userMenu = {
                text: LABEL.operation,
                iconCls: 'pool_setting',
                menu: this.buildUserOptMenu()
            };

        toolbar.push(userMenu);
        return toolbar;
    }
});




