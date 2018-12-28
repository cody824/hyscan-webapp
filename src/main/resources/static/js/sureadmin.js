var ybApp = Ext.application({
	requires : [ 'Ext.container.Viewport', 'Soul.Ajax'],

	controllers : [
	               'AppConfig',
	               'BaseConfig'
	],

	name : 'SureAdmin',

	appFolder : '/js/SureAdmin',
	
	appConfig : null,

    supportLang: {
        zh_CN: '中文',
        en: "English"
    },

	launch : function() {
		var me = this;
		Ext.QuickTips.init();
		
		var cfg = Ext.Loader.getConfig();
		cfg.enabled = true;
		Ext.Loader.setConfig(cfg);
		Ext.Loader.setPath('Soul', '/js/lib/Soul');
		Ext.Loader.setPath('Module', '/js/Module');
		
		
		//设置state处理器
		var cp = Ext.create('Ext.state.LocalStorageProvider', {
		});
		Ext.state.Manager.setProvider(cp);


        var loginName = adminUser;
		
		var BaseConfig = this.getModel('BaseConfig');


        BaseConfig.load("", {
		    success: function(bc) {

                var lang = Ext.util.Cookies.get("clientLanguage");
                if (lang) {
                    if (me.supportLang[lang]) {
                        bc.data.language = lang;
                    }
                }
		    	//获取语言文件
		    	me.getController("BaseConfig").getLanguageFile(bc.data.language);
		    	
		    	me.saveAppId(bc.data.appId);
		    	
		    	//设置title
		    	document.title = bc.data.headerTitle;
		    	//初始化APP
		    	me.initApp(bc.data, "");
		    }
		});
	},
	
	saveAppId : function(appId){
		sessionStorage.setItem("appId", appId);
	},
	
	initApp :function(bc, loginName){
		var appC = this.getController("AppConfig");
		appC.initSingleWin(bc, loginName, true, false, appC);
    },

    getUrlParam: function (paraName) {
        var url = document.location.toString();
        var arrObj = url.split("?");

        if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;

            for (var i = 0; i < arrPara.length; i++) {
                arr = arrPara[i].split("=");

                if (arr != null && arr[0] == paraName) {
                    return arr[1];
                }
            }
            return "";
        }
        else {
            return "";
        }
    }
});