package com.server.action;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.server.poco.CustomerPoco;
import com.server.pojo.Address;
import com.server.pojo.Ccustomer;
import com.server.pojo.Customer;
import com.system.tools.CommonConst;
import com.system.tools.pojo.Pageinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;
import com.system.tools.util.DateUtils;

/**
 * 客户 逻辑层
 *@author ZhangRuiLong
 */
public class AbfCustomerAction extends CustomerAction {
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public String getQuerysql(String query) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	String queryfieldname[] = CustomerPoco.QUERYFIELDNAME;
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
	//注册
	@SuppressWarnings("unchecked")
	public void regCustomerPC(HttpServletRequest request, HttpServletResponse response){
		json2cuss(request);
		for(Customer temp:cuss){
			ArrayList<String> sqlList = new ArrayList<String>();							//sql语句的list集合
			ArrayList<Customer> cusList = (ArrayList<Customer>) selAll(Customer.class, "select * from customer c where c.customerphone='"+temp.getCustomerphone()+"'");
			if(cusList != null && cusList.size() > 0){
				result = "{'success':false,'code':400,'msg':'手机已经注册过了。'}";
			}else{
				String newId = CommonUtil.getNewId();
				temp.setCustomerid(newId);		//设置新id
				temp.setCustomerstatue("启用");
				temp.setCustomerlevel(3);							//默认等级
				temp.setCustomertype("3");							//默认类型
				temp.setCreatetime(DateUtils.getDateTime());
				String sqlCustomer = getInsSingleSql(temp);
				sqlList.add(sqlCustomer);
				//添加新地址
				Address address = new Address();
				address.setAddressture(1);							//自动设为默认地址
				address.setAddressid(newId);		//设置新id
				address.setAddressaddress(temp.getCustomercity()+temp.getCustomerxian()+temp.getCustomeraddress());
				address.setAddresscustomer(newId);					//客户id
				address.setAddressphone(temp.getCustomerphone());
				address.setAddressconnect(temp.getCustomername());
				String sqlAddress = getInsSingleSql(address);
				sqlList.add(sqlAddress);
				result = doAll(sqlList);
				if(CommonConst.SUCCESS.equals(result)){
					ArrayList<Customer> retCust = new ArrayList<Customer>();
					retCust.add(temp);
					Pageinfo pageinfo = new Pageinfo(0, retCust);
					result = CommonConst.GSON.toJson(pageinfo);
				}
			}
			
		}
		responsePW(response, result);
	}
	//登录
	@SuppressWarnings("unchecked")
	public void uslgcf(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		String customerphone = request.getParameter("customerphone");
		String customerpsw = request.getParameter("customerpsw");
		String wheresql = "customerphone='"+customerphone+"' and customerpsw='"+customerpsw+"'";
		queryinfo.setWheresql(wheresql);
		queryinfo.setType(Customer.class);
		List<Customer> cusList = selAll(queryinfo);
		if(cusList.size() == 1){
			request.getSession().setAttribute("cusid", cusList.get(0).getCustomerid());
			List<Ccustomer> ccustomers = selAll(Ccustomer.class, "select * from ccustomer where ccustomercustomer='"+cusList.get(0).getCustomerid()+"'");
			if(ccustomers.size() >0){
				result = CommonConst.GSON.toJson(cusList);
			} else {
				Pageinfo pageinfo = new Pageinfo(cusList);
				pageinfo.setMsg("请先绑定供应商");
				result = CommonConst.GSON.toJson(pageinfo);
			}
		} else {
			result = "{'success':false,'code':400,'msg':'密码或账号不正确!'}";
		}
		responsePW(response, result);
	}
	//注销
	public void cusLogout(HttpServletRequest request, HttpServletResponse response){
		request.getSession().invalidate();
		/*result = CommonConst.SUCCESS;
		responsePW(response, result);*/
	}
	//修改密码
	@SuppressWarnings("unchecked")
	public void editpwd(HttpServletRequest request, HttpServletResponse response){
		String customerphone = request.getParameter("customerphone");
		String customerpsw = request.getParameter("customerpsw");
		String newpwd = request.getParameter("newpwd");
		String customerid = request.getParameter("customerid");
		List<Customer> cusli = selAll(Customer.class,"select * from customer c where c.customerpsw='"+customerpsw+"' and c.customerphone='"+customerphone+"'");
		if(cusli.size()==1){
			Customer cus = cusli.get(0);
			if(customerid.equals(cus.getCustomerid())){
				cus.setCustomerpsw(newpwd);
				result = updSingle(cus,CustomerPoco.KEYCOLUMN);
				if(result.equals(CommonConst.SUCCESS)){
					request.getSession().removeAttribute("cusid");
				}
			} else {
				result = "{'success':false,'code':400,'msg':'密码或账号不正确!'}";
			}
		} else {
			result = "{'success':false,'code':400,'msg':'密码或账号不正确!'}";
		}
		responsePW(response, result);
	}
}









