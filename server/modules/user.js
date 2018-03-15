// import mongoose from 'mongoose'
// const Schema = mongoose.Schema

// const UserSchema = new Schema({
//   role: {
//     type: String,
//     default: 'user',
//   },
//   username: String,
//   password: String,
//   email: String,
//   nickname: String,
//   motto: String,
//   avatar: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// })

// // hidden some field
// UserSchema.options.toJSON = {
//   virtuals: true,
//   versionKey: false,
//   transform(doc, ret) {
//     ret.id 

//  = ret._id
//     delete ret._id
//     delete ret.id 

//     delete ret.password
//     delete ret.username
//   }
// }
// mongoose.model('User', UserSchema)


// 对象和数据规则的映射
import  mongoose from 'mongoose'
const Scheme = mongoose.Schema;   //规则  约束 
const UserSchema = new Scheme({
    role:{
      type: String,
      default: 'user'    
    },
    username: String,
    password: String,
    email: String,
    nickname: String,
    motto: String,
    avtar: String,
    createdAt:{
      type: Date,
      default: Date.now
    },
    updatedAt:{
      type:Date,
      default: Date.now
    },
});
//删除一些不想输出的，新定义一些什么的
UserSchema.options.toJSON = {    
  virtuals: true,
  versionKey: false,
  transform(doc,ret){
    ret.id = ret._id;
    delete ret._id;
    delete ret.password;
  }
}
mongoose.model('User',UserSchema);