package inc;

import java.sql.*;
import javax.sql.*;

public class condb {
  private String dburl =
      "jdbc:jtds:sqlserver://localhost:1433;DatabaseName=cics"; //���ݿ��ʶ��
  private Connection conn = null;
  private ResultSet rs = null;
  private String user = "sa";
  private String password = "";

  public condb() {
    try {
      Class.forName("net.sourceforge.jtds.jdbc.Driver"); //װ�����ݿ�����

    }
    catch (Exception ex) {
      ex.printStackTrace();

    }
  }

  public Connection getcondb() throws SQLException {
    conn = DriverManager.getConnection(dburl, user, password); //��ȡ����
    //Statement st=conn.createStatement();
    return conn;

  }

  public ResultSet executeQuery(String sql) { //ִ�в�ѯ���
    Connection conn = null;
    ResultSet rs = null;
    PreparedStatement stmt = null;
    try {
      conn = getcondb();
      stmt = conn.prepareStatement(sql);
      rs = stmt.executeQuery();

    }
    catch (SQLException e) {

    }
    return rs;

  }

  public void executeUpdate(String sql) { //ִ�и��£����룬ɾ��
    Connection conn = null;
    PreparedStatement stmt = null;
    try {
      conn = getcondb();
      stmt = conn.prepareStatement(sql);
      stmt.executeUpdate();

    }
    catch (SQLException e) {

    }

  }

}