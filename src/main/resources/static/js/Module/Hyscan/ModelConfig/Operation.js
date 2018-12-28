Ext.define('Module.Hyscan.ModelConfig.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Hyscan.ModelConfig.Tools',
		
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
            },{
		        xtype: 'fieldcontainer',
                fieldLabel: MODEL_CONFIG_PROPERTY.spectralRange,
		        labelWidth: 100,
		        layout: 'hbox',
		        items: [{
		        	name : 'spectralRange',
		        	xtype: 'numberfield',
		        	allowDecimals : false,
		        	allowBlank : false,
		        	minValue : 0,
		        	maxValue : 2048,
		        	flex: 1,
		        	listeners : {
			        	change : function ( field, newValue, oldValue, eOpts ) {
			        		var bv = field.getValue();
			        		var end = field.next('numberfield');
			        		end.setMinValue(bv);
			        		var ev = end.getValue();
			        		if (ev > bv) {
			        			calRange(bv, ev);
			        		}
			        	}
		        	}
		        }, {
		            xtype: 'splitter'
		        }, {
		        	name : 'spectralRange',
		            xtype: 'numberfield',
		            allowDecimals : false,
		            allowBlank : false,
			        minValue : 0,
		        	maxValue : 2048,
		            flex: 1,
		        	listeners : {
			        	change : function ( field, newValue, oldValue, eOpts ) {
				        		var ev = field.getValue();
				        		var begin = field.prev('numberfield');
				        		begin.setMaxValue(ev);
				        		var  bv = begin.getValue();
				        		if (ev > bv) {
				        			calRange(bv, ev);
				        		}
			        	}
		        	}
		        }]
			},{
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

        var title = HYSCAN_LABLE.createModel;
		if (record) {
			formpanel.getForm().setValues(record.data);
			formpanel.down('[name=radianceParams]').next('[name=radianceParams]').setValue(record.data.radianceParams[1]);
			formpanel.down('[name=spectralRange]').next('[name=spectralRange]').setValue(record.data.spectralRange[1]);
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
					if (!formpanel.getForm().isValid()) return;

					var params = formpanel.getForm().getValues();

                    var wavelengths = [];
					var wArray = params.wavelengths.split(',');
					for (var i = 0; i < wArray.length; i++) {
						wavelengths.push(wArray[i]);
					}
					params.wavelengths = wavelengths;
					var dataNum = wavelengths.length;

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