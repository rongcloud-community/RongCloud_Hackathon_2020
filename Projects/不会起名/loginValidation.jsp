<%
	/**
	  *本文件用于处理管理员或者客户端登陆
	  *通过接受到的用户名和密码判断是管理员或客户端，将session写入并转入相应页面
	  *@author: 秦大坤
	  *@time: Apil 22,2007
	  *@last modified:  Apil 22,2007
	  */
%>
<%@page contentType="text/html; charset=utf-8" language="java" %> 
<jsp:useBean id="userManager" scope="page"  class="msg.UserManager" />
<%
	/**
	  *从调用页面获username取和password
	  */
	String username=request.getParameter("username");
	String password=request.getParameter("password");	
	String loginType=request.getParameter("loginType");	
	/**
	  *过滤usernam和password非法字符
	  */			
	if(username==null || username.equals("") ||password==null || password.equals("") ) {
		out.println("<script language=jscript>alert('用户名或密码为空，请重新输入。');"+
					"location.assign('javascript:history.back()');</script>");
		return;
	}else{	
			username=username.trim(); //去除前后空格
			password=password.trim();			 					
			String[] codeFilter=new String[]{"\'","\"","\\",";",","," select "," insert "," update "," or "};
			String temp=username+password;
			temp=temp.toLowerCase();
			for(int i=0;i<codeFilter.length;i++){				
				if(temp.indexOf(codeFilter[i])>=0){					 				
					//response.sendRedirect("err.jsp?id=3"); //非法字符输入					 
					out.println("<script language=jscript>alert('用户名或密码包含非法字符，请重新输入。');"+
								"location.assign('javascript:history.back()');</script>");
					return;
				}
			}		
	}
	/**
	  *检查用户名和密码是否为管理员或客户端登陆
	  *如果是则写入session并转到相应页面
	  */
	try{		
		String userType=null; //0:super admin 1:agent & clientAdmin 2:clientAdmin 3:normal client
		//检测是否为管理员登陆		 
		if(userManager.isAdmin(username,password)){
			userType="0";
			//session.putValue("scomClient",username);
			//session.putValue("scomPwd",password);
			//session.putValue("userType","admin");  //标记session为管理员
			msg.MySession mySession=new msg.MySession(username,session.getId(),userType); //request.getRemoteAddr()
			response.sendRedirect("adminManage/adminManage.jsp?vid="+username+"&sid="+mySession.getSessionId());			
		}			 
		else if(userManager.hasUser(username,password)){
			 
			//session.putValue("scomClient",username);
			//session.putValue("scomPwd",password);
			
			if(username.indexOf("admin@")==0){
				if(userManager.isAgent(username)){
					userType="1";
					//session.putValue("isAgent","true");	    //如果改用户是代理 标记为代理
				}
				else
					userType="2";
				//session.putValue("userType","clientAdmin");	//标记session为客户端管理员	
			}
			else{
				//session.putValue("userType","client");	//标记session为客户端普通客服
				userType="3";
			}
			//
			msg.MySession mySession=new msg.MySession(username,session.getId(),userType);
	 
 			if(loginType!=null && loginType.equals("0"))
					response.sendRedirect("manage/clientManage.jsp");		 
			response.sendRedirect("client.jsp?vid="+username+"&sid="+mySession.getSessionId());		
		}	
		else{
			out.println("<script language=jscript>alert('用户名或密码不正确，请重试一次。');"+
						"window.close();</script>");
						//"location.assign('javascript:history.back()');</script>");
		}			 
	}catch(Exception e){out.println(e);	 }			
%>
 