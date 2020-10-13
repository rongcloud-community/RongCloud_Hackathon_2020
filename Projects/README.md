使用的是 MySQL5.0 数据库的用户名是 root 密码是 datalink 
可以根据数据库的需要修改用户名和密码

修改方法是：

1.到WEB-INF\classes\db.properties下用记事本打开

db.driver是链接数据库的驱动器 默认的是com.mysql.jdbc.Driver
  
db.password 是链接数据库的密码 默认的是 datalink
  
db.url 是链接数据库的表 默认的是 bbsdata
  
db.user 是链接数据库的用户名 默认的是 root