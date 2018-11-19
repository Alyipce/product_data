var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

//插入模拟数据
router.get('/addBetadata',function(req,res){
     // let betadatas = fs.readFileSync(path.resolve(__dirname,'../lib/datas/beta_datas.js'),'utf-8');
     let betadatas = require('../lib/datas/beta_datas.js');
     


})

module.exports = router;
