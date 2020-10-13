<%@ page language="java" import="java.util.*,com.center.vo.GoodVO,com.center.vo.UserVO;" pageEncoding="gbk"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>

    <title>My JSP 'goodshow.jsp' starting page</title>

  </head>
<%! 
	ArrayList goodlist = null;
	GoodVO goodvo = null;
	Iterator gooditerator = null;
	UserVO userlevle = null;
%>
<%
	goodlist = (ArrayList)session.getAttribute("goodinfo");
	userlevle = new UserVO();

	if(session != null){
	
	userlevle = (UserVO)session.getAttribute("username");
	}

 %>
  <body>
  <table>
  	<tr><td>
  		<iframe src="userinfo.jsp" frameborder="0" width="100%" height="50" scrolling="no" valign="top"></iframe>
  	</td></tr>
<tr><td><div align="right"> 
    <% 
    	int i =0; 
    	gooditerator = goodlist.iterator(); 
    	while(gooditerator.hasNext()){ 
    		goodvo = (GoodVO)gooditerator.next(); 
    		i++; 
    		if(i % 2 !=0){ 
    			%> <table width=50% border=0 align="left" cellspacing="1" cellpadding="0" bgcolor="#96A3FC"><br>
    			<% 
    		}else{%><table width=50% border=0  cellspacing="1" cellpadding="0" bgcolor="#96A3FC"><br><% 
    		} 
    		%></div>
    			
    			<tr>
    				<td width="50%" align="right" bgcolor="#B7CEC7">  <font size="2">&#21517;&#31216;:</font></td><td  bgcolor="#B7CEC7"><font size="2"><a href="#"><%=goodvo.getGoodname() %></a></font><br></td>
    			</tr>
    			<tr>
					<td align="right" bgcolor="#DFEAE7"><font size="2">&#20316;&#32773;:</font></td><td  bgcolor="#DFEAE7"><font size="2"><%=goodvo.getPublisher() %></font><br></td>
    			</tr>
    			<tr>
					<td align="right"  bgcolor="#DFEAE7"><font size="2">&#21457;&#24067;&#26102;&#38388;:</font></td><td  bgcolor="#DFEAE7"><font size="2"><%=goodvo.getPublishtime() %></font><br></td>
    			</tr>
    			<tr>
					<td align="right"  bgcolor="#DFEAE7"><font size="2">&#36141;&#20080;&#27425;&#25968;:</font></td><td  bgcolor="#DFEAE7"><font size="2"><%=goodvo.getGoodbuycount() %></font><br></td>
    			</tr>
    			<tr>
					<td align="right"  bgcolor="#DFEAE7"><font size="2">&#26597;&#30475;&#27425;&#25968;:</font></td><td  bgcolor="#DFEAE7"><font size="2"><%=goodvo.getGoodreadcount() %></font><br></td>
    			</tr>
    			<tr>
					<td align="right"  bgcolor="#DFEAE7"> <font size="2">&#20215;&#26684;:</font></td><td  bgcolor="#DFEAE7"><font size="2"><%=goodvo.getGoodprice() %></font>
					</td></tr>
					<tr><td colspan="2" bgcolor="#DFEAE7"><font size="2"><%if(goodvo.getGoodcommended() == 1){ %><font color="#ff80c0">&#25512;&#33616;&#21830;&#21697;</font><%} if(goodvo.getGoodtop() == 1){%><font color="#ff00ff">&#31934;&#21697;</font><%}if(goodvo.getGoodspec() == 1){ %><font color="#ff0080">&#29305;&#20215;&#21830;&#21697;</font><%} %></font>
    			</td></tr>
    			<tr><td  bgcolor="#DFEAE7"></td><td align="center"  bgcolor="#DFEAE7"><font size="2">
    				<a href="/shoppingcenter/shopping.do?method=shop&goodid=<%=goodvo.getGoodid() %>&price=<%=goodvo.getGoodprice() %>&goodname='<%=goodvo.getGoodname() %>'" target="_blank">购买</a></font>
    			</td></tr>
    			<%if(userlevle != null && userlevle.getUserlevle() == 1) {%>
    			<tr><td align="center"  bgcolor="#DFEAE7" colspan="2"><font size="2">
    				<a href="/shoppingcenter/goodManager.do?method=setcommend&actionc=1&goodid=<%=goodvo.getGoodid() %>" target="_blank">推荐商品</a>
    				<a href="/shoppingcenter/goodManager.do?method=setcommend&actionc=2&goodid=<%=goodvo.getGoodid() %>" target="_blank">特价商品</a>
    				<a href="/shoppingcenter/goodManager.do?method=setcommend&actionc=3&goodid=<%=goodvo.getGoodid() %>" target="_blank">精品推广</a>
    				</font>
    			</td></tr>
    			<%} %>
    		</table>
    	
    	
    	<%
    	   }
        %>
      
       </td></tr></table>
  </body>
</html>
