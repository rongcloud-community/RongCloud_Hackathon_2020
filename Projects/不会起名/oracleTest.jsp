<%@page contentType="text/html; charset=utf-8" language="java" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<title>无标题文档</title>
<link href="../css/talk.css" rel="stylesheet" type="text/css" />
<style type="text/css">
<!--
.STYLE1 {color: #999999}
.STYLE2 {color: #000000}
body {
margin-left: 0px;
margin-top: 0px;
}
-->
</style>

<%

try 
{ 
Class.forName("oracle.jdbc.driver.OracleDriver").newInstance(); 
//Connection conn=DriverManager.getConnection("jdbc:oracle:thin:@localhost:1521:jakce","username","password"); 
//Statement stat=conn.createStatement(); 
//ResultSet rs=stat.executeQuery("select * from tablename"); 

out.println("JSP ORACLE 驱动正常。");
}catch(Exception e){

out.println("Error:"+e.getMessage());

} 



%>