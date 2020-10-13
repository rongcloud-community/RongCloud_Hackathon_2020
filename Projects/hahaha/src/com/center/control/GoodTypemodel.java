package com.center.control;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GoodTypemodel {

	private Connection conn;
	public GoodTypemodel(Connection conn) {
		// TODO Auto-generated constructor stub
		this.conn = conn;
	}

	public ResultSet showtype() {
		// TODO Auto-generated method stub
		PreparedStatement pre = null;
		ResultSet rs = null;
		String str = "select TYPE_NAME from goodtype where 1 = 1";
		try {
			pre = conn.prepareStatement(str);
			rs = pre.executeQuery();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return rs;
	}

	public int addtype(String typename, String typetime) throws SQLException {
		// TODO Auto-generated method stub
		String addtype = "insert into goodtype(TYPE_NAME,TYPE_TIME) VALUE(?,?)";
		PreparedStatement pre = conn.prepareStatement(addtype);
		pre.setString(1, typename);
		pre.setString(2, typetime);
		int i = pre.executeUpdate();
		return i;
	}

}
