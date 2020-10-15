package ZMetalHeartY.yuanpin.Operators;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.*;

import ZMetalHeartY.yuanpin.JDBC.Dao.UserDao;
import ZMetalHeartY.yuanpin.JDBC.Dao.UserFocusStatusDao;

@WebServlet("/GetUserInfoInRong")
public class UserInfoInRongOperator extends HttpServlet{
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter out = resp.getWriter();
		UserDao userDao = new UserDao();
		String ID = req.getParameter("ID");
		String Focus = req.getParameter("Focus");
		UserFocusStatusDao userFocusStatusDao = new UserFocusStatusDao();
		HashMap<String, String> map = null;
		JSONObject json=null;
		try {
		
			map = userDao.getUserInfoByID(ID);
			json = new JSONObject(map);
		if (json.has("openid")) {//查找到了
			if (userFocusStatusDao.isFocus(Focus, ID)) {
				json.put("status", "1");
			}else {
				json.put("status", "-1");
			}
			
			json.remove("openid");
			json.put("ID", ID);
			json.put("code", "1");
		}else {//没查到
			json.put("code", "0");
		}
		
		
		}catch (Exception e) {
			e.printStackTrace();
		}
		
		out.write(json.toString());
		out.close();
	}
	
	
	
}
