Ext.define('Module.Hyscan.AlgoConfig.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
        'Soul.ux.EmailDomainBox'
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

    showTestWin: function (algo) {

        var modelFields = ["model", "key", "wavelengths", "desc"];
        var modelStore = new Ext.create('Ext.data.Store', {
            fields: modelFields,
            autoLoad: true,
            proxy: {
                type: 'ajax',
                url: '/app/modelConfig/',
                reader: {
                    type: 'json'
                }
            }
        });

        var appStore = Ext.create('Ext.data.Store', {
            fields: ['key', 'name'],
            data: [
                {"key": "caizhi", "name": "Hyscan"},
                {"key": "shuise", "name": "水色"},
                {"key": "meise", "name": "煤色"}
            ]
        });


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
                allowBlank: true,
                value: algo.version,
                // disabled : true,
                readOnly: true,
                fieldLabel: "算法版本"
            }, {
                name: 'appId',
                xtype: 'combo',
                allowBlank: false,
                fieldLabel: "型号",
                store: appStore,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'key',
                fieldLabel: "APP"
            }, {
                name: 'model',
                xtype: 'combo',
                allowBlank: false,
                fieldLabel: "型号",
                store: modelStore,
                queryMode: 'remote',
                displayField: 'model',
                valueField: 'key'
            }, {
                name: 'target',
                allowBlank: true,
                blankText: '可以为空',
                fieldLabel: "目标类型"
            }, {
                name: 'data',
                xtype: 'textarea',
                allowBlank: false,
                fieldLabel: "反射率"
            }, {
                name: 'result',
                xtype: 'textarea',
                allowBlank: true,
                readOnly: true,
                fieldLabel: "结果"
            }]
        });

        var win = new Ext.Window({
            title: "上传算法",
            items: formpanel,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: "计算",
                handler: function () {
                    var form = formpanel.getForm();
                    if (form.isValid()) {
                        var values = formpanel.getValues();

                        var url = '/app/analysis/' + values.appId + '?model=' + values.model + "&algo=" + algo.version;
                        if (values.target.length > 0) {
                            url += "&target=" + values.target;
                        }

                        var datas = values.data.split(',');

                        Soul.Ajax.request({
                            url: url,
                            method: 'post',
                            loadMask: '计算中',
                            successMsg: '计算完成',
                            jsonData: datas,
                            headers: {
                                Accept: 'application/json'
                            },
                            success: function (result, opts) {
                                taskResult = "";
                                for (var i = 0; i < result.data.length; i++) {
                                    var title = result.chineseName[i].replace(new RegExp("&nbsp;", "gm"), " ");
                                    var unit = result.unit[i].replace(new RegExp("&nbsp;", "gm"), " ");

                                    var decimal = 2;
                                    if (result.decimal) {
                                        decimal = parseInt(result.decimal[i]);
                                    }
                                    var data = result.data[i] + "";
                                    if (data.length > 6)
                                        data = data.substring(0, 6);
                                    data = parseFloat(data).toFixed(decimal);
                                    if (data < 0)
                                        data = "无效";
                                    taskResult += title + ":" + data + " " + unit + "\n";
                                }
                                formpanel.down('[name=result]').setValue(taskResult);
                            }
                        });

                    }
                }
            }, {
                text: LABEL.cancel,
                handler: function () {
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