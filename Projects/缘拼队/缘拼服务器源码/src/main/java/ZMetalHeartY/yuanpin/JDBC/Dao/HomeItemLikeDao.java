package ZMetalHeartY.yuanpin.JDBC.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import ZMetalHeartY.yuanpin.JDBC.DBManager;

public class HomeItemLikeDao {
	public int add(String UserID, String itemID) throws ClassNotFoundException, SQLException {

		if (exist(UserID, itemID)) {
			return 333;
		}
		
		Connection conn = DBManager.getConnection();
		String sql = null;

		sql = "insert into HomeItemLike(UserID,itemID) values(?,?)";

		
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, UserID);
			pstm.setString(2, itemID);
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		return 200;
		
	} 
	
	public Set<HashMap<String, Object>> get(String itemID) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		String sql = "select * from HomeItemLike where itemID='"+itemID+"'";
		PreparedStatement pre=null;
		HashMap<String, Object> map = new HashMap<String, Object>();
		Set<HashMap<String, Object>> set = new HashSet<HashMap<String,Object>>();
		String UserID = null; String msg = null;
		UserDao userDao = new UserDao();
		try {

			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			
			while (resultset.next()) {
				
				UserID = resultset.getString("UserID");

				HashMap<String, String> map2 = userDao.getUserInfoByID(UserID);
				map.put("itemID", itemID);
				map.put("UserID", UserID);
				
				map.put("nickname", map2.get("nickname"));
				map.put("Userimg", map2.get("img"));
				
				set.add(map);
				map = new HashMap<String, Object>();
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}

		return set;
		
	}
	
	
	public int getCount(String itemID) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		String sql = "select * from HomeItemLike where itemID='"+itemID+"'";
		PreparedStatement pre=null;
		int count = 0;
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			
			while (resultset.next()) {
				count++;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}

		return count;
		
	}
	
	public void remove(String userID,String itemID) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = "delete from HomeItemLike where userID = ? and itemID = ? ";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, userID);
			pstm.setString(2, itemID);
			pstm.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	}
	
	
	public boolean exist(String userID,String itemID) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		String sql = "select * from HomeItemLike where itemID='"+itemID+"' and userID= '"+userID+"'";
		PreparedStatement pre=null;
		int i=0;
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			for (;resultset.next();i++) {
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}

		return i==0?false:true;
		
	}
}
