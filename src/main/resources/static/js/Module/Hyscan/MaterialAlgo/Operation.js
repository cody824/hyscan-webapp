Ext.define('Module.Hyscan.MaterialAlgo.Operation', {
	singleton: true, 
	
	requires  : [
		'Soul.util.HelpUtil',
		'Soul.util.ObjectView', 
		'Soul.view.WizardWindow',
		'Soul.util.ObjectConfig',
		'Soul.ux.EmailDomainBox',
		'Module.Hyscan.MaterialAlgo.Tools',
		
	],

	views : [
		
	],
	
	doRemoveModel : function(records, callback){
		var models = [];
		for (var i = 0; i < records.length; i++){
			models[i] = records[i].data.model;
		}
	
		Soul.Ajax.request({
			url : '/app/materialAlgoConfig/?models=' + models,
			method : 'delete',
			confirm : '确认要删除该型号配置吗',
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
				fieldLabel: "型号"
			},/*{
				name: 'desc',
				allowBlank : true,
				fieldLabel: "描述"
			},{
		        xtype: 'fieldcontainer',
		        fieldLabel: '辐亮度参数',
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
			},*//*{
		        xtype: 'fieldcontainer',
		        fieldLabel: '光谱坐标范围',
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
				fieldLabel: "波长范围"
			},*/{
				name: 'olderLevelNormData',
				xtype : 'textarea',
				allowBlank : false,
				fieldLabel: "标准光谱数据"
			},{
	        	name : 'materialThreshold',
	        	xtype: 'numberfield',
	        	allowBlank : false,
	        	fieldLabel: "材料检测阈值"
	        },{
		        // Fieldset in Column 1 - collapsible via toggle button
		        xtype:'fieldset',
		        columnWidth: 0.5,
		        title: '材质光谱数据',
		        collapsible: true,
		        defaultType: 'textarea',
		        defaults: {anchor: '100%'},
		        layout: 'anchor',
		        items :[{
		        	xtype: 'fieldcontainer',
			        fieldLabel: '',
			        labelWidth: 100,
			        layout: 'hbox',
			        items: [{
			        	name : 'materialNormData',
			        	xtype: 'textarea',
			        	allowBlank : false,
			        	flex: 1
			        }, {
			            xtype: 'splitter'
			        }, {
			        	iconCls : 'x-add-icon',
			            xtype: 'button',
			            handler : function(addBtn){
				        	formpanel.down('fieldset').add({
					        	xtype: 'fieldcontainer',
						        fieldLabel: '',
						        labelWidth: 100,
						        layout: 'hbox',
						        items: [{
						        	name : 'materialNormData',
						        	xtype: 'textarea',
						        	flex: 1
						        }, {
						            xtype: 'splitter'
						        }, {
						        	iconCls : 'x-del-icon',
						            xtype: 'button',
						            handler : function(delBtn){
						        		var cner = delBtn.up('fieldcontainer');
						        		var fset = delBtn.up('fieldset');
						        		fset.remove(cner);
						        	}
						        }]
							})
			        	}
			            
			        }]
				}]
		    }]
		});
		
		function calRange(bv, ev){
			var wavelengths = [];
			for (var i = bv; i <= ev; i++) {
				wavelengths.push((1.9799 * i - 934.5831).toFixed(2));
			}
			formpanel.down('textarea[name=wavelengths]').setValue(wavelengths);
		}
		var title = "新建型号";
		if (record) {
			console.log(record);
			formpanel.getForm().setValues(record.data);
			// formpanel.down('[name=radianceParams]').next('[name=radianceParams]').setValue(record.data.radianceParams[1]);
			// formpanel.down('[name=spectralRange]').next('[name=spectralRange]').setValue(record.data.spectralRange[1]);
			if (record.data.materialNormData.length > 1) {
				for (var i = 1; i < record.data.materialNormData.length; i++){
					formpanel.down('fieldset').add({
			        	xtype: 'fieldcontainer',
				        fieldLabel: '',
				        labelWidth: 100,
				        layout: 'hbox',
				        items: [{
				        	name : 'materialNormData',
				        	xtype: 'textarea',
				        	value : record.data.materialNormData[i],
				        	flex: 1
				        }, {
				            xtype: 'splitter'
				        }, {
				        	iconCls : 'x-del-icon',
				            xtype: 'button',
				            handler : function(delBtn){
				        		var cner = delBtn.up('fieldcontainer');
				        		var fset = delBtn.up('fieldset');
				        		fset.remove(cner);
				        	}
				        }]
					})
				}
			}
			formpanel.down('[name=model]').setReadOnly(true);
			title = "编辑型号";
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
					console.log(params);
					
					// var wavelengths = [];
					// var wArray = params.wavelengths.split(',');
					// for (var i = 0; i < wArray.length; i++) {
					// 	wavelengths.push(wArray[i]);
					// }
					// params.wavelengths = wavelengths;
					// var dataNum = wavelengths.length;
					

					var olderLevelNormData = [];
					if (Ext.isArray(params.olderLevelNormData)){
						for (var i = 0; i < params.olderLevelNormData.length; i++) {
							var strs = params.olderLevelNormData[i];
							var array = strs.split(',');
							if (dataNum != array.length) {
								Soul.util.MessageUtil.showErrorInfo("错误", "数据长度不正确，请检查后再次提交");
								return;
							}
							olderLevelNormData.push(array);
						}
					} else {
						var array = params.olderLevelNormData.split(',');
						if (dataNum != array.length) {
							Soul.util.MessageUtil.showErrorInfo("错误", "数据长度不正确，请检查后再次提交");
							return;
						}
						olderLevelNormData.push(array);
					}
					params.olderLevelNormData = olderLevelNormData;
					
					var materialNormData = [];
					if (Ext.isArray(params.materialNormData)){
						for (var i = 0; i < params.materialNormData.length; i++) {
							var strs = params.materialNormData[i];
							var array = strs.split(',');
							materialNormData.push(array);
							if (dataNum != array.length) {
								Soul.util.MessageUtil.showErrorInfo("错误", "数据长度不正确，请检查后再次提交");
								return;
							}
						}
					} else {
						var array = params.materialNormData.split(',');
						materialNormData.push(array);
						if (dataNum != array.length) {
							Soul.util.MessageUtil.showErrorInfo("错误", "数据长度不正确，请检查后再次提交");
							return;
						}
					}
					params.materialNormData = materialNormData;
					
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