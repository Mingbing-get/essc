//导入第三方模块
const express = require("express");
const bcrypt = require("bcryptjs");
const formidable = require("formidable");

//导入自己的模块
const db = require("./db.js");
const readFile = require("./readfile.js");

const router = express.Router();

//设置开放文件夹的路径
const dir = 'H:\\visual studio code\\服务器\\二手商城';
//给出加密种子
const salt = '$2a$10$avJpn7JMVNCBm7mHxHiMlu';
router.get('/', function (req, res) {
    readFile.readfile(dir+'/public/index.html')
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.send('找不到页面!');
        });
});

router.all('/public/*', function (req, res) {
    readFile.readfile(dir+req.url)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.send('找不到页面!');
        });
});

//判断是否登录
router.get('/isdenglu', function (req, res) {
    var resm = {status:0};
    if (req.session.user){
        resm.status = 1;
        resm.user = req.session.user;
    }
    res.send(JSON.stringify(resm));
});

//处理退出登录
router.get('/tuichu', function (req, res) {
    req.session.user = null;
    res.redirect('/public/index.html');
});

//数据接口
router.get('/api/qureyuser',function (req, res) {
    db.querydb('select * from users')
        .then(function (result) {
            res.send(JSON.stringify(result));
        })
        .catch(function (err) {
            console.log(err.sqlMessage);
        });
});
//处理注册
router.post('/api/adduser',function (req, res) {
    var xinxi = req.body;
    var resm = {status:0,message:''};//定义返回的数据
    //数据校验
    if (xinxi.zhanghu == '' || xinxi.mima == '' || xinxi.name == '' || xinxi.sex == ''){
        resm.message = '请输入完整的信息!';
        return res.send(resm);
    }
    if (xinxi.zhanghu.length > 11){
        resm.message = '账户不得超过11位!';
        return res.send(resm);
    }
    if (xinxi.mima.length > 20){
        resm.message = '密码不得超过20位!';
        return res.send(resm);
    }
    if (xinxi.name.length > 7){
        resm.message = '姓名不得超过7位!';
        return res.send(resm);
    }
    //校验成功则将数据添加到数据库
    xinxi.birthday = null;
    xinxi.touxiang = null;
    xinxi.mima = bcrypt.hashSync(xinxi.mima,salt);//对密码加密
    db.updatedb('insert into users set ?', xinxi)
        .then(function (result) {
            if (result.affectedRows == 1){
                resm.status = 1;
                resm.message = '注册成功!';
                res.send(JSON.stringify(resm));
            }
            else {
                resm.status = 0;
                resm.message = '注册失败!';
                res.send(JSON.stringify(resm));
            }
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '注册失败!';
            res.send(JSON.stringify(resm));
        });
});
//处理登录
router.post('/api/denglu',function (req, res) {
    var resm = {status:0,message:''};
    if (req.body.zhanghu == '' || req.body.mima == ''){
        resm.message = '账户和密码不能为空!';
        return res.send(JSON.stringify(resm));
    }
    db.querydb('select * from users where zhanghu='+req.body.zhanghu)
        .then(function (result) {
            if (result.length != 0 && result[0].mima == bcrypt.hashSync(req.body.mima,salt)){
                resm.message = '登录成功!';
                resm.status = 1;
                req.session.user = result[0];
                res.send(JSON.stringify(resm));
            }
            else {
                resm.message = '账户或密码错误!';
                res.send(JSON.stringify(resm));
            }
        })
        .catch(function (err) {
            console.log(err);
            resm.message = '登录失败!';
            res.send(JSON.stringify(resm));
        });
});
//处理头像
router.post('/api/touxiang',function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./public/image";
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 20 * 1024 * 1024;
    //处理图片
    form.parse(req, function (err, fields, files) {
        var resm = {status:1,message:'上传图片成功!',path:''};
        if (err){
            resm.status = 0;
            resm.message = '上传图片失败!';
            return res.send(JSON.stringify(resm));
        }
        //console.log(files.touxiang.path);
        resm.path = files.touxiang.path;
        res.send(JSON.stringify(resm));
    });
});
//处理用户信息修改
router.post('/api/updateuser',function (req, res) {
    var resm = {status:0,message:''};//定义返回的数据
    //验证数据的正确性
    if (req.body.zhanghu == '' || req.body.name == '' || req.body.sex == ''){
        resm.message = '请输入完整的信息!';
        return res.send(resm);
    }
    if (req.body.zhanghu.length > 11){
        resm.message = '账户不得超过11位!';
        return res.send(resm);
    }
    if (req.body.name.length > 7){
        resm.message = '姓名不得超过7位!';
        return res.send(resm);
    }
    if (req.body.mima.length > 20){
        resm.message = '密码不得超过20位!';
        return res.send(resm);
    }
    //处理数据
    var sql = 'update users set ';
    var post = [];
    for (var key in req.body){
        if (key == 'zhanghu')
            continue;
        if (key == 'mima'){
            if (req.body[key] && req.body[key] != ''){
                sql = sql+key+'=? ,';
                req.body[key] = bcrypt.hashSync(req.body.mima,salt);
                post.push(req.body[key]);
            }
        }
        else {
            sql = sql+' '+key+'=? ,';
            post.push(req.body[key]);
        }
    }
    sql = sql.substring(0,sql.length-2);//去掉多余的逗号和空格
    sql = sql+' where zhanghu=?';
    post.push(req.body.zhanghu);
    //将处理好的数据存起来
    db.updatedb(sql,post)
        .then(function (result) {
            if (result.affectedRows == 1){
                //修改session中的数据为最新数据
                for (var key in req.body){
                    if (key == 'mima'){
                        if (req.body[key] && req.body[key] != ''){
                            req.session.user[key] = req.body[key];
                        }
                    }
                    else {
                        req.session.user[key] = req.body[key];
                    }
                }
                resm.status = 1;
                resm.message = '修改成功!';
                res.send(resm);
            }
            else {
                resm.message = '修改失败!';
                res.send(resm);
            }
        })
        .catch(function (err) {
            resm.message = '修改失败!';
            res.send(resm);
        });
});

