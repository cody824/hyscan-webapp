package com.noknown.project.hyscan.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

/**
 * @author guodong
 * @date 2019/9/4
 */
@Entity
@Table(name = "task_result")
@JsonIgnoreProperties({"handler", "hibernateLazyInitializer"})
@Data
public class TaskResult implements Serializable {

	public static final String TYPE_INPUT = "input";

	public static final String TYPE_CAL = "cal";


	private static final long serialVersionUID = 7809552337727622458L;


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(length = 64)
	private String taskId;

	@Column(length = 64)
	private String source;

	@Column(length = 16)
	private String type;

	@Column(length = 8)
	private String model;

	@Column(length = 16)
	private String appId;

	private Date addTime;

	@Column(name = "task_use")
	private boolean use;

	/**
	 * 预留结果字段
	 */
	private Double result0 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result1 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result2 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result3 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result4 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result5 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result6 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result7 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result8 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result9 = Double.valueOf(0);

	/**
	 * 预留结果字段
	 */
	private Double result10 = Double.valueOf(0);

	public void fillTask(ScanTask task) {
		task.setResultSource(source).setResultType(type)
				.setResult0(result0).setResult1(result1)
				.setResult2(result2).setResult3(result3)
				.setResult4(result4).setResult5(result5)
				.setResult6(result6).setResult7(result7)
				.setResult8(result8).setResult9(result9)
				.setResult10(result10);
	}

	public void copyResult(TaskResult task) {
		task.setResult0(result0);
		task.setResult1(result1);
		task.setResult2(result2);
		task.setResult3(result3);
		task.setResult4(result4);
		task.setResult5(result5);
		task.setResult6(result6);
		task.setResult7(result7);
		task.setResult8(result8);
		task.setResult9(result9);
		task.setResult10(result10);
	}

}
