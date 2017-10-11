
Ext.define('Module.Hyscan.MaterialConfig.view.Panel', {
	extend : 'Ext.tab.Panel',
	alias : 'widget.noticegrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Hyscan.MaterialConfig.Data',
		'Module.Hyscan.MaterialConfig.Renderer',
		'Soul.util.ObjectView',
		'Module.Hyscan.MaterialConfig.Tools',
	],
	
	initComponent : function() {
		
		var me = this;
		
		Ext.apply(this, {
			title: LABEL.infoPanel,
			id : 'param-panel',
			stateful : false,
			iconCls : 'info',
			frame : true,
			collapsed : true,
			animCollapse: false,
			//collapsible: true,
			split: true,
			plugins: [{
				ptype: 'tabscrollermenu',
				maxText  : 12,
				pageSize : 3
			}],
			items: []
		});

		this.initParameterConfig();
		
		this.callParent(arguments);
	},

	initParameterConfig : function() {
		var configUrl = '/globalconfig/';
		// restAction : function(url, method, params, jsonData, callbackFn,successMsg, failCallbackFn)
		Soul.Ajax.restAction(configUrl, 'get', null, null, function(ret){
			var configObj = ret;
			var configTypes = configObj['supportConfigTypes'];
			var configRepos = configObj['configRepos'];

			Module.Hyscan.MaterialConfig.Tools.clearSubTypeMenu('paramtype');

			Ext.each(configTypes, function(ct, i, rs){
				Module.Hyscan.MaterialConfig.Tools.buildSubTypeMenu('paramtype', configRepos, ct);
			});

			Module.Hyscan.MaterialConfig.Tools.showFirstSubTypeMenu('paramtype', configRepos);

		}, null, null);
	},

	afterRender: function() {
        var me = this;
        me.callParent(arguments);
        
        var callbackFun = function(){
			me.updateView(me);
		};

    },

	
});