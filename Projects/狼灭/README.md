队名：狼灭

项目：网上会议系统

通过使用SDK来实现网上会议系统进行用户之间的交流




1、安装数据库


cd %iula_home%

mysql -u root -p

drop database iuladb;

create database iuladb;

alter database iuladb default character set UTF8;

grant all privileges on iuladb.* to iuladbuser@localhost identified by 'pwd$iuladbuser';

quit;

type src\iula_mysql.sql | mysql -uroot -p iuladb

当然，也可以直接使用my sql front等工具手动执行数据库脚本安装。其中iula_mssql.sql为mssql的脚本,iula_mysql.sql为sql的脚本。

2、修改配置
src\main\easyjf-dbo.xml
修改src\main\easyjf-dbo.xml文件中数据库连接相关字串为

<!--以下为内容开始-->
<property name="easydbo.connection.driver_class">org.gjt.mm.mysql.Driver</property>
<property name="easydbo.connection.password">pwd$iuladbuser</property>
<property name="easydbo.connection.url">jdbc:mysql://127.0.0.1:3306/iuladb</property>
<property name="easydbo.connection.username">iuladbuser</property>
<property name="easydbo.dialect">com.easyjf.dbo.sql.MySqlQuery</property>
<property name="easydbo.show_sql">true</property>
<!--以下为内容结束-->


3、执行编译及发布　
双击bin\build.bat
选择war
即会生成一个release\easyjf-iula-0.1.0.war文件，把该文件拷到tomcat的webapps目录下面，重启tomcat即可。

4、运行程序

http://localhost:8080/easyjf-iula-0.1.0/

首先添加一个会议室，注意最大参与人数必须大于1，刷新时间最好大于3000，不能为0。访问权限及及权限值设置中不要填写数据。然后保存！

然后点击启动会议室

启动成功后，点击会议名标标题，弹出最大化窗口进入会议室主界面。
