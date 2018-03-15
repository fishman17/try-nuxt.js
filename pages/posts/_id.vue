<template>
  <div class="container">
     <h1>{{post.title}}</h1>
     <pre>{{post.body}}</pre>
     <p>
         <nuxt-link to="/posts">
             Back to the list 
         </nuxt-link>
     </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    // 一定要有这个数据，页面才有意义  同构
    async asyncData({params}){             //纯前端 data()也可以  但是全栈， 这个东西来自于服务器端， 要取  阻塞一下
        let {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${params.id}`)
        return {
            post: data,
        }
        // 芬芬文章  sql
        // 评论 comments
        // avatar nickname

    }
}
</script>

<style>

</style>
