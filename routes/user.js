var express = require('express');
var url = require('url');
var fs = require('fs');
const path = require('path');
var UserModel = require('../models/user');
var router = express.Router();


console.log(UserModel.statics);

/* GET users listing. */
router.get('/', function(req, res, next) {
   let query = {
     where : {
       'name': req.query.name
         }
      }
    UserModel.Find({},function(err,data){
      res.send(data);
    })
});


//获取假数据
let datas = {};
const files = fs.readdirSync(path.resolve(__dirname, '../lib/datas'));
files.forEach((file) => {
   let name = file.substring(0,file.lastIndexOf('.'));
   let data = require('../lib/datas/'+file);
   datas[name] = data;
})

//add
router.post('/', function(req, res, next) {
    UserModel.Create(datas.user);
    res.send('successfully');
});


module.exports = router;
