package com.noknown.project.hyscan.model;

import java.util.Date;

/**
 * @author guodong
 * @date 2018/4/2
 */
public class Tenant {

	private String id;

	private String key;

	private String apiKey;

	private Integer createUserId;

	private Integer adminId;

	private Date createTime;

	public String getId() {
		return id;
	}

	public Tenant setId(String id) {
		this.id = id;
		return this;
	}

	public String getKey() {
		return key;
	}

	public Tenant setKey(String key) {
		this.key = key;
		return this;
	}

	public String getApiKey() {
		return apiKey;
	}

	public Tenant setApiKey(String apiKey) {
		this.apiKey = apiKey;
		return this;
	}

	public Integer getCreateUserId() {
		return createUserId;
	}

	public Tenant setCreateUserId(Integer createUserId) {
		this.createUserId = createUserId;
		return this;
	}

	public Integer getAdminId() {
		return adminId;
	}

	public Tenant setAdminId(Integer adminId) {
		this.adminId = adminId;
		return this;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public Tenant setCreateTime(Date createTime) {
		this.createTime = createTime;
		return this;
	}
}
