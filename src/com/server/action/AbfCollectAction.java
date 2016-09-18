package com.server.action;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.server.pojo.Collect;
import com.server.poco.CollectPoco;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.DateUtils;
import com.system.tools.util.FileUtil;
import com.system.tools.pojo.Pageinfo;

/**
 * 收藏 逻辑层
 *@author ZhangRuiLong
 */
public class AbfCollectAction extends CollectAction {
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public String getQuerysql(String query) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	String queryfieldname[] = CollectPoco.QUERYFIELDNAME;
    	for(int i=0;i<queryfieldname.length;i++){
    		querysql += queryfieldname[i] + " like '%" + query + "%' or ";
    	}
		return querysql.substring(0, querysql.length() - 4);
	};
	//将json转换成cuss
	public void json2cuss(HttpServletRequest request){
		String json = request.getParameter("json");
		System.out.println("json : " + json);
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
	}
	//新增
	public void insAllByGoodsid(HttpServletRequest request, HttpServletResponse response){
		json2cuss(request);
		for(Collect temp:cuss){
			if(getTotal(CollectPoco.TABLE, "collectgoods='"+temp.getCollectgoods()+"' and collectcustomer='"+temp.getCollectcustomer()+"'")==0){
				temp.setCreatetime(DateUtils.getDateTime());
				temp.setCollectid(CommonUtil.getNewId());
				result = insSingle(temp);
			};
		}
		responsePW(response, result);
	}
	//删除
	public void delAllByGoodsid(HttpServletRequest request, HttpServletResponse response){
		json2cuss(request);
		for(Collect temp:cuss){
			result = delSingle(temp);
		}
		responsePW(response, result);
	}
}
