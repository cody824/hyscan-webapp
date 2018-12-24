<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title></title>
    <link rel="stylesheet" type="text/css" href="/js/lib/extlib4/resources/css/ext-all-gray.css"/>
    <link rel="stylesheet" type="text/css" href="/js/lib/extlib4/js/ux/statusbar/css/statusbar.css"/>
    <link rel="stylesheet" type="text/css" href="/js/lib/extlib4/js/ux/css/TabScrollerMenu.css"/>
    <link rel="stylesheet" type="text/css" href="/js/lib/extlib4/js/ux/css/LiveSearchGridPanel.css"/>
    <link rel="stylesheet" type="text/css" href="/js/lib/extlib4/js/ux/css/GroupTabPanel.css"/>
    <link rel="stylesheet" type="text/css" href="/js/lib/extlib4/js/ux/grid/css/GridFilters.css"/>
    <link rel="stylesheet" type="text/css" href="/js/lib/extlib4/js/ux/grid/css/RangeMenu.css"/>
    <link rel="stylesheet" type="text/css" href="/css/dataview/template-animated-dataview.css"/>

    <link rel="stylesheet" type="text/css" href="/css/portal.css"/>
    <link rel="stylesheet" type="text/css" href="/css/modules.css"/>
    <link rel="stylesheet" type="text/css" href="/css/adminModules.css"/>
    <link rel="stylesheet" type="text/css" href="/css/icon.css"/>
    <link rel="stylesheet" type="text/css" href="/css/innerHtml.css"/>
    <link rel="stylesheet" type="text/css" href="/css/ext-example-part.css"/>
    <link rel="stylesheet" type="text/css" href="/css/s2.css"/>
    <link rel="stylesheet" type="text/css" href="/css/soul.css"/>
    <link rel="stylesheet" type="text/css" href="/css/infobox.css"/>

    <script>
        var isTenantAdmin = ${tenantAdmin?c};
        var supportApps = {};
        <#list supportApps as app>
            supportApps["${app.name()}"] = "${app.getView()}";
        </#list>
        console.log(supportApps);
    </script>

    <script type="text/javascript" src="/js/lib/extlib4/js/ext-all-debug.js"></script>
	<script type="text/javascript" src="/js/lib/surejs/v2/sqlFilter.js"></script>
    <script type="text/javascript" src="/js/lib/extOverride.js"></script>
    <script type="text/javascript" src="/js/lib/Soul/url.js"></script>
    <script type="text/javascript" src="/js/lib/soulapp.js"></script>

    <script type="text/javascript" src="/js/sureadmin.js"></script>
    <script type="text/javascript"
            src="http://api.map.baidu.com/api?v=3.0&ak=Chm205tTGwiarn6d3CilTD0jGqdoRDki"></script>
    <script type="text/javascript"
            src="http://api.map.baidu.com/library/TextIconOverlay/1.2/src/TextIconOverlay_min.js"></script>
    <script type="text/javascript"
            src="http://api.map.baidu.com/library/MarkerClusterer/1.2/src/MarkerClusterer_min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/InfoBox/1.2/src/InfoBox_min.js"></script>
    <script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>


</head>
<body>

</body>
</html>