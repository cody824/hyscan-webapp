<div class="page_error_box">
	<div class="error_content">
		<div class="error_info">
			<span class="warn_icon"></span>
			<div class="error_status"><img src="${sure_static_url?default('/')}img/shop/400.png"></div>
			<p class="error_desc">	
			<#if errorMsg??>
				${errorMsg.errorMsg}
			<#else>
				您输入的信息有误，请返回重试
			</#if>
			</p>
		</div>
		<div class="actions">
			<label>您还可以：</label>
			<#if redirctUrl??>
				<a href="${redirctUrl }"><i class="icon-reply"></i>返回</a>				
			<#else>
				<a href="javascript:history.go(-1);"><i class="icon-reply"></i>返回上一步</a>
			</#if>
		</div>
		<div class="service_line">
			<div class="gradient_line"></div>
			<p>免费客服热线：${companyPhone?if_exists}</p>
		</div>
	</div>
</div>
