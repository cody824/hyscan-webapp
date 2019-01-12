Ext.define('Module.Hyscan.ModelConfig.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Hyscan.ModelConfig.Tools',
        "Module.Hyscan.ModelConfig.Config"
	],

	views : [
		
	],
	
	doRemoveModel : function(records, callback){
		var models = [];
		for (var i = 0; i < records.length; i++){
			models[i] = records[i].data.model;
		}
	
		Soul.Ajax.request({
			url : '/app/modelConfig/?models=' + models,
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

	editModelWin : function(record, callback) {

        var vnirStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "", "name": "不支持"},
                {"value": "VNIR1", "name": "VNIR1"}
            ]
        });

        var swirStore = Ext.create('Ext.data.Store', {
            fields: ['value', 'name'],
            data: [
                {"value": "", "name": "不支持"},
                {"value": "SWIR1", "name": "SWIR1"}
            ]
        });

        var spConfig = Module.Hyscan.ModelConfig.Config.spDeivceConfig;

		var formpanel = new Ext.FormPanel({
			labelWidth: 60,
			frame: true,
			width: 500,
			maxHeight : 800,
			defaults: {
				xtype: 'textfield',
				labelAlign: 'right',
				allowBlank : false,
				width: 400
			},
			items: [{
				name: 'model',
                fieldLabel: MODEL_CONFIG_PROPERTY.model
			},{
				name: 'desc',
				allowBlank : true,
                fieldLabel: MODEL_CONFIG_PROPERTY.desc
			},{
                name: 'dnMaxValue',
                xtype: 'numberfield',
                fieldLabel: MODEL_CONFIG_PROPERTY.dnMaxValue
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: MODEL_CONFIG_PROPERTY.radianceParams,
                labelWidth: 100,
                layout: 'hbox',
                items: [{
                    name : 'radianceParams',
                    xtype: 'numberfield',
                    allowBlank : false,
                    flex: 1
                }, {
                    xtype: 'splitter'
                }, {
                    name : 'radianceParams',
                    xtype: 'numberfield',
                    allowBlank : false,
                    flex: 1
                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: MODEL_CONFIG_PROPERTY.vnirRange,
                labelWidth: 100,
                layout: 'hbox',
                items: [{
                    name: 'vnir',
                    xtype: 'combo',
                    allowBlank: false,
                    store: vnirStore,
                    displayField: 'name',
                    valueField: 'value',
                    value: "",
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            var begin = field.next('numberfield');
                            var end = begin.next('numberfield');
                            var vnirModel = spConfig.vnir[newValue];
                            if (vnirModel) {
                                begin.enable();
                                end.enable();
                                begin.setValue(vnirModel.range[0]);
                                end.setValue(vnirModel.range[1])
                            } else {
                                begin.setValue(0);
                                end.setValue(0);
                                begin.disable();
                                end.disable();
                            }
                        }
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    name: 'vnirRange',
                    xtype: 'numberfield',
                    allowDecimals: false,
                    allowBlank: true,
                    minValue: 0,
                    flex: 1,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            calWaveLengths();
                        }
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    name: 'vnirRange',
                    xtype: 'numberfield',
                    allowDecimals: false,
                    allowBlank: true,
                    minValue: 0,
                    flex: 1,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            calWaveLengths();
                        }
                    }
                }]
            }, {
                xtype: 'fieldcontainer',
                fieldLabel: MODEL_CONFIG_PROPERTY.swirRange,
                labelWidth: 100,
                layout: 'hbox',
                items: [{
                    name: 'swir',
                    xtype: 'combo',
                    allowBlank: false,
                    store: swirStore,
                    displayField: 'name',
                    valueField: 'value',
                    value: "",
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            var begin = field.next('numberfield');
                            var end = begin.next('numberfield');
                            var swirModel = spConfig.swir[newValue];
                            if (swirModel) {
                                begin.enable();
                                end.enable();
                                begin.setValue(swirModel.range[0]);
                                end.setValue(swirModel.range[1])
                            } else {
                                begin.setValue(0);
                                end.setValue(0);
                                begin.disable();
                                end.disable();
                            }
                        }
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    name: 'swirRange',
                    xtype: 'numberfield',
                    allowDecimals: false,
                    allowBlank: true,
                    minValue: 0,
                    flex: 1,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            calWaveLengths();
                        }
                    }
                }, {
                    xtype: 'splitter'
                }, {
                    name: 'swirRange',
                    xtype: 'numberfield',
                    allowDecimals: false,
                    allowBlank: true,
                    minValue: 0,
                    flex: 1,
                    listeners: {
                        change: function (field, newValue, oldValue, eOpts) {
                            calWaveLengths()
                        }
                    }
                }]
            }, {
				name: 'wavelengths',
				xtype : 'textarea',
				allowBlank : false,
				readOnly : true,
                fieldLabel: MODEL_CONFIG_PROPERTY.wavelengths
			}]
		});
		
		function calRange(bv, ev){
			var wavelengths = [];
			for (var i = bv; i <= ev; i++) {
				wavelengths.push((1.9799 * i - 934.5831).toFixed(2));
			}
			formpanel.down('textarea[name=wavelengths]').setValue(wavelengths);
		}

        function calWaveLengths() {
            var params = formpanel.getForm().getValues();
            var wavelengths = [];
            if (params.vnir) {
                var vnirModel = spConfig.vnir[params.vnir];
                var bv = parseInt(params.vnirRange[0]);
                var ev = parseInt(params.vnirRange[1]);
                if (ev > bv) {
                    for (var i = bv; i <= ev; i++) {
                        wavelengths.push(vnirModel.toW(i));
                    }
                }
            }
            if (params.swir) {
                var swirModel = spConfig.swir[params.swir];
                var bv = parseInt(params.swirRange[0]);
                var ev = parseInt(params.swirRange[1]);
                if (ev > bv) {
                    for (var i = bv; i <= ev; i++) {
                        wavelengths.push(swirModel.toW(i));
                    }
                }
            }
            formpanel.down('textarea[name=wavelengths]').setValue(wavelengths);
        }

        var title = HYSCAN_LABLE.createModel;
		if (record) {
			formpanel.getForm().setValues(record.data);
			formpanel.down('[name=radianceParams]').next('[name=radianceParams]').setValue(record.data.radianceParams[1]);
            if (record.data.vnirRange && record.data.vnirRange.length == 2) {
                formpanel.down('[name=vnirRange]').next('[name=vnirRange]').setValue(record.data.vnirRange[1]);
            }
            if (record.data.swirRange && record.data.swirRange.length == 2) {
                formpanel.down('[name=swirRange]').next('[name=swirRange]').setValue(record.data.swirRange[1]);
            }
			formpanel.down('[name=model]').setReadOnly(true);
            title = HYSCAN_LABLE.editModel;
		}

		var win = new Ext.Window({
			title: title,
			items: formpanel,
			stateful : false,
			autoDestroy:true,
			maxHeight : 500,
			overflowY : 'auto',
			bodyStyle: 'padding:5px',
			modal:true,
			buttonAlign: 'center',
			buttons: [{
				text: LABEL.save,
				handler: function(){
                    calWaveLengths();
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

                    var wavelengths = [];
					var wArray = params.wavelengths.split(',');
					for (var i = 0; i < wArray.length; i++) {
						wavelengths.push(wArray[i]);
					}
					params.wavelengths = wavelengths;

					Soul.Ajax.request({
						url : '/app/modelConfig/',
						method : 'post',
						headers : {
							"Content-Type": "application/json; charset=utf-8", 
							Accept : 'application/json'
						},
						jsonData : params,
						success: function(response, opts) {
					        win.close();
					        if (typeof callback == "function")
					        	callback();
					    },
					    failure: function(response, opts) {
					        console.log('server-side failure with status code ' + response.status);
					    }
						
					});
				}
			}, {
				text: LABEL.cancel,
				handler: function(){
					win.close();
				}
			}]
		});

		win.show();
	}
});