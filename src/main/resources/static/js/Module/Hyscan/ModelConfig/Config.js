Ext.define('Module.Hyscan.ModelConfig.Config', {
    singleton: true,

    requires: ['Soul.util.RendererUtil'],

    spDeivceConfig: {

        vnir: {
            VNIR1: {
                "name": "VNIR1",
                "range": [674, 976],
                "toW": function (index) {
                    var a = 0.000004, b = 1.9726, c = -931.4841;
                    var wavelength = (a * index * index + b * index + c).toFixed(2);
                    return wavelength
                }
            }
        },

        swir: {
            SWIR1: {
                "name": "SWIR1",
                "range": [2071, 2156],
                "toW": function (index) {
                    var a = -0.000511, b = 10.39, c = -18320;
                    var wavelength = (a * index * index + b * index + c).toFixed(2);
                    return wavelength
                }
            }
        }

    },

    constructor: function () {
        this.callParent(arguments);
    }
});