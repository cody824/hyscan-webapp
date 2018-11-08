package com.noknown.project.hyscan.pojo;

import java.util.List;

/**
 * @author guodong
 * @date 2018/11/3
 */
public class ImgAnalysisResult {

	public final String  result;

	public final String desc;

	public final float similarityDegree;

	public final String url;

	public final Long beginTs;

	public final Long endTs;

	public final List<ImgAnalysisResult> similars;

	public ImgAnalysisResult(String result, String desc, float similarityDegree, String url, Long beginTs, Long endTs, List<ImgAnalysisResult> similars) {
		this.result = result;
		this.desc = desc;
		this.similarityDegree = similarityDegree;
		this.url = url;
		this.beginTs = beginTs;
		this.endTs = endTs;
		this.similars = similars;
	}
}
