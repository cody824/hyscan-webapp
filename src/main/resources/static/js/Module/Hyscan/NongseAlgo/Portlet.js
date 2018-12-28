Ext.define('Module.Hyscan.NongseAlgo.Portlet', {
    extend: 'Soul.view.ModulePortlet',

    VIEW: {
        'Module.Hyscan.NongseAlgo.view.Panel': LABEL.grid
    },

    title: MODULE_NAME['Module.Hyscan.NongseAlgo'],

    moduleName: 'Module.Hyscan.NongseAlgo',

    moduleSessionView: 'Module.Hyscan.NongseAlgoCurrentView',

    dataObj: Module.Hyscan.NongseAlgo.Data,

    configObj: Module.Hyscan.NongseAlgo.Config,

    defaultView: 'Module.Hyscan.NongseAlgo.view.Panel',

    supportView: ['Module.Hyscan.NongseAlgo.view.Panel'],

    havUpdateButton: false,

    initComponent: function () {
        this.callParent(arguments);
    }
});
