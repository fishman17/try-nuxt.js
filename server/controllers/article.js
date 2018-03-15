// 中间件函数
import Mongoose from 'mongoose'
const Article = Mongoose.model('Article')
export const getArticles = async (ctx, next) => {
    // await article.find() 游标
    // 默认mongodb会返回20条数据
    // 分页 每页多少条
    // 每页条limit
    let { page = 1, limit = 15 } = ctx.params
    // 从多少条开始查
    page = Number((page - 1) * limit) || 0;
    limit = Number(limit) || 15;

    try {
        let total = await Article.find({
            publish: true,                   //用户已经发布
        }).exec()
        total = total.length                 //有多少篇 
        const data = await Article.find({
            publish: true
        })
            .skip(page)        //skip  跳过   
            .limit(limit)
            .sort({ 'createdAt': -1 })
            .exec()
        ctx.body = {
            success: true,
            data: data,
            total: total
        }
    } catch (e) {
        ctx.body = {
            success: false,
            err: e,
            total: 0
        }
    }
}
