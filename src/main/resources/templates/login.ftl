<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>后台登录</title>
<link type="text/css" rel="stylesheet" href="${sure_static_url?default('/')}css/base.css" />
<link type="text/css" rel="stylesheet" href="${sure_static_url?default('/')}css/backlogin.css" />
<STYLE type=text/css>

label.error{
	width: 80px;
    position: absolute;
    margin-left: 30;
    margin-top: 20;
    color: firebrick;
}

input.error{
	border: 2px dashed red;
}
</STYLE>
</head>

<body>
<div class="BbBackLoginWrap">
	<div class="BbBackLogin">
    	<h2>HyScan管理平台</h2>
    	<form name="loginForm" method="post" action="${loginAction}">
    	<div class="logincons">
        	<div class="login_info">
            	<span class="user"></span>
                <input id="username" name="username" type="text" value=""
									   placeholder="请输入手机号/账号" class="form-control required"
									   autocomplete="off" maxlength="32" htmlEscape="true" required autofocus
									   tabindex="1" />
            </div>
            <div class="login_info">
            	<span class="password"></span>
                <input id="password" name="password" type="password" value=""
									   placeholder="密码" maxlength="32" class="form-control required" required
									   tabindex="2"/>
									   <label class="error" for="password" style="display: inline;">
								    <#if SPRING_SECURITY_LAST_EXCEPTION??>
								    	${SPRING_SECURITY_LAST_EXCEPTION.message}
								    </#if>
            </div>
            <button type="submit" class="login_btn" href="#">登录</button>
            <#-- div class="remember_info">
            	<input type="checkbox" /><span>记住密码</span>
            </div> -->
        </div>
        </form>
    </div>
</div>
</body>
</html>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.min.js"></script>
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
	$(function(){
		$('.login_info input').focus(function(e) {
        	$(this).parent().addClass('focus');
			$(this).siblings().addClass('on');   
        });
		$('.login_info input').blur(function(e) {
        	$(this).parent().removeClass('focus');
			$(this).siblings().removeClass('on');     
        });
		$('.login_btn').mouseover(function(e) {
            $(this).addClass('checked');
        });
		$('.login_btn').mouseout(function(e) {
            $(this).removeClass('checked');
        });
		$('.login_btn').click(function(e) {
            $(this).addClass('checked');
        });
        
        //渲染控件样式
		$("input[type=radio],input[type=checkbox]").iCheck({
			checkboxClass: 'icheckbox_minimal-green',
			radioClass: 'iradio_minimal-green',
			increaseArea: '20%'
		});

		var $upForm = $('form[name=loginForm]');

		$upForm.validate({
			rules: {
				username : {
					required : true
				},
				password : {
					required: true
				}
			},
			messages:{
				username: {
					required : "请输入手机号/用户名"
				},
				password : {
					required: "请输入密码"
				}
			}
		});
        
        
	})
</script>
