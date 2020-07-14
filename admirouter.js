//导入第三方模块
const express = require("express");
const formidable = require("formidable");

//导入自己的模块
const db = require("./admidb.js");
const readFile = require("./readfile.js");

const router = express.Router();

//设置开放文件夹的路径
const dir = 'H:\\visual studio code\\服务器\\二手商城';

router.get('/', function (req, res) {
    readFile.readfile(dir+'/admi/index.html')
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
router.all('/admi/*', function (req, res) {
    readFile.readfile(dir+req.url)
        .then(function (data) {
            res.send(data);
        })
        .catch(function (err) {
            res.send('找不到页面!');
        });
});

//处理登录
router.post('/api/denglu',function (req, res) {
    var resm = {status:0,message:''};
    if (req.body.zhanghu == '' || req.body.mima == ''){
        resm.message = '账户和密码不能为空!';
        return res.send(resm);
    }
    db.querydb('select * from esadmi where zhanghu='+req.body.zhanghu)
        .then(function (result) {
            if (result.length != 0 && result[0].mima == req.body.mima){
                resm.message = '登录成功!';
                resm.status = 1;
                req.session.user = result[0];
                res.send(resm);
            }
            else {
                resm.message = '账户或密码错误!';
                res.send(resm);
            }
        })
        .catch(function (err) {
            console.log(err);
            resm.message = '登录失败!';
            res.send(resm);
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
    var resm = {status:1, message:'退出成功'};
    res.send(resm);
});

//获取所有轮播图
router.get('/getlunbo', function (req, res) {
    var resm = {status:1,message:'获得成功!',data:[]};
   db.querydb('select * from lunbo')
       .then(function (result) {
           resm.data = result;
           res.send(resm);
       })
       .catch(function (err) {
           resm.status = 0;
           resm.message = '获取失败!';
           res.send(resm);
       });
});
//修改轮播图数据
router.post('/updatelunbo', function (req, res) {
    var resm = {status:1,message:'修改成功!'};
    var sql = 'update lunbo set';
    var post = [];
    for (var key in req.body){
        if (key == 'inid')
            continue;
        sql = sql + ' '+key+'=?,';
        post.push(req.body[key]);
    }
    sql = sql.substring(0,sql.length-1);
    sql = sql + ' where inid = ?';
    post.push(req.body.inid);
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
            resm.status = 0;
            resm.message = '修改失败!';
            res.send(resm);
        });
});
//删除指定轮播图
router.get('/deletelunbo', function (req, res) {
    var resm = {status:1, message:'修改成功!'};
    db.updatedb('delete from lunbo where inid = '+req.query.inid)
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
            resm.status = 0;
            resm.message = '修改失败!';
            res.send(resm);
        });
});
//保存图片
router.post('/saveimage', function (req, res) {
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = "./public/static/image";
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
        // console.log(files);
        resm.path = files.lbt.path;
        res.send(JSON.stringify(resm));
    });
});
//添加轮播图数据
router.post('/savelunbo', function (req, res) {
    var resm = {status:0,message:'保存失败!'};
    if (!req.body.discription || !req.body.image || !req.body.pingtai || !req.body.status || !req.body.title){
        resm.message = '数据不全!';
        return res.send(resm);
    }
    db.updatedb('insert into lunbo set ?', req.body)
        .then(function (result) {
            if (result.affectedRows == 1) {
                resm.status = 1;
                resm.message = '保存成功!';
                res.send(resm);
            }
            else
                res.send(resm);
        })
        .catch(function (err) {
            res.send(resm);
        });
});

//获取商品数据
router.post('/getgoods', function (req, res) {
    var resm = {status:1,message:'查询成功!',data:[]};
    if (!req.body.yeshu){
        resm.status = 0;
        resm.message = '查询失败!';
        return res.send(resm);
    }
    //获取查询越过的记录条数
    //默认查询10条记录
    var tiaoshu = 10;
    var start = tiaoshu*(parseInt(req.body.yeshu)-1);

    //添加查询条件
    var sql = 'select * from goods where ';
    var flag = false;//默认标志没有条件
    var orderflag = false;//判断是否有排序
    for (var key in req.body){
        if (key == 'userzhanghu' || key == 'status'){
            flag = true;
            sql = sql + key+'="'+req.body[key]+'" and '
        }
        else if (key.indexOf('order') != -1)
            orderflag = true;
    }
    if (flag)
        sql = sql.substring(0,sql.length-4);
    else
        sql = sql.substring(0,sql.length-6);
    //判断是否需要排序
    if (orderflag){
        sql = sql + 'ORDER BY '+ req.body['order[name]'] + ' ' + req.body['order[method]'] + ' ';
    }
    sql = sql + 'limit '+start+','+tiaoshu;
    db.querydb(sql)
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
//修改商品的状态
router.post('/updategoods', function (req, res) {
    var resm = {status:1,message:'修改成功!'};
   db.updatedb('update goods set status = "'+req.body.status+'" where id = '+req.body.id)
       .then(function (result) {
            if (result.affectedRows == 1)
                res.send(resm);
       })
       .catch(function (err) {
            resm.status = 0;
            resm.message = '修改失败!';
            res.send(resm);
       });
});
//获取商品状态选项
router.get('/getgoodsstatus', function (req, res) {
   var resm = {status:1, message:'查找成功!', data:[]};
   db.querydb('select * from goodsstatus')
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

//将router导出
module.exports = router;