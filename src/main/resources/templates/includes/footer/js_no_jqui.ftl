<#if load_cdn?default('online') == 'online'>
<script type="text/javascript" src="//cdn.hcharts.cn/highcharts/4.0.3/highcharts.js"></script>
<script type="text/javascript" src="//cdn.bootcss.com/html2canvas/0.5.0-alpha2/html2canvas.min.js"></script>
<script type="text/javascript" src="//cdn.bootcss.com/bootstrap-switch/3.3.2/js/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="//cdn.bootcss.com/lodash.js/4.17.4/lodash.min.js"></script>
<script type="text/javascript" src="http://open.web.meitu.com/sources/xiuxiu.js" ></script>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.1.0.js"></script>

<#else>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/cdn/highcharts/4.0.3/highcharts.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/cdn/html2canvas/0.5.0-alpha2/html2canvas.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/cdn/bootstrap-switch/3.3.2/js/bootstrap-switch.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/cdn/lodash.js/4.17.4/lodash.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/cdn/sources/xiuxiu.js" ></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/cdn/open/js/jweixin-1.1.0.js"></script>
</#if>


<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/jquery/plugin/jquery.rotate1.js"></script>
<script type="text/javascript" src='${sure_static_url?default('/')}assets/js/modernizr.2.5.3.min.js'></script>

<#if run_mode?default('develop') == 'develop'>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/photoswipe/photoswipe.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/photoswipe/photoswipe-ui-yb.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/jquery.qrcode.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/jquery.lazyload.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/jquery.fancybox.pack.js"></script>
<script type="text/javascript" src='${sure_static_url?default('/')}assets/js/swiper.jquery.min.js'></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/zclip/jquery.zclip.min.js"></script>

<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/sweetalert.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/toastr.min.js"></script>

<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/cropper/cropper.min.js"></script>
<script type="text/javascript" src='${sure_static_url?default('/')}assets/js/jquery-ui.custom.min.js'></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/jquery.ui.touch-punch.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/simpletooltip.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/cityScript.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/cityselector.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/icheck.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/chosen.jquery.min.js"></script>

<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/jquery/jquery.plugin.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/algo.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/plupload/plupload.full.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/qiniu/qiniu.js"></script>

<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/qiniu/qiniuIU.js"></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/qiniu/tools.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/jquery/plugin/percentageloader/jquery.percentageloader.min.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/qiniu/percentageloaderProgress.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/qiniu/up.js'></script>

<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/xiuxiu/avatarQiniu.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/xiuxiu/xiuxiuTool.js"></script>

<!-- 图片处理工具套件 -->
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/jquery/plugin/jcrop/jquery.Jcrop.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/exif.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/spark-md5.min.js"></script>

<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/svg2dataurl/svgstr_todataurl.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/sureError.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/sureMsg.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/sureAjax.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/surePaging.js"></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/surejs/v2/sqlFilter.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/surejs/v2/imageTool/imgeditCropper.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/surejs/v2/sureShare.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/surejs/v2/imageRes.js'></script>

<script type="text/javascript" src="${sure_static_url?default('/')}js/base.js"></script>

<script type="text/javascript" src="${sure_static_url?default('/')}js/api/systemMsg.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/api/feedback.js"></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/sureUrl.js'></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/api/activity.js"></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/sureSC.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/userSecurity.js'></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/usercenter.js"></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/promotion.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/order.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/assetAccount.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/module.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/storeShop.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/shopConfig.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/baseConfig.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/photo.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/freight.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/notice.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/pay.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/wdAccount.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/shopVoucher.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/pbook.js'></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/surejs/v2/wechatPay.js'></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/surePay.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/payTool.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/QRCode.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/scrollPagination.js"></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/book/api/bookTpl.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/newBookTpl.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/imgMagic.js'></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/book/api/book.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/book/createBook.js'></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/api/newBook.js'></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/npbook.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/npbookUtil.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/pbookConfigUtil.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/userProductsTool.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/imageLB.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/authImgCode.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/historyOrder.js'></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/noticeTool.js'></script>

<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/jquery.artDialog.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/jquery.SuperSlide.2.1.1.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/turn.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/slideout.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/jquery.mCustomScrollbar.concat.min.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/sea.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}assets/js/colorpicker.js"></script>

<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/fileRes.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/pfa.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/pfile.js'></script>


<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/calendar/calendar.js'></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/api/store/config/calendar/calendarUtil.js'></script>
<#else>

<script type="text/javascript" src="${sure_static_url?default('/')}js/C_main.min.js?v=${app_version}"></script>

</#if>


