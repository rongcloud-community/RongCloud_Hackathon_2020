package ZMetalHeartY.yuanpin.JDBC.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import ZMetalHeartY.yuanpin.JDBC.DBManager;

public class CommentDao {
	public synchronized void add(String UserID, String itemID, String msg) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = null;

		sql = "insert into Comment(UserID,msg,itemID) values(?,?,?)";

		
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, UserID);
			pstm.setString(2, msg);
			pstm.setString(3, itemID);
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	} 
	
	public Set<HashMap<String, Object>> get(String itemID) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		String sql = "select * from Comment where itemID='"+itemID+"'";
		PreparedStatement pre=null;
		HashMap<String, Object> map = new HashMap<String, Object>();
		Set<HashMap<String, Object>> set = new HashSet<HashMap<String,Object>>();
		String UserID = null; String msg = null;int CommentID = -1;
		UserDao userDao = new UserDao();
		try {

			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			
			while (resultset.next()) {
				
				UserID = resultset.getString("UserID");
				msg = resultset.getString("msg");
				CommentID = resultset.getInt("ID");
				HashMap<String, String> map2 = userDao.getUserInfoByID(UserID);
				map.put("itemID", itemID);
				map.put("UserID", UserID);
				map.put("msg", msg);
				map.put("CommentID", CommentID);
				
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
		String sql = "select * from Comment where itemID='"+itemID+"'";
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
	
	public void remove(int ID) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = "delete from Comment where ID = ? ";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setInt(1, ID);
			pstm.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	}
	

}
