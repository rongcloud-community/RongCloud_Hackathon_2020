package com.upload;

import javax.servlet.*;
import javax.servlet.http.*;
import org.apache.commons.fileupload.*;
import java.io.*;
import java.util.*;

//import com.user.UserData;
import com.upload.UploadImageDAO;

public class UploadImage extends HttpServlet{
	public void doPost(HttpServletRequest request,HttpServletResponse response)throws IOException,ServletException{
		response.setContentType("text/html;charset=gb2312");
		PrintWriter out = response.getWriter();
		HttpSession session = request.getSession();
		String username = request.getParameter("username");
		String message = request.getParameter("message");
		String image_type = request.getParameter("imagetype");
		UploadImageDAO uploadimageDAO = new UploadImageDAO();
		String path = request.getContextPath();
		String url = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
		String uploadmessage = "";
		try{
		    DiskFileUpload fu = new DiskFileUpload();
			//fu.setSizeMax(200*1000);
			List fileItems = fu.parseRequest(request);
			
			Iterator i = fileItems.iterator();
			while(i.hasNext()){
				FileItem fi = (FileItem)i.next();
				if(!fi.isFormField()){
					if (fi.getSize()<=0){
						fi.delete();
						uploadmessage = "�ϴ����ļ���С����Ϊ�㣡";
					}
					else{
						String fileName = fi.getName();
						if (fileName==null || ("").equals(fileName) )
						    return;
						String ext = fileName.substring(fileName.lastIndexOf(".")+1);
						ext = ext.toLowerCase();
						String savePath = getServletContext().getRealPath("\\uploadimages\\");
						File savePathFile = new File(savePath);
						if (!savePathFile.exists()) {
							savePathFile.mkdirs();
						}
						String saveName = System.currentTimeMillis()+"."+ext;
						//saveName = "image-"+saveName;
						fi.write(new File(savePath + "\\" + saveName));
						uploadmessage = "�ϴ��ɹ���";	
						uploadimageDAO.InsertImage("uploadimages/"+saveName,username,message,image_type);
						//out.print("<script language='javascript'>");
						//out.print("alert('" + uploadmessage + "');");
						//out.print("</script>");
						//out.print("response.sendRedirect('upload_image.jsp?username="+username+"&&numberpage=3');");
						//out.flush();
					}
				}
			}
		}catch(Exception e){
			System.err.println("up rcm pic:"+e.toString());
			uploadmessage = "�ϴ�ʧ�ܣ��������ϴ���";
		}
		//uploadmessage = "�ϴ��ɹ���";
		//RequestDispatcher requestDispatcher = request.getRequestDispatcher("upload_image.jsp?message="+uploadmessage);
		//requestDispatcher.forward(request,response);
		//request.setAttribute("uploadmessage",uploadmessage);
		session.setAttribute("uploadmessage",uploadmessage);
		username = new String(username.getBytes("gb2312"),"ISO8859_1");
		response.sendRedirect("upload_image.jsp?username="+username+"&numberpage=3");
		return;		
	}
	
	public void doGet(HttpServletRequest request,HttpServletResponse response)throws IOException,ServletException{
		doPost(request,response);
	}
}
