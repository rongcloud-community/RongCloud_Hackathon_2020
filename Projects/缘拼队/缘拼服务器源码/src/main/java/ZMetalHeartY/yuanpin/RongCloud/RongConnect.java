package ZMetalHeartY.yuanpin.RongCloud;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import ZMetalHeartY.yuanpin.JDBC.Dao.UserDao;
import io.rong.RongCloud;
import io.rong.methods.user.User;
import io.rong.models.response.TokenResult;
import io.rong.models.response.UserResult;
import io.rong.models.user.UserModel;

@WebServlet("/Ronglogin")
public class RongConnect extends HttpServlet{
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException{
		
		
		PrintWriter out = resp.getWriter();
		String userId = req.getParameter("userId");//实际上就是openid
		String nickname=null;String img=null;String ID=null;
		
		UserDao userDao = new UserDao();
		try {
			HashMap<String, String> map = userDao.getUserInfoByOpenID(userId);
			ID = map.get("ID");
			nickname = map.get("nickname");
			img = map.get("img");
		} catch (Exception e) {
			e.printStackTrace();
		}

		String token_str=register(ID, nickname, img);
		
		out.write(token_str);
		out.close();
		
	}
	
	public String register(String ID,String nickname,String img) {
		RongCloud rongCloud = this.getRongCloud();
		User user = rongCloud.user;

		  /**
		  * API 文档: http://www.rongcloud.cn/docs/server_sdk_api/user/user.html#register
		  *
		  * 注册用户，生成用户在融云的唯一身份标识 Token
		  */
		UserModel userModel = new UserModel()
		          .setId(ID)
		          .setName(nickname)
		          .setPortrait(img);
		TokenResult result=null;
		try {
			result = user.register(userModel);
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("getToken:  " + result.toString());
		return result.toString();
		
	}
	

	public RongCloud getRongCloud() {
		String appKey = "p5tvi9dspqrx4";
		String appSecret = "YGj4v9Xr7kXtVg";
		RongCloud rongCloud = RongCloud.getInstance(appKey, appSecret);
		return rongCloud;
	}
	
	

}
