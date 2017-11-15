Ext.define('Module.Hyscan.ScanTask.model.ScanTaskModel', {
	extend : 'Ext.data.Model',
	fields : [ "id",

	"userId",

	"scanTime",

	"lon",

	"lat",

	/**
	 * 位置：城市信息
	 */
	"city",

	/**
	 * 结果 ：老化等级
	 */
	"level",
	
	"address",

	/**
	 * 结果 ：材质
	 */
	"material",

	/**
	 * 设备：名称
	 */
	"scanTarget",

	/**
	 * 设备：照片
	 */
	"imagePath",

	/**
	 * 光谱仪:地址
	 */
	"deviceAddress",

	/**
	 * 光谱仪:型号
	 */
	"deviceModel", "deviceSerial", "deviceFirmware" ]
});