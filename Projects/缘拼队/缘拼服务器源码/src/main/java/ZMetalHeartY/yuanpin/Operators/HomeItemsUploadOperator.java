package ZMetalHeartY.yuanpin.Operators;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.json.JSONObject;

import com.google.gson.JsonObject;

import ZMetalHeartY.yuanpin.JDBC.Dao.HomeItemsDao;
import ZMetalHeartY.yuanpin.JDBC.Dao.UserFocusStatusDao;
import ZMetalHeartY.yuanpin.Model.HomeItem;
import ZMetalHeartY.yuanpin.Utils.Pinyin4jUtil;

@WebServlet("/HomeItemsUpload")
public class HomeItemsUploadOperator extends HttpServlet{
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter out = resp.getWriter();
		ServletFileUpload servletFileUpload = new ServletFileUpload(new DiskFileItemFactory());
		HashMap<String, Object> map = new HashMap<String, Object>();
		
		HomeItemsDao homeItemsDao = new HomeItemsDao();
		String title=null,address=null,date=null,time=null,sex=null,dowhat=null,details=null,pstart=null,pend=null;
		String type = null; String userid = null;
		String Filename=null;String pathstr=null;
		File file=null;
		List<FileItem> list=null;
		String uploadType =  req.getParameter("uploadSign");
		if (uploadType==null) {
			try {
				list = servletFileUpload.parseRequest(req);
			
			for (FileItem fileItem : list) {
				if (fileItem.isFormField()) {
					if ("pintype".equals(fileItem.getFieldName())) {
						type = fileItem.getString("UTF-8");
					} else if ("userid".equals(fileItem.getFieldName())) {
						userid = fileItem.getString("UTF-8");
					} else if ("title".equals(fileItem.getFieldName())) {
						title = fileItem.getString("UTF-8");
					} else if ("address".equals(fileItem.getFieldName())) {
						address = fileItem.getString("UTF-8");
					} else if ("date".equals(fileItem.getFieldName())) {
						date = fileItem.getString("UTF-8");
					} else if ("time".equals(fileItem.getFieldName())) {
						time = fileItem.getString("UTF-8");
					} else if ("sex".equals(fileItem.getFieldName())) {
						sex = fileItem.getString("UTF-8");
					} else if ("dowhat".equals(fileItem.getFieldName())) {
						dowhat = fileItem.getString("UTF-8");
					} else if ("details".equals(fileItem.getFieldName())) {
						details = fileItem.getString("UTF-8");
					} else if ("pstart".equals(fileItem.getFieldName())) {
						pstart = fileItem.getString("UTF-8");
					}else if ("pend".equals(fileItem.getFieldName())) {
						pend = fileItem.getString("UTF-8");
					}
				} else {
					Filename = System.currentTimeMillis() + "R" + (int) (Math.random() * 10000) + "R"+ (int) (Math.random() * 10000) + fileItem.getName();
					//System.out.println(Filename);
					pathstr = "/usr/local/tomcatSource/HomeImgs";
					file = new File(pathstr,Filename);
					//System.out.println(file);
					
					fileItem.write(file);
					
				}
			}
			
			
				if (type.equals("study")) {
					homeItemsDao.addStudyItems(new HomeItem(title, address, date, time, sex, dowhat, details, "/HomeImgs/"+Filename, type, userid));
					map.put("code", "200");
				}else if (type.equals("travel")) {
					homeItemsDao.addTravelItems(new HomeItem(title, pstart, pend, date, time, sex, dowhat, details, "/HomeImgs/"+Filename, type, userid));
					map.put("code", "200");
				}else if (type.equals("food")) {
					homeItemsDao.addFoodItems(new HomeItem(title, address, date, time, sex, dowhat, details, "/HomeImgs/"+Filename, type, userid));
					map.put("code", "200");
				}else if (type.equals("game")) {
					homeItemsDao.addGameItems(new HomeItem(title, address, date, time, sex, dowhat, details, "/HomeImgs/"+Filename, type, userid));
					map.put("code", "200");
				}else{
					map.put("code", "555");
				}
			}catch (Exception e) {
				e.printStackTrace();
			}
		}else {
			type =  req.getParameter("pintype");
			userid =  req.getParameter("userid");
			title =  req.getParameter("title");
			address =  req.getParameter("address");
			date =  req.getParameter("date");
			time =  req.getParameter("time");
			sex =  req.getParameter("sex");
			dowhat =  req.getParameter("dowhat");
			details =  req.getParameter("details");
			pstart =  req.getParameter("pstart");
			pend =  req.getParameter("pend");
			
			try {
				if (type.equals("study")) {
					homeItemsDao.addStudyItems(new HomeItem(title, address, date, time, sex, dowhat, details, "/HomeImgs/"+"study.png", type, userid));
					map.put("code", "200");
				}else if (type.equals("travel")) {
					homeItemsDao.addTravelItems(new HomeItem(title, pstart, pend, date, time, sex, dowhat, details, "/HomeImgs/"+"travel.jpg", type, userid));
					map.put("code", "200");
				}else if (type.equals("food")) {
					homeItemsDao.addFoodItems(new HomeItem(title, address, date, time, sex, dowhat, details, "/HomeImgs/"+"food.jpg", type, userid));
					map.put("code", "200");
				}else if (type.equals("game")) {
					homeItemsDao.addGameItems(new HomeItem(title, address, date, time, sex, dowhat, details, "/HomeImgs/"+"game.png", type, userid));
					map.put("code", "200");
				}else{
					map.put("code", "555");
				}
			} catch (Exception e) {
				e.getStackTrace();
			}
			
			
		}
		
		
		
		JSONObject json = new JSONObject(map);
		
		out.write(json+"");
		
		out.close();
	}
}
