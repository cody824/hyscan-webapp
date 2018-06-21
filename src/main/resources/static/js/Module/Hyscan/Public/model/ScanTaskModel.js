Ext.define('Module.Hyscan.Public.model.ScanTaskModel', {
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


	"address",

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
	"deviceModel", "deviceSerial", "deviceFirmware",

	/**
	 * 结果 ：老化等级
	 */
        "level", "targetType",


	/**
	 * 结果 ：材质
	 */
	"material",

	"result0", "result1","result2","result3","result4","result5","result6","result7","result8","result9"]
});