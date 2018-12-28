<#import "spring.ftl" as spring/>
<!Doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title><@spring.messageText code="login_html_title" text="登录"/></title>
    <link rel="stylesheet" type="text/css" href="${sure_static_url?default('/')}css/base.css">
    <link rel="stylesheet" type="text/css" href="${sure_static_url?default('/')}css/login.css">
    <STYLE type=text/css>

        label.error {
            width: 80px;
            position: absolute;
            margin-left: 30;
            margin-top: 20;
            color: firebrick;
        }

        input.error {
            border: 2px dashed red;
        }
    </STYLE>
</head>

<body>
<div class="login_main">
    <div class="login_header">
        <p class="title"><@spring.messageText code="login_header_text" text="Hyscan管理平台"/></p>
        <div class="language_switch">
            <select>
                <option value="zh_CN" class="chinese">简体中文</option>
                <option value="en" class="english">English</option>
            </select>
        </div>
    </div>
    <form name="loginForm" method="post" action="${loginAction}">
        <div class="login_box">
            <div class="login_inp_box">
                <div class="login_title"><span><@spring.messageText code="user_login" text="用户登录"/></span></div>
                <div class="login_inp username" style="margin-top: 35px;">
                    <div class="login_inp_wrap">
                        <input type="text" id="username" name="username" value=""
                               placeholder='<@spring.messageText code="username_placeholder" text="请输入手机号/账号"/>'
                               class="form-control required"
                               autocomplete="off" maxlength="32" htmlEscape="true" required autofocus
                               tabindex="1"/>
                    </div>
                </div>
                <div class="login_inp password" style="margin-bottom: 50px;">
                    <div class="login_inp_wrap">
                        <input id="password" name="password" type="password" value=""
                               placeholder='<@spring.messageText code="password_placeholder" text="密码"/>' maxlength="32"
                               class="form-control required" required
                               tabindex="2"/>
                        <label class="error" for="password" style="display: inline;">
								    <#if SPRING_SECURITY_LAST_EXCEPTION??>
                                        ${SPRING_SECURITY_LAST_EXCEPTION.message}
                                    </#if>
                    </div>
                </div>
            </div>
            <button type="submit" class="login_btn"
                    href="#"><@spring.messageText code="login_btn" text="登&nbsp;录"/></button>
        </div>
        </form>
</div>
<#--<div class="login_bottom"><p>技术支持：北京百邦视觉科技有限公司</p></div>-->
</body>
</html>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<script src="https://cdn.bootcss.com/toastr.js/latest/js/toastr.min.js"></script>
<script src="https://cdn.bootcss.com/iCheck/1.0.2/icheck.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-validate/1.17.0/jquery.validate.min.js"></script>
<script src="https://cdn.bootcss.com/jquery-validate/1.17.0/localization/messages_zh.min.js"></script>

<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/sureError.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/sureMsg.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/sureAjax.js"></script>
<script type="text/javascript" src="${sure_static_url?default('/')}js/lib/surejs/v2/surePaging.js"></script>
<script type="text/javascript" src='${sure_static_url?default('/')}js/lib/surejs/v2/sqlFilter.js'></script>
<script type="text/javascript">
    $(function () {
        var $upForm = $('form[name=loginForm]');
        var serverlang = "${defaultLang}" || "zh_CN";
        var defaultLang = $.cookie('clientLanguage') || serverlang;
        $.cookie('clientLanguage', defaultLang);
        $upForm.validate({
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                }
            },
            messages: {
                username: {
                    required: '<@spring.messageText code="username_placeholder" text="请输入手机号/账号"/>'
                },
                password: {
                    required: '<@spring.messageText code="password_validate" text="请输入密码"/>'
                }
            }
        });

        $('.language_switch select').on('change', function () {
            $.cookie('clientLanguage', $(this).val());
            window.location.reload(true);
        });
        initLang();


        function initLang() {
            $('.language_switch select').val(defaultLang);

        }

    })
</script>

