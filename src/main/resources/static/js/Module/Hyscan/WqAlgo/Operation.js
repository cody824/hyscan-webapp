Ext.define('Module.Hyscan.WqAlgo.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Hyscan.WqAlgo.Tools',
		
	],

	views : [
		
	],
	

	showUploadWin : function(callback) {
		var configType = "algoConfig";
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
				name: 'version',
				allowBlank : false,
				fieldLabel: "版本"
			},{
				name: 'file',
				allowBlank : false,
				xtype: 'filefield',
				fieldLabel: "jar包",
				buttonConfig : {
					text : '选择JAR包'
				}
			},{
				name: 'name',
				allowBlank : false,
				fieldLabel: "类名"
			}]
		});
		
		var win = new Ext.Window({
			title: "上传算法",
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: "上传",
				handler: function(){
					var form = formpanel.getForm();
					if(form.isValid()){
					    form.submit({
					        url: '/admin/algorithm/',
					        waitMsg: '算法包上传中',
					        header : {
					    		Accept : 'application/json'
					    	},
					        success: function(fp, o) {
					    		callback();
					    		win.close();
					    		Soul.uiModule.Message.msg("成功", "算法上传成功");
					        }, failure : function(a, b,c, d){
					        	Soul.util.MessageUtil.showErrorInfo("上传失败", "文件最大10MB");
					        }
					    });
					}
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

	doDelAlgo : function(record, callback) {
		
		Soul.Ajax.request({
			url : '/admin/algorithm/' + record.data.version,
			method : 'delete',
			confirm : '确认要删除该算法吗？',
			headers : {
				Accept : 'application/json'
			},
			success: function(response, opts) {
				callback();
		    }
		});
	},

	doSetAlgoCurrent : function(record, callback) {
		
		Soul.Ajax.request({
			url : '/admin/algorithm/' + record.data.version + "/current",
			method : 'PUT',
			confirm : '确认要把该算法设置为当前算法吗？',
			headers : {
				Accept : 'application/json'
			},
			success: function(response, opts) {
				callback();
		    }
		});
	}
});