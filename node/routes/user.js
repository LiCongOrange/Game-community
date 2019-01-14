//引入MySQL连接模块
//哪一个模块中操作SQL语句，就引入连接
const pool=require('../pool.js');
//express下的路由器
const express=require('express');
//创建空路由器
var router=express.Router();
//往路由器中添加路由
//1.用户注册路由
router.post('/reg',function(req,res){
  //接收post请求的数据
  var obj=req.body;
  var $uname=obj.uname;
  //判断用户名是否为空
  if($uname==''){
    res.send({code:401,msg:'uname required'});
	return;//阻止程序继续往后执行
  }
  var $upwd=obj.upwd;
  if(!$upwd){ //如果是空
    res.send({code:402,msg:'upwd required'});
	return;
  }
  var $email=obj.email;
  if(!$email){
    res.send({code:403,msg:'email required'});
	return;
  }
  var $phone=obj.phone;
  if(!$phone){
    res.send({code:404,msg:'phone required'});
	return;
  }
  //把用户信息插入到数据库
  pool.query('INSERT INTO xz_user VALUES(NULL,?,?,?,?,NULL,NULL,0)',[$uname,$upwd,$email,$phone],function(err,result){
    if(err) throw err;
    //判断affectedRows是否大于0
	if(result.affectedRows>0){
	  res.send({code:200,msg:'reg success'});
	}
  });
});
//2.用户登录路由，获取浏览器请求的数据，并且进行验证
router.post('/login',function(req,res){
  //获取浏览器请求的数据
  var obj=req.body;
  //验证用户名和密码不能空
  var $uname=obj.uname;
  if(!$uname){
    res.send({code:401,msg:'uname required'});
	return;
  }
  var $upwd=obj.upwd;
  if(!$upwd){
    res.send({code:402,msg:'upwd required'});
	return;
  }
  //查看数据库中是否有这个用户
  pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],function(err,result){
    if(err) throw err;
    //查询的结果是数组
	if(result.length>0){
    
	}else{
    res.send({code:301,msg:'uname or upwd error'});
    
	}
  });

});
//3.删除用户路由  get  /delete
router.get('/delete',function(req,res){
   //接收get请求的数据(查询字符串)
   var obj=req.query;
   var $uid=obj.uid;
   if(!$uid){
     res.send({code:401,msg:'uid required'});
	 return;
   }
   //在数据库中删除uid对应的数据
   pool.query('DELETE FROM xz_user WHERE uid=?',$uid,function(err,result){
     if(err) throw err;
	 //判断是否删除成功
	 if(result.affectedRows>0){
	   res.send({code:200,msg:'delete success'});
	 }else{
	   res.send({code:301,msg:'delete error'});
	 }
   });
});
//4.用户的更改路由
router.post('/update',function(req,res){
  var obj=req.body;
  //验证不能为空 
  var $uid=obj.uid;
  var $email=obj.email;
  var $phone=obj.phone;
  var $user_name=obj.user_name;
  var $gender=obj.gender;
  if(!$uid){
    res.send({code:401,msg:'uid required'});
	return;
  }
  if(!$email){
    res.send({code:402,msg:'email required'});
    return;
  }
  if(!$phone){
    res.send({code:403,msg:'phone required'});
	return;
  }
  if(!$user_name){
    res.send({code:404,msg:'user_name required'});
	return;
  }
  if(!$gender){
    res.send({code:405,msg:'gender required'});
	return;
  }
  //执行SQL语句
  pool.query('UPDATE xz_user SET email=?,phone=?,user_name=?,gender=? WHERE uid=?',[$email,$phone,$user_name,$gender,$uid],function(err,result){
    if(err) throw err;
	if(result.affectedRows>0){
	  res.send({code:200,msg:'update success'});
	}else{
	  res.send({code:301,msg:'update error'});
	}
  });
});
//5-1.检索用户start
router.get('/detail',function(req,res){
  var obj=req.query;
  //验证是否为空
  var $uid=obj.uid;
  if(!$uid){
    res.send({code:401,msg:'uid required'});
	return;
  }
  //执行SQL语句
  pool.query('SELECT * FROM xz_user WHERE uid=?',$uid,function(err,result){
    if(err) throw err;
	//把查询的结果响应给浏览器
	res.send(result);
  });
});
//5-2.检索用户end
//6-1.用户列表start
//如果页码为空，默认1；如果每页数量为空，默认3
//查看浏览器端传递的数据类型
router.get('/list',function(req,res){
  var obj=req.query;
  //判断是否为空
  var $pno=obj.pno;
  var $count=obj.count;
  if(!$pno){
    $pno=1;
  }
  if(!$count){
    $count=3;
  }
  //浏览器请求的数据是字符串，需要转成数值型
  $pno=parseInt($pno);
  $count=parseInt($count);
  //执行SQL语句
  pool.query('SELECT * FROM xz_user LIMIT ?,?',[($pno-1)*$count,$count],function(err,result){
	if(err) throw err;
    res.send(result);
  });
});
//6-2.用户列表end

//导出路由器
module.exports=router;