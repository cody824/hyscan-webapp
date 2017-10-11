package com.noknown.project.hyscan.agorithm;

import Jama.Matrix;

public class HyScan_Agorithm {
	
	//to do  :需要确定 输出的含义，取值范围，例如，老化等级，一共几级，最小值，最大值
	
	public int olderLevel(double [][]sampleData, double [][] normData ){
		int result = 0;
		result = angleMatch( sampleData, normData );
		return result;
	}
	
	public int material(double [][]sampleData, double [][] normData, double threshold){
		int result = 0;
		
		result = angleMatch2(sampleData, normData,threshold);
		return result;
	}
	
	
	/*
	 * sampleData 是被测光谱数据，可以是多条数据，可以是一条数据，L*2，L是波长长度，数据的个数，
	 * 第一列是波长值，第2列是数据值
	 * normData 是标准数据，单条数据，L*2 ，第一列是波长值，第2列是数据，
	 * 
	 * 只有一条测试数据和一条标准数据的情况
	 * 返回結果是int 值，代表老化等级1,2,3，
	 */
	
	private int angleMatch(double [][]sampleData, double [][] normData ){
		
		if ( sampleData.length == 0 || normData.length == 0 ) {
			return 0;
		}
		
		Matrix testData = new Matrix( sampleData );
		Matrix NormData = new Matrix( normData );	
		int testDataX = testData.getRowDimension();	
		
		double angle = 0;
		double sum1 = 0, sum2= 0, sum3 = 0;
		
		for(int i = 0; i < testDataX; i++ ){			
		    sum1 += testData.get(i,1)*NormData.get(i,1);
			sum2 += testData.get(i, 1)* testData.get(i, 1);
			sum3 += NormData.get(i, 1)*NormData.get(i, 1);				
		}
		angle = Math.acos(sum1 / Math.sqrt(sum2 * sum3));
		
		int result = 0;
		
		if(0.0 <= angle && angle <= 2.0){
			result = 1;
		}else if( 2.0 < angle && angle <= 5.0) {
			result = 2;
		}else{
			result = 3;
		}
		
		
		return result;
		
	}
	
	/*
	 * sampleData 是被测光谱数据，一条被测数据，L*2，L是波长长度，数据的个数，
	 * 第一列是波长值，第2列是数据值
	 * normData 是标准数据，可以是多条数据，可以是单条数据，L*N ，第一列是波长值，第2-N列是数据，
	 *
	 * 适用于一条被测数据，多条标准数据的情况
	 * 返回結果是一個int值，代表符号标准数据中的index值，根据index值可以查询到是哪一个结果
	 */
	
	private int angleMatch2(double [][]sampleData, double [][] normData ,double threshold){
		
		if ( sampleData.length == 0 || normData.length == 0 ) {
			return 0;
		}
		
		Matrix testData = new Matrix( sampleData );
		Matrix NormData = new Matrix( normData );	
		int testDataX = testData.getRowDimension();	
		int normDataY = NormData.getColumnDimension();
		
		double []angle = new double[normDataY];
		double sum1 = 0, sum2= 0, sum3 = 0;
		
		angle[0] = 10;//第0列是波长值，在结果中用一个比较大的值来代表		
		for(int j = 1; j < normDataY; j++ ){
			//j 代表有几条标准数据
			for(int i = 0; i < testDataX; i++ ){
				// i 代表 行
				sum1 += testData.get(i, 1)*NormData.get(i, j);
				sum2 += testData.get(i, 1)* testData.get(i, 1);
				sum3 += NormData.get(i, j)*NormData.get(i, j);		
			}
			angle[j] = Math.acos(sum1 / Math.sqrt(sum2 * sum3));
		}
		
		int result = 0;
		for( int i = 1; i < angle.length; i++ ){
			if( angle[i] < threshold ){
				result = i;
			}
		}
		return result;
	}
}
