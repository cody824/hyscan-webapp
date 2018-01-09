package com.noknown.project.hyscan.algorithm;

public interface SpectralAnalysisAlgo {

	/**
	 * 检测老化等级
	 * 
	 * @param sampleData
	 *            是被测光谱数据，可以是多条数据，可以是一条数据，L*2，L是波长长度，数据的个数， 第一列是波长值，第2列是数据值
	 * @param normData
	 *            是标准数据，单条数据，L*2 ，第一列是波长值，第2列是数据， 只有一条测试数据和一条标准数据的情况
	 * @return 返回結果是 代表老化等级1,2,3，
	 */
	int olderLevel(double[][] sampleData, double[][] normData);

	/**
	 * 检测材质
	 *
	 * @param sampleData
	 *            是被测光谱数据，一条被测数据，L*2，L是波长长度，数据的个数， 第一列是波长值，第2列是数据值
	 * @param normData
	 *            是标准数据，可以是多条数据，可以是单条数据，L*N ，第一列是波长值，第2-N列是数据， 适用于一条被测数据，多条标准数据的情况
	 * @param threshold
	 * @return 返回結果是一個int值，代表符号标准数据中的index值，根据index值可以查询到是哪一个结果
	 */
	int material(double[][] sampleData, double[][] normData, double threshold);

	/**
	 * sampleData 是被测光谱数据，是一条数据，L*2，L是波长长度，数据的个数，
	 * 第一列是波长值，第2列是数据值
	 * 
	 * waveIndex, 1*3数组，waveIndex[0]是波段比值法的被除数的位置；waveIndex[1]是波段比值法的除数的位置
	 * 对于总磷含量的算法，需要三个波段值。其他指标均需要两个参数。
	 * 
	 * flag是检测参数的选项提示，叶绿素，浊度，悬浮度。。。。等等叶绿素: chlorophyll； 浊度: muddy ，悬浮度: suspendedmatter ,
	 * 水色指数: watercolor,总氮含量:nitrogen;总磷含量：phosphorus; CDOM（有色可溶性有机物）;化学需氧量含量COD
	 * 
	 * 返回的是double
	 */
	double waterDetection(double[][] sampleData, int[] waveIndex, String flag);

}
