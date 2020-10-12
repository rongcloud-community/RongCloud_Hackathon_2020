package ZMetalHeartY.yuanpin.JDBC.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import ZMetalHeartY.yuanpin.JDBC.DBManager;

public class CollectionsDao {
	public synchronized int addCollection(String UserID, String ItemID) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = "insert into Collections(data,UserID) values(?,?)";
		if (exist(UserID)) {
			sql = "update Collections set data = ?  where UserID = ?";
		}
		PreparedStatement pstm = null;
		int code=405;
		JSONArray data_json = getCollections(UserID);
		int flag = 1;
		for (Object object : data_json) {
			if (ItemID.equals(object+"")) {
				flag = 0;
				
				code = 510;
			}
		}
		if (flag==1) {
			
			data_json.put(ItemID);
			code = 200;
		}
		
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, data_json+"");
			pstm.setString(2, UserID);
			
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
		return code;
	}
	
	
	public int removeCollection(String UserID, String ItemID) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = "update Collections set data = ?  where UserID = ?";
		PreparedStatement pstm = null;
		JSONArray data_json = getCollections(UserID);
		int code=405;
		
		Iterator<Object> it_date=data_json.iterator();
		while(it_date.hasNext()){
            Object a=it_date.next();
            if (a.equals(ItemID+"")) {
            	it_date.remove();
            	code = 200;
            }
        }
		
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, data_json+"");
			pstm.setString(2, UserID);
			
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
		return code;
	}
	
	
	public JSONArray getCollections(String UserID) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "select * from Collections where UserID='"+UserID+"'";
		PreparedStatement pre=null;
		int i;
		JSONArray data=new JSONArray();
		HomeItemsDao homeItemsDao = new HomeItemsDao();
		Set<HashMap<String, Object>> set = new HashSet<HashMap<String,Object>>();
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			while (resultset.next()) {
				data = new JSONArray(resultset.getString("data"));
				set = homeItemsDao.getbyItemIDArray(data+"");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		data = new JSONArray(set);
		return data;
	}
	
	public boolean exist(String UserID) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "select * from Collections where UserID='"+UserID+"'";
		PreparedStatement pre=null;
		boolean b=false;

		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			while (resultset.next()) {
				b=true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		return b;
	}
	
}
