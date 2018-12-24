Ext.define('Module.Hyscan.Statistics.Portlet', {
    extend: 'Soul.view.ModulePortlet',
    alias: 'widget.sauserportlet',

    requires: [
        'Module.Hyscan.Statistics.Data'
    ],

    VIEW: {
        'Module.Hyscan.Statistics.view.Map': "地图显示"
    },

    title: MODULE_NAME["Module.Hyscan.Statistics"],

    moduleName: 'Module.Hyscan.Statistics',

    moduleSessionView: 'Module.Hyscan.StatisticsCurrentView',

    dataObj: Module.Hyscan.Statistics.Data,

    configObj: Module.Hyscan.Statistics.Config,

    defaultView: 'Module.Hyscan.Statistics.view.Map',

    supportView: ['Module.Hyscan.Statistics.view.Map'],

    havUpdateButton: false,

    initComponent: function () {
        this.callParent(arguments);
    },

    initToolbar: function () {
        var toolbar = this.callParent(arguments);
        return toolbar;
    }
});




