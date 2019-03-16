package com.noknown.project.hyscan.device;

import com.noknown.framework.common.util.StringUtil;
import com.noknown.project.hyscan.model.ScanTaskData;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

/**
 * @author guodong
 * @date 2019/3/16
 */
@Component
public class DeviceConfig {

	private Map<String, SpDevice> vnir = new HashMap<>();

	private Map<String, SpDevice> swir = new HashMap<>();

	@PostConstruct
	public void init() {

		SpDevice vnir1 = new SpDevice() {
			@Override
			double toW(int index) {
				double a = 0.000004, b = 1.9726, c = -931.4841;
				return a * index * index + b * index + c;
			}
		};
		vnir1.setName("VNIR1");
		vnir1.setRange(new int[]{674, 976});
		vnir.put(vnir1.getName(), vnir1);


		SpDevice swir1 = new SpDevice() {
			@Override
			double toW(int index) {
				double a = -0.000511, b = 10.39, c = -18320;
				return a * index * index + b * index + c;
			}
		};
		swir1.setName("SWIR1");
		swir1.setRange(new int[]{2071, 2156});
		swir.put(vnir1.getName(), vnir1);
	}


	public Double[] getWavelength(ScanTaskData taskData) {
		Double[] labels = new Double[taskData.getDn().length];

		int n = 0;
		if (StringUtil.isNotBlank(taskData.getVnir()) && taskData.getVnirRange() != null) {
			SpDevice spDevice = vnir.get(taskData.getVnir());
			if (spDevice != null) {
				for (int i = spDevice.getRange()[0]; i < spDevice.getRange()[1]; i++) {
					double label = spDevice.toW(i);
					if (n < (taskData.getDn().length - 1)) {
						labels[n++] = label;
					}
				}
			}
		}
		if (StringUtil.isNotBlank(taskData.getSwir()) && taskData.getSwirRange() != null) {
			SpDevice spDevice = swir.get(taskData.getVnir());
			if (spDevice != null) {
				for (int i = spDevice.getRange()[0]; i < spDevice.getRange()[1]; i++) {
					double label = spDevice.toW(i);
					if (n < (taskData.getDn().length - 1)) {
						labels[n++] = label;
					}
				}
			}
		}
		if (labels.length == 0) {
			if (taskData.getRange() != null) {
				for (int i = taskData.getRange()[0]; i < taskData.getRange()[1]; i++) {
					double label = 1.9799 * i - 934.5831;
					if (n < (taskData.getDn().length - 1)) {
						labels[n++] = label;
					}
				}
			}
		}
		return labels;
	}
}
