<%@page contentType="text/html; charset=gb2312" language="java" import="java.util.*"  %>
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<%
	String jspReferer=request.getHeader("Referer");
	if(jspReferer==null || jspReferer.equals("")){ //���ֱ�ӷ��ʱ�ҳ �Ǿ�ʲĪҲ����
		out.println("Are you sure? Baby!");
		return;
	}	 
	if( !userManager.hasSite( msg.Keyword.getCleanURL(jspReferer) ) ){//���û��ע�����վ��
		out.println("Are you sure? my baby!");
		return;
	}		
	String lvt=(String)session.getAttribute("lvt"); //lvt:last visit time
	String lvp=(String)session.getAttribute("lvp"); //lvt:last visit page
	 
	Calendar c= Calendar.getInstance();
	long time=c.getTimeInMillis(); //
	
	if(lvt!=null && lvp!=null && jspReferer.equals(lvp) ){	 
	   try{
		long lvtLong=Long.parseLong(lvt);
		if(time-lvtLong<5000){
			//out.println("Are you refreshing?");
			return;
		}
	   }catch(Exception e){out.println("Not good.");return;}
	}
	else{ //������ʱ��Ҫ��������ߵ�id������Ƿ��ظ�
	   //while( userManager.hasSameId(String.valueOf(time)) )
		//c= Calendar.getInstance();
	 	//time=c.getTimeInMillis();
	}	

	//session.setAttribute("lvt",String.valueOf(time));
	//session.setAttribute("lvp",jspReferer);	
	///msg.Log.log(lvt+" "+lvp); 
 
 	////////////////////////////�����javascript��tag�� ���Բ�Ҫ�ټ�tag
	out.print("\nvar time="+time+";\n");	 
	String script="<script language=JavaScript type=\'text/javascript\' src=\'http://webim.uniscom.cn/scripts/script.js\'></script>";	 
	out.print("document.write(\""+script+"\");\n");
%>
