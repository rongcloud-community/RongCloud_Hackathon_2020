package ZMetalHeartY.yuanpin.JDBC.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import ZMetalHeartY.yuanpin.JDBC.DBManager;

public class UserFocusStatusDao {
	public synchronized void add(String Focus, String BFocus) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = "insert into UserFocus(Focus,BFocus) values(?,?)";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, Focus);
			pstm.setString(2, BFocus);
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	} 
	
	public void remove(String Focus, String BFocus) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = "delete from UserFocus where Focus = ? and BFocus = ? ";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, Focus);
			pstm.setString(2, BFocus);
			pstm.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	}
	
	public Set<String> getAllBFoucus(String Focus) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "select * from UserFocus where Focus='"+Focus+"'";
		PreparedStatement pre=null;
		int i;
		String BFocus=null;
		Set<String> set = new HashSet<String>();
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			for (i=1;resultset.next();i++) {
				BFocus = resultset.getString("BFocus");
				set.add(BFocus);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		return set;
	}
	
	public Set<String> getAllFoucus(String BFocus) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "select * from UserFocus where BFocus='"+BFocus+"'";
		PreparedStatement pre=null;
		int i;
		String Focus=null;
		Set<String> set = new HashSet<String>();
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			for (i=1;resultset.next();i++) {
				Focus = resultset.getString("Focus");
				set.add(Focus);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		return set;
		
	}
	
	public Set<String> getAllfriends(String Focus) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "select * from UserFocus where Focus='"+Focus+"'";
		PreparedStatement pre=null;
		int i=1;
		Set<String> set = new HashSet<String>();
		String BFocus=null;
		try {
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				BFocus = resultset.getString("BFocus");
				if (isFocus(BFocus, Focus)) {
					set.add(BFocus);
				}	
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		
		return set;
		
	}
	
	public boolean isBFocus(String BFocus, String Focus) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		String sql = "select * from UserFocus where BFocus='"+BFocus+"'";
		PreparedStatement pre=null;
		boolean flag = false;
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				if (resultset.getString("Focus").equals(Focus)) {
					flag=true;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		return flag;
	}
	
	public boolean isFocus(String Focus, String BFocus) throws ClassNotFoundException, SQLException {
		
		Connection conn = DBManager.getConnection();
		String sql = "select * from UserFocus where Focus='"+Focus+"'";
		PreparedStatement pre=null;
		boolean flag = false;
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				if (resultset.getString("BFocus").equals(BFocus)) {
					flag=true;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		return flag;
	}
	
	public boolean isfriend(String Focus, String BFocus) throws ClassNotFoundException, SQLException {
		boolean flag = false;
		if (isFocus(Focus, BFocus) && isFocus(BFocus, Focus)) {
			flag = true;
		}
		return flag;
	}
	
}
