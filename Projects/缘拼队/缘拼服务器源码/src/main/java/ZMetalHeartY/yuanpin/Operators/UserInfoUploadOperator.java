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

@WebServlet("/UserInfoUpload")
public class UserInfoUploadOperator extends HttpServlet{
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter out = resp.getWriter();
		UserDao userDao = new UserDao();
		String openid = req.getParameter("openid");
		String nickname = req.getParameter("nickname");
		String headphoto = req.getParameter("headphoto");
		String sex = req.getParameter("sex");
		Map<String, String> map = null;
		

		try {
			if (userDao.exist(openid)) {
				userDao.update(openid, nickname,sex, headphoto);
			}else {
				userDao.register(openid, nickname,sex, headphoto);
			}
			
			System.out.println("导入数据库成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		try {
			map = userDao.getUserInfoByOpenID(openid);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		JSONObject json = new JSONObject(map);
		
		out.write(json.toString());
        out.close();
        
	}
}
