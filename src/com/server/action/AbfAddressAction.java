package com.server.action;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.server.pojo.Address;
import com.server.poco.AddressPoco;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;
import com.system.tools.pojo.Pageinfo;

/**
 * 我的地址 逻辑层
 *@author ZhangRuiLong
 */
public class AbfAddressAction extends AddressAction {
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public String getQuerysql(String query) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	String queryfieldname[] = AddressPoco.QUERYFIELDNAME;
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
	//新增收货地址
	public void insertCusAdd(HttpServletRequest request, HttpServletResponse response){
		json2cuss(request);
		Address temp = cuss.get(0);
		temp.setAddressid(CommonUtil.getNewId());
		result = insSingle(temp);
		if(CommonConst.SUCCESS.equals(result) && temp.getAddressture() == 1){
			updSingle(AddressPoco.TABLE, "addressture=0", "addressid!='"+temp.getAddressid()+"' and addresscustomer='"+temp.getAddresscustomer()+"'");
		}
		responsePW(response, result);
	}
}
