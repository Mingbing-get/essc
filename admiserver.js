//导入配置选项
pz = require("./admiconfig.js");

//导入第三方模块
const express = require("express");
const body_parser = require("body-parser");
const cookParser = require("cookie-parser");
const session = require("express-session");

//导入自己写的模块
const router = require("./admirouter.js");

const app = express();

//开放文件夹
app.use('/public', express.static('public'));
app.use('/admi', express.static('admi'));

//使用模块
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));
app.use(cookParser());
app.use(session({
    //参数配置
    secret:'lucksession',//加密字符串
    name:'user',//返回客户端key的名称，默认为connect_sid
    resave:false,//强制保存session，即使它没有变化
    saveUninitialized:true,//强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登录验证，减轻服务器存储压力，权限控制是有帮助的，默认为true
}));
app.use(router);

//监听窗口
app.listen(pz.port, pz.dizi, ()=>{
    console.log("runing..."+pz.port);
});