//引入MySQL连接模块
//哪一个模块中操作SQL语句，就引入连接
const pool=require('../pool.js');
//express下的路由器
const express=require('express');
//创建空路由器
var router=express.Router();
//1.login
router.post("/login",(req,res)=>{
	//获取用户名称
	var $uname=req.body.uname;
	if(!$uname){
		res.send({code:401,msg:'用户名称不存在'});
		return;
	}
	//获取用户密码
	var $upwd=req.body.upwd;
	if(!$upwd){
		res.send({code:402,msg:'用户密码不存在'});
		return;
	}
	var sql="select * from xz_user "
		+"where uname=? and upwd=?";
		//console.log(sql);
	pool.query(sql,[$uname,$upwd],(err,result)=>{
		if(err) throw err;
		if(result.length>0){
			res.send("登录成功");
		}else{
			res.send("用户名或密码错误");
		}
	});

});

//2.查询用户表的所有数据
router.get("/list",(req,res)=>{
	var sql="select * from xz_user";
	pool.query(sql,(err,result)=>{
		if(err) throw err;
		res.send(result);
	});
});
//3.删除用户信息
router.get("/deleteUser",(req,res)=>{
	var $uid=req.query.uid;
	if (!$uid){
		res.send({code:402,msg:"用户id不存在"});
		return;
	}
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(err)  throw err;
		res.send("1");//删除成功！
	});
});
//4.查询用户信息
router.get("/selUser",(req,res)=>{
	var $uid=req.query.uid;
	if (!$uid){
		res.send({code:402,msg:"用户id不存在"});
		return;
	}
	var sql="select * from xz_user where uid=?";
	pool.query(sql,[$uid],(err,result)=>{
		if(result.length>0){
			res.send(result[0]);
		}else{
			res.send("无用户信息");
		}
	});
});
//5.更改
router.post('/updateUser',function(req,res){
   var $uid=req.body.uid;
   if (!$uid)
   {
	   res.send("uid不存在");
	   return;
   }
  var $uname=req.body.uname;
     if (!$uname)
   {
	   res.send("uname不存在");
	   return;
   }
  var $upwd=req.body.upwd;
     if (!$upwd)
   {
	   res.send("upwd不存在");
	   return;
   }
  var $email=req.body.email;
     if (!$email)
   {
	   res.send("email不存在");
	   return;
   }
  var $phone=req.body.phone;
     if (!$phone)
   {
	   res.send("phone不存在");
	   return;
   }
  var $user_name=req.body.user_name;
	if (!$user_name)
   {
	   res.send("user_name不存在");
	   return;
   }
  var $gender=req.body.gender;
	if (!$gender)
   {
	   res.send("gender不存在");
	   return;
   }
  //执行SQL语句
 var  sql='UPDATE xz_user SET uname=?,upwd=?,email=?,phone=?,user_name=?,gender=? WHERE uid=?';
 pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender,$uid],function(err,result){
    if(err) throw err;
	//res.send("修改成功");
	res.send("<script>alert('修改成功！');location.href='http://localhost:3000/02_list.html';</script>");
  });
});
//checkUname接口
//获取传递过来的名用户名称
router.get("/checkUname",(req,res)=>{
	var $uname=req.query.uname;
	if (!$uname)
	{
		res.send("用户名不能为空");
		return;
	}
	var  sql="select * from xz_user where uname=?";
	pool.query(sql,[$uname],(err,result)=>{
		if (err) throw err;
		if (result.length>0){
			res.send("0");
		}else{
			res.send("1");
		}
	});
});
//email
router.get("/checkEmail",(req,res)=>{
	var $email=req.query.email;
	if (!$email)
	{
		res.send("邮箱不能为空");
		return;
	}
	var  sql="select * from xz_user where email=?";
	pool.query(sql,[$email],(err,result)=>{
		if (err) throw err;
		if (result.length>0){
			res.send("0");
		}else{
			res.send("1");
		}
	});
});
//注册接口
router.post("/register",(req,res)=>{
	var $uname=req.body.uname;
	if (!$uname){
		res.send("用户名不存在");
		return;
	}
	var $upwd=req.body.upwd;
	if (!$upwd){
		res.send("用户密码不存在");
		return;
	}
	var $email=req.body.email;
	if (!$email){
		res.send("用户邮箱不存在");
		return;
	}
	var $phone=req.body.phone;
	if (!$phone){
		res.send("用户联系方式不存在");
		return;
	}
	var $user_name=req.body.user_name;
	if (!$user_name){
		res.send("用户真实姓名不存在");
		return;
	}
	var $gender=req.body.gender;
	if (!$gender){
		res.send("用户性别不存在");
		return;
	}
	var sql="insert into xz_user values(null,?,?,?,?,null,?,?)";
	pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender],(err,result)=>{
	   if(err)  throw err;
		res.send("注册成功");
	});
});
//导出路由器
module.exports=router;