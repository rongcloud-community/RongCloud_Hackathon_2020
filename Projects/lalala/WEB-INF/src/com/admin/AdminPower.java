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
			    	  power = "��ͨ����Ա";
			      }	
			      else if(power.equals("1111")){
			    	  power = "��������Ա";
			      }
			      else{
			    	  power = "��ͨ��Ա";
			      }
			}
		    RS.close();
	    	stmt.close();
		    conn.close();
	    }catch(SQLException e){
	    	System.out.print("���ݿ����Ӵ���");
	    	return "";
	    }
	    return power;
	}
}
