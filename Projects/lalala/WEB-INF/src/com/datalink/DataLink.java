package com.datalink;

import java.sql.*;
import java.io.*;
import java.util.*;

public class DataLink {
	//private Connection con = null;
	//private String driver = "com.mysql.jdbc.Driver";
	//private String url = "jdbc:mysql://localhost/bbsdata";
	//private String user = "root";
	//private String password = "datalink";
	private Connection con = null;
	
	public DataLink(){
		try{
		  InputStream in = getClass().getResourceAsStream("/db.properties");
		  Properties dbProps = new Properties();
		  dbProps.load(in);
		  String driver = dbProps.getProperty("db.driver").trim();
		  String url = dbProps.getProperty("db.url").trim();
		  String user = dbProps.getProperty("db.user").trim();
		  String password = dbProps.getProperty("db.password").trim();
		  Class.forName(driver).newInstance();
		  this.con = DriverManager.getConnection(url,user,password);
		  this.con.setAutoCommit(true);
		}catch(Exception e){
			System.out.print(e.getMessage());
		}
		
	}
	
	public Connection getConnection(){
		return this.con;
	}
	
	public void close(){
		if(this.con != null){
			try{
				this.con.close();
			}catch(SQLException e){
				System.out.println("¹Ø±ÕÊý¾Ý¿âÊ§°Ü!");
			}
		}
	}
}


