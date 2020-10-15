package ZMetalHeartY.yuanpin.Utils;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;

import ZMetalHeartY.yuanpin.JDBC.Dao.UserDao;

@WebServlet("/FrontTools")
public class FrontTools extends HttpServlet{
	
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		PrintWriter out = resp.getWriter();
		
		String json_str= req.getParameter("json");
		JSONArray jsonArray = new JSONArray(json_str);
		UserDao userDao = new UserDao();
		
		try {
			for (int i = 0; i < jsonArray.length(); i++) {
				JSONObject json = jsonArray.getJSONObject(i);
				//System.out.println(json);
				
				HashMap<String, String> map = userDao.getUserInfoByID((String)json.get("targetId"));
				String nickname = map.get("nickname");
				String img = map.get("img");
				
				json.put("nickname", nickname);
				json.put("img", img);
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		out.write(jsonArray+"");
		out.close();
	}
	
	
	public static Set<HashMap<String, String>> pageScreen(String Page,Set<HashMap<String, String>> set) {
		Set<HashMap<String, String>> set2 = new HashSet<HashMap<String,String>>();
		Iterator<HashMap<String, String>> it_date=set.iterator();
		while(it_date.hasNext()){
			HashMap<String, String> map=it_date.next();
			if (map.get("pageCount").equals(Page)) {
				set2.add(map);
			}
			
        }
		
		//System.out.println(new JSONArray(set2));
		return set2;
		
	}

}
