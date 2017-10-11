Ext.define('Module.Hyscan.ScanTask.Renderer', {
	singleton: true,
	requires  : [
 		'Soul.util.RendererUtil',
 		'Soul.util.GridRendererUtil',
 		'Module.Hyscan.ScanTask.Tools'
  	],
  	translateTime : function(v){
  		if(v == null){
  			return "未知";
  		}
		return Ext.util.Format.date(new Date(v),'Y-m-d H:i:s');
	},
	
	translateStatus : function(v) {
		return TRADE_RECORD_DATA.status[v] || v;
	},
	
	translateBusType : function(v) {
		return TRADE_RECORD_DATA.busType[v] || v;
	},
	
	//订单付款方式
	translatePayWay : function(v) {
		return TRADE_RECORD_DATA.payWay[v] || v;
	},
	
	translatePayType : function(v) {
		return TRADE_RECORD_DATA.payType[v] || v;
	},
	
	constructor : function() {
		this.config = {
			ctime : Soul.util.RendererUtil.getDateInfo2,
		};
		this.callParent(arguments);
	}

});