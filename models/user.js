var mongoose = require('../lib/db');
var Schema = mongoose.Schema;
var UserModel = Schema({
      name: String,
      phone: String,
      email: String,
      password: String,
      createdAt: {
        type:Date,
        default:Date.now()
      },
      updatedAt: {
        type:Date,
        default:Date.now()
      }
});


UserModel.statics = {
  Find : function(query,callback){
    console.log('data',callback);
    if(!query.limit) query.limit=1000;
    if(!query.order) query.order='-createdAt';
    var queryWhere = this.find(query.where).sort(query.order).limit(query.limit);
    queryWhere.exec(callback);//?
  },
  Create : function(data){
    return this.create(data);
  },
  Export : function(query,callback){
       var rows = [];
        this.find(query).exec(function(err,datas){
           datas.forEach((data) =>{
               var row = [data.name,data.phone,data.email,data.password,data.createdAt];
                rows.push(row);
           });
           callback(err,rows);
         });
  }
}


// UserModel.statics.Find =  function(query,data){
//     if(!query.limit) query.limit=1000;
//     if(!query.order) query.order='-createdAt';
//     return this.find(query.where).sort(query.order).limit(query.limit).exec(data);
//   }
//
// UserModel.statics.Create = function(data){
//       this.create(data);
//   }


UserModel.pre('save',function(next){
    if(!this.isNew){
      this.updatedAt = Date.now();
    }
    next();
})


module.exports = mongoose.model('user',UserModel);
