var express = require('express');
var router = express.Router();
var async = require('async');
var nodeExcel = require('excel-export');
var UserModel = require('../models/user');

router.get('/users',function(req,res){
  //同步控制
  var conf = {};
  let p = new Promise((resolve, reject) => {
          resolve();
      });
  p.then(defineStyle(conf))
  .then(defineHead(conf))
  .then(fullfilDate(conf,res))
  // .then(responseDate(conf,res))
})

//定义样式sheet名称
let defineStyle = function (conf){
   return new Promise(function(resolve,reject){
     conf.stylesXmlFile = "styles.xml";
     conf.name = "mysheet";
     // console.log('1',conf);
   })

}

//头部定义
let defineHead = function (conf){
  return new Promise(function(resolve,reject){
  conf.cols = [{
      caption:'name',
      type:'string',
  },{
      caption:'password',
      type:'string',
  },{
      caption:'phone',
      type:'number',
  },{
      caption:'email',
      type:'string',
  },{
    caption:'createdAt',
    type:'date'
  }
  ];
    // console.log('2',conf);
  })
}

//数据填充
let fullfilDate = function (conf,res){
  return new Promise(function (resolve, reject) {
     UserModel.Export({},function(err,rows){
      conf.rows = rows;
      // console.log('3',conf);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats');
      res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
      res.end(nodeExcel.execute(conf), 'binary');
    });
  })
}

//返回数据
let responseDate = function (conf,res){
  return new Promise(function (resolve, reject) {
    // console.log('4',conf);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats');
    res.setHeader("Content-Disposition", "attachment; filename=" + "Report.xlsx");
    res.end(nodeExcel.execute(conf), 'binary');
  })
}

module.exports = router;
