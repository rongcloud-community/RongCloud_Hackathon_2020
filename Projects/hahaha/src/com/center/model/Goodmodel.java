package com.center.model;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import com.center.dto.GoodDTO;
import com.center.dto.ShoppingDTO;
import com.center.util.DealString;
import com.center.vo.GoodVO;

public class Goodmodel {

	private Connection conn;
	public Goodmodel(Connection conn) {
		// TODO Auto-generated constructor stub
		this.conn = conn;
	}

	public int goodpublish(GoodDTO gooddto) throws SQLException {
		// TODO Auto-generated method stub
		String goodname = gooddto.getGoodname();
		double goodprice = gooddto.getGoodprice();
		String gooddesc = gooddto.getGooddesc();
		String goodtype = gooddto.getGoodtype();
		String goodpublisher = gooddto.getPublisher();
		String goodpublishtime = gooddto.getPublishtime();

		String insert = "insert into good"
				+"(GOOD_NAME,GOOD_PRICE,GOOD_TYPE,GOOD_PUBLISHTIME,GOOD_PUBLISHER,GOOD_DESC) "
				+"value(?,?,?,?,?,?)";
		PreparedStatement pre = conn.prepareStatement(insert);

		pre.setString(1,goodname);
		pre.setDouble(2,goodprice);
		pre.setString(3,goodtype);
		pre.setString(4,goodpublishtime);
		pre.setString(5,goodpublisher);
		pre.setString(6,gooddesc);
		
		int i = pre.executeUpdate();
		return i;
	}

	public int updatagood(GoodDTO gooddto) {
		// TODO Auto-generated method stub
		
		return 1;
	}

	public int delgood(String string) {
		// TODO Auto-generated method stub
		
		return 1;
	}

	public ArrayList showgoods(String name,String type) throws SQLException {
		// TODO Auto-generated method stub
		String strname = name;
		String strtype = type;
		String find = null;
		PreparedStatement seeking = null;
		ResultSet resultset = null;


		if(strname.equals("1") && strtype.equals("1")){
			find = "select * from good where 1 = 1";
			seeking = conn.prepareStatement(find);
				resultset = (ResultSet)seeking.executeQuery();
				System.out.println(strname+strtype+"ddd");
		}else{
			
			find = "select * from good where GOOD_NAME = ? and GOOD_TYPE = ?";
			seeking = conn.prepareStatement(find);
			System.out.println(strname+strtype+"dddzx");
			seeking.setString(1,strname);
			seeking.setString(2,strtype);
			resultset = (ResultSet)seeking.executeQuery();
		}

		GoodVO goodvo = new GoodVO();
		ArrayList goodlist = new ArrayList();
		while(resultset.next()){
			goodvo = new GoodVO();
			goodvo.setGoodid(resultset.getInt("ID"));
			goodvo.setGoodname(resultset.getString("GOOD_NAME"));
			goodvo.setGoodprice(resultset.getDouble("GOOD_PRICE"));
			goodvo.setGoodtype(resultset.getString("GOOD_TYPE"));
			goodvo.setPublishtime(resultset.getString("GOOD_PUBLISHTIME"));
			goodvo.setGoodbuycount(resultset.getInt("GOOD_BUYCOUNT"));
			goodvo.setGoodreadcount(resultset.getInt("GOOD_READCOUNT"));
			goodvo.setPublisher(resultset.getString("GOOD_PUBLISHER"));
			goodvo.setGoodcommended(resultset.getInt("GOOD_COMMENDED"));
			goodvo.setGoodspec(resultset.getInt("GOOD_PRICESPE"));
			goodlist.add(goodvo);
			System.out.println("SDASDSAFDSFSDFSD"+goodvo.getGoodid());
		}
		strname = null;
		strtype = null;
		return goodlist;
	}

	public int commendgoods(int goodid, int k) throws SQLException {
		// TODO Auto-generated method stub
		int j = 0;
		int good_id = goodid;
		int actiona = k;
		String option = null;
		
		if(actiona == 1){
			
			option = "update good set GOOD_COMMENDED = ? WHERE ID = ?";
			j =1;
		}
		if(actiona == 2){
			
			option = "update good set GOOD_PRICESPE = ? WHERE ID = ?";
			j =2;
		}
		if(actiona == 3){
			
			option = "update good set GOOD_TOP = ? WHERE ID = ?";
			j =3;
		}
		System.out.println(good_id+"sssss"+actiona);
		PreparedStatement preoption = conn.prepareStatement(option);
		preoption.setInt(1, 1);
		preoption.setInt(2, good_id);
		int m = preoption.executeUpdate();
		if(m == 1){
		;
		}else{
			j = 0;
		}
		System.out.println(j);
		return j;
	}

	public int updatagood(ShoppingDTO shoppingdto) throws SQLException {
		// TODO Auto-generated method stub
		int good_id = shoppingdto.getGoodid();
		
			
		String option = "update good set GOOD_TOP = ? WHERE ID = ?";
			
		PreparedStatement preoption = conn.prepareStatement(option);
		preoption.setInt(1, 1);
		preoption.setInt(2, good_id);
		int m = preoption.executeUpdate();
		System.out.println(m);
		return m;
	}

}
