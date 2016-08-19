package com.server.action;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.reflect.TypeToken;
import com.server.poco.GoodsviewPoco;
import com.server.poco.TimegoodsviewPoco;
import com.server.pojo.Ccustomer;
import com.server.pojo.Customer;
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
 * 秒杀商品 逻辑层
 *@author ZhangRuiLong
 */
public class TimegoodsviewAction extends BaseActionDao {
	public String result = CommonConst.FAILURE;
	public ArrayList<Timegoodsview> cuss = null;
	public Type TYPE = new TypeToken<ArrayList<Timegoodsview>>() {}.getType();
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public String getQuerysql(String query) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	String queryfieldname[] = TimegoodsviewPoco.QUERYFIELDNAME;
    	for(int i=0;i<queryfieldname.length;i++){
    		querysql += queryfieldname[i] + " like '%" + query + "%' or ";
    	}
		return querysql.substring(0, querysql.length() - 4);
	};
	//导出
	public void expAll(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Timegoodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(TimegoodsviewPoco.ORDER);
		cuss = (ArrayList<Timegoodsview>) selAll(queryinfo);
		FileUtil.expExcel(response,cuss,TimegoodsviewPoco.CHINESENAME,TimegoodsviewPoco.NAME);
	}
	//查询所有
	public void selAll(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Timegoodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(TimegoodsviewPoco.ORDER);
		Pageinfo pageinfo = new Pageinfo(0, selAll(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//分页查询
	public void selQuery(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Timegoodsview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(TimegoodsviewPoco.ORDER);
		Pageinfo pageinfo = new Pageinfo(getTotal(queryinfo), selQuery(queryinfo));
		result = CommonConst.GSON.toJson(pageinfo);
		responsePW(response, result);
	}
	//秒杀商品下单
	@SuppressWarnings("unchecked")
	public void msGoodsxd(HttpServletRequest request, HttpServletResponse response){
		String cusid = request.getParameter("customerid");
		String timegoodsid = request.getParameter("timegoodsid");
		Pageinfo pageinfo = null;
		List<Customer> customers = selAll(Customer.class, "select * from customer where customerid='"+cusid+"'");
		if(customers.size() == 1){
			Customer cus = customers.get(0);
			Queryinfo queryinfo = getQueryinfo(request);
			queryinfo.setType(Timegoodsview.class);
			queryinfo.setWheresql("timegoodsid='"+timegoodsid+"' and timegoodsstatue='启用' and timegoodsscope like '%"+cus.getCustomertype()+"%'");
			queryinfo.setOrder(TimegoodsviewPoco.ORDER);
			List<Timegoodsview> msgoodss = selAll(queryinfo);
			if(msgoodss.size()==1){
				Timegoodsview tg = msgoodss.get(0);
				List<Orderd> orderds = selAll(Orderd.class, "select od.orderdcode,od.orderdtype,od.orderdnum,od.orderdunits,sum(od.orderdnum) as orderdclass from orderm om "+
						"left join orderd od on od.orderdorderm = om.ordermid where om.ordermcustomer = '"+request.getParameter("customerid")+
						"' and od.orderdtype = '秒杀' and orderdcode='"+tg.getTimegoodscode()+"' and om.ordermtime >= '"+DateUtils.getDate()+
						" 00:00:00' and om.ordermtime <= '"+DateUtils.getDate()+" 23:59:59'  group by od.orderdcode,od.orderdtype,od.orderdunits,od.orderdnum");
				Integer odNum = tg.getTimegoodsnum();
				if(orderds.size()>0){
					for (Orderd od : orderds) {
						odNum -= od.getOrderdnum();
					}
				}
				tg.setTimegoodsdetail(odNum.toString());
				pageinfo = new Pageinfo(msgoodss);
				result = CommonConst.GSON.toJson(pageinfo);
			}
		}
		responsePW(response, result);
	}
	//首页的秒杀商品
	@SuppressWarnings("unchecked")
	public void homMSGoods(HttpServletRequest request, HttpServletResponse response){
		String customerid = request.getParameter("customerid");
		String wheresql = null;
		List<Customer> cusli = selAll(Customer.class, "select * from customer where customerid='"+customerid+"'");			//根据客户id查询客户
		if(cusli.size() ==1){
			Queryinfo Ccustomerqueryinfo = getQueryinfo();
			Ccustomerqueryinfo.setType(Ccustomer.class);
			Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"' ");
			ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);						//查询客户的客户关系
			if(Ccustomercuss.size()!=0){																		//如果有客户关系
				wheresql = "timegoodsstatue='启用' and timegoodsscope like '%"+cusli.get(0).getCustomertype()+"%' and (";
				for (Ccustomer ccustomer : Ccustomercuss) {
					wheresql += "timegoodscompany='"+ccustomer.getCcustomercompany()+"' or ";
				}
				wheresql = wheresql.substring(0, wheresql.length()-3) + ")";
				Queryinfo queryinfo = getQueryinfo(request);
				queryinfo.setType(Timegoodsview.class);
				queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
				queryinfo.setWheresql(wheresql);
				queryinfo.setOrder("timegoodsseq");
				cuss = (ArrayList<Timegoodsview>) selQuery(queryinfo);
				Pageinfo pageinfo = new Pageinfo(0, cuss);
				result = CommonConst.GSON.toJson(pageinfo);
			}
		}
		responsePW(response, result);
	}
	//秒杀页
	@SuppressWarnings("unchecked")
	public void cusTimeG(HttpServletRequest request, HttpServletResponse response){
		String customerid = request.getParameter("customerid");
		String customertype = request.getParameter("customertype");
		String wheresql = null;
		Queryinfo Ccustomerqueryinfo = getQueryinfo();
		Ccustomerqueryinfo.setType(Ccustomer.class);
		Ccustomerqueryinfo.setWheresql("Ccustomercustomer='"+customerid+"' ");
		ArrayList<Ccustomer> Ccustomercuss = (ArrayList<Ccustomer>) selAll(Ccustomerqueryinfo);
		if(Ccustomercuss.size()!=0){
			wheresql = "timegoodsstatue='启用' and timegoodsscope like '%"+customertype+"%'  and (";
			for (Ccustomer ccustomer : Ccustomercuss) {
				wheresql += "timegoodscompany='"+ccustomer.getCcustomercompany()+"' or ";
			}
			wheresql = wheresql.substring(0, wheresql.length()-3) +") ";
			Queryinfo queryinfo = getQueryinfo(request);
			queryinfo.setType(Timegoodsview.class);
			queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
			queryinfo.setWheresql(wheresql);
			queryinfo.setOrder("timegoodsseq");
			cuss = (ArrayList<Timegoodsview>) selAll(queryinfo);
			Pageinfo pageinfo = new Pageinfo(0, cuss);
			result = CommonConst.GSON.toJson(pageinfo);
		}
		
		responsePW(response, result);
	}
}











