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

INSERT INTO `article` VALUES (1,'1234565','adminn','2007-10-30 00:00:00',12,14,'Fkajfasfasf','��������');
INSERT INTO `article` VALUES (2,'��ͨ����','adminn','2007-11-13 22:13:27',0,11,'<DIV>�ҵĲ��Ϳ�ͨ��</DIV>','����ѧϰ');
INSERT INTO `article` VALUES (3,'������','adminn','2007-11-15 21:28:35',0,3,'<DIV>����������</DIV>','����ѧϰ');
INSERT INTO `article` VALUES (4,'����','adminn','2007-11-16 15:39:54',0,1,'<DIV>����</DIV>','��������');
INSERT INTO `article` VALUES (5,'����','adminn','2007-11-16 15:40:33',3,41,'<DIV>����</DIV>','��������');
INSERT INTO `article` VALUES (11,'�ܺ�Ԥ��','adminn','2007-11-20 20:02:39',0,9,'<DIV>�������ֿ��˵������� ��������������˵������˷��˾���������͵� </DIV> <DIV>���������Ʒ�϶��� </DIV> <DIV>���������Ʒ�</DIV> <DIV>���������Ʒ�</DIV> <DIV>fjdsafh&nbsp; </DIV> <DIV>���������Ʒ�</DIV> <DIV>jfdsajfkd</DIV> <DIV>fjdasfjkdas</DIV> <DIV>fjklasjfdsakfsaklffjdsafjkdsa</DIV> <DIV>&nbsp;</DIV> <DIV>&nbsp;</DIV> <DIV>fjkdsajfkldsa</DIV> <DIV>jfklasjkfa</DIV>','����ӭ��');
INSERT INTO `article` VALUES (14,'ѧϰ','adminn','2007-11-22 18:07:52',1,18,'<DIV>�����������·</DIV>','study');
INSERT INTO `article` VALUES (15,'gfsdaf','adminn','2007-11-22 21:30:50',0,1,'<DIV>fdsa fsadf dsa&nbsp; f</DIV>','fdsaf');
INSERT INTO `article` VALUES (16,'fdsaf ','adminn','2007-11-22 21:31:05',0,1,'<DIV>fdsafasdfcsxzv</DIV> <DIV>vbfdsgdsfv</DIV>','fdsaf f f');
INSERT INTO `article` VALUES (17,'vxzvxzv','adminn','2007-11-22 21:31:19',0,0,'<DIV>vcxzvzxv xczvxzvczxvcxz</DIV>','gfdvxvx x');
INSERT INTO `article` VALUES (18,'cxzv','adminn','2007-11-22 21:31:28',0,0,'<DIV>vcxzvcxzvccx</DIV>','��������');
INSERT INTO `article` VALUES (19,'vxczvxcz','adminn','2007-11-22 21:31:35',0,1,'<DIV>vvxzvxzvxcz</DIV>','vxzvxzvxcz');
INSERT INTO `article` VALUES (21,'fdgdfsg','adminn','2007-11-22 21:32:27',0,0,'<DIV>gfdsvbfdsgv</DIV>','��������');
INSERT INTO `article` VALUES (22,'dfgvfdsv','adminn','2007-11-22 21:32:34',0,0,'<DIV>sdvcxvxzvxzcv</DIV>','��������');
INSERT INTO `article` VALUES (23,'vxczvcxzv','adminn','2007-11-22 21:32:41',0,6,'<DIV>vbvxzvxczfdsafdsafdsaf</DIV>','��������');
INSERT INTO `article` VALUES (24,'vxczvcxz','adminn','2007-11-22 21:32:50',3,15,'<DIV>vxczvxczv</DIV>','��������');
INSERT INTO `article` VALUES (25,'sdf','adminn','2007-11-25 16:38:27',0,0,'<DIV>������</DIV>','��������');
INSERT INTO `article` VALUES (26,'fndsalfj','tt','2007-11-25 20:45:36',0,5,'<DIV>fdsafdasfjk;dsakjfl;dsakfl;d</DIV>','����ӭ��');
INSERT INTO `article` VALUES (27,'dfsjlajfkl','tt','2007-11-25 20:55:05',0,0,'<DIV>fjdksajfkdsajfkdsajfkldmsckdlamk</DIV> <DIV>fdjsafjkdslaf</DIV>','����ӭ��');
INSERT INTO `article` VALUES (30,'hs','adminn','2007-11-25 20:59:41',4,16,'<DIV>ghdsgdsg</DIV>','��������');
INSERT INTO `article` VALUES (32,'����������','���','2007-11-25 21:19:22',1,3,'<DIV>�Ƿֿ�������������������</DIV>','����ӭ��');
INSERT INTO `article` VALUES (33,'fsafsaf','liangst','2007-11-27 19:24:08',0,6,'<DIV>�Ӱ������������ͽ��������� </DIV> <DIV>������˿����</DIV> <DIV>�Ƿֿ���������</DIV> <DIV>�Ƿֿ����� </DIV>','�й�');
INSERT INTO `article` VALUES (34,'����������ˮ','���','2007-11-27 22:35:53',0,0,'<DIV>��ʢ���</DIV>','����ӭ��');
INSERT INTO `article` VALUES (35,'���ֵ�vfd','adminn','2007-11-29 19:15:30',0,1,'<DIV>���ʵ�˵vgx</DIV>','��������');
INSERT INTO `article` VALUES (36,'���ֵ�','adminn','2007-11-29 19:21:30',0,0,'<DIV>���ֵ�ʮ�����̹ɷݶ���vv������v</DIV>','��������');
INSERT INTO `article` VALUES (38,'���ֵ�ʮ���ܶ�','adminn','2007-11-29 20:22:58',0,1,'<DIV>���ֵ�ʩ��������v</DIV>','��������');
CREATE TABLE `friends` (
  `id` int(11) NOT NULL auto_increment,
  `user_name` varchar(20) default NULL,
  `friend_name` varchar(20) default NULL,
  `friends_type` varchar(20) default 'Ĭ��',
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

INSERT INTO `friends` VALUES (2,'adminn','liang','Ĭ��');
INSERT INTO `friends` VALUES (3,'adminn','liberty','Ĭ��');
INSERT INTO `friends` VALUES (10,'adminn','liangst','Ĭ��');
INSERT INTO `friends` VALUES (11,'adminn','���û�','Ĭ��');
INSERT INTO `friends` VALUES (12,'liang','adminn','Ĭ��');
INSERT INTO `friends` VALUES (13,'adminn','����','Ĭ��');
INSERT INTO `friends` VALUES (14,'tt','adminn','Ĭ��');
INSERT INTO `friends` VALUES (15,'���','adminn','Ĭ��');
INSERT INTO `friends` VALUES (16,'liangst','adminn','Ĭ��');
INSERT INTO `friends` VALUES (22,'adminn','TT','Ĭ��');
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

INSERT INTO `liuyan` VALUES (1,'����','��̨�ϸ��ϴ��������� ','2006-12-30 00:00:00');
INSERT INTO `liuyan` VALUES (3,'����','�Ϸ�������Ʒ��ܹɷݸ���','2007-11-27 22:09:13');
INSERT INTO `liuyan` VALUES (4,'����','�������� ','2007-11-27 22:12:35');
INSERT INTO `liuyan` VALUES (5,'����','�����ط�����','2007-11-27 22:12:38');
INSERT INTO `liuyan` VALUES (8,'����','�����ķ�','2007-11-27 22:12:49');
INSERT INTO `liuyan` VALUES (9,'����','hfdsg gfdsg','2007-11-30 14:45:29');
INSERT INTO `liuyan` VALUES (10,'����','gfdsgfdsgvfdsvxs','2007-11-30 14:45:48');
INSERT INTO `liuyan` VALUES (11,'����','fewf afds','2007-11-30 17:26:14');
INSERT INTO `liuyan` VALUES (12,'����','gfdgdsfd','2007-11-30 17:33:09');
CREATE TABLE `message` (
  `id` int(11) NOT NULL auto_increment,
  `admin_name` varchar(30) default NULL,
  `title` varchar(100) default NULL,
  `content` longtext,
  `insert_time` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

INSERT INTO `message` VALUES (1,'adminn','���쿪��','<DIV>���Ҹ����Ŀ�����ʦ��&nbsp; ����</DIV> <DIV>���������ֿ϶��� </DIV>','2007-11-25 16:27:05');
INSERT INTO `message` VALUES (2,'adminn','�ܺ�','<DIV>��������ʢ�� ���·�ܴ����</DIV>','2007-11-25 16:30:35');
INSERT INTO `message` VALUES (8,'adminn','������','<DIV>�ɴ�ʦ����ʦ�������� �������ܶ���</DIV>','2007-11-25 18:59:41');
INSERT INTO `message` VALUES (9,'adminn','��������','<DIV></DIV>','2007-11-25 19:06:15');
INSERT INTO `message` VALUES (10,'adminn','��������','<DIV></DIV>','2007-11-25 19:06:35');
INSERT INTO `message` VALUES (11,'adminn','���ֵ���','<DIV></DIV>','2007-11-25 19:07:05');
INSERT INTO `message` VALUES (14,'���','����ĳɼ�','<DIV>��������˹���ԱȨ�޵�����dfsgdfs </DIV>','2007-11-27 21:24:27');
INSERT INTO `message` VALUES (15,'adminn','�ܺ�','<DIV>�żٴ������żٿ���</DIV>','2007-11-29 18:54:04');
INSERT INTO `message` VALUES (16,'adminn','�귨��','<DIV>�ϳɰ�����˳�</DIV>','2007-11-29 18:56:32');
CREATE TABLE `re_article` (
  `id` int(11) NOT NULL auto_increment,
  `article_no` int(11) default NULL,
  `re_name` varchar(20) default NULL,
  `content` varchar(500) default NULL,
  `insert_time` timestamp NULL default CURRENT_TIMESTAMP,
  PRIMARY KEY  (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

INSERT INTO `re_article` VALUES (2,1,'����','������','2007-11-16 14:10:41');
INSERT INTO `re_article` VALUES (3,2,'adminn','ok','2007-11-16 14:14:12');
INSERT INTO `re_article` VALUES (4,2,'adminn','һ�ж���','2007-11-16 14:17:11');
INSERT INTO `re_article` VALUES (5,2,'����','���','2007-11-16 14:18:52');
INSERT INTO `re_article` VALUES (6,2,'����','�γ����','2007-11-16 14:20:50');
INSERT INTO `re_article` VALUES (7,2,'����','��ô�ˣ�','2007-11-16 14:23:39');
INSERT INTO `re_article` VALUES (8,2,'����','�ǲ��Ǻܺ�ѽ��','2007-11-16 14:24:26');
INSERT INTO `re_article` VALUES (9,6,'adminn','�������ܺ���ϲ��','2007-11-17 09:51:51');
INSERT INTO `re_article` VALUES (16,5,'adminn','�ܺ�ѽ','2007-11-20 19:35:09');
INSERT INTO `re_article` VALUES (17,5,'adminn','���ֵ���ʷ��¼�ӿ� ','2007-11-20 19:41:22');
INSERT INTO `re_article` VALUES (18,5,'adminn','�������Ƿֿ�','2007-11-20 19:42:37');
INSERT INTO `re_article` VALUES (19,14,'adminn','������  �������ʦ�����  �䷢�����ҷ�','2007-11-22 20:54:10');
INSERT INTO `re_article` VALUES (20,32,'���','�������绰','2007-11-25 21:20:06');
INSERT INTO `re_article` VALUES (24,30,'liangst','�ӷ��ֵ�¼���Ʒ�������\r\n','2007-11-29 13:54:11');
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

INSERT INTO `user` VALUES (1,'adminn','admin','397622441','liangst99@163.com','www.easyshopping.com','1111','2006-12-30 00:00:00',44,26,'images/face/Image10.gif','�к�','��ѡ����ϲ��',306);
INSERT INTO `user` VALUES (6,'TT','123456','123456789','TT@TT.com','www.TT.com','111','2007-05-10 20:35:11',6,3,'images/face/Image10.gif','�к�',NULL,9);
INSERT INTO `user` VALUES (11,'liangst','liangst','jfaj','jfa@fj.com','','1111','2007-05-12 14:48:04',1,0,'images/face/Image9.gif','�к�','���ķ���',4);
INSERT INTO `user` VALUES (12,'newuser','newuser','159263487','yy@tom.com','www.jiushi.com','000','2007-05-12 15:02:04',0,0,'images/face/Image10.gif','�к�',NULL,1);
INSERT INTO `user` VALUES (13,'���','nihao','159263487','nihao@Tom.com','www.nihao.cn','111','2007-05-14 16:59:16',3,3,'images/face/Image10.gif','�к�',NULL,3);
INSERT INTO `user` VALUES (15,'СС ','xiaoxiao','123456789','xiao@163.com','','000','2007-05-29 15:11:52',4,7,'images/face/Image6.gif','Ů��','',2);
INSERT INTO `user` VALUES (16,'���û�','new','159263487','newuser@163.com','','000','2007-05-29 16:36:57',1,1,'images/face/Image10.gif','�к�',NULL,0);
INSERT INTO `user` VALUES (17,'��ɴ','huang','123456789','haung@163.com','','000','2007-05-29 19:06:07',1,2,'images/face/Image10.gif','�к�',NULL,0);
INSERT INTO `user` VALUES (18,'�û�','yong','397622441','yong@163.com','','000','2007-05-31 14:00:27',5,1,'images/face/Image10.gif','�к�',NULL,0);
INSERT INTO `user` VALUES (19,'tewqf','123456','159263487','liang@163.com','','000','2007-08-10 10:06:03',0,0,'images/face/Image10.gif','�к�',NULL,0);
INSERT INTO `user` VALUES (20,'liberty','123456','397622441','liangst99@163.com','','000','2007-11-12 17:59:06',0,0,'images/face/Image10.gif','�к�',NULL,2);
INSERT INTO `user` VALUES (21,'liang','liang','397622441','liangst99@163.com','','000','2007-11-12 22:07:34',0,0,'images/face/Image10.gif','�к�',NULL,6);
INSERT INTO `user` VALUES (23,'yuyu','123456','756301384','liangst99@163.com','','000','2007-11-16 23:10:48',0,0,'images/face/Image5.gif','Ů��','There is no end to learning! ',0);
INSERT INTO `user` VALUES (24,'����','123456','123465785','yiwangh@163.com','','000','2007-11-22 21:25:01',0,0,'images/face/Image2.gif','�к�','ѡ���Ҫ����',4);
INSERT INTO `user` VALUES (25,'zhuzhu','123456','123456789','123@163.com',NULL,'000','2007-11-23 14:13:39',0,0,'images/face/Image2.gif','�к�','',0);
INSERT INTO `user` VALUES (26,'һ��','123456','123456789','123@qq.com','','000','2007-11-25 21:11:36',0,0,'images/face/Image1.gif','�к�','',2);

/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
