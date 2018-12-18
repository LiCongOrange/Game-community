//引入MySQL连接模块
//哪一个模块中操作SQL语句，就引入连接
const pool=require('../pool.js');
//express下的路由器
const express=require('express');
//创建空路由器
var router=express.Router();

//1.ajax_demo
router.get('/myAjax',(req,res)=>{
	res.send("这是我的第一个ajax程序");
});
//2.接收带参数的请求get，并查询数据库给回响应
router.get('/login',(req,res)=>{
	//获取用户名称
	var $uname=req.query.uname;
	//获取用户密码
	var $upwd=req.query.upwd;
	if(!$uname){
		res.send("用户名不存在");
		return;
	}
	if(!$upwd){
		res.send("密码不存在");
		return;
	}
	//将用户和密码作为参数，查询数据库
	//查询到结果就是登录成功，否则登录失败
	var sql="select * from xz_user where "
		+" uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("登录失败");
		}
	});
});
//3.接收带参数的请求post，并查询数据库给回响应
router.post('/postlogin',(req,res)=>{
	//获取用户名称
	var $uname=req.body.uname;
	//获取用户密码
	var $upwd=req.body.upwd;
	if(!$uname){
		res.send("用户名不存在");
		return;
	}
	if(!$upwd){
		res.send("密码不存在");
		return;
	}
	//将用户和密码作为参数，查询数据库
	//查询到结果就是登录成功，否则登录失败
	var sql="select * from xz_user where "
		+" uname=? and upwd=?";
	
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("登录失败");
		}
	});
});

//查询整个用户数据：userlist
router.get("/userlist",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});

//导出路由器
module.exports=router;