//获取轮播图数据
router.get('/api/lunbo',function (req, res) {
    var resm = {status:1,message:'查找成功!',images:{}};
   db.querydb("select * from lunbo where status='展示'")
       .then(function (data) {
           resm.images = data;
           res.send(resm);
       })
       .catch(function (err) {
           resm.status = 0;
           resm.message = '查找失败!';
           res.send(resm);
       });
});

//获取首页商品数据
router.get('/api/indexdata',function (req, res) {
    var resm = {status:1,message:'查找成功!',data:[]};
   db.querydb("select * from goods where status in ('特价','热卖','精选')")
       .then(function (result) {
            resm.data = result;
            res.send(resm);
       })
       .catch(function (err) {
           resm.status = 0;
           resm.message = '查找失败!';
           res.send(resm);
       });
});
//获取搜索页面商品数据
router.get('/api/serch',function (req, res) {
    var resm = {status:1,message:'查找成功!',data:[]};
    db.querydb("select * from goods where title like '%"+req.query.serch+"%'")
        .then(function (result) {
            resm.data = result;
            res.send(resm);
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '查找失败!';
            res.send(resm);
        });
});
//获得单个商品数据
router.get('/api/xqgoods',function (req, res) {
    var resm = {status:1,message:'查找成功!',data:{}};
    db.querydb("select * from goods where id = "+req.query.id)
        .then(function (result) {
            resm.data = result[0];
            res.send(resm);
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '查找失败!';
            res.send(resm);
        });
});
//获取多个指定商品的数据
router.get('/api/zdgoods',function (req, res) {
    var resm = {status:1,message:'查找成功!',data:[]};
    db.querydb("select id,title,nowprice,images from goods where id in "+req.query.ids)
        .then(function (result) {
            resm.data = result;
            res.send(resm);
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '查找失败!';
            res.send(resm);
        });
});
//获得评论的数据
router.get('/api/augment',function (req, res) {
   var geshu = 10;
   var start = parseInt((req.query.yeshu-1))*geshu+parseInt(req.query.pianyi);
   var resm = {status:1,message:'查找成功!',data:{}};
   db.querydb('SELECT augment.*, users.`name`, users.touxiang FROM augment,users WHERE augment.userzhanghu = ' +
       'users.zhanghu and augment.goodsid = '+req.query.goodsid+' ORDER BY augment.time desc LIMIT '+start+','+geshu)
       .then(function (result) {
            resm.data = result;
            res.send(resm);
       })
       .catch(function (err) {
           resm.status = 0;
           resm.message = '查找失败!';
           res.send(resm);
       });
});
//保存评论数据
router.post('/api/savesugment', function (req, res) {
    var resm = {status:1,message:'评论成功!'};
    req.body.time = new Date(parseInt(req.body.time));
    db.updatedb('insert into augment set ?', req.body)
        .then(function (result) {
            if (result.affectedRows == 1){
                res.send(JSON.stringify(resm));
            }
            else {
                resm.status = 0;
                resm.message = '评论失败!';
                res.send(JSON.stringify(resm));
            }
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '评论失败!';
            res.send(JSON.stringify(resm));
        });
});

