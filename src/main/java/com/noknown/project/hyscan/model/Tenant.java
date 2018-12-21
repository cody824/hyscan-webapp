package com.noknown.project.hyscan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Date;

/**
 * @author guodong
 * @date 2018/4/2
 */
@Entity
@Table(name = "hyscan_tenant")
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
public class Tenant {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 32)
	private String name;

	private String description;
//
//	@Column(length = 64)
//	private String key;

	@Column(length = 64)
	private String apiKey;

	private Integer createUserId;

	private Integer adminId;

	private String adminName;

	private Date createTime;

	@Column(columnDefinition = "TEXT")
	private String serials;

	@Column(length = 128)
	private String appIds;

	public Integer getId() {
		return id;
	}

	public Tenant setId(Integer id) {
		this.id = id;
		return this;
	}

	public String getName() {
		return name;
	}

	public Tenant setName(String name) {
		this.name = name;
		return this;
	}

	public String getDescription() {
		return description;
	}

	public Tenant setDescription(String description) {
		this.description = description;
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

	public String getAdminName() {
		return adminName;
	}

	public Tenant setAdminName(String adminName) {
		this.adminName = adminName;
		return this;
	}

	public String getSerials() {
		return serials;
	}

	public Tenant setSerials(String serials) {
		this.serials = serials;
		return this;
	}

	public String getAppIds() {
		return appIds;
	}

	public Tenant setAppIds(String appIds) {
		this.appIds = appIds;
		return this;
	}
}
