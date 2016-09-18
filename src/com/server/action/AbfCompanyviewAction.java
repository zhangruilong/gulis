package com.server.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.server.poco.CompanyviewPoco;
import com.server.pojo.Ccustomer;
import com.server.pojo.Companyview;
import com.system.tools.CommonConst;
import com.system.tools.pojo.Pageinfo;
import com.system.tools.pojo.Queryinfo;
import com.system.tools.util.CommonUtil;

/**
 * 经销商 逻辑层
 *@author ZhangRuiLong
 */
public class AbfCompanyviewAction extends CompanyviewAction {
	
	/**
    * 模糊查询语句
    * @param query
    * @return "filedname like '%query%' or ..."
    */
    public String getQuerysql(String query) {
    	if(CommonUtil.isEmpty(query)) return null;
    	String querysql = "";
    	String queryfieldname[] = CompanyviewPoco.QUERYFIELDNAME;
    	for(int i=0;i<queryfieldname.length;i++){
    		querysql += queryfieldname[i] + " like '%" + query + "%' or ";
    	}
		return querysql.substring(0, querysql.length() - 4);
	};
	//查询我的供应商
	@SuppressWarnings("unchecked")
	public void bdCityCom(HttpServletRequest request, HttpServletResponse response){
		Queryinfo queryinfo = getQueryinfo(request);
		queryinfo.setType(Companyview.class);
		queryinfo.setQuery(getQuerysql(queryinfo.getQuery()));
		queryinfo.setOrder(CompanyviewPoco.ORDER);
		List<Companyview> comvList = selAll(queryinfo);
		String customerid = request.getParameter("customerid");
		if(comvList.size() >0 && CommonUtil.isNotEmpty(customerid) && !customerid.equals("undefined")){
			List<Ccustomer> ccustomers = selAll(Ccustomer.class, "select * from ccustomer where ccustomercustomer='"+customerid+"'");
			if(ccustomers.size() >0){
				for (Ccustomer cc : ccustomers) {
					for (Companyview company : comvList) {
						if(company.getCompanyid().equals(cc.getCcustomercompany())){
							company.setCreatetime("已绑定");;
						}
					}
				}
			}
			Pageinfo pageinfo = new Pageinfo(0, comvList);
			result = CommonConst.GSON.toJson(pageinfo);
		}
		responsePW(response, result);
	}
}