//获取购物车总购买数
router.get('/api/carcount', function (req, res) {
    var resm = {status:1,message:'查找成功!',data:{}};
    db.querydb('select sum(count) as count from car where userzhanghu = '+req.query.userzhanghu + ' and cselect="是"')
        .then(function (result) {
            resm.data = result[0];
            res.send(resm);
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '查找失败!';
            res.send(resm);
        });
});
//获取购物车数据
router.get('/api/getcar', function (req, res) {
    var resm = {status:1,message:'查找成功!',data:[]};
    db.querydb('SELECT car.* ,goods.images, goods.title, goods.nowprice, goods.number ' +
        'from car,goods WHERE car.userzhanghu='+req.query.zhanghu+' and car.goodsid=goods.id;')
        .then(function (result) {
            resm.data = result;
            res.send(resm);
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '查询失败!';
            res.send(resm);
        });
});
//向购物车中添加数据
router.post('/api/savecar', function (req, res) {
    var resm = {status:0,message:'加入购物车失败!'};
    //验证数据的正确性
    if (req.body.count == undefined || req.body.count == null){
        res.send(resm);
        return;
    }
    if (req.body.count <= 0){
        res.send(resm);
        return;
    }
    //数据正确，存入数据库
    //先去数据库中查询，是否有添加过这个商品，若添加过，直接加count，若没有添加过，则添加一条新纪录
    db.updatedb('UPDATE car SET count = count+'+req.body.count+' WHERE goodsid='+req.body.goodsid+' AND userzhanghu='+req.body.userzhanghu)
        .then(function (result) {
            if (result.affectedRows == 1){
                resm.status = 1;
                resm.message = '加入购物车成功!';
                res.send(JSON.stringify(resm));
                return;
            }
            db.updatedb('insert into car set ?', req.body)
                .then(function (result) {
                    if (result.affectedRows == 1){
                        resm.status = 1;
                        resm.message = '加入购物车成功!';
                        res.send(JSON.stringify(resm));
                    }
                    else {
                        res.send(JSON.stringify(resm));
                    }
                })
                .catch(function (err) {
                    res.send(JSON.stringify(resm));
                });
        })
        .catch(function (err) {
            res.send(JSON.stringify(resm));
        });
});
//删除购物车数据
router.get('/api/delectcar', function (req, res) {
    var resm = {status:1,message:'删除成功!'};
   db.updatedb('DELETE from car WHERE id = '+req.query.id)
       .then(function (reault) {
            if (reault.affectedRows == 1){
                res.send(resm);
            }
            else{
                resm.status = 0;
                resm.message = '删除失败!';
                res.send(resm);
            }
       })
       .catch(function (err) {
           resm.status = 0;
           resm.message = '删除失败!';
           res.send(resm);
       });
});
//删除购物车多条数据
router.get('/api/delectcarmore', function (req, res) {
    var resm = {status:1,message:'删除成功!'};
    db.updatedb('DELETE from car WHERE id in '+req.query.ids)
        .then(function (reault) {
            if (reault.affectedRows >= 1){
                res.send(resm);
            }
            else{
                resm.status = 0;
                resm.message = '删除失败!';
                res.send(resm);
            }
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '删除失败!';
            res.send(resm);
        });
});
//修改购物车数据
router.post('/pai/updatecar', function (req, res) {
    var resm = {status:1,message:'修改成功!'};
    var sql = 'update car set';
    var post = [];
    for (var key in req.body){
        if (key == 'id')
            continue;
        sql = sql + ' '+key+'=?';
        post.push(req.body[key]);
    }
    sql = sql + ' where id = ?';
    post.push(req.body.id);
    db.updatedb(sql,post)
        .then(function (result) {
            if (result.affectedRows == 1){
                res.send(resm);
            }
            else{
                resm.status = 0;
                resm.message = '修改失败!';
                res.send(resm);
            }
        })
        .catch(function (err) {
            console.log(err);
            resm.status = 0;
            resm.message = '修改失败!';
            res.send(resm);
        });
});

