/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES gb2312 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='SYSTEM' */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE */;
/*!40101 SET SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES */;
/*!40103 SET SQL_NOTES='ON' */;


USE `bbsdata`;
CREATE TABLE `article` (
  `article_no` int(11) NOT NULL auto_increment,
  `title` varchar(250) default NULL,
  `speaker` varchar(20) default NULL,
  `sent_time` timestamp NULL default CURRENT_TIMESTAMP,
  `reply_num` int(11) default '0',
  `click_num` int(11) default '0',
  `content` longtext,
  `type` varchar(20) default NULL,
  PRIMARY KEY  (`article_no`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

INSERT INTO `article` VALUES (1,'1234565','adminn','2007-10-30 00:00:00',12,14,'Fkajfasfasf','工大生活');
INSERT INTO `article` VALUES (2,'开通博客','adminn','2007-11-13 22:13:27',0,11,'<DIV>我的博客开通了</DIV>','工大学习');
INSERT INTO `article` VALUES (3,'心心心','adminn','2007-11-15 21:28:35',0,3,'<DIV>性能嘻嘻你</DIV>','工大学习');
INSERT INTO `article` VALUES (4,'生活','adminn','2007-11-16 15:39:54',0,1,'<DIV>生活</DIV>','工大生活');
INSERT INTO `article` VALUES (5,'生活','adminn','2007-11-16 15:40:33',3,41,'<DIV>生活</DIV>','工大生活');
INSERT INTO `article` VALUES (11,'很好预付','adminn','2007-11-20 20:02:39',0,9,'<DIV>范德萨分开了倒萨激发 警方对撒娇狂蜂浪蝶吉萨克服了觉得萨拉快餐店 </DIV> <DIV>警方对撒酒风肯定是 </DIV> <DIV>附近的撒酒风</DIV> <DIV>附近的撒酒风</DIV> <DIV>fjdsafh&nbsp; </DIV> <DIV>警方对撒酒风</DIV> <DIV>jfdsajfkd</DIV> <DIV>fjdasfjkdas</DIV> <DIV>fjklasjfdsakfsaklffjdsafjkdsa</DIV> <DIV>&nbsp;</DIV> <DIV>&nbsp;</DIV> <DIV>fjkdsajfkldsa</DIV> <DIV>jfklasjkfa</DIV>','工大迎评');
INSERT INTO `article` VALUES (14,'学习','adminn','2007-11-22 18:07:52',1,18,'<DIV>发范德萨解放路</DIV>','study');
INSERT INTO `article` VALUES (15,'gfsdaf','adminn','2007-11-22 21:30:50',0,1,'<DIV>fdsa fsadf dsa&nbsp; f</DIV>','fdsaf');
INSERT INTO `article` VALUES (16,'fdsaf ','adminn','2007-11-22 21:31:05',0,1,'<DIV>fdsafasdfcsxzv</DIV> <DIV>vbfdsgdsfv</DIV>','fdsaf f f');
INSERT INTO `article` VALUES (17,'vxzvxzv','adminn','2007-11-22 21:31:19',0,0,'<DIV>vcxzvzxv xczvxzvczxvcxz</DIV>','gfdvxvx x');
INSERT INTO `article` VALUES (18,'cxzv','adminn','2007-11-22 21:31:28',0,0,'<DIV>vcxzvcxzvccx</DIV>','工大生活');
INSERT INTO `article` VALUES (19,'vxczvxcz','adminn','2007-11-22 21:31:35',0,1,'<DIV>vvxzvxzvxcz</DIV>','vxzvxzvxcz');
INSERT INTO `article` VALUES (21,'fdgdfsg','adminn','2007-11-22 21:32:27',0,0,'<DIV>gfdsvbfdsgv</DIV>','工大生活');
INSERT INTO `article` VALUES (22,'dfgvfdsv','adminn','2007-11-22 21:32:34',0,0,'<DIV>sdvcxvxzvxzcv</DIV>','工大生活');
INSERT INTO `article` VALUES (23,'vxczvcxzv','adminn','2007-11-22 21:32:41',0,6,'<DIV>vbvxzvxczfdsafdsafdsaf</DIV>','工大生活');
INSERT INTO `article` VALUES (24,'vxczvcxz','adminn','2007-11-22 21:32:50',3,15,'<DIV>vxczvxczv</DIV>','工大生活');
INSERT INTO `article` VALUES (25,'sdf','adminn','2007-11-25 16:38:27',0,0,'<DIV>范德萨</DIV>','工大生活');
INSERT INTO `article` VALUES (26,'fndsalfj','tt','2007-11-25 20:45:36',0,5,'<DIV>fdsafdasfjk;dsakjfl;dsakfl;d</DIV>','工大迎评');
INSERT INTO `article` VALUES (27,'dfsjlajfkl','tt','2007-11-25 20:55:05',0,0,'<DIV>fjdksajfkdsajfkdsajfkldmsckdlamk</DIV> <DIV>fdjsafjkdslaf</DIV>','工大迎评');
INSERT INTO `article` VALUES (30,'hs','adminn','2007-11-25 20:59:41',4,16,'<DIV>ghdsgdsg</DIV>','工大生活');
INSERT INTO `article` VALUES (32,'附近的萨克','你好','2007-11-25 21:19:22',1,3,'<DIV>记分卡垃圾开发机卡分离大家</DIV>','工大迎评');
INSERT INTO `article` VALUES (33,'fsafsaf','liangst','2007-11-27 19:24:08',0,6,'<DIV>钟爱凡卡舍利弗就节流阀激发 </DIV> <DIV>付款拉丝机飞</DIV> <DIV>记分卡垃圾开发</DIV> <DIV>记分卡激发 </DIV>','中国');
INSERT INTO `article` VALUES (34,'范德萨发大水','你好','2007-11-27 22:35:53',0,0,'<DIV>仿盛大飞</DIV>','工大迎评');
INSERT INTO `article` VALUES (35,'各分店vfd','adminn','2007-11-29 19:15:30',0,1,'<DIV>范甘迪说vgx</DIV>','工大生活');
INSERT INTO `article` VALUES (36,'各分店','adminn','2007-11-29 19:21:30',0,0,'<DIV>各分店十个大商股份多少vv范德萨v</DIV>','工大生活');
INSERT INTO `article` VALUES (38,'各分店十个奋斗','adminn','2007-11-29 20:22:58',0,1,'<DIV>各分店施工方但是v</DIV>','工大生活');
CREATE TABLE `friends` (
  `id` int(11) NOT NULL auto_increment,
  `user_name` varchar(20) default NULL,
  `friend_name` varchar(20) default NULL,
  `friends_type` varchar(20) default '默认',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

INSERT INTO `friends` VALUES (2,'adminn','liang','默认');
INSERT INTO `friends` VALUES (3,'adminn','liberty','默认');
INSERT INTO `friends` VALUES (10,'adminn','liangst','默认');
INSERT INTO `friends` VALUES (11,'adminn','新用户','默认');
INSERT INTO `friends` VALUES (12,'liang','adminn','默认');
INSERT INTO `friends` VALUES (13,'adminn','易网','默认');
INSERT INTO `friends` VALUES (14,'tt','adminn','默认');
INSERT INTO `friends` VALUES (15,'你好','adminn','默认');
INSERT INTO `friends` VALUES (16,'liangst','adminn','默认');
INSERT INTO `friends` VALUES (22,'adminn','TT','默认');
CREATE TABLE `images` (
  `id` int(11) NOT NULL auto_increment,
  `user_name` varchar(20) default NULL,
  `image_path` varchar(80) default NULL,
  `message` varchar(100) default NULL,
  `image_type` varchar(20) default NULL,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;


CREATE TABLE `liuyan` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(40) default NULL,
  `content` varchar(500) default NULL,
  `insert_time` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

INSERT INTO `liuyan` VALUES (1,'匿名','金台南复合带萨拉激发 ','2006-12-30 00:00:00');
INSERT INTO `liuyan` VALUES (3,'匿名','合法的闪光灯佛塑股份噶分','2007-11-27 22:09:13');
INSERT INTO `liuyan` VALUES (4,'匿名','工大萨芬 ','2007-11-27 22:12:35');
INSERT INTO `liuyan` VALUES (5,'匿名','飞洒地方撒旦','2007-11-27 22:12:38');
INSERT INTO `liuyan` VALUES (8,'匿名','发生的飞','2007-11-27 22:12:49');
INSERT INTO `liuyan` VALUES (9,'匿名','hfdsg gfdsg','2007-11-30 14:45:29');
INSERT INTO `liuyan` VALUES (10,'匿名','gfdsgfdsgvfdsvxs','2007-11-30 14:45:48');
INSERT INTO `liuyan` VALUES (11,'匿名','fewf afds','2007-11-30 17:26:14');
INSERT INTO `liuyan` VALUES (12,'匿名','gfdgdsfd','2007-11-30 17:33:09');
CREATE TABLE `message` (
  `id` int(11) NOT NULL auto_increment,
  `admin_name` varchar(30) default NULL,
  `title` varchar(100) default NULL,
  `content` longtext,
  `insert_time` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

INSERT INTO `message` VALUES (1,'adminn','今天开会','<DIV>请大家附近的卡上理发师的&nbsp; 进风</DIV> <DIV>口拉萨积分肯定撒 </DIV>','2007-11-25 16:27:05');
INSERT INTO `message` VALUES (2,'adminn','很好','<DIV>范德萨仿盛大 解放路受打击飞</DIV>','2007-11-25 16:30:35');
INSERT INTO `message` VALUES (8,'adminn','范德萨','<DIV>飞大师傅大师傅范德萨 范德萨奋斗撒</DIV>','2007-11-25 18:59:41');
INSERT INTO `message` VALUES (9,'adminn','工大萨芬','<DIV></DIV>','2007-11-25 19:06:15');
INSERT INTO `message` VALUES (10,'adminn','范德萨飞','<DIV></DIV>','2007-11-25 19:06:35');
INSERT INTO `message` VALUES (11,'adminn','各分店是','<DIV></DIV>','2007-11-25 19:07:05');
INSERT INTO `message` VALUES (14,'你好','今天的成绩','<DIV>今天完成了管理员权限的问题dfsgdfs </DIV>','2007-11-27 21:24:27');
INSERT INTO `message` VALUES (15,'adminn','很好','<DIV>放假打开萨拉放假凯撒</DIV>','2007-11-29 18:54:04');
INSERT INTO `message` VALUES (16,'adminn','年法国','<DIV>合成版此消彼长</DIV>','2007-11-29 18:56:32');
CREATE TABLE `re_article` (
  `id` int(11) NOT NULL auto_increment,
  `article_no` int(11) default NULL,
  `re_name` varchar(20) default NULL,
  `content` varchar(500) default NULL,
  `insert_time` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

INSERT INTO `re_article` VALUES (2,1,'游者','可以了','2007-11-16 14:10:41');
INSERT INTO `re_article` VALUES (3,2,'adminn','ok','2007-11-16 14:14:12');
INSERT INTO `re_article` VALUES (4,2,'adminn','一切都好','2007-11-16 14:17:11');
INSERT INTO `re_article` VALUES (5,2,'游者','真的','2007-11-16 14:18:52');
INSERT INTO `re_article` VALUES (6,2,'游者','课程设计','2007-11-16 14:20:50');
INSERT INTO `re_article` VALUES (7,2,'游者','怎么了？','2007-11-16 14:23:39');
INSERT INTO `re_article` VALUES (8,2,'游者','是不是很好呀？','2007-11-16 14:24:26');
INSERT INTO `re_article` VALUES (9,6,'adminn','这个主题很好我喜欢','2007-11-17 09:51:51');
INSERT INTO `re_article` VALUES (16,5,'adminn','很好呀','2007-11-20 19:35:09');
INSERT INTO `re_article` VALUES (17,5,'adminn','各分店历史记录接口 ','2007-11-20 19:41:22');
INSERT INTO `re_article` VALUES (18,5,'adminn','范德萨记分卡','2007-11-20 19:42:37');
INSERT INTO `re_article` VALUES (19,14,'adminn','打开萨拉  进风口老师打积分  间发生令大家飞','2007-11-22 20:54:10');
INSERT INTO `re_article` VALUES (20,32,'你好','交付给电话','2007-11-25 21:20:06');
INSERT INTO `re_article` VALUES (24,30,'liangst','河坊街登录撒酒风来到撒\r\n','2007-11-29 13:54:11');
CREATE TABLE `user` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL default '',
  `password` varchar(18) default NULL,
  `QQ` varchar(15) default NULL,
  `e_mail` varchar(50) default NULL,
  `www` varchar(50) default NULL,
  `power` varchar(10) default '000',
  `registertime` timestamp NULL default CURRENT_TIMESTAMP,
  `sent_article` int(11) default '0',
  `reply_num` int(11) default '0',
  `face` varchar(80) default NULL,
  `sex` varchar(6) default NULL,
  `signname` varchar(250) default '',
  `click_num` int(11) default '0',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312 ROW_FORMAT=COMPRESSED;

INSERT INTO `user` VALUES (1,'adminn','admin','397622441','liangst99@163.com','www.easyshopping.com','1111','2006-12-30 00:00:00',44,26,'images/face/Image10.gif','男孩','我选择我喜欢',306);
INSERT INTO `user` VALUES (6,'TT','123456','123456789','TT@TT.com','www.TT.com','111','2007-05-10 20:35:11',6,3,'images/face/Image10.gif','男孩',NULL,9);
INSERT INTO `user` VALUES (11,'liangst','liangst','jfaj','jfa@fj.com','','1111','2007-05-12 14:48:04',1,0,'images/face/Image9.gif','男孩','我心飞翔',4);
INSERT INTO `user` VALUES (12,'newuser','newuser','159263487','yy@tom.com','www.jiushi.com','000','2007-05-12 15:02:04',0,0,'images/face/Image10.gif','男孩',NULL,1);
INSERT INTO `user` VALUES (13,'你好','nihao','159263487','nihao@Tom.com','www.nihao.cn','111','2007-05-14 16:59:16',3,3,'images/face/Image10.gif','男孩',NULL,3);
INSERT INTO `user` VALUES (15,'小小 ','xiaoxiao','123456789','xiao@163.com','','000','2007-05-29 15:11:52',4,7,'images/face/Image6.gif','女孩','',2);
INSERT INTO `user` VALUES (16,'新用户','new','159263487','newuser@163.com','','000','2007-05-29 16:36:57',1,1,'images/face/Image10.gif','男孩',NULL,0);
INSERT INTO `user` VALUES (17,'黄纱','huang','123456789','haung@163.com','','000','2007-05-29 19:06:07',1,2,'images/face/Image10.gif','男孩',NULL,0);
INSERT INTO `user` VALUES (18,'用户','yong','397622441','yong@163.com','','000','2007-05-31 14:00:27',5,1,'images/face/Image10.gif','男孩',NULL,0);
INSERT INTO `user` VALUES (19,'tewqf','123456','159263487','liang@163.com','','000','2007-08-10 10:06:03',0,0,'images/face/Image10.gif','男孩',NULL,0);
INSERT INTO `user` VALUES (20,'liberty','123456','397622441','liangst99@163.com','','000','2007-11-12 17:59:06',0,0,'images/face/Image10.gif','男孩',NULL,2);
INSERT INTO `user` VALUES (21,'liang','liang','397622441','liangst99@163.com','','000','2007-11-12 22:07:34',0,0,'images/face/Image10.gif','男孩',NULL,6);
INSERT INTO `user` VALUES (23,'yuyu','123456','756301384','liangst99@163.com','','000','2007-11-16 23:10:48',0,0,'images/face/Image5.gif','女孩','There is no end to learning! ',0);
INSERT INTO `user` VALUES (24,'易网','123456','123465785','yiwangh@163.com','','000','2007-11-22 21:25:01',0,0,'images/face/Image2.gif','男孩','选择就要付出',4);
INSERT INTO `user` VALUES (25,'zhuzhu','123456','123456789','123@163.com',NULL,'000','2007-11-23 14:13:39',0,0,'images/face/Image2.gif','男孩','',0);
INSERT INTO `user` VALUES (26,'一号','123456','123456789','123@qq.com','','000','2007-11-25 21:11:36',0,0,'images/face/Image1.gif','男孩','',2);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
