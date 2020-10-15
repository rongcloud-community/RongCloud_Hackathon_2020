package ZMetalHeartY.yuanpin.Operators;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import ZMetalHeartY.yuanpin.JDBC.Dao.CollectionsDao;
import ZMetalHeartY.yuanpin.JDBC.Dao.HomeItemsDao;

@WebServlet("/CollectionsOperator")
public class CollectionsOperator extends HttpServlet{
	protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html;charset=UTF-8");
		String operation = req.getParameter("operation");
		PrintWriter out = resp.getWriter();
		HashMap<String, Object> map = new HashMap<String, Object>();
		CollectionsDao collectionsDao = new CollectionsDao();
		try {
			if (operation.equals("getCollectionsByUserID")) {
				String UserID = req.getParameter("UserID");
				map.put("data", collectionsDao.getCollections(UserID));
			} else if (operation.equals("addCollection")) {
				String UserID = req.getParameter("UserID");
				String ItemID = req.getParameter("ItemID");
				int code = collectionsDao.addCollection(UserID, ItemID);
				map.put("code", code);
			} else if (operation.equals("removeCollection")) {
				String UserID = req.getParameter("UserID");
				String ItemID = req.getParameter("ItemID");
				int code = collectionsDao.removeCollection(UserID, ItemID);
				map.put("code", code);
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
