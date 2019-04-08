<template>
  <div>
    <ul>
      <li v-for="item in getList" :key="item.id">
        <span>{{$utils.formatDate(item.create_at)}}</span>
        <router-link :to="'/content/'+item.id" :target="'_blank'">
          {{item.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data () {
    return {
      getList: []
    }
  },
  mounted () {
    this.getTopics()
  },
  methods: {
    getTopics () {
      this.$http.get('/topics')
        .then(res => {
          console.log(res)
          res.data.success && (this.getList = res.data.data)
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
