Ext.define('Module.Hyscan.Public.model.ScanTaskModel', {
	extend : 'Ext.data.Model',
	fields : [ "id",
        "userId",
        "appId",
        "scanTime",
        "lon",
        "lat",
        "city",
        "address",
        "scanTarget",
        "imagePath",
        "deviceAddress",
        "deviceModel", "deviceSerial", "deviceFirmware",
        "level", "targetType",
        "material", "result0", "result1", "result2", "result3", "result4", "result5", "result6", "result7", "result8", "result9"]
});