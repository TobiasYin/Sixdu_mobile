<template>
  <div>
    <div class="my-content">
      <slot></slot>
    </div>
    <!--<div class="my-footer">-->
      <!--<tabbar v-model="selected" fixed>-->
        <!--<tab-item id="index">-->
          <!--<div class="tabbar">-->
            <!--<div class="glyphicon glyphicon-home" aria-hidden="true"></div>-->
            <!--<div>首页</div>-->
          <!--</div>-->
        <!--</tab-item>-->
        <!--<tab-item id="articles">-->
          <!--<div class="tabbar">-->
            <!--<div class="glyphicon glyphicon-list" aria-hidden="true"></div>-->
            <!--<div>文章</div>-->
          <!--</div>-->
        <!--</tab-item>-->
        <!--<tab-item id="essays">-->
          <!--<div class="tabbar">-->
            <!--<div class="glyphicon glyphicon-tasks" aria-hidden="true"></div>-->
            <!--<div>随笔</div>-->
          <!--</div>-->
        <!--</tab-item>-->
        <!--<tab-item id="mine">-->
          <!--<div class="tabbar">-->
            <!--<div class="glyphicon glyphicon-user" aria-hidden="true"></div>-->
            <!--<div>我的</div>-->
          <!--</div>-->
        <!--</tab-item>-->
      <!--</tabbar>-->
    <!--</div>-->
  </div>
</template>
<script>
  import tabbar from './tabbar'
  import tabItem from './tab-item'

  export default {
    props: {
      selected:{
        type:String,
        default:''
      }
    },
    name: 'IndexLayout',
    components: {
      tabbar,
      tabItem
    },
    data() {
      return {
        // selected:''
      }
    },
    // computed:{
    //   selected(){
    //     console.log(this.$route.path.slice(1,-1));
    //     return this.$route.path.slice(1,-1)
    //   }
    // }
  }
</script>
<style>
  body {
    background: rgba(204, 199, 206, 0.3);
    padding-bottom: 80px;
  }

  ul li {
    list-style: none;
  }

  ul {
    padding: 0;
  }

  .tabbar {
    font-size: 20px;
    color: cornflowerblue;
    text-decoration: none;
    padding: 5px 0;
    line-height: 25px;
  }

  a :hover {
    text-decoration: none;
  }
</style>
