package ZMetalHeartY.yuanpin.JDBC.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;

import org.json.JSONObject;

import ZMetalHeartY.yuanpin.JDBC.DBManager;

public class UserDao {
	public synchronized void register(String openid, String nickname, String sex,  String img) throws ClassNotFoundException, SQLException {

		Connection conn = DBManager.getConnection();
		String sql = "insert into UserInfo(openid,nickname,sex,img) values(?,?,?,?)";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, openid);
			pstm.setString(2, nickname);
			pstm.setString(3, sex);
			pstm.setString(4, img);
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	}
	
	public boolean exist(String openid) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "select * from UserInfo where openid='"+openid+"'";
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
	
	
	public synchronized void update(String openid, String nickname,String sex, String img) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "update UserInfo set nickname = ?,img= ?,sex = ?  where openid = ?";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, nickname);
			pstm.setString(2, img);
			pstm.setString(3, sex);
			pstm.setString(4, openid);
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
	}
	
	
	public HashMap<String,String> getUserInfoByOpenID(String openid) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "select * from UserInfo where openid='"+openid+"'";
		PreparedStatement pre=null;
		String img=null;String nickname=null;String ID=null;String sex=null;
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			for (int i=0;resultset.next();i++) {
				ID = resultset.getString("ID");
				nickname = resultset.getString("nickname");
				img = resultset.getString("img");
				sex = resultset.getString("sex");
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		HashMap<String, String> map = new HashMap<String,String>();
		map.put("ID", ID);
		map.put("nickname", nickname);
		map.put("img", img);
		map.put("sex", sex);
		return map;
		
	}
	
	
	
	public HashMap<String,String> getUserInfoByID(String ID) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "select * from UserInfo where ID='"+ID+"'";
		PreparedStatement pre=null;
		String img=null;String nickname=null;String openid=null;String sex=null;
		try {
			
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			for (int i=0;resultset.next();i++) {
				openid = resultset.getString("openid");
				nickname = resultset.getString("nickname");
				img = resultset.getString("img");
				sex = resultset.getString("sex");
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		HashMap<String, String> map = new HashMap<String,String>();
		map.put("openid", openid);
		map.put("nickname", nickname);
		map.put("img", img);
		map.put("sex", sex);
		return map;
		
	}

	
}
