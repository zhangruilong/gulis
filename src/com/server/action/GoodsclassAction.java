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
public class GoodsclassAction extends BaseActionDao {
	public String result = CommonConst.FAILURE;
	public ArrayList<Goodsclass> cuss = null;
	public Type TYPE = new TypeToken<ArrayList<Goodsclass>>() {}.getType();
	
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
	//新增
	public void insAll(HttpServletRequest request, HttpServletResponse response){
		json2cuss(request);
		for(Goodsclass temp:cuss){
			if(CommonUtil.isNull(temp.getGoodsclassid()))
				temp.setGoodsclassid(CommonUtil.getNewId());
			result = insSingle(temp);
		}
		responsePW(response, result);
	}
	//删除
	public void delAll(HttpServletRequest request, HttpServletResponse response){
		json2cuss(request);
		for(Goodsclass temp:cuss){
			result = delSingle(temp,GoodsclassPoco.KEYCOLUMN);
		}
		responsePW(response, result);
	}
	//修改
	public void updAll(HttpServletRequest request, HttpServletResponse response){
		json2cuss(request);
		for(Goodsclass temp:cuss){
			result = updSingle(temp,GoodsclassPoco.KEYCOLUMN);
		}
		responsePW(response, result);
	}
	//导出
	public void expAll(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Goodsclass.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GoodsclassPoco.ORDER);
		cuss = (ArrayList<Goodsclass>) selAll(queryinfo);
		FileUtil.expExcel(response,cuss,GoodsclassPoco.CHINESENAME,GoodsclassPoco.NAME);
	}
	//导入
	public void impAll(HttpServletRequest request, HttpServletResponse response){
		Fileinfo fileinfo = FileUtil.upload(request,0,null,GoodsclassPoco.NAME,"impAll");
		String json = FileUtil.impExcel(fileinfo.getPath(),GoodsclassPoco.FIELDNAME); 
		if(CommonUtil.isNotEmpty(json)) cuss = CommonConst.GSON.fromJson(json, TYPE);
		for(Goodsclass temp:cuss){
			if(CommonUtil.isNull(temp.getGoodsclassid()))
				temp.setGoodsclassid(CommonUtil.getNewId());
			result = insSingle(temp);
		}
		responsePW(response, result);
	}
	//查询所有
	public void selAll(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Goodsclass.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GoodsclassPoco.ORDER);
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//分页查询
	public void selQuery(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Goodsclass.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GoodsclassPoco.ORDER);
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), selQuery(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
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
			for (Ccustomerview ccitem : cusli) {
				sql += "g.goodscompany='"+ccitem.getCcustomercompany()+"' or ";
			}
			sql = sql.substring(0,sql.length()-3) + ") group by g.goodsclassname,g.goodsclassparent";
			Pageinfo pageinfo = new Pageinfo(0, selAll(Goodsclass.class, sql));
			result = CommonConst.GSON.toJson(pageinfo);
		}
		responsePW(response, result);
	}
}











