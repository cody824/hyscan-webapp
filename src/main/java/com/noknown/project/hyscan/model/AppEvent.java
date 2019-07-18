package com.noknown.project.hyscan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

/**
 * @author guodong
 * @date 2019/6/2
 */
@Entity
@Table(name = "app_event")
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
@Data
public class AppEvent {

	@Id
	private Integer id;

	private Date eventTime;

	@Column(length = 32)
	private String appId;

	private String message;

	@Column(length = 16)
	private String level;

	private Integer userId;

	@Column(length = 64)
	private String userName;
}
