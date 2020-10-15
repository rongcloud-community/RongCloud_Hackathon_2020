package ZMetalHeartY.yuanpin.JDBC.Dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

import javax.servlet.annotation.WebServlet;

import org.json.JSONArray;


import ZMetalHeartY.yuanpin.JDBC.DBManager;
import ZMetalHeartY.yuanpin.Model.HomeItem;

public class HomeItemsDao {
	
	private PartakeDao partakeDao = new PartakeDao();
	
	public void addStudyItems(HomeItem hItem) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "insert into HomeItems(title,address,date,time,sex,dowhat,details,img,type,userid) values(?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, hItem.getTitle());
			pstm.setString(2, hItem.getAddress());
			pstm.setString(3, hItem.getDate());
			pstm.setString(4, hItem.getTime());
			pstm.setString(5, hItem.getSex());
			pstm.setString(6, hItem.getDowhat());
			pstm.setString(7, hItem.getDetails());
			pstm.setString(8, hItem.getImg());
			pstm.setString(9, hItem.getType());
			pstm.setString(10, hItem.getUserid());
			
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
	}
	
	public void addTravelItems(HomeItem hItem) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "insert into HomeItems(title,date,time,pstart,pend,sex,dowhat,details,img,type,userid) values(?,?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, hItem.getTitle());
			pstm.setString(2, hItem.getDate());
			pstm.setString(3, hItem.getTime());
			pstm.setString(4, hItem.getPstart());
			pstm.setString(5, hItem.getPend());
			pstm.setString(6, hItem.getSex());
			pstm.setString(7, hItem.getDowhat());
			pstm.setString(8, hItem.getDetails());
			pstm.setString(9, hItem.getImg());
			pstm.setString(10, hItem.getType());
			pstm.setString(11, hItem.getUserid());
			
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
	}
	
	public void addFoodItems(HomeItem hItem) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "insert into HomeItems(title,address,date,time,sex,dowhat,details,img,type,userid) values(?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, hItem.getTitle());
			pstm.setString(2, hItem.getAddress());
			pstm.setString(3, hItem.getDate());
			pstm.setString(4, hItem.getTime());
			pstm.setString(5, hItem.getSex());
			pstm.setString(6, hItem.getDowhat());
			pstm.setString(7, hItem.getDetails());
			pstm.setString(8, hItem.getImg());
			pstm.setString(9, hItem.getType());
			pstm.setString(10, hItem.getUserid());
			
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
	}
	
	public void addGameItems(HomeItem hItem) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "insert into HomeItems(title,address,date,time,sex,dowhat,details,img,type,userid) values(?,?,?,?,?,?,?,?,?,?)";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, hItem.getTitle());
			pstm.setString(2, hItem.getAddress());
			pstm.setString(3, hItem.getDate());
			pstm.setString(4, hItem.getTime());
			pstm.setString(5, hItem.getSex());
			pstm.setString(6, hItem.getDowhat());
			pstm.setString(7, hItem.getDetails());
			pstm.setString(8, hItem.getImg());
			pstm.setString(9, hItem.getType());
			pstm.setString(10, hItem.getUserid());
			
			pstm.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
	}
	
	public Set<HashMap<String, String>> getAllbyType(String type) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		HashMap<String, String> map = new HashMap<String, String>();
		Set<HashMap<String, String>> set = new HashSet<HashMap<String,String>>();
		String sql = "select * from HomeItems where type='"+type+"'";
		String ID=null,title=null,address=null,date=null,time=null,sex=null,dowhat=null,details=null,pstart=null,pend=null,img=null;
		String userid=null;int likeCount=0;
		PreparedStatement pre=null;
		UserDao userDao = new UserDao();
		CommentDao commentDao = new CommentDao();
		HomeItemLikeDao homeItemLikeDao = new HomeItemLikeDao();
		
		try {
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				ID = resultset.getString("ID");
				title = resultset.getString("title");
				date = resultset.getString("date");
				time = resultset.getString("time");
				sex = resultset.getString("sex");
				dowhat = resultset.getString("dowhat");
				details = resultset.getString("details");
				img = resultset.getString("img");
				userid = resultset.getString("userid");
				likeCount = homeItemLikeDao.getCount(ID);
				
				HashMap<String, String> map2 = userDao.getUserInfoByID(userid);
				
				map = new HashMap<String, String>();
				if (type.equals("travel")) {
					pstart = resultset.getString("pstart");
					pend = resultset.getString("pend");
					map.put("pstart", pstart);
					map.put("pend", pend);
				}else {
					address = resultset.getString("address");
					map.put("address", address);
				}
				
				map.put("ID", ID);
				map.put("title", title);
				map.put("date", date);
				map.put("time", time);
				map.put("sex", sex);
				map.put("dowhat", dowhat);
				map.put("details", details);
				map.put("img", img);
				map.put("type", type);
				map.put("userid", userid);
				map.put("likeCount", likeCount+"");
				map.put("commentCount", commentDao.getCount(ID)+"");
				map.put("Comment", new JSONArray(commentDao.get(ID))+"");

				map.put("status", partakeDao.get(ID).get("status")+"");
				
				map.put("nickname", map2.get("nickname"));
				map.put("Userimg", map2.get("img"));
				
				set.add(map);

			}
			
			int count=1;
			for (HashMap<String, String> hashMap : set) {
				
				hashMap.put("pageCount", (int)Math.floor(count / 10)
						+ (count % 10 == 0 ? 0 : 1)+"");
				count++;
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		return set;
	}
	
	public Set<HashMap<String, String>> getAll() throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		HashMap<String, String> map = new HashMap<String, String>();
		Set<HashMap<String, String>> set = new HashSet<HashMap<String,String>>();
		UserDao userDao = new UserDao();
		CommentDao commentDao = new CommentDao();
		HomeItemLikeDao homeItemLikeDao = new HomeItemLikeDao();
		String sql = "select * from HomeItems";
		String ID=null,title=null,address=null,date=null,time=null,sex=null,dowhat=null,details=null,pstart=null,pend=null,img=null;
		String type=null;String userid=null;int likeCount=0;
		PreparedStatement pre=null;

		try {
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				ID = resultset.getString("ID");
				title = resultset.getString("title");
				date = resultset.getString("date");
				time = resultset.getString("time");
				sex = resultset.getString("sex");
				dowhat = resultset.getString("dowhat");
				details = resultset.getString("details");
				img = resultset.getString("img");
				type = resultset.getString("type");
				userid = resultset.getString("userid");
				likeCount = homeItemLikeDao.getCount(ID);
				
				
				HashMap<String, String> map2 = userDao.getUserInfoByID(userid);
				
				map = new HashMap<String, String>();
				if (type.equals("travel")) {
					pstart = resultset.getString("pstart");
					pend = resultset.getString("pend");
					map.put("pstart", pstart);
					map.put("pend", pend);
				}else {
					address = resultset.getString("address");
					map.put("address", address);
				}
				
				map.put("ID", ID);
				map.put("title", title);
				map.put("date", date);
				map.put("time", time);
				map.put("sex", sex);
				map.put("dowhat", dowhat);
				map.put("details", details);
				map.put("img", img);
				map.put("type", type);
				map.put("userid", userid);
				map.put("likeCount", likeCount+"");
				map.put("commentCount", commentDao.getCount(ID)+"");
				map.put("status", partakeDao.get(ID).get("status")+"");
				
				map.put("Comment", new JSONArray(commentDao.get(ID))+"");
				
				map.put("nickname", map2.get("nickname"));
				map.put("Userimg", map2.get("img"));
				
				set.add(map);
			}
			
			
			int count=1;
			for (HashMap<String, String> hashMap : set) {
				
				hashMap.put("pageCount", (int)Math.floor(count / 10)
						+ (count % 10 == 0 ? 0 : 1)+"");
				count++;
			}
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		return set;
	}
	
	public Set<HashMap<String, Object>> getbyItemIDArray(String json_str) throws ClassNotFoundException, SQLException {
		JSONArray json = new JSONArray(json_str);
		Set<HashMap<String, Object>> set = new HashSet<HashMap<String,Object>>();
		for (Object object : json) {
			set.addAll(getbyItemID(object+""));
		
		}
		return set;
	}
	public Set<HashMap<String, Object>> getbyItemID(String ItemID) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		HashMap<String, Object> map = new HashMap<String, Object>();
		Set<HashMap<String, Object>> set = new HashSet<HashMap<String,Object>>();
		String sql = "select * from HomeItems where ID = '"+ItemID+"'";
		String ID=null,title=null,address=null,date=null,time=null,sex=null,dowhat=null,details=null,pstart=null,pend=null,img=null;
		String type=null;String userid=null;int likeCount = 0;
		UserDao userDao = new UserDao();
		CommentDao commentDao = new CommentDao();
		HomeItemLikeDao homeItemLikeDao = new HomeItemLikeDao();
		PreparedStatement pre=null;

		try {
			pre = conn.prepareStatement(sql);
			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				ID = resultset.getString("ID");
				title = resultset.getString("title");
				date = resultset.getString("date");
				time = resultset.getString("time");
				sex = resultset.getString("sex");
				dowhat = resultset.getString("dowhat");
				details = resultset.getString("details");
				img = resultset.getString("img");
				type = resultset.getString("type");
				userid = resultset.getString("userid");
				likeCount = homeItemLikeDao.getCount(ID);
				
				HashMap<String, String> map2 = userDao.getUserInfoByID(userid);
				
				map = new HashMap<String, Object>();
				if (type.equals("travel")) {
					pstart = resultset.getString("pstart");
					pend = resultset.getString("pend");
					map.put("pstart", pstart);
					map.put("pend", pend);
				}else {
					address = resultset.getString("address");
					map.put("address", address);
				}
				
				map.put("ID", ID);
				map.put("title", title);
				map.put("date", date);
				map.put("time", time);
				map.put("sex", sex);
				map.put("dowhat", dowhat);
				map.put("details", details);
				map.put("img", img);
				map.put("type", type);
				map.put("userid", userid);
				map.put("likeCount", likeCount+"");
				map.put("commentCount", commentDao.getCount(ID)+"");
				map.put("Comment", new JSONArray(commentDao.get(ID))+"");
				map.put("status", partakeDao.get(ID).get("status")+"");
				
				map.put("nickname", map2.get("nickname"));
				map.put("Userimg", map2.get("img"));
				
				
				set.add(map);
			}
			

					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		return set;
	}

	public Set<HashMap<String, String>> getAllbyUserID(String userid) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		HashMap<String, String> map = new HashMap<String, String>();
		Set<HashMap<String, String>> set = new HashSet<HashMap<String,String>>();
		String sql = "select * from HomeItems where userid = '"+userid+"'";

		String ID=null,title=null,address=null,date=null,time=null,sex=null,dowhat=null,details=null,pstart=null,pend=null,img=null;
		String type=null;int likeCount=0;
		UserDao userDao = new UserDao();
		CommentDao commentDao = new CommentDao();
		HomeItemLikeDao homeItemLikeDao = new HomeItemLikeDao();
		PreparedStatement pre=null;

		try {
			pre = conn.prepareStatement(sql);

			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				ID = resultset.getString("ID");
				title = resultset.getString("title");
				date = resultset.getString("date");
				time = resultset.getString("time");
				sex = resultset.getString("sex");
				dowhat = resultset.getString("dowhat");
				details = resultset.getString("details");
				img = resultset.getString("img");
				type = resultset.getString("type");
				userid = resultset.getString("userid");
				likeCount = homeItemLikeDao.getCount(ID);
				HashMap<String, String> map2 = userDao.getUserInfoByID(userid);
				
				map = new HashMap<String, String>();
				if (type.equals("travel")) {
					pstart = resultset.getString("pstart");
					pend = resultset.getString("pend");
					map.put("pstart", pstart);
					map.put("pend", pend);
				}else {
					address = resultset.getString("address");
					map.put("address", address);
				}
				
				map.put("ID", ID);
				map.put("title", title);
				map.put("date", date);
				map.put("time", time);
				map.put("sex", sex);
				map.put("dowhat", dowhat);
				map.put("details", details);
				map.put("img", img);
				map.put("type", type);
				map.put("userid", userid);
				map.put("likeCount", likeCount+"");
				map.put("commentCount", commentDao.getCount(ID)+"");
				map.put("Comment", new JSONArray(commentDao.get(ID))+"");
				map.put("status", partakeDao.get(ID).get("status")+"");
				
				map.put("nickname", map2.get("nickname"));
				map.put("Userimg", map2.get("img"));
				
				
				set.add(map);
			}
			

			int count=1;
			for (HashMap<String, String> hashMap : set) {
				
				hashMap.put("pageCount", (int)Math.floor(count / 10)
						+ (count % 10 == 0 ? 0 : 1)+"");
				count++;
			}
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		return set;
	}
	
	public Set<HashMap<String, String>> Search(String name) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		HashMap<String, String> map = new HashMap<String, String>();
		Set<HashMap<String, String>> set = new HashSet<HashMap<String,String>>();
		String sql = "select * from HomeItems where title like '%"+name+"%'";

		String ID=null,title=null,address=null,date=null,time=null,sex=null,dowhat=null,details=null,pstart=null,pend=null,img=null;
		String type=null;int likeCount=0;String userid=null;
		UserDao userDao = new UserDao();
		CommentDao commentDao = new CommentDao();
		HomeItemLikeDao homeItemLikeDao = new HomeItemLikeDao();
		PreparedStatement pre=null;

		try {
			pre = conn.prepareStatement(sql);

			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				ID = resultset.getString("ID");
				title = resultset.getString("title");
				date = resultset.getString("date");
				time = resultset.getString("time");
				sex = resultset.getString("sex");
				dowhat = resultset.getString("dowhat");
				details = resultset.getString("details");
				img = resultset.getString("img");
				type = resultset.getString("type");
				userid = resultset.getString("userid");
				likeCount = homeItemLikeDao.getCount(ID);
				HashMap<String, String> map2 = userDao.getUserInfoByID(userid);
				
				map = new HashMap<String, String>();
				if (type.equals("travel")) {
					pstart = resultset.getString("pstart");
					pend = resultset.getString("pend");
					map.put("pstart", pstart);
					map.put("pend", pend);
				}else {
					address = resultset.getString("address");
					map.put("address", address);
				}
				
				map.put("ID", ID);
				map.put("title", title);
				map.put("date", date);
				map.put("time", time);
				map.put("sex", sex);
				map.put("dowhat", dowhat);
				map.put("details", details);
				map.put("img", img);
				map.put("type", type);
				map.put("userid", userid);
				map.put("likeCount", likeCount+"");
				map.put("commentCount", commentDao.getCount(ID)+"");
				map.put("Comment", new JSONArray(commentDao.get(ID))+"");
				map.put("status", partakeDao.get(ID).get("status")+"");
				
				map.put("nickname", map2.get("nickname"));
				map.put("Userimg", map2.get("img"));
				
				
				set.add(map);
			}
			

			int count=1;
			for (HashMap<String, String> hashMap : set) {
				
				hashMap.put("pageCount", (int)Math.floor(count / 10)
						+ (count % 10 == 0 ? 0 : 1)+"");
				count++;
			}
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		return set;
	}
	
	public Set<HashMap<String, Object>> getSuccess(String userid) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		HashMap<String, Object> map = new HashMap<String, Object>();
		Set<HashMap<String, Object>> set = new HashSet<HashMap<String,Object>>();
		String sql = "select * from HomeItems where userid = '"+userid+"'";

		String ID=null,title=null,address=null,date=null,time=null,sex=null,dowhat=null,details=null,pstart=null,pend=null,img=null;
		String type=null;int likeCount=0;
		UserDao userDao = new UserDao();
		CommentDao commentDao = new CommentDao();
		HomeItemLikeDao homeItemLikeDao = new HomeItemLikeDao();
		PreparedStatement pre=null;

		try {
			pre = conn.prepareStatement(sql);

			ResultSet resultset = pre.executeQuery();
			while(resultset.next()) {
				ID = resultset.getString("ID");
				title = resultset.getString("title");
				date = resultset.getString("date");
				time = resultset.getString("time");
				sex = resultset.getString("sex");
				dowhat = resultset.getString("dowhat");
				details = resultset.getString("details");
				img = resultset.getString("img");
				type = resultset.getString("type");
				userid = resultset.getString("userid");
				likeCount = homeItemLikeDao.getCount(ID);
				HashMap<String, String> map2 = userDao.getUserInfoByID(userid);
				
				if (partakeDao.get(ID).get("status")!=null && partakeDao.get(ID).get("status").equals("2")) {
					map = new HashMap<String, Object>();
					if (type.equals("travel")) {
						pstart = resultset.getString("pstart");
						pend = resultset.getString("pend");
						map.put("pstart", pstart);
						map.put("pend", pend);
					}else {
						address = resultset.getString("address");
						map.put("address", address);
					}
					
					map.put("ID", ID);
					map.put("title", title);
					map.put("date", date);
					map.put("time", time);
					map.put("sex", sex);
					map.put("dowhat", dowhat);
					map.put("details", details);
					map.put("img", img);
					map.put("type", type);
					map.put("userid", userid);
					map.put("likeCount", likeCount+"");
					map.put("commentCount", commentDao.getCount(ID)+"");
					map.put("Comment", new JSONArray(commentDao.get(ID))+"");
					map.put("status", partakeDao.get(ID).get("status")+"");
					
					map.put("nickname", map2.get("nickname"));
					map.put("Userimg", map2.get("img"));
					
				}
				
				
				set.add(map);
			}
			set.addAll(partakeDao.getSuccessbyUserID(userid));

			
					
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pre, null);
		}
		
		return set;
	}
	
	public void remove(String ID) throws ClassNotFoundException, SQLException {
		Connection conn = DBManager.getConnection();
		String sql = "delete from HomeItems where ID = ? ";
		PreparedStatement pstm = null;
		try {
			pstm = conn.prepareStatement(sql);
			pstm.setString(1, ID);
			pstm.execute();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBManager.closeDB(conn, pstm, null);
		}
		
	}
	

	
}
