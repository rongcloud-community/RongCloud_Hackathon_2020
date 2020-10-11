/*
Navicat MariaDB Data Transfer

Source Server         : localhost
Source Server Version : 100408
Source Host           : localhost:3310
Source Database       : pyblind

Target Server Type    : MariaDB
Target Server Version : 100408
File Encoding         : 65001

Date: 2020-10-11 13:29:35
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `commentid` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `id` bigint(20) DEFAULT NULL,
  `sendid` bigint(20) DEFAULT NULL,
  `cotime` datetime DEFAULT NULL,
  PRIMARY KEY (`commentid`),
  KEY `user1` (`id`),
  KEY `send` (`sendid`),
  CONSTRAINT `send` FOREIGN KEY (`sendid`) REFERENCES `send` (`sendid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user1` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of comment
-- ----------------------------
INSERT INTO `comment` VALUES ('1', '评论挖', '2', '2', '2020-04-15 14:15:18');
INSERT INTO `comment` VALUES ('2', '评论测试', '3', '1', '2020-04-08 14:15:32');
INSERT INTO `comment` VALUES ('3', 'sadas', '1', '2', '2020-04-10 19:44:03');
INSERT INTO `comment` VALUES ('4', '测试', '2', '1', '2020-04-16 19:04:03');
INSERT INTO `comment` VALUES ('5', '测试一下', '2', '2', '2020-04-16 19:08:45');
INSERT INTO `comment` VALUES ('6', '这是一个评论的测试\r\n', '1', '10', '2020-05-10 15:33:06');
INSERT INTO `comment` VALUES ('7', '测试评论', '1', '11', '2020-05-11 11:09:06');

-- ----------------------------
-- Table structure for equipment
-- ----------------------------
DROP TABLE IF EXISTS `equipment`;
CREATE TABLE `equipment` (
  `eid` varchar(255) NOT NULL,
  `ename` varchar(255) NOT NULL DEFAULT '',
  `bindingTime` varchar(255) DEFAULT '',
  `state` int(11) DEFAULT NULL,
  PRIMARY KEY (`eid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of equipment
-- ----------------------------
INSERT INTO `equipment` VALUES ('0566328XG016PM', '6L4S', '2020-03-31 16:51:34', '1');
INSERT INTO `equipment` VALUES ('0826387XF716KG', 'TN-BL 00762X', '2020-03-20 17:26:51', '1');
INSERT INTO `equipment` VALUES ('1566387XF716LS', 'LB123', '2020-03-14 16:50:33', '1');

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `fid` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `time` varchar(255) DEFAULT '',
  `id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`fid`),
  KEY `id` (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES ('1', '反馈测试', '恶趣味群无', null, '2020-04-30 15:35:54', '1');

-- ----------------------------
-- Table structure for focus
-- ----------------------------
DROP TABLE IF EXISTS `focus`;
CREATE TABLE `focus` (
  `focusid` bigint(20) NOT NULL AUTO_INCREMENT,
  `user1` bigint(20) DEFAULT NULL,
  `user2` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`focusid`),
  KEY `userone` (`user1`),
  KEY `usertwo` (`user2`),
  CONSTRAINT `userone` FOREIGN KEY (`user1`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `usertwo` FOREIGN KEY (`user2`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of focus
-- ----------------------------
INSERT INTO `focus` VALUES ('1', '1', '2');
INSERT INTO `focus` VALUES ('2', '1', '3');
INSERT INTO `focus` VALUES ('4', '3', '2');
INSERT INTO `focus` VALUES ('8', '4', '1');

-- ----------------------------
-- Table structure for send
-- ----------------------------
DROP TABLE IF EXISTS `send`;
CREATE TABLE `send` (
  `sendid` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT '',
  `content` varchar(21000) DEFAULT '',
  `state` int(255) DEFAULT NULL,
  `id` bigint(20) DEFAULT NULL,
  `sendtime` varchar(255) DEFAULT '',
  PRIMARY KEY (`sendid`),
  KEY `user` (`id`),
  CONSTRAINT `user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of send
-- ----------------------------
INSERT INTO `send` VALUES ('1', '标题1', '进入21世纪后，中国社会老龄化问题逐渐出现，当代社会中存在视觉障碍的弱势群体占比也逐年增高，单老年人口与残障人士两个弱势群体，总人数就已经超过3.4亿，为了应对这种状况，政府也在17年提出了《中国国别战略计划》，提出了帮扶社会弱势群体的要求。同时，从第二次全国残疾人抽样调查得知，我国目前有1223万单项视力残疾人，多重残疾中有视力残疾的有458万，视力残疾群体一共有1691万人。在全盲人群中，只有10％的人能够独立搭乘公共交通工具，绝大多数需要其他人的引导和协助。 由于视觉的缺失，视觉障碍者在日常生活和出行中往往会遇到很多无法提前预知的困难。道路中盲道中断或是被占用，前方有移动的障碍物出现，过马路时红绿灯的变化需要视觉分辨，在陌生的路段难以辨别方向等，都是造成盲人单独出行困难的原因。同时，在进行正常活动时，他们比常人更容易受到各种意外的伤害，并且，由于这类群体自身独立生活能力的相对较弱，在生活中常常需要其他家庭成员的照顾，这也为其家人带来了更多的压力，在某些特殊情况下不得不独自出行时，其亲友很难及时获得他门的实时状况和动向，确保他们的安全。', '1', '2', '2020-04-30 16:55:39');
INSERT INTO `send` VALUES ('2', '标题2', '内容2', '1', '2', '2020-04-01 16:55:58');
INSERT INTO `send` VALUES ('3', '标题3', '内容3', '1', '3', '2020-03-20 16:56:16');
INSERT INTO `send` VALUES ('4', 'bibi', 'bjgkgkgugjkgjkghgygyghfgf', '1', '1', '2020-03-220 16:56:16');
INSERT INTO `send` VALUES ('5', '测试发表', '发表一个试试', '1', '2', '2020-04-14 16:28:08');
INSERT INTO `send` VALUES ('6', '发表测试0419', '发表测试一下', '1', '1', '2020-04-19 14:26:32');
INSERT INTO `send` VALUES ('7', '测试刷新', '刷新刷新', '1', '3', '2020-04-19 14:30:32');
INSERT INTO `send` VALUES ('8', '测试', '发表测试', '1', '4', '2020-04-28 16:53:09');
INSERT INTO `send` VALUES ('9', '123', '大萨达所', null, '4', '2020-04-30 15:33:37');
INSERT INTO `send` VALUES ('10', '这是一个发表的测试', '测试一下', '1', '1', '2020-05-10 15:32:53');
INSERT INTO `send` VALUES ('11', '代码检查发表', '123456', '1', '1', '2020-05-11 11:08:56');

-- ----------------------------
-- Table structure for travel
-- ----------------------------
DROP TABLE IF EXISTS `travel`;
CREATE TABLE `travel` (
  `tid` bigint(20) NOT NULL AUTO_INCREMENT,
  `origin` varchar(255) DEFAULT NULL,
  `terminal` varchar(255) DEFAULT NULL,
  `startTime` varchar(255) DEFAULT '',
  `finishTime` varchar(255) DEFAULT '',
  `distance` double DEFAULT NULL,
  `eid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`tid`),
  KEY `eid2` (`eid`),
  CONSTRAINT `eid2` FOREIGN KEY (`eid`) REFERENCES `equipment` (`eid`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of travel
-- ----------------------------
INSERT INTO `travel` VALUES ('1', '出发地1', '目的地1', '2020-02-05 17:25:57', '2020-02-01 18:26:03', '300', '0826387XF716KG');
INSERT INTO `travel` VALUES ('2', '出发地2', '目的地2', '2020-03-19 17:40:23', '2020-03-26 17:40:27', '3500', '0826387XF716KG');
INSERT INTO `travel` VALUES ('3', '出发地3', '目的地3', '2020-03-25 17:41:13', '2020-03-26 18:41:17', '1564', '0826387XF716KG');

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `typeid` int(20) NOT NULL AUTO_INCREMENT,
  `tname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`typeid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of type
-- ----------------------------
INSERT INTO `type` VALUES ('1', '红绿灯');
INSERT INTO `type` VALUES ('2', '台阶');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `tel` varchar(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL DEFAULT '',
  `wechat` varchar(255) DEFAULT NULL,
  `qq` varchar(255) DEFAULT NULL,
  `ddescribe` varchar(255) DEFAULT '',
  `head` varchar(255) DEFAULT NULL,
  `eid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `eid` (`eid`),
  CONSTRAINT `eid` FOREIGN KEY (`eid`) REFERENCES `equipment` (`eid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '昵称', '123456', '7c4a8d09ca3762af61e59520943dc26494f8941b', '123456', '123456', '介绍', '17.jpg', '0826387XF716KG');
INSERT INTO `user` VALUES ('2', 'name2', 'tel2', '7c4a8d09ca3762af61e59520943dc26494f8941b', '123456789', 'qq', 'degg', '02.jpg', '1566387XF716LS');
INSERT INTO `user` VALUES ('3', 'name3', 'tel3', '7c4a8d09ca3762af61e59520943dc26494f8941b', '12345689', 'qq', '45646', '10.jpg', '0566328XG016PM');
INSERT INTO `user` VALUES ('4', 'name4', 'tel4', '7c4a8d09ca3762af61e59520943dc26494f8941b', '156487', 'qq', '154', '22.jpg', null);
INSERT INTO `user` VALUES ('5', 'admin', null, '7c4a8d09ca3762af61e59520943dc26494f8941b', null, null, '', 'normal.jpg', null);
INSERT INTO `user` VALUES ('6', '注册测试', null, '7c4a8d09ca3762af61e59520943dc26494f8941b', null, null, '', 'normal.jpg', null);
INSERT INTO `user` VALUES ('8', 'test', null, '7c4a8d09ca3762af61e59520943dc26494f8941b', null, null, '', 'normal.jpg', null);
INSERT INTO `user` VALUES ('9', '加密测试', null, '7c4a8d09ca3762af61e59520943dc26494f8941b', null, null, '', 'normal.jpg', null);
INSERT INTO `user` VALUES ('10', '代码检测', null, '7c4a8d09ca3762af61e59520943dc26494f8941b', null, null, '', 'normal.jpg', null);

-- ----------------------------
-- Table structure for vital
-- ----------------------------
DROP TABLE IF EXISTS `vital`;
CREATE TABLE `vital` (
  `vid` bigint(20) NOT NULL AUTO_INCREMENT,
  `vtime` varchar(255) DEFAULT '',
  `place` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `typeid` int(11) DEFAULT NULL,
  `eid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`vid`),
  KEY `eid1` (`eid`),
  KEY `typeid` (`typeid`),
  CONSTRAINT `eid1` FOREIGN KEY (`eid`) REFERENCES `equipment` (`eid`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `typeid` FOREIGN KEY (`typeid`) REFERENCES `type` (`typeid`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vital
-- ----------------------------
INSERT INTO `vital` VALUES ('1', '2020-02-05 17:25:57', '一号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('2', '2020-02-15 17:25:57', '二号台阶', '台阶', '2', '0826387XF716KG');
INSERT INTO `vital` VALUES ('3', '2020-02-07 17:25:57', '三号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('4', '2020-02-05 17:25:57', '麓山南路', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('5', '2020-02-05 17:25:57', '麓山南路', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('6', '2020-02-05 17:25:57', '四号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('7', '2020-02-05 17:25:57', '危险的路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('8', '2020-02-05 17:25:57', '四号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('9', '2020-02-05 17:25:57', '麓山南路', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('10', '2020-02-05 17:25:57', '四号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('11', '2020-02-05 17:25:57', '四号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('12', '2020-02-05 17:25:57', '麓山南路', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('13', '2020-02-05 17:25:57', '四号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('14', '2020-02-05 17:25:57', '四号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('15', '2020-02-05 17:25:57', '危险的路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('16', '2020-02-05 17:25:57', '四号十字路口', '红绿灯', '1', '0826387XF716KG');
INSERT INTO `vital` VALUES ('17', '2020-02-05 17:25:57', '四号十字路口', '红绿灯', '1', '0826387XF716KG');
