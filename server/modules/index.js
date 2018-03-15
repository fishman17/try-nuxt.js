// mongoose 驱动 数据库抽像
import mongoose from 'mongoose'
import config from '../config'
import md5 from 'md5'
require('./user')
require('./article')
const User = mongoose.model('User')
// http mongodb
const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`
mongoose.Promise = global.Promise
mongoose.connection
  .openUri(mongoUrl)
  .once('open', async () => {
    console.log('database connect successed')
    let userInfo = config.user
    userInfo.password = md5(userInfo.password)
    let user = await User.findOne({
        role: 'superAdmin'}).exec()
    if(!user){
        user = new User(userInfo)
        await user.save()
        console.log(user);
        console.log('管理员已经生成');
    }
    // user = 
  })
  .on('error', (error) => {
    console.warn('database connect fail',
     error)
  })
