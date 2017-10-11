Ext.define('Module.Hyscan.MaterialConfig.Tools', {
	singleton: true, 
	
	requires  : [
		'Soul.util.ObjectView'
	],
	
	showParameterInfo : function(obj) {
		var me = this;

		if (obj == null)
			return;

		nameConfig = Soul.Ajax.getSyncData('/globalconfig/nameConfig', '');

		me.clearTabPanel('param-panel');

		var paramConfigs = obj.configs;
		var keySets = obj.keySets;
		for (var key in paramConfigs) {
			paramConfig = paramConfigs[key];
			keySet = keySets[key];
			var property = me.getParameterGrid(paramConfig, nameConfig, keySet);
			me.showInTabPanel('param-panel', property, key);
		}
	},

	getParameterGrid : function(paramConfig, nameConfig, keySet) {
		var paramFields = [];
		paramFields.push('key');
		paramFields.push('value');
		paramFields.push('paramName');

		var paramData = [];
		Ext.each(keySet, function(ck, i, rs) {
			var param = {};
			param['key'] = ck;
			param['value'] = paramConfig[ck];
			param['paramName'] = nameConfig[ck];

			paramData.push(param);
		});

		var paramStore = new Ext.create('Ext.data.Store', {
			storeId : 'paramStore',
			fields : paramFields,
			data : paramData
		});

		var paramGrid = Ext.create('Module.Hyscan.MaterialConfig.view.ParameterGrid',{
			id : 'advGrid',
       		anchor : '100% 100%',
       		store : paramStore
		});
		var param = {};
			param['key'] = '123';
			param['value'] = '123';
			param['paramName'] = '123';
		paramStore.insert(0, param);

		return paramGrid;
	},

	getParameterPropertyGrid : function(paramConfig){
		var showProperties = [];
		for (var k in paramConfig) {
			showProperties.push(k);
		}

		var property = Soul.util.ObjectView.getObjectPropertyGrid(paramConfig, Module.Hyscan.MaterialConfig.Config.getRendererConfig(), 
				PARAMETER_PROPERTY, showProperties, {
				iconCls : 'md-user'
		});
/*		property.on("beforeshow", function(c, eOpts){
			var source = Module.Soul.user.Data.getUserByName(user.name);
			c.setSource(source);
		});
*/
		return property;
	},

	clearTabPanel : function(panelId) {
		var infoPanel = Ext.getCmp(panelId);
		
		infoPanel.items.each(function(item){
			infoPanel.remove(item);
		});
	},

	showInTabPanel : function(panelId, panel, title){
		var infoPanel = Ext.getCmp(panelId);
		var oldPanel = infoPanel.getComponent(title + "-properties" );
		if (oldPanel == null){
			infoPanel.expand();
			panel.title = title;
			//panel.closable = true;
			panel.id = title + "-properties";
			infoPanel.add(panel);
		} else {
			infoPanel.expand();
			oldPanel.fireEvent('beforeshow', oldPanel);
		}
		infoPanel.setActiveTab(title + "-properties");
	},

	getCurrentTab : function(panelId) {
		var infoPanel = Ext.getCmp(panelId);
		return infoPanel.getActiveTab();
	},

	buildSubTypeMenu : function(menuId, configRepos, configType) {
		var me = this;
		var typeMenu = Ext.getCmp(menuId);

		var mItem = new Ext.menu.CheckItem({
			text: configType,
			name: configType,
			checked: false,
			group: 'configType',
			handler: function() {
				if (configRepos == null)
					return;
				me.showParameterInfo(configRepos[configType]);
			}
		});

		typeMenu.add(mItem);
	},

	clearSubTypeMenu : function(menuId) {
		var typeMenu = Ext.getCmp(menuId);

		typeMenu.items.each(function(item){
			typeMenu.remove(item);
		});
	},

	showFirstSubTypeMenu : function(menuId, configRepos) {
		var me = this;
		var typeMenu = Ext.getCmp(menuId);

		if (typeMenu.items.length > 0) {
			firstItem = typeMenu.items.get(0);
			firstItem.checked = true;
			me.showParameterInfo(configRepos[firstItem.name]);
		}
	},

	getCurrentConfigType : function(menuId) {
		var typeMenu = Ext.getCmp(menuId);

		for (var i=0; i<typeMenu.items.length; i++) {
			item = typeMenu.items.get(i);
			if (item.checked == true)
				return item.name;
		}
	},

	buildParamOptMenu : function(){
    	var menu = Ext.create('Ext.menu.Menu', {
    		name : 'paramoperation',
	        style: {
	            overflow: 'visible'     // For the Combo popup
	        },
	        items: [{
	        		text: PARAMETER_MANAGE_LABEL.addparam,
					disabled:false,
					name : 'addparam',
					iconCls : 'x-add-icon'
				},{
					text: PARAMETER_MANAGE_LABEL.editparam,
					disabled:false,
					name : 'editparam',
					iconCls : 'extensive-edit'
				},{
					text: PARAMETER_MANAGE_LABEL.delparam,
					disabled:false,
					name : 'delparam',
					iconCls : 'x-del-icon'
				}]
	    });
		return menu;
    },
	
	constructor : function() {
        this.callParent(arguments);
    }
});