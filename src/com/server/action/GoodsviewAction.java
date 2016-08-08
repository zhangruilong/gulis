package com.server.action;

import java.lang.reflect.Type;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.server.pojo.Ccustomer;
import com.server.pojo.Collect;
import com.server.pojo.Goods;
import com.server.pojo.Goodsclass;
import com.server.pojo.Goodsview;
import com.server.poco.GoodsviewPoco;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Fileinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.FileUtil;
import com.system.tools.pojo.Pageinfo;

/**
 * goodsview 逻辑层
 *@author ZhangRuiLong
 */
public class GoodsviewAction extends BaseActionDao {
	public String result = CommonConst.FAILURE;
	public ArrayList<Goodsview> cuss = null;
	public Type TYPE = new TypeToken<ArrayList<Goodsview>>() {}.getType();
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public String getQuerysql(String query) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	String queryfieldname[] = GoodsviewPoco.QUERYFIELDNAME;
    	for(int i=0;i<queryfieldname.length;i++){
    		querysql += queryfieldname[i] + " like '%" + query + "%' or ";
    	}
		return querysql.substring(0, querysql.length() - 4);
	};
	//导出
	public void expAll(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Goodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GoodsviewPoco.ORDER);
		cuss = (ArrayList<Goodsview>) selAll(queryinfo);
		FileUtil.expExcel(response,cuss,GoodsviewPoco.CHINESENAME,GoodsviewPoco.NAME);
	}
	//查询所有
	public void selAll(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Goodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GoodsviewPoco.ORDER);
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//分页查询
	public void selQuery(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Goodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GoodsviewPoco.ORDER);
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), selQuery(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//查询首页品牌专区
	@SuppressWarnings("unchecked")
	public void mselAll(HttpServletRequest request, HttpServletResponse response){
		String customerid = request.getParameter("customerid");
		String customertype = request.getParameter("customertype");
		String customerlevel = request.getParameter("customerlevel");
		String goodsbrand = request.getParameter("goodsbrand");
		//查询该客户的供应商关系表
		Queryinfo Ccustomerqueryinfo = getQueryinfo();
		Ccustomerqueryinfo.setType(Ccustomer.class);
		Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"'");
		ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);
		if(Ccustomercuss.size()!=0){
			String wheresql = "goodsstatue ='上架' and pricesclass='"+customertype+"' and priceslevel='"+customerlevel+"' and (";
			for(Ccustomer mCcustomer:Ccustomercuss){
				wheresql += "goodscompany ='"+mCcustomer.getCcustomercompany()+"' or ";
			}
			wheresql = wheresql.substring(0, wheresql.length()-3) +")";
			if(CommonUtil.isNotEmpty(goodsbrand)){
				wheresql += " and goodsbrand='"+goodsbrand+"'";
			} else {
				wheresql += " and goodsbrand is not null";
			}
			Queryinfo queryinfo = getQueryinfo(request);
			queryinfo.setType(Goodsview.class);
			queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
			queryinfo.setWheresql(wheresql);
			queryinfo.setOrder(GoodsviewPoco.ORDER);
			cuss = (ArrayList<Goodsview>) selQuery(queryinfo);
			//检查是否已经收藏了这个商品
			Queryinfo collectqueryinfo = getQueryinfo();
			collectqueryinfo.setType(Collect.class);
			collectqueryinfo.setWheresql("collectcustomer='"+customerid+"'");
			ArrayList<Collect> cussCollect = (ArrayList<Collect>) selAll(collectqueryinfo);
			for(Goodsview mGoodsview:cuss){
				for(Collect mCollect:cussCollect){
					if(mGoodsview.getGoodsid().equals(mCollect.getCollectgoods())){
						mGoodsview.setGoodsdetail("checked");
					}
				}
			}
			String sql2 = "select count(g.goodsbrand) goodsid,g.goodsbrand from goodsview g "+
				"where g.goodsbrand is not null "+
				"and g.goodsstatue = '上架' "+
				"and g.pricesclass='3' "+
				"and g.priceslevel='3' "+
				"and g.goodsbrand in (select gs.goodsclassname from goodsclass gs) "+
				"and (";
			for(Ccustomer mCcustomer:Ccustomercuss){
				sql2 += "g.goodscompany ='"+mCcustomer.getCcustomercompany()+"' or ";
			}
			sql2 = sql2.substring(0, sql2.length()-3) +")";
			List<Goods> goclList = selAll(Goods.class, sql2+" group by g.goodsbrand");
			List<Object> objList = new ArrayList<Object>();
			objList.add(cuss);
			objList.add(goclList);
			Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), objList);
			result = CommonConst.GSON.toJson(pageinfo);
		}
		responsePW(response, result);
	}
	//查询首页裸价专区
	@SuppressWarnings("unchecked")
	public void selljgv(HttpServletRequest request, HttpServletResponse response){
		String customerid = request.getParameter("customerid");
		String customertype = request.getParameter("customertype");
		String customerlevel = request.getParameter("customerlevel");
		String goodsclassparent = request.getParameter("parent");
		//查询该客户的供应商关系表
		Queryinfo Ccustomerqueryinfo = getQueryinfo();
		Ccustomerqueryinfo.setType(Ccustomer.class);
		Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"'");
		ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);
		if(Ccustomercuss.size()!=0){
			String wheresql = "goodsstatue ='上架' and pricesclass='"+customertype+"' and priceslevel='"+customerlevel+"' and goodsclassparent='"+goodsclassparent+"' and (";
			for(Ccustomer mCcustomer:Ccustomercuss){
				wheresql += "goodscompany ='"+mCcustomer.getCcustomercompany()+"' or ";
			}
			wheresql = wheresql.substring(0, wheresql.length()-3) +")";
			Queryinfo queryinfo = getQueryinfo(request);
			queryinfo.setType(Goodsview.class);
			queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
			queryinfo.setWheresql(wheresql);
			queryinfo.setOrder(GoodsviewPoco.ORDER);
			cuss = (ArrayList<Goodsview>) selQuery(queryinfo);
			//检查是否已经收藏了这个商品
			Queryinfo collectqueryinfo = getQueryinfo();
			collectqueryinfo.setType(Collect.class);
			collectqueryinfo.setWheresql("collectcustomer='"+customerid+"'");
			ArrayList<Collect> cussCollect = (ArrayList<Collect>) selAll(collectqueryinfo);
			for(Goodsview mGoodsview:cuss){
				for(Collect mCollect:cussCollect){
					if(mGoodsview.getGoodsid().equals(mCollect.getCollectgoods())){
						mGoodsview.setGoodsdetail("checked");
					}
				}
			}
		
			Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), cuss);
			result = CommonConst.GSON.toJson(pageinfo);
		}
		responsePW(response, result);
	}
}
