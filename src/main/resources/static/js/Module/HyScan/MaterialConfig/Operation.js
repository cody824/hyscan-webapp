Ext.define('Module.Hyscan.MaterialConfig.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Hyscan.MaterialConfig.Tools',
		
	],

	views : [
		
	],
	

	showEditWin : function(record, callback) {
		var configType = "materialConfig";
		var settingName = "hyscan";

		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				width: 400
			},
			items: [{
				name: 'key',
				fieldLabel: "索引"
			},{
				name: 'value',
				fieldLabel: "材料名称"
			}]
		});
		
		if (record != null) {
			formpanel.getForm().setValues(record.data);
			formpanel.down('[name=key]').setReadOnly(true);
		}

		var win = new Ext.Window({
			title: "索引编辑",
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();
					console.log(params);
					
					// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
					Soul.Ajax.restAction('/globalconfig/materialConfig/hyscan',
						'put', params, params, function(ret){
							callback();
							
							win.close();
						}, null, null);
				}
			},{
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	},

	doDelIndex : function(record, callback) {
		
		Soul.Ajax.request({
			url : '/globalconfig/materialConfig/hyscan?key=' + record.data.key,
			method : 'delete',
			confirm : '确认要删除该配置吗？',
			headers : {
				Accept : 'application/json'
			},
			success: function(response, opts) {
				callback();
		    }
		});
	}
});