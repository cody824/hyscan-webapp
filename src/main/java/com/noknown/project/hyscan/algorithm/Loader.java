package com.noknown.project.hyscan.algorithm;

import com.noknown.framework.common.dao.GlobalConfigDao;
import com.noknown.framework.common.util.ClassUtil;
import com.noknown.project.hyscan.common.Constants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.text.MessageFormat;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

/**
 * @author guodong
 */
@Component
public class Loader {

	private static Map<String, AbstractAnalysisAlgo> map = new HashMap<>();
	private final Logger logger = LoggerFactory.getLogger(getClass());
	private final GlobalConfigDao gcDao;

	private String currentAlgoVersion;

	@Autowired
	public Loader(GlobalConfigDao gcDao) {
		this.gcDao = gcDao;
	}

	@PostConstruct
	public void init(){
		Properties properties = gcDao.getProperties(Constants.ALGO_CONFIG, Constants.APP_ID);
		if (properties == null) {
			properties = new Properties();
		}
		map = new HashMap<>(10);
		logger.info("开始初始化算法库");
		for(String key : properties.stringPropertyNames()){
			if (key.startsWith("algo_")) {
				String pn = properties.getProperty(key);
				String[] pnArray = pn.split(",");
				String[] keys = key.split("_");

				if (pnArray.length == 2) {
					logger.debug(pnArray[0]);
					Object algo =  ClassUtil.loadInstance(pnArray[0], pnArray[1]);
					if (algo != null && algo instanceof AbstractAnalysisAlgo) {
						AbstractAnalysisAlgo analysisAlgo = (AbstractAnalysisAlgo) algo;
						analysisAlgo.setClassName(pnArray[1]).setJar(pnArray[0]).setVersion(keys[1]);
						map.put(keys[1], analysisAlgo);
						properties.remove(key);
						properties.setProperty(keys[0] + "_" + keys[1], pn);
						logger.info(MessageFormat.format("加载算法【{0}】:{1}", keys[1], pnArray[1]));
					} else {
						properties.remove(key);
						properties.setProperty(keys[0] + "_" + keys[1] + "_invalid", pn);
					}
				}
			}
		}
		logger.info(MessageFormat.format("算法库加载完成，共{0}个算法", map.size()));
		gcDao.updateProperties(Constants.ALGO_CONFIG, Constants.APP_ID, properties);
		currentAlgoVersion = properties.getProperty("currentAlgoVersion");
	}

	public AbstractAnalysisAlgo getCurrentAlgo() {
		AbstractAnalysisAlgo algo = null;
		if (currentAlgoVersion != null) {
			algo = map.get(currentAlgoVersion);
		}
		if (algo == null && map.size() > 0){
			algo = map.get(map.keySet().iterator().next());
		}
		return algo;
	}


	public AbstractAnalysisAlgo getAlgo(String key) {
		return map.get(key);
	}

	/**
	 * @param currentAlgoVersion the currentAlgoVersion to set
	 */
	public void setCurrentAlgoVersion(String currentAlgoVersion) {
		this.currentAlgoVersion = currentAlgoVersion;
	}

}
