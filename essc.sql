/*
Navicat MySQL Data Transfer

Source Server         : mb
Source Server Version : 50644
Source Host           : localhost:3306
Source Database       : essc

Target Server Type    : MYSQL
Target Server Version : 50644
File Encoding         : 65001

Date: 2020-06-13 14:25:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for augment
-- ----------------------------
DROP TABLE IF EXISTS `augment`;
CREATE TABLE `augment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` int(11) NOT NULL,
  `userzhanghu` varchar(11) NOT NULL,
  `time` datetime NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `goodsys` (`goodsid`),
  KEY `userys` (`userzhanghu`),
  CONSTRAINT `goodsys` FOREIGN KEY (`goodsid`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userys` FOREIGN KEY (`userzhanghu`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of augment
-- ----------------------------
INSERT INTO `augment` VALUES ('1', '2', '123456', '2020-06-07 09:53:35', '手机就是好用');
INSERT INTO `augment` VALUES ('2', '2', '123456', '2020-06-02 10:22:08', '哎哟不错哟');
INSERT INTO `augment` VALUES ('3', '2', '123456', '2020-06-08 10:31:07', '好看');
INSERT INTO `augment` VALUES ('6', '2', '123456', '2020-06-07 14:28:15', '看起来不错啊');
INSERT INTO `augment` VALUES ('7', '2', '123456', '2020-06-07 14:35:05', 'ok');
INSERT INTO `augment` VALUES ('8', '2', '123456', '2020-06-07 14:45:20', '还行');
INSERT INTO `augment` VALUES ('9', '2', '123456', '2020-06-07 14:45:34', '还会再买');
INSERT INTO `augment` VALUES ('10', '2', '123456', '2020-06-07 14:47:01', '再来一个');
INSERT INTO `augment` VALUES ('11', '2', '123456', '2020-06-07 14:47:18', '颜色好看');
INSERT INTO `augment` VALUES ('12', '2', '123456', '2020-06-07 14:47:49', '屏幕大');
INSERT INTO `augment` VALUES ('13', '2', '123456', '2020-06-07 14:48:21', '运行快');
INSERT INTO `augment` VALUES ('14', '2', '123456', '2020-06-07 14:57:01', 'nice');
INSERT INTO `augment` VALUES ('15', '2', '123456', '2020-06-09 20:22:11', '12');
INSERT INTO `augment` VALUES ('16', '1', '1234567', '2020-06-13 10:46:34', '好用');
INSERT INTO `augment` VALUES ('17', '2', '1234567', '2020-06-13 10:53:25', '还不错');

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userzhanghu` varchar(11) NOT NULL,
  `goodsid` int(11) NOT NULL,
  `count` int(11) NOT NULL,
  `cselect` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cuserys` (`userzhanghu`),
  KEY `cgoodsys` (`goodsid`),
  CONSTRAINT `cgoodsys` FOREIGN KEY (`goodsid`) REFERENCES `goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cuserys` FOREIGN KEY (`userzhanghu`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of car
-- ----------------------------
INSERT INTO `car` VALUES ('21', '123456', '10', '2', '否');
INSERT INTO `car` VALUES ('23', '123456', '8', '2', '是');
INSERT INTO `car` VALUES ('24', '123456', '2', '1', '是');
INSERT INTO `car` VALUES ('25', '1234567', '1', '1', '是');

-- ----------------------------
-- Table structure for dingdan
-- ----------------------------
DROP TABLE IF EXISTS `dingdan`;
CREATE TABLE `dingdan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userzhanghu` varchar(11) NOT NULL,
  `goodsids` varchar(255) NOT NULL,
  `counts` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `duserys` (`userzhanghu`),
  CONSTRAINT `duserys` FOREIGN KEY (`userzhanghu`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of dingdan
-- ----------------------------
INSERT INTO `dingdan` VALUES ('6', '123456', '2', '2', '2198.00', '已付款');
INSERT INTO `dingdan` VALUES ('8', '123456', '3,8', '3,1', '3166.00', '已付款');
INSERT INTO `dingdan` VALUES ('9', '123456', '2,5', '1,1', '3798.00', '未付款');
INSERT INTO `dingdan` VALUES ('11', '123456', '7', '2', '2198.00', '未付款');
INSERT INTO `dingdan` VALUES ('12', '123456', '2', '1', '1099.00', '已付款');
INSERT INTO `dingdan` VALUES ('27', '123456', '1', '1', '666.00', '已付款');
INSERT INTO `dingdan` VALUES ('28', '123456', '7', '1', '1099.00', '已付款');
INSERT INTO `dingdan` VALUES ('29', '123456', '7', '1', '1099.00', '已付款');
INSERT INTO `dingdan` VALUES ('30', '1234567', '1', '2', '1332.00', '未付款');
INSERT INTO `dingdan` VALUES ('31', '1234567', '7', '1', '1099.00', '已付款');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `discription` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `nowprice` decimal(10,2) NOT NULL,
  `images` varchar(400) NOT NULL,
  `userzhanghu` varchar(11) NOT NULL,
  `number` int(11) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `user` (`userzhanghu`),
  CONSTRAINT `user` FOREIGN KEY (`userzhanghu`) REFERENCES `users` (`zhanghu`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '5G手机', '最新5G手机', '999.00', '666.00', '/public/goodsimage/1.jpg', '123456', '160', '出售');
INSERT INTO `goods` VALUES ('2', '5G手机', '最新5G手机', '1500.00', '1099.00', '/public/goodsimage/2.jpg;/public/goodsimage/3.jpg', '123456', '200', '出售');
INSERT INTO `goods` VALUES ('3', '5G手机', '最新5G手机', '2000.00', '899.00', '/public/goodsimage/3.jpg', '123456', '95', '出售');
INSERT INTO `goods` VALUES ('4', '5G手机新款', '最新5G手机', '3000.00', '1999.00', '/public/goodsimage/4.jpg', '123456', '142', '精选');
INSERT INTO `goods` VALUES ('5', '沙发', '真皮沙发', '4000.00', '2699.00', '/public/goodsimage/5.jpg', '123456', '19', '出售');
INSERT INTO `goods` VALUES ('6', '饭桌', '实木饭桌', '1600.00', '999.00', '/public/goodsimage/6.jpg', '123456', '15', '出售');
INSERT INTO `goods` VALUES ('7', '柜子', '超大酒柜', '1999.00', '1099.00', '/public/goodsimage/7.jpg', '123456', '7', '精选');
INSERT INTO `goods` VALUES ('8', '玩具', '机器小狗玩具', '200.00', '169.00', '/public/goodsimage/8.jpg', '123456', '19', '精选');
INSERT INTO `goods` VALUES ('9', '玩具', '玩具赛车', '150.00', '139.00', '/public/goodsimage/9.jpg', '123456', '134', '精选');
INSERT INTO `goods` VALUES ('10', '玩具', '益智积木', '300.00', '199.00', '/public/goodsimage/10.jpg', '123456', '50', '热卖');

-- ----------------------------
-- Table structure for lunbo
-- ----------------------------
DROP TABLE IF EXISTS `lunbo`;
CREATE TABLE `lunbo` (
  `inid` int(11) NOT NULL AUTO_INCREMENT,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `discription` varchar(255) DEFAULT NULL,
  `status` varchar(10) NOT NULL,
  `pingtai` varchar(10) NOT NULL,
  PRIMARY KEY (`inid`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of lunbo
-- ----------------------------
INSERT INTO `lunbo` VALUES ('1', '/public/static/image/phone.jpg', '手机', '去购买5G手机', '展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('2', '/public/static/image/jiadian.jpg', '家电', '去购买家电', '展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('3', '/public/static/image/jiaju.jpg', '家具', '去购买家具', '展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('4', '/public/static/image/shoushi.jpg', '首饰', '去购买首饰', '展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('5', '/public/static/image/wanju.jpg', '玩具', '去购买玩具', '展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('6', '/public/static/image/logo.jpg', '图标', '商城图标', '不展示', 'pc,phone');
INSERT INTO `lunbo` VALUES ('8', '/public/static/image/ydphone.jpg', '手机', '去购买5G手机', '不展示', 'phone');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `zhanghu` varchar(11) NOT NULL,
  `mima` varchar(255) NOT NULL,
  `name` varchar(7) NOT NULL,
  `sex` varchar(2) NOT NULL DEFAULT '',
  `birthday` date DEFAULT NULL,
  `touxiang` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`zhanghu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('123456', '$2a$10$avJpn7JMVNCBm7mHxHiMluy1nU7QdOEo3rUaa9GN66kCA6IYQ4zHG', '张三', '女', '1998-01-04', '/public/image/upload_c4086e5599910730ee58037e9dcdeabb.jpg');
INSERT INTO `users` VALUES ('1234567', '$2a$10$avJpn7JMVNCBm7mHxHiMluy1nU7QdOEo3rUaa9GN66kCA6IYQ4zHG', '李四', '男', '0000-00-00', '/public/image/upload_8268d35451ea49d3f597b199ada965b9.png');
