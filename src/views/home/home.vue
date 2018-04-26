<template>
  <div class="red">home{{getUserInfo.name}}
    <span @click="fn">点击</span>
    <br>
    <button @click="change">更换vuex</button>
    <router-view/>
  </div>
</template>

<script>
  import {mapActions, mapState, mapGetters} from 'vuex'

  export default {
    name: "home",
    data() {
      return {
        titleText: '全部审阅',
        tabType: 1
      }
    },
    methods: {
      fn () {
        this.$store.dispatch('index/getUserInfoAction').then(function(info){
          console.log(info.data)
        })
      },
      change(){
        this.$store.commit('index/getUserInfoMutaion',{name: "改变了"})
      }
    },
    computed: {
      ...mapGetters("index", ["getUserInfo"]),
    }
  }
</script>

<style lang="scss" scoped>
  .red {
    color: red;
  }
</style>
