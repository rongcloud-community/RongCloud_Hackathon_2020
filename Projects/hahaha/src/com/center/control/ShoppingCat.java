package com.center.control;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import com.center.dto.ShoppingDTO;
import com.center.model.Goodmodel;
import com.center.vo.ShoppingVO;

public class ShoppingCat {

	private Connection conn;
	public ShoppingCat(Connection conn) {
		// TODO Auto-generated constructor stub
		this.conn = conn;
	}

	public int shop(ShoppingDTO shoppingDTO) throws SQLException {
		// TODO Auto-generated method stub
		ShoppingDTO shoppingdto = shoppingDTO;
		
		String shop = "insert into ordering(GOOD_ID,GOOD_PRICE,GUESTRNAME,USER_ID,SHOP_TIME,GOOD_NAME) value(?,?,?,?,?,?)";
		PreparedStatement pre = conn.prepareStatement(shop);
		pre.setInt(1, shoppingdto.getGoodid());
		pre.setDouble(2, shoppingdto.getPrice());
		pre.setString(3, shoppingdto.getUsername());
		pre.setInt(4, shoppingdto.getUserid());
		pre.setString(5, shoppingdto.getShoptime());
		pre.setString(6, shoppingdto.getGoodname());
		System.out.println(shoppingdto.getShoptime());
		int i = pre.executeUpdate();
		return i;
		
	}

	public ArrayList shopcat(int userid) throws SQLException {
		// TODO Auto-generated method stub
		int user_id = userid;
		ShoppingVO shoppingvo = null;
		String cat = "select * from ordering where USER_ID = ?";
		PreparedStatement precat = conn.prepareStatement(cat);
		precat.setInt(1, user_id);
		ResultSet catresult = precat.executeQuery();
		
		ArrayList catlist = new ArrayList();
		while(catresult.next()){
			shoppingvo = new ShoppingVO();
			
			shoppingvo.setId(catresult.getInt("ID"));
			shoppingvo.setGoodid(catresult.getInt("GOOD_ID"));
			shoppingvo.setGoodnum(catresult.getInt("GOOD_NUM"));
			shoppingvo.setPrice(catresult.getDouble("GOOD_PRICE"));
			shoppingvo.setPayment(catresult.getDouble("GOOD_PAYMENT"));
			shoppingvo.setUsername(catresult.getString("GUESTRNAME"));
			shoppingvo.setProvince(catresult.getString("GUEST_PROVINCE"));
			shoppingvo.setPayy(catresult.getInt("PAY_Y"));
			shoppingvo.setAuditing(catresult.getInt("AUDITING"));
			shoppingvo.setSelled(catresult.getInt("SELLED"));
			shoppingvo.setAuditingtime(catresult.getString("AUDITING_TIME"));
			shoppingvo.setUserid(catresult.getInt("USER_ID"));
			shoppingvo.setShoptime(catresult.getString("SHOP_TIME"));
			shoppingvo.setGoodname(catresult.getString("GOOD_NAME"));
			catlist.add(shoppingvo);
		}
		return catlist;
	}

	public int shopcatadd(int id, int goodnum) throws SQLException {
		int shop_id = id;
		int good_num = goodnum;
		System.out.println(shop_id+good_num);
		String addgood = "update ordering set GOOD_NUM = ? where ID = ?";
		PreparedStatement addgoodpre = conn.prepareStatement(addgood);
		addgoodpre.setInt(1, good_num);
		addgoodpre.setInt(2, shop_id);
		int i = addgoodpre.executeUpdate();
		return i;
		// TODO Auto-generated method stub
		
	}

	public ResultSet selectgood(ShoppingDTO shoppingdto) throws SQLException {
		// TODO Auto-generated method stub
		ShoppingDTO shopping_dto = shoppingdto;
		int goodid = shopping_dto.getGoodid();
		String username = shopping_dto.getUsername();
		
		String existgood = "select * from ordering where GOOD_ID = ? and GUESTRNAME = ?";
		PreparedStatement existgoodpre = conn.prepareStatement(existgood);
		existgoodpre.setInt(1, goodid);
		existgoodpre.setString(2, username);
		ResultSet resexistgood = existgoodpre.executeQuery();
		return resexistgood;
	}

}
