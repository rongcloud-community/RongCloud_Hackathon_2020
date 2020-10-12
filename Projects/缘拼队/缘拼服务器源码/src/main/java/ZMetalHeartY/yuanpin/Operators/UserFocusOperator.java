package ZMetalHeartY.yuanpin.Operators;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.text.StringEscapeUtils;
import org.json.JSONObject;

import ZMetalHeartY.yuanpin.JDBC.Dao.UserDao;
import ZMetalHeartY.yuanpin.JDBC.Dao.UserFocusStatusDao;
import ZMetalHeartY.yuanpin.Utils.Pinyin4jUtil;

@WebServlet("/UserFocusOperator")
public class UserFocusOperator extends HttpServlet{
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter out = resp.getWriter();
		HashMap<String, Object> map = new HashMap<String, Object>();
		String operation = req.getParameter("operation");
		UserFocusStatusDao userFocusStatusDao = new UserFocusStatusDao();
		String Focus = req.getParameter("Focus");
		String BFocus = req.getParameter("BFocus");
		
		String addstr = null;
		
		try {
			if (operation.equals("add")) {
				if (Focus.equals(BFocus)) {
					map.put("code", "999");
				}else if (userFocusStatusDao.isFocus(Focus, BFocus)) {
					map.put("code", "333");
				}else {
					userFocusStatusDao.add(Focus, BFocus);
					map.put("code", "200");
				}
				
				
			}else if (operation.equals("isFocus")) {
				map = new HashMap<String, Object>();
				map.put("status",userFocusStatusDao.isFocus(Focus, BFocus)==true?"1":"-1");
				map.put("code", "200");
			}else if (operation.equals("remove")) {
				userFocusStatusDao.remove(Focus, BFocus);
				map.put("code", "200");
			}else if (operation.equals("getAllFocus")) {//获得粉丝列表
				map.put("Focus", Pinyin4jUtil.pinyinGroupingByID(userFocusStatusDao.getAllFoucus(BFocus)));
				map.put("code", "200");
			}else if(operation.equals("getAllBFocus")){//获得关注列表
				//userFocusStatusDao.getAllBFoucus(Focus);
				System.out.println(map.keySet().toString());
				map.put("BFocus", Pinyin4jUtil.pinyinGroupingByID(userFocusStatusDao.getAllBFoucus(Focus)));
				map.put("code", "200");
			}else if(operation.equals("getAllfriends")){
				//userFocusStatusDao.getAllfriends(Focus);
				map.put("friends", Pinyin4jUtil.pinyinGroupingByID(userFocusStatusDao.getAllfriends(Focus)));
				map.put("code", "200");
			}else{
				map.put("code", "555");
			}
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		JSONObject json = new JSONObject(map);
		
		out.write(json.toString());
		
		out.close();
	}
	
	
}

