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
                fieldLabel: LABEL.version
			},{
				name: 'file',
				allowBlank : false,
				xtype: 'filefield',
                fieldLabel: HYSCAN_LABLE.jar,
				buttonConfig : {
                    text: HYSCAN_LABLE.selectJar
				}
			},{
				name: 'name',
				allowBlank : false,
                fieldLabel: HYSCAN_LABLE.className
			}]
		});
		
		var win = new Ext.Window({
            title: HYSCAN_LABLE.uploadWin,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
                text: HYSCAN_LABLE.upload,
				handler: function(){
					var form = formpanel.getForm();
					if(form.isValid()){
					    form.submit({
					        url: '/admin/algorithm/',
                            waitMsg: HYSCAN_LABLE.uploadWaitMsg,
					        header : {
					    		Accept : 'application/json'
					    	},
					        success: function(fp, o) {
					    		callback();
					    		win.close();
                                Soul.uiModule.Message.msg(LABEL.success, HYSCAN_LABLE.uploadSuccess);
					        }, failure : function(a, b,c, d){
                                Soul.util.MessageUtil.showErrorInfo(LABEL.failure, HYSCAN_LABLE.max10Mb);
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


        var appData = [];

        Ext.Object.each(APPID_VIEW, function (key, value) {
            appData.push({
                key: key, name: value
            })
        });

        var appStore = Ext.create('Ext.data.Store', {
            fields: ['key', 'name'],
            data: appData
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
                fieldLabel: HYSCAN_LABLE.algoVersion
            }, {
                name: 'appId',
                xtype: 'combo',
                allowBlank: false,
                store: appStore,
                queryMode: 'local',
                displayField: 'name',
                valueField: 'key',
                fieldLabel: "APP"
            }, {
                name: 'model',
                xtype: 'combo',
                allowBlank: false,
                fieldLabel: LABEL.model,
                store: modelStore,
                queryMode: 'remote',
                displayField: 'model',
                valueField: 'key'
            }, {
                name: 'target',
                allowBlank: true,
                blankText: HYSCAN_LABLE.canEmpty,
                fieldLabel: HYSCAN_LABLE.targetType
            }, {
                name: 'data',
                xtype: 'textarea',
                allowBlank: false,
                fieldLabel: HYSCAN_LABLE.reflectivity
            }, {
                name: 'result',
                xtype: 'textarea',
                allowBlank: true,
                readOnly: true,
                fieldLabel: HYSCAN_LABLE.result
            }]
        });

        var win = new Ext.Window({
            title: HYSCAN_LABLE.testWin,
            items: formpanel,
            stateful: false,
            autoDestroy: true,
            bodyStyle: 'padding:5px',
            modal: true,
            buttonAlign: 'center',
            buttons: [{
                text: HYSCAN_LABLE.cal,
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
                            loadMask: HYSCAN_LABLE.caling,
                            successMsg: HYSCAN_LABLE.calComplete,
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
                                        data = HYSCAN_LABLE.invalid;
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
            confirm: HYSCAN_LABLE.confirmDeleteAlgo,
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
            confirm: HYSCAN_LABLE.confirmCurrentAlgo,
			headers : {
				Accept : 'application/json'
			},
			success: function(response, opts) {
				callback();
		    }
		});
	}
});