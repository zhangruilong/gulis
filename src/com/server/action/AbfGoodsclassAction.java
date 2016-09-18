package com.server.action;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.server.pojo.Ccustomer;
import com.server.pojo.Ccustomerview;
import com.server.pojo.Customer;
import com.server.pojo.Goodsclass;
import com.server.pojo.Goodsview;
import com.server.poco.GoodsclassPoco;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;
import com.system.tools.pojo.Pageinfo;

/**
 * 大小类 逻辑层
 *@author ZhangRuiLong
 */
public class AbfGoodsclassAction extends GoodsclassAction {
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public String getQuerysql(String query) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	String queryfieldname[] = GoodsclassPoco.QUERYFIELDNAME;
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
	//查询主页左边的goodsclass
	@SuppressWarnings("unchecked")
	public void selPCHomeGC(HttpServletRequest request, HttpServletResponse response){
		String cusid = request.getParameter("cusid");
		String sql = "select count(g.goodsclassname) goodsid, g.goodsclassname,g.goodsclassparent ";
		List<Ccustomerview> cusli = selAll(Ccustomerview.class,"select * from ccustomerview where customerid='"+cusid+"'");
		if(cusli.size() > 0){
			Ccustomerview cus = cusli.get(0);
			sql += "from goodsview g where g.pricesclass = '"+cus.getCustomertype()+"' "+
					"and g.priceslevel = "+cus.getCustomerlevel()+" and g.goodsstatue = '上架' and (";
			String sql2 = "select g.goodsbrand as goodsclassname from goodsview g "+
					"where g.goodsbrand is not null "+
					"and g.goodsstatue = '上架' "+
					"and g.pricesclass='"+cus.getCustomertype()+"' "+
					"and g.priceslevel="+cus.getCustomerlevel() +
					" and g.goodsbrand in (select gs.goodsclassname from goodsclass gs) "+
					"and (";
			for (Ccustomerview ccitem : cusli) {
				sql += "g.goodscompany='"+ccitem.getCcustomercompany()+"' or ";
				sql2 += "g.goodscompany ='"+ccitem.getCcustomercompany()+"' or ";
			}
			sql2 = sql2.substring(0, sql2.length()-3) +") group by g.goodsbrand";
			sql = sql.substring(0,sql.length()-3) + ") group by g.goodsclassname,g.goodsclassparent";
			List<Object> objli = new ArrayList<Object>();
			objli.add(selAll(Goodsclass.class, sql));
			objli.add(selAll(Goodsview.class, sql2));
			Pageinfo pageinfo = new Pageinfo(0, objli);
			result = CommonConst.GSON.toJson(pageinfo);
		}
		responsePW(response, result);
	}
}











