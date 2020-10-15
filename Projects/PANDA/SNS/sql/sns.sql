/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 5.5.60 : Database - sns
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sns` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `sns`;

/*Table structure for table `center` */

DROP TABLE IF EXISTS `center`;

CREATE TABLE `center` (
  `use_id` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户id',
  `cid` int(20) NOT NULL AUTO_INCREMENT COMMENT '文章id',
  `publishTime` datetime NOT NULL COMMENT '发表时间',
  `content` text COLLATE utf8mb4_unicode_ci,
  `findMates` enum('0','1') COLLATE utf8mb4_unicode_ci DEFAULT '0' COMMENT '是否要发布到广场',
  `lng` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '经度',
  `lat` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '纬度',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `center` */

insert  into `center`(`use_id`,`cid`,`publishTime`,`content`,`findMates`,`lng`,`lat`) values 
('123123',1,'2020-10-02 17:38:47','今天咕咕咕','0','25.016977','121.540010'),
('123123',2,'2020-10-02 17:38:47','今天咕咕咕','0','25.016977','121.540010'),
('123123',3,'2020-10-04 10:41:11','咕咕咕,一咕在咕','0','25.016977','121.540010'),
('vIR2UX6Yk',8,'2020-10-04 18:14:19','shi uid ma','1','25.016977','121.540010'),
('123123',9,'2020-10-02 17:38:47','今天咕咕咕','1','25.016977','121.540010'),
('gcd666',11,'2020-10-04 21:14:10','da jia hao  wo shi a da','1','25.016977','121.540010'),
('pjc666',19,'2020-10-06 15:23:57','  fg','1','25.016977','121.540010'),
('123123',20,'2020-10-02 17:38:47','今天咕咕咕???','1','25.016977','121.540010'),
('pjc666',22,'2020-10-06 15:54:02','sdfsdf','1','25.016977','121.540010'),
('pjc666',23,'2020-10-06 15:54:17','sdfsdfsd','0','25.016977','121.540010'),
('pjc666',24,'2020-10-06 15:54:56','ture','1','25.016977','121.540010'),
('pjc666',25,'2020-10-06 15:55:08','ture','1','25.016977','121.540010'),
('pjc666',26,'2020-10-06 15:55:16','false','0','25.016977','121.540010'),
('pjc666',27,'2020-10-06 15:55:29','sdfd','1','25.016977','121.540010'),
('pjc666',28,'2020-10-06 15:55:38','sdfsdf','0','25.016977','121.540010'),
('pjc666',29,'2020-10-06 15:55:45','aaaaaaaaaaaaaa','1','25.016977','121.540010'),
('pjc666',30,'2020-10-06 15:55:50','bbbbbbbbbbbbbbb','0','25.016977','121.540010'),
('pjc666',31,'2020-10-06 15:59:07','2312312','1','25.016977','121.540010'),
('pjc666',32,'2020-10-06 16:03:16','wo fa yige','1','25.016977','121.540010'),
('pjc666',33,'2020-10-06 16:03:52','bu kan zhege1','1','25.016977','121.540010'),
('pjc666',34,'2020-10-06 16:04:00','bukanzhege111','0','25.016977','121.540010'),
('123123',36,'2010-10-02 17:38:47','??????','1','25.016977','121.540010'),
('54188',37,'2020-10-06 19:43:50','66666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666','1','25.016977','121.540010'),
('54188',38,'2020-10-06 20:13:21','?????????','1','25.016977','121.540010'),
('54188',40,'2020-10-06 21:07:27','123456789','1','25.016977','121.540010'),
('yxd666',41,'2020-10-06 21:45:34','大家好?','1','25.016977','121.540010'),
('pjc666',42,'2020-10-06 23:08:09','vhfh','1','25.016977','121.540010'),
('54188',43,'2020-10-07 01:34:39','大家好！我是郭德乐~','1','25.016977','121.540010'),
('54188',44,'2020-10-07 01:34:51','我要睡觉觉了','0','25.016977','121.540010'),
('aaaaa',46,'2020-10-07 22:16:34','QwQ????','1','25.016977','121.540010'),
('54188',47,'2020-10-08 00:50:09','来一起嗨~','1','25.016977','121.540010'),
('admin',48,'2020-10-08 09:24:57','<script>alert(cookies)</script>','1','25.016977','121.540010'),
('admin',49,'2020-10-08 09:25:21','123456','1','25.016977','121.540010'),
('gcd666',50,'2020-10-08 15:02:14','??','1','25.016977','121.540010'),
('123123123',51,'2020-10-09 09:10:07','我是123123123?','1','25.016977','121.540010'),
('123123',52,'2020-10-09 09:10:27','我是123123?','1','25.016977','121.540010'),
('pjc666',58,'2020-10-09 23:28:17','1','1','0','0'),
('pjc666',59,'2020-10-09 23:28:21','2','1','0','0'),
('pjc666',60,'2020-10-09 23:28:25','3','1','0','0'),
('pjc666',61,'2020-10-09 23:28:31','4','1','0','0'),
('pjc666',62,'2020-10-09 23:28:35','5','1','0','0'),
('pjc666',63,'2020-10-09 23:28:39','q','1','0','0'),
('pjc666',64,'2020-10-09 23:28:44','qwe','1','0','0'),
('pjc666',65,'2020-10-09 23:28:47','as','1','0','0'),
('pjc666',66,'2020-10-09 23:28:50','sff','1','0','0'),
('pjc666',68,'2020-10-09 23:28:56','zz','1','0','0'),
('pjc666',69,'2020-10-09 23:28:59','xc','1','0','0'),
('pjc666',71,'2020-10-09 23:29:05','vny','1','0','0'),
('pjc666',73,'2020-10-09 23:29:11','147','1','0','0'),
('gcd666',95,'2020-10-11 19:26:38','救命?！！','1','0','0'),
('54188',97,'2020-10-12 11:25:37','123','1','-122.084','37.4219983'),
('54188',98,'2020-10-12 11:26:42','123','1','-122.084','37.4219983'),
('yxd666',99,'2020-10-13 02:30:37','11111111位置','1','118.755352','34.067008'),
('gcd666',101,'2020-10-13 08:21:51','你看的到我吗','1','118.753943','34.067457'),
('gcd666',102,'2020-10-13 08:23:14','??????','1','118.753943','34.067457'),
('gcd666',103,'2020-10-13 08:23:31','?你???你','1','118.753943','34.067457'),
('yxd666',104,'2020-10-13 08:38:09','我发个文章','1','118.754032','34.067369'),
('54188',105,'2020-10-13 09:06:37','俺是郭德热?','1','118.754362','34.067803'),
('123456',109,'2020-10-13 11:16:29','欢迎大家来到Together','1','118.754281','34.067628'),
('123456',110,'2020-10-13 11:19:12','希望大家可以多多支持我们','1','118.754082','34.067592'),
('54188',111,'2020-10-13 11:30:43','嘎嘎嘎嘎嘎嘎嘎','0','118.754362','34.067803'),
('54188',112,'2020-10-13 11:30:51','我要去开飞机✈️','1','118.754362','34.067803'),
('gcd666',115,'2020-10-13 16:43:27','晚上一起吃饭~','1','118.754362','34.067803'),
('gcd666',116,'2020-10-13 18:36:08','我现在在寝室??','1','118.755275','34.067448'),
('gcd666',117,'2020-10-13 18:36:59','123','0','null','null'),
('gcd666',118,'2020-10-13 18:37:03','123','0','null','null'),
('yxd666',119,'2020-10-13 19:36:25','你看看','1','118.754021','34.067684'),
('yxd666',120,'2020-10-13 19:37:35','看吧','1','118.754014','34.067689'),
('gcd666',121,'2020-10-13 20:58:25','123','1','118.754362','34.067803'),
('gcd666',122,'2020-10-13 21:00:52','456','1','118.754362','34.067803'),
('gcd666',123,'2020-10-13 21:01:05','147963','1','118.754362','34.067803');

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `use_id` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '用户id',
  `password` varchar(40) CHARACTER SET utf8 NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 DEFAULT NULL,
  `token` varchar(300) CHARACTER SET utf8 NOT NULL COMMENT 'token',
  `url` varchar(300) CHARACTER SET utf8 NOT NULL DEFAULT 'https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png' COMMENT '头像',
  `gender` varchar(4) CHARACTER SET utf8 NOT NULL DEFAULT '保密' COMMENT '性别',
  `bio` varchar(300) CHARACTER SET utf8mb4 DEFAULT '这个人很懒,什么都没写!',
  `createTime` datetime NOT NULL COMMENT '账号创建时间',
  PRIMARY KEY (`use_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`use_id`,`password`,`name`,`token`,`url`,`gender`,`bio`,`createTime`) values 
