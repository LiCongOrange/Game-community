//导入路由器
const productRouter=require('./routes/product.js');
const userRouter=require('./routes/user.js');
const bodyParser=require('body-parser');
const express=require('express');
const demo=require("./routes/demo.js");
const mypro=require("./routes/myPro.js");
//创建web服务器
var app=express();
app.listen(3000);

//使用body-parser中间件
app.use(bodyParser.urlencoded({
  extended:false
}));
//托管静态文件到public目录
app.use(express.static('public'));
app.use(express.static('myEx'));
app.use(express.static('mypro'));
//把路由器挂载到 /user下
//访问路由/user/login  /user/reg
app.use('/user',userRouter);
//把商品路由器引入并挂载到 /product下
//访问路由 /product/list
app.use('/product',productRouter);

//测试案例的路由挂载
app.use("/demo",demo);
//项目路由挂载
app.use("/mypro",mypro);



