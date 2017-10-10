package com.noknown.project.hyscan.service.impl;

import org.springframework.stereotype.Service;

import com.noknown.project.hyscan.pojo.Result;
import com.noknown.project.hyscan.service.SpectralAnalysisService;

@Service
public class SpectralAnalysisServiceImpl implements SpectralAnalysisService {

	@Override
	public Result analysis(Integer[] dn) {
		// TODO Auto-generated method stub
		Result result = new Result();
		result.setLevel(3);
		result.setLevelText("三级老化");
		result.setMaterial("金属材质");
		return result;
	}

	

}