('112233','112233','E。T。?','5EtHTvwVfbBpNYKz0pYoCILfforJ8vUVJN1f9hrOxbA=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602398882502.jpg','保密','这个人很?','2020-10-10 19:18:58'),
('1122334','123456','To_NKFA8zmb','x0DWz21lGRX22x4Aje0EP9Dcf/ehQj+0DiaIIyPPWHw=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602398932599.jpg','保密','这个人很懒,什么都没写!','2020-10-11 14:03:28'),
('123123','123456','老王','LhnYrDMHIUNpNYKz0pYoCM63JZ183+xaS4na5P6G1Ic=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1601989599647.jpg','保密','123456789??','2020-10-02 17:38:47'),
('123123123','123123','老王','9dgztkU/eJpjwMKnImxW6ThlXS6NhVbVtQEzfb0vNzE=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-02 17:48:29'),
('123123123123','123123','To_S8DJAdNo','gUnVjOcqyftKRx8lIqzof+KChbbMS22pAAuHwfjekvRzLjpbOhSf9A==@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-03 11:47:03'),
('1231231232312312','123123123123','To_y5MtLv6t','r9whFRtd6kshVq4PSym1tMbgobSTeMiTlNO6EpM5ROGTSl+Mxbnw8Q==@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-03 17:00:51'),
('12344444','4444444','To_bag7bs8J','xeHAOqJUSQXVdM3bheJwS5TTuhKTOUTh/IXZFsxF1/c=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-03 14:56:36'),
('123456','123456','TiAmo','14UM5PhTPeRX3vFzfkLm1IBYOncaAd30pL35iOzDSG4=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602558943224.jpg','保密','人生苦短','2020-10-03 20:41:34'),
('123456789','123456','To_ETLKhTGU','wAyiWYT8yLWedB4hD3kPyjhlXS6NhVbVliyf8Ba52uU=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-10 01:19:33'),
('147369','123789','To_uAAh9F1b','ctswsTXvrHEGIy/f0W2fRPPqrZx2fb60SF0e57HtSlw=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-10 01:38:20'),
('15147258486','123456','To_Qu5vKEL0','SLOKADrAhdf1hRUGPAkFOWBFCCyiFT9kKJNI7PdVYR+fMWWhHRfHCw==@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-03 01:56:17'),
('54188','123456','郭德乐','dYHpGB8Wr0ZdCTvReRl1E8xt7UZjPIW5po6Cu9J7orc=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602564950569.jpg','保密','俺只是个说相声滴2','2020-10-02 21:06:41'),
('5418888','123456','拼夕夕','SxctZnFzgqbJyVA3+Dz3i9Dcf/ehQj+0P4H29Fmsu40=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602268459730.jpg','保密','这个人很懒,什么都没写!','2020-10-10 02:33:35'),
('54zk88','1234556','To_yhRZZbSt','cByUIZ6aVlNGeM7k30o7Ks63JZ183+xawcCPD7KJvmo=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-02 17:33:18'),
('aaaaa','123456','特乐普6','kLsXQ22Ql9ZdCTvReRl1E/awX8pkLedn0/WUvty4wls=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602080201222.jpg','保密','我爱吃炸鸡，不爱戴口罩<<','2020-10-07 22:16:06'),
('admin','admin123','To_ApJyERtR','9d18uwxkwz9dCTvReRl1E5PB6WewC0hSW5OpVGkX5Cw=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-08 09:23:33'),
('build','123456','To_giIyJHTl','5udBqfejZ5ddCTvReRl1E+LXqjunNIE+fhGVai1HRyY=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-08 00:07:29'),
('bulid','123456','To_rMRHMbo1','AppuRbs7vxldCTvReRl1E2WrI+WwzSKOef6Z3tVhbQU=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-07 23:36:46'),
('choudidi','12344444','To_kk2SOsYS','26syRNC/hjhP7WdAWlNNFpTTuhKTOUTha29TMMaO2X8=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-02 17:49:46'),
('fzw666','123456','To_wOTUVlLu','9dPq9ZSdMP5X3vFzfkLm1L6IY6BswkSM5RjxPuS2rRs=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-04 14:08:25'),
('gcd666','123456','yuan123','Zy7o0MhSCQ9X3vFzfkLm1OsAl96PEhflMykvJGx9iv8=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602413115550.jpg','保密','stack no full','2020-10-04 19:47:20'),
('ggb001','666666','To_RaOl4u8h','09JZeHEjMiGq06UEE7fiqWWj6z0OCIabVA1ds/6rdew=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-02 23:19:01'),
('pjc666','123456','CV工程师','YXM/mbrgOm1X3vFzfkLm1L6IY6BswkSMgvIpfM73b+I=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602389115588.jpg','保密','陌上人如玉，公子','2020-10-04 14:08:15'),
('Qqqqq','qqqqq1','To_QbzV3hXV','NIM/k3ZS0pVdCTvReRl1EzjA08N7Gl9Y28pm2V9tRac=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-04 11:40:41'),
('qwert','123456','To_IdLBqE2V','4rHTdDpNQKBdCTvReRl1EzrYPLLBY7rBewgP36LY9/E=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-10 01:30:44'),
('qwerty','qwerty','To_Sd3huYMV','eBCvzbKM+ujwR9Uf+f9P/DfzcOtWRy3lUN6/ejed8v4=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-13 10:36:16'),
('RongKL','Zc2LkL1314','To_4ONKcE7v','ZMeT7/RNiQGRpqroOsBB/3bwsffON04kgzjGhcVwVxs=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-04 12:55:51'),
('SealTalk','123456','To_QNeDrFFr','ETeY5SW+8cVdzotIc6z6i5TTuhKTOUThHu8T3e6kWQI=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-04 12:24:33'),
('yiyiyiyi','1231231231','To_uORfU0bM','jyjELFWa/5XTxXtkOasb45TTuhKTOUThAODhXI6LNV4=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-02 17:50:01'),
('yxd666','123456','袁旭东','QTQR0bRJz9pX3vFzfkLm1L6IY6BswkSMErlzEMt/3d4=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','http://i.mashiro.online/images/1602553773303.jpg','保密','stack no 佛','2020-10-04 14:05:15'),
('zhouke','541888','To_Rsj6ptdT','cwhMDmiK7iE5s+G5JsaW9QqV23FShqe0leXrkuooByI=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-03 00:26:54'),
('zkl666','123456','To_YI3eKg6P','Wo/i9Ecf+E5X3vFzfkLm1GWj6z0OCIabg6MzlKEPIAU=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-02 23:45:42'),
('zxcvb','123456','To_zvNFVYh0','PUAZzH4YsRFdCTvReRl1E2H82T/MZNzxA/xX3kOgmvE=@sziq.cn.rongnav.com;sziq.cn.rongcfg.com','https://i.loli.net/2020/10/01/YmpN4jyE9n3xgPI.png','保密','这个人很懒,什么都没写!','2020-10-10 01:33:05');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
