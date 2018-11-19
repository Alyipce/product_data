const DB_URL = 'mongodb://localhost:27017/product_data'
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')


//连接
mongoose.connect(DB_URL);
// 此处防止 node.js - Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function() {
    console.log('Mongodb started successfully')
})

//声明待添加的model对象
// let model = {};
// const schemas = fs.readdirSync(path.resolve(__dirname, './schemas'))
// schemas.forEach((file) => {
//     //设置数据库表名为读取到的文件名(去除后缀名)
//     let name = file.substring(0,file.lastIndexOf("."))
//     //获取到的对象就是数据库字段
//     let schema = require('./schemas/' + file)
//     //使用mongoose.Schema和mongoose.model完成对数据库表和字段的创建
//     model[name] = mongoose.model(name, mongoose.Schema(schema))
// })


module.exports = mongoose;
