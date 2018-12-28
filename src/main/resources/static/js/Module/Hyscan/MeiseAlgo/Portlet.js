Ext.define('Module.Hyscan.MeiseAlgo.Portlet', {
    extend: 'Soul.view.ModulePortlet',

    VIEW: {
        'Module.Hyscan.MeiseAlgo.view.Panel': LABEL.grid
    },

    title: MODULE_NAME['Module.Hyscan.MeiseAlgo'],

    moduleName: 'Module.Hyscan.MeiseAlgo',

    moduleSessionView: 'Module.Hyscan.MeiseAlgoCurrentView',

    dataObj: Module.Hyscan.MeiseAlgo.Data,

    configObj: Module.Hyscan.MeiseAlgo.Config,

    defaultView: 'Module.Hyscan.MeiseAlgo.view.Panel',

    supportView: ['Module.Hyscan.MeiseAlgo.view.Panel'],

    havUpdateButton: false,

    initComponent: function () {
        this.callParent(arguments);
    }
});
