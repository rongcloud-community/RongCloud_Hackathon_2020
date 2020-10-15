package ZMetalHeartY.yuanpin;

import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.SQLException;
import java.util.Enumeration;

import org.json.*;
import org.omg.CORBA.Request;

import ZMetalHeartY.yuanpin.JDBC.Dao.UserDao;

import org.json.*;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {
	String appid= "wx5031f067550476e7";
	String secret= "f019b0efc73d5182dcfe6d2144c25e2c";
	String js_code;
	
	@Override
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter out = resp.getWriter();
		this.js_code= req.getParameter("js_code");
		
		String loginInfo = this.getloginInfo();
		JSONObject json_loginInfo = new JSONObject(loginInfo);
		
		if (json_loginInfo.has("openid")) {	
			String openid = (String) json_loginInfo.get("openid");

			System.out.println(openid);
		}
		
        out.write(loginInfo);
        out.close();
        
        
	}
	
	
	private String getloginInfo() throws IOException {
		
		String url_str = "https://api.weixin.qq.com/sns/jscode2session?appid="+appid+"&secret="+secret+"&js_code="+js_code+"&grant_type=authorization_code";
        URL url = new URL(url_str);
        
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.connect();
 
        InputStream is = connection.getInputStream();
        byte[] response = new byte[is.available()];
        is.read(response);
        is.close();

        String loginInfo = new String(response, "UTF-8");
        
        return loginInfo;
	}
	

	
}
