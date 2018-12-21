package com.noknown.project.hyscan.common;

/**
 * @author guodong
 */
public enum APP_TYPE {

	caizhi("HYSCAN"), meise("煤色"), nongse("农色"), shuise("水色");

	private String view;

	APP_TYPE(String view) {
		this.view = view;
	}
}