//向订单中添加数据
router.post('/api/savedingdan', function (req, res) {
    var resm = {status:0,message:'加入订单失败!'};
    //验证数据的正确性
    if (req.body.counts == undefined || req.body.counts == null){
        res.send(resm);
        return;
    }
    if (req.body.counts <= 0){
        res.send(resm);
        return;
    }
    db.updatedb('insert into dingdan set ?', req.body)
        .then(function (result) {
            if (result.affectedRows == 1){
                resm.status = 1;
                if (req.body.status == '已付款'){
                    db.updatedb('UPDATE goods set number = number-'+req.body.counts+' WHERE id = '+req.body.goodsids)
                        .then(function (resu) {
                            if (resu.affectedRows == 1)
                                resm.message = '购买成功!';
                            else{
                                resm.message = '购买失败!';
                                resm.status = 0;
                            }
                            res.send(JSON.stringify(resm));
                        })
                        .catch(function (err) {
                            resm.message = '购买失败!';
                            resm.status = 0;
                            res.send(JSON.stringify(resm));
                        });
                }
                else{
                    resm.message = '已加入订单!';
                    res.send(JSON.stringify(resm));
                }
            }
            else {
                res.send(JSON.stringify(resm));
            }
        })
        .catch(function (err) {
            res.send(JSON.stringify(resm));
        });
});
//查询订单中的数据
router.get('/api/selectdingdan', function (req, res) {
    var resm = {status:1,message:'查找成功!',data:[]};
    db.querydb('select * from dingdan where userzhanghu='+req.query.userzhanghu)
        .then(function (result) {
            resm.data = result;
            res.send(resm);
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '查找失败';
            res.send(resm);
        });
});
//修改订单的状态
router.post('/api/updingdan', function (req, res) {
    var resm = {status:1,message:'购买成功!'};
    var post = [req.body.status,req.body.id];
    db.updatedb('update dingdan set status=? where id = ?',post)
        .then(function (result) {
            if (result.affectedRows == 1){
                //构造数据，生成sql语句
                var sql = 'UPDATE goods set number = CASE id';
                var sqlwhere = '(';
                req.body.counts = JSON.parse(req.body.counts);
                for (var key in req.body.counts) {
                    sql = sql + ' when '+key+' then number-'+req.body.counts[key];
                    sqlwhere = sqlwhere+key+',';
                }
                sql = sql + ' end where id in ';
                sqlwhere = sqlwhere.substring(0,sqlwhere.length-1);
                sqlwhere = sqlwhere+')';
                sql = sql + sqlwhere;
                //修改
                db.updatedb(sql)
                    .then(function (resu) {
                        if (resu.affectedRows >= 1)
                            resm.message = '购买成功!';
                        else{
                            resm.message = '购买失败!';
                            resm.status = 0;
                        }
                        res.send(resm);
                    })
                    .catch(function (err) {
                        resm.message = '购买失败!';
                        resm.status = 0;
                        res.send(resm);
                    });
            }
            else{
                resm.status = 0;
                resm.message = '购买失败!';
                res.send(resm);
            }
        })
        .catch(function (err) {
            resm.status = 0;
            resm.message = '购买失败!';
            res.send(resm);
        });
});
//将router导出
module.exports = router;