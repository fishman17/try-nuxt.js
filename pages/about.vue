<template>
  <div>
      <p>Hi from {{name}}</p>
      <nuxt-link to="/">Back home</nuxt-link>
  </div>
</template>

<script>
export default {
    asyncData(){
        return {
            name: process.static? 'static':(process.server? 'server':'client')
        }
        // nuxt 本质就是 .vue 交给后端去渲染
        // webpack server-side-renderer
        // react next.js
        // .vue => html/css/js
        // 区分 前端？ 后端？
    },
    head: {
        title: 'About Page'
    }
}
</script>

<style>

</style>
