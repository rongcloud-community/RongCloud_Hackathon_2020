package com.admin;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.datalink.DataLink;

public class AdminPower {
	private String power = "";
	
	public String getAdminPower(String name){
		try{
	    	DataLink datalink = new DataLink();
		    Connection conn = datalink.getConnection();
		    Statement stmt=conn.createStatement(); 
		    ResultSet RS=null; 
		    RS = stmt.executeQuery("select * from user where name = '" + name + "'" );
		    if(RS.next()){
		    	  power = RS.getString("power");
			      RS.close();
			      stmt.close();
			      conn.close();
			      if(power.equals("111")){
			    	  power = "普通管理员";
			      }	
			      else if(power.equals("1111")){
			    	  power = "超级管理员";
			      }
			      else{
			    	  power = "普通会员";
			      }
			}
		    RS.close();
	    	stmt.close();
		    conn.close();
	    }catch(SQLException e){
	    	System.out.print("数据库链接错误");
	    	return "";
	    }
	    return power;
	}
}
