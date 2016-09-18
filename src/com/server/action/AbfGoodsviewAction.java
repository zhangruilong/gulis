package com.server.action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.server.poco.GoodsviewPoco;
import com.server.pojo.Ccustomer;
import com.server.pojo.Collect;
import com.server.pojo.Customer;
import com.server.pojo.Goods;
import com.server.pojo.Goodsclass;
import com.server.pojo.Goodsview;
import com.system.tools.CommonConst;
import com.system.tools.pojo.Pageinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;

/**
 * goodsview 逻辑层
 *@author ZhangRuiLong
 */
public class AbfGoodsviewAction extends GoodsviewAction {
	
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
	//商品下单
	@SuppressWarnings("unchecked")
	public void goodsxd(HttpServletRequest request, HttpServletResponse response){
		String cusid = request.getParameter("customerid");
		String goodsid = request.getParameter("goodsid");
		String goodsclassparent = request.getParameter("goodsclassparent");
		List<Customer> customers = selAll(Customer.class, "select * from customer where customerid='"+cusid+"'");
		if(customers.size() == 1){
			Customer cus = customers.get(0);
			Queryinfo queryinfo = getQueryinfo(request);
			queryinfo.setType(Goodsview.class);
			queryinfo.setWheresql("goodsid='"+goodsid+"' and goodsstatue='上架' and pricesclass='"+cus.getCustomertype()+"' and priceslevel="+cus.getCustomerlevel());
			queryinfo.setOrder(GoodsviewPoco.ORDER);
			List<Goodsview> gvli = selAll(queryinfo);
			if(gvli.size()>0){
				Goodsclass gc = (Goodsclass) selAll(Goodsclass.class, "select * from goodsclass where goodsclassid='"+goodsclassparent+"'").get(0);
				for (Goodsview gv : gvli) {
					gv.setGoodsclassdetail(gc.getGoodsclassname());				//用Goodsview中的Goodsclassdetail储存父类的名称
				}
				Queryinfo collectqueryinfo = getQueryinfo(Collect.class, null, null, null);
				collectqueryinfo.setWheresql("collectcustomer='"+cusid+"'");
				ArrayList<Collect> cussCollect = (ArrayList<Collect>) selAll(collectqueryinfo);
				for(Goodsview mGoodsview:gvli){
					for(Collect mCollect:cussCollect){
						if(mGoodsview.getGoodsid().equals(mCollect.getCollectgoods())){
							mGoodsview.setGoodsdetail("checked");
						}
					}
				}
				Pageinfo pageinfo = new Pageinfo(0, gvli);
				result = CommonConst.GSON.toJson(pageinfo);
			}
			
		}
		responsePW(response, result);
	}
	//查询
	@SuppressWarnings("unchecked")
	public void mselAll(HttpServletRequest request, HttpServletResponse response){
		String companyid = request.getParameter("companyid");
		String customerid = request.getParameter("customerid");
		String customertype = request.getParameter("customertype");
		String customerlevel = request.getParameter("customerlevel");
		String goodsclassname = request.getParameter("goodsclassname");
		String wheresql = "goodsstatue ='上架' and pricesclass='"+customertype+"' and priceslevel='"+customerlevel+"' and (";
		if(CommonUtil.isNotEmpty(companyid)){
			wheresql += "goodscompany='"+companyid+"' or ";
		}
		wheresql = wheresql.substring(0, wheresql.length() -3) + ")";
		if(CommonUtil.isNotEmpty(goodsclassname)){
			wheresql += " and (goodsclassname='"+goodsclassname+
					"' or goodsbrand='"+goodsclassname+
					"' or goodstype='"+goodsclassname+
					"')";
		}
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Goodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setWheresql(wheresql);
		queryinfo.setOrder(GoodsviewPoco.ORDER);
		cuss = (ArrayList<Goodsview>) selQuery(queryinfo);
		Queryinfo collectqueryinfo = getQueryinfo(Collect.class, null, null, null);
		collectqueryinfo.setWheresql("collectcustomer='"+customerid+"'");
		ArrayList<Collect> cussCollect = (ArrayList<Collect>) selAll(collectqueryinfo);
		for(Goodsview mGoodsview:cuss){
			for(Collect mCollect:cussCollect){
				if(mGoodsview.getGoodsid().equals(mCollect.getCollectgoods())){
					mGoodsview.setGoodsdetail("checked");										//如果收藏的商品就吧goodsdetail设置为checked
				}
			}
		}
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), cuss);
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//查询首页品牌专区
	@SuppressWarnings("unchecked")
	public void queryHomePagePPZQG(HttpServletRequest request, HttpServletResponse response){
		String customerid = request.getParameter("customerid");
		String customertype = request.getParameter("customertype");
		String customerlevel = request.getParameter("customerlevel");
		String goodsbrand = request.getParameter("goodsbrand");
		String limit = request.getParameter("limit");
		//查询该客户的供应商关系表
		Queryinfo Ccustomerqueryinfo = getQueryinfo(Ccustomer.class, null, null, null);
		Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"'");
		ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);
		if(Ccustomercuss.size()!=0){
			String wheresql = "goodsstatue ='上架' and pricesclass='"+customertype+"' and priceslevel='"+customerlevel+"' and (";
			for(Ccustomer mCcustomer:Ccustomercuss){
				wheresql += "goodscompany ='"+mCcustomer.getCcustomercompany()+"' or ";
			}
			wheresql = wheresql.substring(0, wheresql.length()-3) +")";
			
			
			String sql2 = "select count(g.goodsbrand) goodsid,g.goodsbrand from goodsview g "+
				"where g.goodsbrand is not null "+
				"and g.goodsstatue = '上架' "+
				"and g.pricesclass='"+customertype+"' "+
				"and g.priceslevel="+customerlevel +
				" and g.goodsbrand in (select gs.goodsclassname from goodsclass gs) "+
				"and (";
			for(Ccustomer mCcustomer:Ccustomercuss){
				sql2 += "g.goodscompany ='"+mCcustomer.getCcustomercompany()+"' or ";
			}
			sql2 = sql2.substring(0, sql2.length()-3) +")";
			List<Goods> goclList = selAll(Goods.class, sql2+" group by g.goodsbrand");
			if(CommonUtil.isEmpty(goodsbrand) && goclList.size()>0){
				goodsbrand = goclList.get(0).getGoodsbrand();
			}
			wheresql += " and goodsbrand='"+goodsbrand+"'";
			Queryinfo queryinfo = getQueryinfo(request);
			queryinfo.setType(Goodsview.class);
			queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
			queryinfo.setWheresql(wheresql);
			queryinfo.setOrder(GoodsviewPoco.ORDER);
			if(CommonUtil.isEmpty(limit)){
				cuss = (ArrayList<Goodsview>) selAll(queryinfo);
			} else {
				cuss = (ArrayList<Goodsview>) selQuery(queryinfo);
			}
			//检查是否已经收藏了这个商品
			Queryinfo collectqueryinfo = getQueryinfo(Ccustomer.class, null, null, null);
			collectqueryinfo.setWheresql("collectcustomer='"+customerid+"'");
			ArrayList<Collect> cussCollect = (ArrayList<Collect>) selAll(collectqueryinfo);
			for(Goodsview mGoodsview:cuss){
				for(Collect mCollect:cussCollect){
					if(mGoodsview.getGoodsid().equals(mCollect.getCollectgoods())){
						mGoodsview.setGoodsdetail("checked");
					}
				}
			}
			List<Object> objList = new ArrayList<Object>();
			objList.add(cuss);
			objList.add(goclList);
			Pageinfo pageinfo = new Pageinfo(objList);
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
		Queryinfo Ccustomerqueryinfo = getQueryinfo(Ccustomer.class, null, null, null);
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
			Queryinfo collectqueryinfo = getQueryinfo(Collect.class, null, null, null);
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
	//裸价专区
	@SuppressWarnings("unchecked")
	public void ljgvgoods(HttpServletRequest request, HttpServletResponse response){
		String customerid = request.getParameter("customerid");
		String customertype = request.getParameter("customertype");
		String customerlevel = request.getParameter("customerlevel");
		String goodsclassparent = request.getParameter("goodsclassparent");
		String goodsclassname = request.getParameter("goodsclassname");
		//查询该客户的供应商关系表
		Queryinfo Ccustomerqueryinfo = getQueryinfo(Ccustomer.class, null, null, null);
		Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"'");
		ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);
		if(Ccustomercuss.size()!=0){
			String wheresql = "goodsstatue ='上架' and pricesclass='"+customertype+"' and priceslevel='"+customerlevel+"' and (";
			for(Ccustomer mCcustomer:Ccustomercuss){
				wheresql += "goodscompany ='"+mCcustomer.getCcustomercompany()+"' or ";
			}
			wheresql = wheresql.substring(0, wheresql.length()-3) +")";
			String sql2;
			String sql2aft;
			if(goodsclassparent.equals("G14630381061319233")){
				sql2 = "select count(g.goodsbrand) goodsid,g.goodsbrand as goodsclassname from goodsview g "+
						"where g.goodsbrand is not null "+
						"and g.goodsstatue = '上架' "+
						"and g.pricesclass='"+customertype+"' "+
						"and g.priceslevel="+customerlevel +
						" and g.goodsbrand in (select gs.goodsclassname from goodsclass gs) "+
						"and (";
				sql2aft = " group by g.goodsbrand";
			} else {
				sql2 = "select count(g.goodsclassname) goodsid,g.goodsclassname from goodsview g "+
						"where g.goodsclassparent='"+goodsclassparent+"' "+
						"and g.pricesclass='"+customertype+"' "+
						"and g.priceslevel="+customerlevel+
						" and g.goodsstatue='上架' "+
						"and (";
				sql2aft = " group by g.goodsclassname ";
			}
			for(Ccustomer mCcustomer:Ccustomercuss){
				sql2 += "g.goodscompany ='"+mCcustomer.getCcustomercompany()+"' or ";
			}
			sql2 = sql2.substring(0, sql2.length()-3) +")";
			List<Goodsview> goclList = selAll(Goodsview.class, sql2+sql2aft);
			if(CommonUtil.isEmpty(goodsclassname) && goclList.size()>0){
				goodsclassname = goclList.get(0).getGoodsclassname();
			}
			wheresql += " and (goodsclassname='"+goodsclassname+"' or goodsbrand='"+goodsclassname+"' or goodstype='"+goodsclassname+"') ";
			Queryinfo queryinfo = getQueryinfo(request);
			queryinfo.setType(Goodsview.class);
			queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
			queryinfo.setWheresql(wheresql);
			queryinfo.setOrder(GoodsviewPoco.ORDER);
			cuss = (ArrayList<Goodsview>) selAll(queryinfo);
			//检查是否已经收藏了这个商品
			Queryinfo collectqueryinfo = getQueryinfo(Collect.class, null, null, null);
			collectqueryinfo.setWheresql("collectcustomer='"+customerid+"'");
			ArrayList<Collect> cussCollect = (ArrayList<Collect>) selAll(collectqueryinfo);
			for(Goodsview mGoodsview:cuss){
				for(Collect mCollect:cussCollect){
					if(mGoodsview.getGoodsid().equals(mCollect.getCollectgoods())){
						mGoodsview.setGoodsdetail("checked");
					}
				}
			}
			List<Object> objList = new ArrayList<Object>();
			objList.add(cuss);
			objList.add(goclList);
			Pageinfo pageinfo = new Pageinfo(objList);
			result = CommonConst.GSON.toJson(pageinfo);
		}
		responsePW(response, result);
	}
	//条件查询
	@SuppressWarnings("unchecked")
	public void queryg(HttpServletRequest request, HttpServletResponse response){
		String customerid = request.getParameter("customerid");
		String querydis = request.getParameter("querydis");
		List<Customer> cusli = selAll(Customer.class,"select * from customer c where c.customerid='"+customerid+"'");
		if(cusli.size() ==1){
			//查询该客户的供应商关系表
			Queryinfo Ccustomerqueryinfo = getQueryinfo(Ccustomer.class, null, null, null);
			Ccustomerqueryinfo.setType(Ccustomer.class);
			Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"'");
			ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);
			if(Ccustomercuss.size()!=0){
				String sql = "select * from goodsview g where (goodsname like '%"+querydis+"%' or goodsbrand like '%"+querydis+
						"%') and goodsstatue ='上架' and pricesclass='"+cusli.get(0).getCustomertype()+"' and priceslevel='"+cusli.get(0).getCustomerlevel()+"' and (";
				for(Ccustomer mCcustomer:Ccustomercuss){
					sql += "goodscompany ='"+mCcustomer.getCcustomercompany()+"' or ";
				}
				sql = sql.substring(0, sql.length()-3) +")";
				cuss = (ArrayList<Goodsview>) selAll(Goodsview.class, sql);
				result = CommonConst.GSON.toJson(new Pageinfo(cuss));
			}
		}
		responsePW(response, result);
	}
}

















