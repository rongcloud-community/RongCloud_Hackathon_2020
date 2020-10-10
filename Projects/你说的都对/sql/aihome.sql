/*
Navicat MySQL Data Transfer

Source Server         : aihome
Source Server Version : 80013
Source Host           : localhost:3306
Source Database       : aihome

Target Server Type    : MYSQL
Target Server Version : 80013
File Encoding         : 65001

Date: 2020-10-10 20:20:08
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for action_info
-- ----------------------------
DROP TABLE IF EXISTS `action_info`;
CREATE TABLE `action_info` (
  `actionId` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) NOT NULL,
  `actionName` varchar(255) DEFAULT NULL,
  `actionImg` varchar(255) DEFAULT NULL,
  `actionUrl` varchar(255) DEFAULT NULL,
  `actionTime` varchar(255) DEFAULT NULL,
  `actionPoints` varchar(255) DEFAULT NULL,
  `actionSteps` varchar(255) DEFAULT NULL,
  `actionBreak` varchar(255) DEFAULT NULL,
  `actionFeel` varchar(255) DEFAULT NULL,
  `actionError` varchar(255) DEFAULT NULL,
  `actionValid` int(11) DEFAULT '0',
  PRIMARY KEY (`actionId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for circle_content
-- ----------------------------
DROP TABLE IF EXISTS `circle_content`;
CREATE TABLE `circle_content` (
  `conId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(11) NOT NULL COMMENT '用户id',
  `fkId` int(11) DEFAULT NULL COMMENT '父id',
  `fkType` int(1) NOT NULL DEFAULT '0' COMMENT '评论类型，0无父id，1课程id，2父评论id',
  `conTime` varchar(25) DEFAULT NULL,
  `conImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `conCont` varchar(255) DEFAULT NULL,
  `conGood` int(11) NOT NULL DEFAULT '0',
  `conContNum` int(11) NOT NULL DEFAULT '0',
  `conValid` int(1) NOT NULL DEFAULT '0' COMMENT '0为有效，1为违法',
  PRIMARY KEY (`conId`),
  KEY `circle_content_ibfk_1` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for class_info
-- ----------------------------
DROP TABLE IF EXISTS `class_info`;
CREATE TABLE `class_info` (
  `classId` int(11) NOT NULL AUTO_INCREMENT,
  `className` varchar(255) NOT NULL,
  `classImg` varchar(255) NOT NULL,
  `classUrl` varchar(255) NOT NULL,
  `classFatB` varchar(25) NOT NULL,
  `classTime` varchar(25) DEFAULT NULL,
  `classLevel` varchar(25) DEFAULT NULL,
  `createTime` varchar(25) DEFAULT NULL,
  `classPeriod` varchar(25) DEFAULT NULL,
  `classValid` int(1) NOT NULL DEFAULT '0',
  `classTitle` varchar(255) DEFAULT NULL,
  `classLabel` varchar(255) DEFAULT NULL,
  `classIntro` varchar(255) DEFAULT NULL,
  `classType` varchar(255) DEFAULT NULL,
  `classIntended` varchar(255) DEFAULT NULL,
  `classTaboo` varchar(255) DEFAULT NULL,
  `classReady` varchar(255) DEFAULT NULL,
  `classBodyreac` varchar(255) DEFAULT NULL,
  `classSug` varchar(255) DEFAULT NULL,
  `classTrainnumber` int(11) DEFAULT '0',
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for fitness_record
-- ----------------------------
DROP TABLE IF EXISTS `fitness_record`;
CREATE TABLE `fitness_record` (
  `frId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(11) NOT NULL,
  `recordTime` varchar(25) DEFAULT '',
  `fitnessTime` int(11) DEFAULT '0' COMMENT '运动时长(second)',
  `cumFatB` int(11) unsigned zerofill DEFAULT '00000000000' COMMENT '当次运动消耗',
  `fkId` int(11) NOT NULL,
  `fkType` int(1) NOT NULL DEFAULT '0' COMMENT '0为课程，1为动作',
  `score` double(11,2) DEFAULT '0.00',
  PRIMARY KEY (`frId`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for food_ku
-- ----------------------------
DROP TABLE IF EXISTS `food_ku`;
CREATE TABLE `food_ku` (
  `foodId` int(11) NOT NULL AUTO_INCREMENT,
  `hotelId` int(8) NOT NULL,
  `foodName` varchar(25) NOT NULL,
  `foodType` varchar(25) DEFAULT NULL,
  `foodCacul` varchar(25) DEFAULT NULL,
  `foodContent` varchar(25) DEFAULT NULL,
  `foodFatB` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`foodId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for hotel_info
-- ----------------------------
DROP TABLE IF EXISTS `hotel_info`;
CREATE TABLE `hotel_info` (
  `hotelId` int(8) NOT NULL,
  `hotelName` varchar(25) DEFAULT NULL,
  `hotelNotice` varchar(255) DEFAULT NULL,
  `hotelLocation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`hotelId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for label_type
-- ----------------------------
DROP TABLE IF EXISTS `label_type`;
CREATE TABLE `label_type` (
  `typeId` int(11) NOT NULL AUTO_INCREMENT,
  `typeName` varchar(25) NOT NULL,
  `typeCount` int(11) DEFAULT '0' COMMENT '记录选择类型的人数',
  `isValid` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`typeId`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for meal_info
-- ----------------------------
DROP TABLE IF EXISTS `meal_info`;
CREATE TABLE `meal_info` (
  `mealId` int(11) NOT NULL AUTO_INCREMENT,
  `stapleId` int(11) NOT NULL COMMENT '主食',
  `MEMId` int(11) NOT NULL COMMENT '肉蛋奶',
  `VFId` int(11) NOT NULL COMMENT '蔬果',
  `GreaseId` int(11) NOT NULL COMMENT '油脂',
  `OtherId` int(11) DEFAULT NULL COMMENT '其他',
  `hotelId` int(8) NOT NULL,
  `mealType` int(1) NOT NULL DEFAULT '0' COMMENT '0-早餐，1-午餐，2-晚餐',
  PRIMARY KEY (`mealId`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_enroll
-- ----------------------------
DROP TABLE IF EXISTS `user_enroll`;
CREATE TABLE `user_enroll` (
  `userId` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `passWord` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userName` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '',
  `userImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `hotelId` int(8) DEFAULT NULL,
  `userType` int(1) NOT NULL,
  `loginTime` varchar(25) DEFAULT NULL,
  `enrollTime` varchar(25) DEFAULT NULL,
  `enableInfoco` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userId`),
  KEY `userId` (`userId`,`userName`),
  KEY `userId_2` (`userId`),
  KEY `userId_3` (`userId`,`userName`,`userImg`),
  KEY `userName` (`userName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_follow
-- ----------------------------
DROP TABLE IF EXISTS `user_follow`;
CREATE TABLE `user_follow` (
  `followId` int(11) NOT NULL AUTO_INCREMENT,
  `fuserId` varchar(11) NOT NULL,
  `fuseredId` varchar(11) NOT NULL,
  `followTime` varchar(25) DEFAULT NULL,
  `followValid` int(1) NOT NULL DEFAULT '0' COMMENT '0为有效，1为违法',
  PRIMARY KEY (`followId`),
  KEY `fuserId` (`fuserId`),
  KEY `fuseredId` (`fuseredId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_good
-- ----------------------------
DROP TABLE IF EXISTS `user_good`;
CREATE TABLE `user_good` (
  `goodId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(11) NOT NULL,
  `conId` int(11) NOT NULL,
  `goodTime` varchar(25) DEFAULT NULL,
  `goodValid` int(1) NOT NULL DEFAULT '0' COMMENT '0为有效，1为违法',
  PRIMARY KEY (`goodId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `infoId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(11) NOT NULL,
  `sex` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '',
  `age` varchar(25) DEFAULT NULL,
  `height` double(11,2) DEFAULT '0.00' COMMENT 'cm',
  `weight` double(11,2) DEFAULT '0.00' COMMENT 'kg',
  `bust` double(11,2) DEFAULT '0.00' COMMENT 'cm',
  `waist` double(11,2) DEFAULT '0.00' COMMENT 'cm',
  `hipline` double(11,2) DEFAULT '0.00' COMMENT '臀围cm',
  `BMI` double(11,2) DEFAULT '0.00',
  `RHR` int(11) DEFAULT '0' COMMENT '每分钟心跳次数',
  `MHR` int(11) DEFAULT '0' COMMENT '每分钟最大心跳次数',
  `modifyTime` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0',
  `trainDay` int(11) DEFAULT '0',
  `todayIsTrain` int(1) DEFAULT '0',
  PRIMARY KEY (`infoId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_label
-- ----------------------------
DROP TABLE IF EXISTS `user_label`;
CREATE TABLE `user_label` (
  `ulId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(11) NOT NULL,
  `typeId` int(11) NOT NULL,
  `typeName` varchar(25) NOT NULL,
  PRIMARY KEY (`ulId`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Table structure for user_plan
-- ----------------------------
DROP TABLE IF EXISTS `user_plan`;
CREATE TABLE `user_plan` (
  `planId` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(11) NOT NULL,
  `classId` int(11) NOT NULL,
  `comTime` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT '0' COMMENT '用户已经完成的课时',
  `todayComplete` int(1) NOT NULL DEFAULT '0' COMMENT '该课程今日是否完成',
  `isComplete` int(1) NOT NULL DEFAULT '0' COMMENT '是否完成整个课时',
  `subTime` varchar(25) NOT NULL COMMENT '用户订阅课程时间',
  `todayTime` varchar(25) DEFAULT NULL COMMENT '今日完成时间（每日更新',
  `totalFatB` int(25) DEFAULT '0',
  PRIMARY KEY (`planId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Event structure for updateUserInfo
-- ----------------------------
DROP EVENT IF EXISTS `updateUserInfo`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` EVENT `updateUserInfo` ON SCHEDULE EVERY 1 DAY STARTS '2020-04-12 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE user_info SET todayIsTrain = 0
;;
DELIMITER ;

-- ----------------------------
-- Event structure for updateUserPlan
-- ----------------------------
DROP EVENT IF EXISTS `updateUserPlan`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` EVENT `updateUserPlan` ON SCHEDULE EVERY 1 DAY STARTS '2020-04-12 00:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE user_plan SET todayComplete = 0 , todayTime = NULL WHERE isComplete = 0
;;
DELIMITER ;
