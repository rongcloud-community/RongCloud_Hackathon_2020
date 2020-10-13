<%@ page language="java" import="java.util.*,java.sql.*" pageEncoding="gb2312" session="true"%>
<%@ page import="com.upload.image.ImageDetail" %>
<%@ page import="com.upload.image.ImageData" %>
<%@ page import="com.upload.ImagesType" %>


<%
  String deleteimagemsg = (String)session.getAttribute("deleteimagemsg");
  if(deleteimagemsg == null){
    deleteimagemsg = "";
  }
  else{
    session.removeAttribute("deleteimagemsg");
  }


  String currentusername = "";
  if((String)session.getAttribute("currentLoginUserDataName")!=null){
    currentusername = (String)session.getAttribute("currentLoginUserDataName");
  }
  
  String imagestype=request.getParameter("imagestype");
  if(imagestype == null||imagestype == ""){
    imagestype="全部";
  }
  
  
  String username = request.getParameter("username");
  String numberpage = request.getParameter("numberpage");
  if(numberpage == null||numberpage == ""){
    numberpage = "1";
  }
  
  ImageDetail images = new ImageDetail();
  List items = images.getImageDetail(username,imagestype);
  Iterator imageItems = items.iterator();
  
  
  
  ImagesType imgType = new ImagesType();
  List imgItems = imgType.getImagesType(username);
  Iterator imagesTypeItems = imgItems.iterator();
 %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title><%=username %> 的 blog</title>

	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	
	<link rel="shortcut icon" type="image/ico" href="/images/favicon.gif" />
	<link rel="stylesheet" type="text/css" href="css/toolbar.css">	
	<link rel="stylesheet" href="css/screen.css" type="text/css" media="screen" />
	<link rel="stylesheet" href="css/lightbox.css" type="text/css" media="screen" />
	
	
	<script src="js/prototype.js" type="text/javascript"></script>
	<script src="js/scriptaculous.js?load=effects" type="text/javascript"></script>
	<script src="js/lightbox.js" type="text/javascript"></script>
  </head>
  
  <body>
   <jsp:include flush="true" page="header.jsp">
      <jsp:param name="username" value="<%=username %>" />
      <jsp:param name="numberpage" value="<%=numberpage %>" />
    </jsp:include>
   
   
  <%
  if(currentusername.equals(username)&&!("".equals(currentusername))){
   %>
  <div id="clear"><a href="upload_image.jsp?username=<%=currentusername %>&&numberpage=3">上传图片</a></div>
  <%
    }
   %>
   
   <div id="clsfloat"></div>
   <hr />
         <table align="center" height="30px">
          <tr>
           <td><b><%=deleteimagemsg %></b></td>
          </tr>
         </table>

<script language="javascript">
  function loadType(){
     var type=document.getElementById("selecttype");
     var typevalue=type.value;
     window.location="photo.jsp?username=<%=username%>&numberpage=3&imagestype="+typevalue;
  }
</script>
<p>已上传的 <select name="type" id="selecttype" onchange="loadType();">
           <option value="<%=imagestype %>"><%=imagestype %></option>
           <%
             if(!imagestype.equals("全部")){
            %>
           <option value="全部">全部</option>
           <%}
           while(imagesTypeItems.hasNext()){  
             String typename = (String)imagesTypeItems.next();
             if(!typename.equals(imagestype)){         
            %>
           <option value="<%=typename %>"><%=typename %></option>
           <%} 
           }
           %>
         </select> 相片:</p>
         
         <table height="10px">
          <tr>
           <td></td>
          </tr>
         </table>




    	
    <script language="javascript">
      function showDel(imageid){
         var showId=document.getElementById(imageid);
         showId.style.visibility="visible";
      }
      function hideDel(imageId){
         var showId=document.getElementById(imageId);
         showId.style.visibility="hidden";
      }
    </script>
    <%
     int i = 0;
     while(imageItems.hasNext()){
        i++;
        ImageData image = (ImageData)imageItems.next();
     %>
   <div class="showImage" onmouseover="showDel(<%=image.getId() %>)" onmouseout="hideDel(<%=image.getId() %>)">  
	<div class="thumbnail">
		<a href="<%=image.getImage_path() %>" rel="lightbox" title="Press X to close">
		  <img src="<%=image.getImage_path() %>" width="100" height="100" alt="图片说明:<%=image.getMessage() %>"/>
		</a>
		
	 </div>
	 <%
      if(currentusername.equals(username)&&!("".equals(currentusername))){
     %>
	 <div class="deleteImage" id="<%=image.getId() %>">
	   <a href="DeleteImage?id=<%=image.getId() %>&username=<%=currentusername %>" onClick="return confirm('是否要删除该相片?');">删除</a>
	 </div>
	 <%} %>
    </div>
    <%
      if(i%7==0){
     %>
     <div class="clearfloat">
     </div>
     <%} %>
	<%
	   }
	 %>
   
   <div id="lastfoot">
     <jsp:include flush="false" page="footer.jsp"></jsp:include>
   </div>
     
  </body>
</html>
