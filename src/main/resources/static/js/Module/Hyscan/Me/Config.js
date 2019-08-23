Ext.define('Module.Hyscan.Me.Config', {
    singleton: true,

    requires: ['Soul.util.RendererUtil'],

    showProperties: ['fullName', 'email', 'mobile'],

    getRendererConfig: function () {
        return {};
    },

    initConfig: function () {
    },

    constructor: function () {
        this.callParent(arguments);
    }
});
