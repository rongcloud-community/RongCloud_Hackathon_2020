<%@ page language="java" pageEncoding="gbk"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
 
    
    <title>default.jsp</title>

  </head>
  
  <body>

    <table align="center" border="1" width="95%" cellpadding="0" cellspacing="1" bordercolor="#9bc2ee">
  <tr>
    <td bgcolor="#9bc2ee"  height="100" colspan="2" align="center"><font size="7" color="#ff80ff">&nbsp;&#32593;&#19978;&#21830;&#22478;&#31995;&#32479;</font></td>
  </tr>
  
  <tr>
  
    <td width="18%" height="426">
    <jsp:include flush="true" page="../admin/left.jsp">
			<jsp:param name="" value="" />
  			<jsp:param name="" value="" />
  		</jsp:include>

				<iframe src="../tree/menu.jsp" height="500" width="200" scrolling="no" frameborder="0"></iframe>


	</td>
	
    <td width="100%">
    <iframe name="mainFrame" frameborder="0" src="welcome.jsp" width="100%" height="700" scrolling="no" align="top"></iframe>
   

	</td>
	
  </tr>
</table>
  </body>
</html>
