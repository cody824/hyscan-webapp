Ext.define('Module.Hyscan.SchoolAlgo.Portlet', {
    extend: 'Soul.view.ModulePortlet',

    VIEW: {
        'Module.Hyscan.SchoolAlgo.view.Panel': LABEL.grid
    },

    title: MODULE_NAME['Module.Hyscan.SchoolAlgo'],

    moduleName: 'Module.Hyscan.SchoolAlgo',

    moduleSessionView: 'Module.Hyscan.SchoolAlgoCurrentView',

    dataObj: Module.Hyscan.SchoolAlgo.Data,

    configObj: Module.Hyscan.SchoolAlgo.Config,

    defaultView: 'Module.Hyscan.SchoolAlgo.view.Panel',

    supportView: ['Module.Hyscan.SchoolAlgo.view.Panel'],

    havUpdateButton: false,

    initComponent: function () {
        this.callParent(arguments);
    }
});
