package ZMetalHeartY.yuanpin.JDBC.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import ZMetalHeartY.yuanpin.JDBC.DBManager;

public class PartakeDao {
	public void add(String UserID, String itemID, String status) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = null;
		
		if (exist(itemID)) {
			sql = "update Partake set UserID = ?,status = ? where itemID = ?";
		}else {
			sql = "insert into Partake(UserID,status,itemID) values(?,?,?)";
		}
		
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, UserID);
			pstm.setString(2, status);
			pstm.setString(3, itemID);
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	} 
	
	public HashMap<String, Object> get(String itemID) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		String sql = "select * from Partake where itemID='"+itemID+"'";
		PreparedStatement pre=null;
		HashMap<String, Object> map = new HashMap<String, Object>();
		String UserID = null; String status = null;
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			
			while (resultset.next()) {
				UserID = resultset.getString("UserID");
				status = resultset.getString("status");
				map.put("itemID", itemID);
				map.put("UserID", UserID);
				map.put("status", status);
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}

		return map;
		
	}
	
	public Set<HashMap<String, Object>> getSuccessbyUserID(String UserID) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		HomeItemsDao homeItemsDao = new HomeItemsDao();
		Set<HashMap<String, Object>> set = new HashSet<HashMap<String,Object>>();
		String sql = "select * from Partake where UserID='"+UserID+"'";
		PreparedStatement pre=null;
		HashMap<String, Object> map = new HashMap<String, Object>();
		String status = null;
		String itemID = null;
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			
			while (resultset.next()) {
				itemID = resultset.getString("itemID");
				status = resultset.getString("status");
				if (status.equals("2")) {
					//set.add();
					set.addAll(homeItemsDao.getbyItemID(itemID));
					
				}
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}

		return set;
		
	}
	
	
	public void remove(String itemID) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = "delete from Partake where itemID = ? ";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, itemID);
			pstm.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	}
	
	public boolean exist(String itemID) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		String sql = "select * from Partake where itemID='"+itemID+"'";
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
