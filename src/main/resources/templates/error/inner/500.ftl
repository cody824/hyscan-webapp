<div class="page_error_box">
	<div class="error_content">
		<div class="error_info">
			<span class="warn_icon"></span>
			<div class="error_status"><img src="${sure_static_url?default('/')}img/error/500.png"></div>
			<p class="error_desc">对不起!服务器出错了!</p>
		</div>
		<div class="actions">
			<label>您还可以：</label>
			<#if redirctUrl??>
				<a href="${redirctUrl }"><i class="icon-reply"></i>返回</a>				
			<#else>
				<a href="javascript:history.go(-1);"><i class="icon-reply"></i>返回上一步</a>
			</#if>
		</div>
	</div>
</div>
