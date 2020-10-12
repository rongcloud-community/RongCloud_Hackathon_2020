package ZMetalHeartY.yuanpin.Operators;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.Writer;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.*;

import com.mysql.cj.x.protobuf.MysqlxCrud.Collection;

import ZMetalHeartY.yuanpin.JDBC.Dao.CollectionsDao;
import ZMetalHeartY.yuanpin.JDBC.Dao.CommentDao;
import ZMetalHeartY.yuanpin.JDBC.Dao.HomeItemLikeDao;
import ZMetalHeartY.yuanpin.JDBC.Dao.HomeItemsDao;
import ZMetalHeartY.yuanpin.JDBC.Dao.PartakeDao;
import ZMetalHeartY.yuanpin.Utils.FrontTools;
import ZMetalHeartY.yuanpin.Utils.Pinyin4jUtil;

@WebServlet("/HomeItemsOperator")
public class HomeItemsOperator extends HttpServlet {
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		String operation = req.getParameter("operation");
		PrintWriter out = resp.getWriter();
		HashMap<String, Object> map = new HashMap<String, Object>();
		HomeItemsDao homeItemsDao = new HomeItemsDao();
		CollectionsDao collectionsDao = new CollectionsDao();
		CommentDao commentDao = new CommentDao();
		PartakeDao partakeDao = new PartakeDao();
		HomeItemLikeDao homeItemLikeDao = new HomeItemLikeDao();
		try {
			if (operation.equals("getAll")) {
				String pageCount = req.getParameter("pageCount");
				Set<HashMap<String, String>> set = homeItemsDao.getAll();
				set = FrontTools.pageScreen(pageCount, set);
				map.put("All", set);
			} else if (operation.equals("searchHomeItem")) {
				String name = req.getParameter("name");
				Set<HashMap<String, String>> set = homeItemsDao.Search(name);
				map.put("search", set);
			} else if (operation.equals("getHomeItemSuccess")) {
				String UserID = req.getParameter("UserID");
				
				Set<HashMap<String, Object>> set = homeItemsDao.getSuccess(UserID);
				//set = FrontTools.pageScreen(pageCount, set);
				map.put("Partake", set);
				
			} else if (operation.equals("removeHomeItem")) {
				String itemID = req.getParameter("itemID");
				homeItemsDao.remove(itemID);
				map.put("code", 200);
			} else if (operation.equals("getAllbyType")) {
				String type = req.getParameter("pintype");
				String pageCount = req.getParameter("pageCount");
				Set<HashMap<String, String>> set = homeItemsDao.getAllbyType(type);
				set = FrontTools.pageScreen(pageCount, set);
				map.put(type, set);
			} else if (operation.equals("getbyItemIDArray")) {
				String ItemIDArray = req.getParameter("ItemIDArray");
				Set<HashMap<String, Object>> set = homeItemsDao.getbyItemIDArray(ItemIDArray);
				map.put("array", set);
			} else if (operation.equals("getAllbyUserID")) {
				String UserID = req.getParameter("UserID");
				Set<HashMap<String, String>> set = homeItemsDao.getAllbyUserID(UserID);
				map.put(UserID, set);
			} else if (operation.equals("getPartake")) {
				String itemID = req.getParameter("itemID");
				map = partakeDao.get(itemID);
				map.put("code", "200");
			} else if (operation.equals("addPartake")) {
				String itemID = req.getParameter("itemID");
				String UserID = req.getParameter("UserID");
				String status = req.getParameter("status");
				partakeDao.add(UserID, itemID, status);
				map.put("code", "200");
			}else if (operation.equals("removePartake")) {
				String itemID = req.getParameter("itemID");
				partakeDao.remove(itemID);
				map.put("code", "200");
			} else if (operation.equals("addComment")) {
				String itemID = req.getParameter("itemID");
				String UserID = req.getParameter("UserID");
				String msg = req.getParameter("msg");
				commentDao.add(UserID, itemID, msg);
				map.put("code", "200");
			} else if (operation.equals("removeComment")) {
				int ID = Integer.valueOf(req.getParameter("commentID"));
				commentDao.remove(ID);
				map.put("code", "200");
			} else if (operation.equals("addlike")) {
				String itemID = req.getParameter("itemID");
				String UserID = req.getParameter("UserID");
				map.put("code", homeItemLikeDao.add(UserID, itemID));
			} else if (operation.equals("removelike")) {
				String itemID = req.getParameter("itemID");
				String UserID = req.getParameter("UserID");
				homeItemLikeDao.remove(UserID, itemID);
				map.put("code", "200");
			} else if (operation.equals("islike")) {
				String itemID = req.getParameter("itemID");
				String UserID = req.getParameter("UserID");
				map.put("islike", homeItemLikeDao.exist(UserID, itemID));
				map.put("code", "200");
			} else {
				map.put("code", "555");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		JSONObject json = new JSONObject(map);
		
		out.write(json+"");
		out.close();
	}
}
