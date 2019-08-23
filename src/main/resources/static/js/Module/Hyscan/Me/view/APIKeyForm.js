Ext.define('Module.Hyscan.Me.view.APIKeyForm', {
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
            name: 'accessKey',
            readOnly: true,
            fieldLabel: "Access Key"
        }, {
            name: 'securityKey',
            readOnly: true,
            fieldLabel: "Security Key"
        }];

        this.callParent(arguments);
        this.update();
    },

    userId: null,

    submit: function () {
        var me = this;
        Soul.Ajax.request({
            url: "/security/api/key",
            confirm: "确认要生成API Key吗？生成后旧API  Key将不能使用",
            method: 'post',
            success: function (ret) {
                me.getForm().setValues(ret);
            }
        });
    },

    update: function () {
        var me = this;
        Soul.Ajax.request({
            url: "/security/api/key/",
            loadMask: '载入配置',
            quiet: true,
            method: 'get',
            success: function (ret) {
                me.getForm().setValues(ret);
            }
        })
    },

    updateView: function (scope) {
        var me = scope || this;
        me.submitButton = me.portlet.down('toolbar')
            .down('button[name=submit]'), me.resetButton = me.portlet.down(
            'toolbar').down('button[name=reset]');
        me.updateButton = me.portlet.down('toolbar')
            .down('button[name=update]');
        me.portlet.down('toolbar').down('button[name=navi]').show();
        me.submitButton.show();
        // me.submitButton.setDisabled(true);
        me.submitButton.setText("生成KEY")
        me.submitButton.setHandler(me.submit, me);
        me.resetButton.hide();
        me.updateButton.hide();
        me.updateButton.setHandler(me.update, me);
    }

});
