package com.noknown.project.hyscan.algorithm;

public interface SpectralAnalysisAlgo {

	/**
	 * 检测老化等级
	 * 
	 * @param sampleData 是被测光谱数据，可以是多条数据，可以是一条数据，L*2，L是波长长度，数据的个数，
	 * 第一列是波长值，第2列是数据值
	 * @param normData 是标准数据，单条数据，L*2 ，第一列是波长值，第2列是数据，
	 * 只有一条测试数据和一条标准数据的情况
	 * @return  返回結果是 代表老化等级1,2,3，
	 */
	int olderLevel(double [][]sampleData, double [][] normData );
	
	/**
	 * 	检测材质
	 *
	 * @param sampleData 是被测光谱数据，一条被测数据，L*2，L是波长长度，数据的个数，
	 * 						第一列是波长值，第2列是数据值
	 * @param normData 是标准数据，可以是多条数据，可以是单条数据，L*N ，第一列是波长值，第2-N列是数据， 适用于一条被测数据，多条标准数据的情况
	 * @param threshold
	 * @return 返回結果是一個int值，代表符号标准数据中的index值，根据index值可以查询到是哪一个结果
	 */
	int material(double [][]sampleData, double [][] normData, double threshold);
	

	/**
	 * 	叶绿素浓度
	 *
	 * @param sampleData 是被测光谱数据，一条被测数据，L*2，L是波长长度，数据的个数，
	 * 						第一列是波长值，第2列是数据值
	 * @param normData 是标准数据，可以是多条数据，可以是单条数据，L*N ，第一列是波长值，第2-N列是数据， 适用于一条被测数据，多条标准数据的情况
	 * @param threshold
	 * @return 返回結果是一個int值，代表符号标准数据中的index值，根据index值可以查询到是哪一个结果
	 */
	int wqYls(double [][]sampleData, double [][] normData);
	
	/**
	 * 	悬浊物
	 *
	 * @param sampleData 是被测光谱数据，一条被测数据，L*2，L是波长长度，数据的个数，
	 * 						第一列是波长值，第2列是数据值
	 * @param normData 是标准数据，可以是多条数据，可以是单条数据，L*N ，第一列是波长值，第2-N列是数据， 适用于一条被测数据，多条标准数据的情况
	 * @return 返回結果是一個int值，代表符号标准数据中的index值，根据index值可以查询到是哪一个结果
	 */
	int wqXzw(double [][]sampleData, double [][] normData);
	
	/**
	 * 	浊度
	 *
	 * @param sampleData 是被测光谱数据，一条被测数据，L*2，L是波长长度，数据的个数，
	 * 						第一列是波长值，第2列是数据值
	 * @param normData 是标准数据，可以是多条数据，可以是单条数据，L*N ，第一列是波长值，第2-N列是数据， 适用于一条被测数据，多条标准数据的情况
	 * @return 返回結果是一個int值，代表符号标准数据中的index值，根据index值可以查询到是哪一个结果
	 */
	int wqZd(double [][]sampleData, double [][] normData);
	
	/**
	 * 	水色指数
	 *
	 * @param sampleData 是被测光谱数据，一条被测数据，L*2，L是波长长度，数据的个数，
	 * 						第一列是波长值，第2列是数据值
	 * @param normData 是标准数据，可以是多条数据，可以是单条数据，L*N ，第一列是波长值，第2-N列是数据， 适用于一条被测数据，多条标准数据的情况
	 * @return 返回結果是一個int值，代表符号标准数据中的index值，根据index值可以查询到是哪一个结果
	 */
	int wqSs(double [][]sampleData, double [][] normData);
	
}
