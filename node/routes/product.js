//使用MySQL数据库连接
const pool=require('../pool.js');
//使用express的路由器功能
const express=require('express');
var router=express.Router();
//添加路由(先空着，待会添加)
//1-1.商品列表路由-start
router.get('/list',function(req,res){
  var obj=req.query;
  var $pno=obj.pno;
  var $count=obj.count;
  //判断是否为空
  if(!$pno){
    $pno=1;
  }
  if(!$count){
    $count=10;
  }
  //转为数值
  $pno=parseInt($pno);
  $count=parseInt($count);
  //执行SQL语句
  pool.query('SELECT * FROM xz_laptop LIMIT ?,?',[($pno-1)*$count,$count],function(err,result){
    if(err) throw err;
	res.send(result);
  });
});
//1-2.商品列表路由-end
//2-1.删除商品路由-start
router.get('/delete',function(req,res){
  var obj=req.query;
  var $lid=obj.lid;
  if(!$lid){
    res.send({code:401,msg:'lid required'});
	return;
  }
  //执行SQL语句
  pool.query('DELETE FROM xz_laptop WHERE lid=?',$lid,function(err,result){
    if(err) throw err;
    if(result.affectedRows>0){
	  res.send({code:200,msg:'delete success'});
	}else{
	  res.send({code:301,msg:'delete error'});
	}
  });
});
//2-2.删除商品路由-end

//导出路由器
module.exports=router;
