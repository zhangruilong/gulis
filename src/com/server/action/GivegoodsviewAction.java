package com.server.action;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.reflect.TypeToken;
import com.server.poco.GivegoodsviewPoco;
import com.server.poco.GoodsviewPoco;
import com.server.poco.TimegoodsviewPoco;
import com.server.pojo.Ccustomer;
import com.server.pojo.Customer;
import com.server.pojo.Givegoodsview;
import com.server.pojo.Goodsview;
import com.server.pojo.Orderd;
import com.server.pojo.Timegoodsview;
import com.system.tools.CommonConst;
import com.system.tools.base.BaseActionDao;
import com.system.tools.pojo.Pageinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.DateUtils;
import com.system.tools.util.FileUtil;

/**
 * 买赠商品 逻辑层
 *@author ZhangRuiLong
 */
public class GivegoodsviewAction extends BaseActionDao {
	public String result = CommonConst.FAILURE;
	public ArrayList<Givegoodsview> cuss = null;
	public Type TYPE = new TypeToken<ArrayList<Givegoodsview>>() {}.getType();
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public String getQuerysql(String query) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	String queryfieldname[] = GivegoodsviewPoco.QUERYFIELDNAME;
    	for(int i=0;i<queryfieldname.length;i++){
    		querysql += queryfieldname[i] + " like '%" + query + "%' or ";
    	}
		return querysql.substring(0, querysql.length() - 4);
	};
	//导出
	public void expAll(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Givegoodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GivegoodsviewPoco.ORDER);
		cuss = (ArrayList<Givegoodsview>) selAll(queryinfo);
		FileUtil.expExcel(response,cuss,GivegoodsviewPoco.CHINESENAME,GivegoodsviewPoco.NAME);
	}
	//查询所有
	public void selAll(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Givegoodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GivegoodsviewPoco.ORDER);
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//分页查询
	public void selQuery(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Givegoodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(GivegoodsviewPoco.ORDER);
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), selQuery(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//买赠商品下单
	@SuppressWarnings("unchecked")
	public void mzGoodsxd(HttpServletRequest request, HttpServletResponse response){
		String cusid = request.getParameter("customerid");
		String givegoodsid = request.getParameter("givegoodsid");
		Pageinfo pageinfo = null;
		List<Customer> customers = selAll(Customer.class, "select * from customer where customerid='"+cusid+"'");
		if(customers.size() == 1){
			Customer cus = customers.get(0);
			Queryinfo queryinfo = getQueryinfo(request);
			queryinfo.setType(Givegoodsview.class);
			queryinfo.setWheresql("givegoodsid='"+givegoodsid+"' and givegoodsstatue='启用' and givegoodsscope like '%"+cus.getCustomertype()+"%'");
			queryinfo.setOrder(GivegoodsviewPoco.ORDER);
			List<Givegoodsview> mzgoodss = selAll(queryinfo);
			if(mzgoodss.size()==1){
				Givegoodsview gg = mzgoodss.get(0);
				List<Orderd> orderds = selAll(Orderd.class, "select od.orderdcode,od.orderdtype,od.orderdnum,od.orderdunits,sum(od.orderdnum) as orderdclass from orderm om "+
						"left join orderd od on od.orderdorderm = om.ordermid where om.ordermcustomer = '"+request.getParameter("customerid")+
						"' and od.orderdtype = '买赠' and orderdcode='"+gg.getGivegoodscode()+"' and om.ordermtime >= '"+DateUtils.getDate()+
						" 00:00:00' and om.ordermtime <= '"+DateUtils.getDate()+" 23:59:59'  group by od.orderdcode,od.orderdtype,od.orderdunits,od.orderdnum");
				Integer odNum = gg.getGivegoodsnum();
				if(orderds.size() > 0){
					for (Orderd od : orderds) {
						odNum -= od.getOrderdnum();
					}
				}
				gg.setCreator(odNum.toString());
				pageinfo = new Pageinfo(mzgoodss);
				result = CommonConst.GSON.toJson(pageinfo);
			}
		}
		responsePW(response, result);
	}
	//首页的买赠商品
	@SuppressWarnings("unchecked")
	public void homMZGoods(HttpServletRequest request, HttpServletResponse response){
		String customerid = request.getParameter("customerid");
		String wheresql = null;
		List<Customer> cusli = selAll(Customer.class, "select * from customer where customerid='"+customerid+"'");			//根据客户id查询客户
		if(cusli.size() ==1){
			Queryinfo Ccustomerqueryinfo = getQueryinfo();
			Ccustomerqueryinfo.setType(Ccustomer.class);
			Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"' ");
			ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);						//查询客户的客户关系
			if(Ccustomercuss.size()!=0){																		//如果有客户关系
				wheresql = "givegoodsstatue='启用' and givegoodsscope like '%"+cusli.get(0).getCustomertype()+"%' and (";
				for (Ccustomer ccustomer : Ccustomercuss) {
					wheresql += "givegoodscompany='"+ccustomer.getCcustomercompany()+"' or ";
				}
				wheresql = wheresql.substring(0, wheresql.length()-3) + ")";
				Queryinfo queryinfo = getQueryinfo(request);
				queryinfo.setType(Givegoodsview.class);
				queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
				queryinfo.setWheresql(wheresql);
				queryinfo.setOrder("givegoodsseq");
				cuss = (ArrayList<Givegoodsview>) selQuery(queryinfo);
				Pageinfo pageinfo = new Pageinfo(0, cuss);
				result = CommonConst.GSON.toJson(pageinfo);
			}
		}
		responsePW(response, result);
	}
	//买赠页
	@SuppressWarnings("unchecked")
	public void cusGiveG(HttpServletRequest request, HttpServletResponse response){
		String companyid = request.getParameter("companyid");
		String customerid = request.getParameter("customerid");
		String customertype = request.getParameter("customertype");
		String givegoodscode = request.getParameter("givegoodscode");
		String wheresql = null;
		if(CommonUtil.isEmpty(companyid)){
			//如果不是业务员补单
			Queryinfo Ccustomerqueryinfo = getQueryinfo();
			Ccustomerqueryinfo.setType(Ccustomer.class);
			Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"'");
			ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);
			if(Ccustomercuss.size()!=0){
				wheresql = "givegoodsstatue='启用' and givegoodsscope like '%"+customertype+"%' ";
				for (Ccustomer ccustomer : Ccustomercuss) {
					wheresql += "and givegoodscompany='"+ccustomer.getCcustomercompany()+"' ";
				}
			}
		} else {
			//如果是业务员补单
			wheresql = "givegoodsstatue='启用' and givegoodsscope like '%"+customertype+"%' and givegoodscompany='"+companyid+"' ";
		}
		if(CommonUtil.isNotEmpty(givegoodscode)){
			wheresql += "and givegoodscode='"+givegoodscode+"' ";
		}
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Givegoodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setWheresql(wheresql);
		queryinfo.setOrder("givegoodsseq");
		cuss = (ArrayList<Givegoodsview>) selAll(queryinfo);
		Pageinfo pageinfo = new Pageinfo(0, cuss);
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
}














