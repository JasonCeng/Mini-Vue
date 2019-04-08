<template>
  <div>
    <h3>{{getMsg.title}}</h3>
    <p>作者：{{getMsg.author.loginname}}&nbsp;&nbsp;发表于：{{$utils.formatDate(getMsg.create_at)}}</p>
    <hr>
    <article v-html="getMsg.content"></article>
    <h4>网友回复：</h4>
    <ul>
      <li v-for="item in getMsg.replies" :key="item.id">
        <p>评论者：{{item.author.loginname}}，&nbsp;&nbsp;发表于：{{$utils.formatDate(item.create_at)}}</p>
        <article v-html="item.content"></article>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      id: this.$route.params.id,
      getMsg: {}
    }
  },
  mounted () {
    this.getContent()
  },
  methods: {
    getContent () {
      this.$http.get('topic/' + this.id)
        .then(res => {
          res.data.success && (this.getMsg = res.data.data)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss">
  @import "../style/style";
</style>
