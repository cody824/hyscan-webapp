
Ext.define('Module.Hyscan.User.view.Grid', {
	extend : 'Soul.view.SearchGrid',
	alias : 'widget.usergrid',
	
	requires  : [
		'Soul.util.RendererUtil', 
		'Soul.util.GridRendererUtil',
		'Module.Hyscan.User.Data',
		'Module.Hyscan.User.Renderer',
		'Soul.util.ObjectView',
		'Soul.ux.grid.feature.Searching'
	],
    
	checkIndexes : ['name'], // 默认选择的列	
	minChars : 1,
	minLength : 1,
	
	initComponent : function() {
		var columns = new Array();
		var me = this;
	       var callbackFun = function(){
	    	   me.updateView(me);
	       };
		var renders = Module.Hyscan.User.Renderer;
		columns.push(
			new Ext.grid.RowNumberer(),
			{text: "ID",sortable: true,dataIndex: 'id', searchType : 'number',
				width : 60},
			{text: USERMANAGE_LABEL.user,sortable: true,dataIndex: 'nick', searchType : 'string',
				renderer : function(v, u,r, rowIndex, columnIndex, s){
					u.tdAttr = 'data-qtip="' + LABEL.showProperty + '"'; 
					return (Soul.util.GridRendererUtil.getLinkName(Module.Hyscan.User.Renderer.getUserName(v, u,r, rowIndex, columnIndex - 1, s)));
				},
				flex : 1},
			{
					text: USERMANAGE_LABEL.email,width: 200, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'email'
			},
			{
				text: USERMANAGE_LABEL.mobilePhone,width: 200, searchType : 'string',
				sortable: false, menuDisabled:true, dataIndex: 'mobile',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					if(val == 0){
						return "未填写";
					}else{
						return val;
					}
				}
			},
			{
				text: USERMANAGE_LABEL.ctime, width: 200,dataIndex:'createDate', searchType : 'date',
				renderer: function(val, u,r, rowIndex, columnIndex, s, v){
					return renders.translateCtime(val, u,r, rowIndex, columnIndex - 1, s, v);
				}
			}
		);
		
		var me = this;
		Ext.apply(this, {
			store : Ext.data.StoreManager.lookup("Module.Hyscan.User.store.UserStore"),
			viewConfig : {
				emptyText : USERMANAGE_MESSAGE.noUser
			},
			columns : columns
		});
		this.callParent(arguments);
	},
	
	afterRender: function() {
        var me = this;
        me.callParent(arguments);
    }
});
