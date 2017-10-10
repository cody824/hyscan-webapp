<!DOCTYPE html>
<html>
<head>
	<#include "includes/top.ftl"/>
	<meta name="viewport" id="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no">
    <title>登录</title>
	<script>
	</script>
</head>
<body>
	<div class="min-width">
		<div class="zy_cm_header min_width">
			<div class="main_nav">
				<a class="logo" href="/"><img src='${sure_static_url?default('/')}img/main/logo_144_48.png'></a>
				<span class="borderLeft">欢迎登录</span>
				<ul class="nav">
					<li class="current">
						<a class="color_999" href="/register.html">
							<span>没有账号</span>
						</a>
					</li>
					<li class="">
						<a href="/register.html">
							<span>请注册</span>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<div class="paddingT60">
			<div class=" zhiyin_content">

				<div class="clearboth margin115 ">
					<h2 class="title24">登录</h2>
					<form name="loginForm" method="get" action="${loginAction}" class="marginT20">
						<div class="form-group  ">
							<div class="absoluteFather ">
								<label>已 有 账 号</label>
								<input id="username" name="username" type="text" value=""
									   placeholder="请输入手机号/账号" class="form-control required"
									   autocomplete="off" maxlength="32" htmlEscape="true" required autofocus
									   tabindex="1"/>
							</div>
						</div>
						<div class="form-group  ">
							<div class=" ">
								<label>输 入 密 码</label>
								<input id="password" name="password" type="password" value=""
									   placeholder="密码" maxlength="32" class="form-control required" required
									   tabindex="2"/>
									   <label class="error" for="password" style="display: inline;">
								    <#if SPRING_SECURITY_LAST_EXCEPTION?if_exists>
								    	${SPRING_SECURITY_LAST_EXCEPTION.message}
								    </#if>
									</label>
							</div>
						</div>
						<div class="form-group-div  ">
							<div class="checkbox">
								<label><input  type="checkbox" name="rememberMe" id="rememberMe" value="true">自动登录</label>
							</div>
							<div class="float_right forgetPwd phoneLogin" ><a href="javascript:;">手机验证码登录</a></div>
						</div>
						<div class="btn_group">
							<button type="submit" class="cm_btn green common_loginbtn_item">立即登录</button>
						</div>
					</form>
					<form name="paLoginForm" method="post" action="${loginAction}" class="marginT20 hidden">
						<div class="form-group">
							<div class="">
								<label>验证码</label>
								<input name="authcode" type="text" size="4" maxlength="4" minlength="4" id="yb_account_authimgcode" class="form-control required" placeholder="请输入图片验证码"/>
							<span class="img_code"><i class="ybiconfont ybicon-close2"></i>
								<img class="authcode_img j-autocode-img">
								</span>
								<label class="error" for="authcode" style="display: inline;"></label>
							</div>
						</div>
						<div class="form-group">
							<div class="input_group">
								<label>手机号</label>
								<input name="phone" type="tel" id="yb_account_phone"
									   class="form-control required"  placeholder="请输入手机号码"
									   pattern="^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$" />
								<span class="absoluteCode">发送验证码</span>
							</div>
						</div>
						<div class="form-group">
							<div>
								<label>手机验证码</label>
								<input name="phoneAuthcode" type="tel" id="yb_account_authphonecode" class="form-control required"  placeholder="请输入收到的验证码"/>
							</div>
							<label class="error" for="password" style="display: inline;">
								    <#if SPRING_SECURITY_LAST_EXCEPTION?if_exists>
								    	${SPRING_SECURITY_LAST_EXCEPTION.message}
								    </#if>
									</label>
						</div>
						<div class="form-group-div  ">
							<div class="checkbox">
								<label><input  type="checkbox" name="rememberMe" id="rememberMe" value="true">自动登录</label>
							</div>
							<div class="float_right forgetPwd upLogin" ><a href="javascript:;">用户密码登录</a></div>
						</div>
						<div class="btn_group">
							<button type="submit" class="cm_btn green common_loginbtn_item">立即登录</button>
						</div>
					</form>
					<div class="text_center otherLogin">
						<a class="qq" href="${urlMap.qq?default('/')}"><i class="ybiconfont ybicon-qqsolid float_left"></i><span class="float_left">QQ</span></a>
						<a class="weibo" href="${urlMap.weibo?default('/')}"><i class="ybiconfont ybicon-weibosina  float_left"></i><span class="float_left">微博</span></a>
						<a class="wechat" href="${urlMap.wechat?default('/')}"><i class="ybiconfont ybicon-wechatsolid float_left"></i><span class="float_left">微信</span></a>
					</div>
					<div class="text_center loginA">
						<span>还不是会员？</span><a href="/register.html">免费注册</a>
						|<span>是会员，但是</span><a href="/account/password">忘记密码了</a>
					</div>
				</div>
			</div>
		</div>
	</div>

	<#include "includes/footer.ftl"/>

	<script>
		$(function() {
			//渲染控件样式
			$("input[type=radio],input[type=checkbox]").iCheck({
				checkboxClass: 'icheckbox_minimal-green',
				radioClass: 'iradio_minimal-green',
				increaseArea: '20%'
			});

			var $upForm = $('form[name=loginForm]');
			var $photoForm = $('form[name=paLoginForm]');

			$('.phoneLogin a').click(function(){
				$upForm.addClass('hidden');
				$photoForm.removeClass('hidden');
				sessionStorage.setItem('lastLoginType', "phone")
			});

			$('.upLogin a').click(function(){
				$upForm.removeClass('hidden');
				$photoForm.addClass('hidden');
				sessionStorage.setItem('lastLoginType', "usernamePassword")
			});

			var lastLoginType = sessionStorage.getItem('lastLoginType');
			if (lastLoginType && lastLoginType === "phone") {
				$upForm.addClass('hidden');
				$photoForm.removeClass('hidden');
			} else {
				$upForm.removeClass('hidden');
				$photoForm.addClass('hidden');
			}

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

			$photoForm.validate({
				rules: {
					authcode : {
						required : true
					},
					phone : {
						required: true
					},
					phoneAuthcode : {
						required: true
					}
				},
				messages:{
					authcode : {
						minlength : '验证码为4位',
						required : "请输入验证码",

					},
					phone : {
						required : "手机号码",
						pattern : "请输入正确的手机号",
					},
					phoneAuthcode : {
						required : "请输入手机收到的验证码"
					}
				}
			});

			$('.zhiyin_register .absoluteCode').click(function () {
				var phone = $('#yb_account_phone').val().trim();
				if (SureUtil.isNull(phone) || !SureUtil.isPhone(phone)) {
					SureMsg.error("提示", "请输入正确的手机号码");
					return;
				}
				var authcode = $("#yb_account_authimgcode").val();
				if (SureUtil.isNull(authcode)) {
					SureMsg.error("提示", "请先输入图片验证码");
					return;
				}

				SureAjax.ajax({
					url: "/suremessage/authcode/phone",
					type: "POST",
					headers: {
						Accept: "application/json"
					},
					data: {
						phone: phone,
						authcode: authcode,
					},
					success: function () {
						SureMsg.msg("发送成功");
						var now = new Date().getTime();
						var lastTime = sessionStorage.getItem("authcodeSendTime") || now - 61 * 1000;
						if (now - lastTime < 60 * 1000) {
							SureMsg.alert("验证码发送中，请稍后尝试");
							return;
						}
						sessionStorage.setItem("authcodeSendTime", now);
						var num = 60;
						var countDown = setInterval(function () {
							if (num-- == 0) {
								clearInterval(countDown);
								$('.absoluteCode').text("获取验证码")
							} else {
								$('.absoluteCode').text("发送中(" + num + ")")
							}
						}, 1000)
					}
				})
			});


			//$('.otherLogin .wechat').attr('href', wechatUrl);
		});
	</script>
</body>
</html>
