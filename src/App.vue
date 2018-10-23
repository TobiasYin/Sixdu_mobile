<template>
  <div id="app">
    <transition :name="indexToggle">
      <keep-alive v-if="needFooter">
        <router-view style="overflow: scroll;-webkit-overflow-scrolling: touch;" :style="pageSize"></router-view>
      </keep-alive>
      <div v-else>
        <router-view style="overflow: scroll;-webkit-overflow-scrolling: touch;" :style="pageSize"></router-view>
      </div>
    </transition>
    <tabbar v-model="selected" v-if="needFooter">
      <tab-item id="index">
        <div class="tabbar">
          <div class="glyphicon glyphicon-home" aria-hidden="true"></div>
          <div>首页</div>
        </div>
      </tab-item>
      <tab-item id="articles">
        <div class="tabbar">
          <div class="glyphicon glyphicon-list" aria-hidden="true"></div>
          <div>文章</div>
        </div>
      </tab-item>
      <div class="circle-menu-wrapping" v-if="isLogin">
        <circle-menu type="middle-around" :number='4' animate="animated jello" mask='white' circle btn
                     :colors="['#40C4FF','#F0A28E','#8E24AA','#00E676','#FFA000']">
          <!--<button type="button" slot="item_btn"></button>-->
          <router-link slot="item_1" class="alert-btn" to="/new_article">文章</router-link>
          <router-link slot="item_2" class="alert-btn" to="/new_essay">随笔</router-link>
          <router-link slot="item_3" class="alert-btn" to="/new_secret">树洞</router-link>
          <router-link slot="item_4" class="alert-btn" to="/new_intro">签名</router-link>
        </circle-menu>
      </div>
      <tab-item id="essays">
        <div class="tabbar">
          <div class="glyphicon glyphicon-tasks" aria-hidden="true"></div>
          <div>随笔</div>
        </div>
      </tab-item>
      <tab-item id="mine">
        <div class="tabbar">
          <div class="glyphicon glyphicon-user" aria-hidden="true"></div>
          <div>我的</div>
        </div>
      </tab-item>
    </tabbar>
    <mt-popup
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <router-link to="/login">
        <div class="login-alert" :style="alertWidth">登陆可以体验更丰富的功能</div>
      </router-link>
    </mt-popup>

  </div>
</template>

<script>
  import tabbar from './components/tabbar'
  import tabItem from './components/tab-item'
  import CircleMenu from 'vue-circle-menu'

  export default {
    name: 'App',
    components: {
      tabbar,
      tabItem,
      CircleMenu
    },
    data() {
      return {
        indexToggle: '',
        popupVisible: false,
        needPopup: true,
      }
    },
    computed: {
      selected() {
        return this.$route.path.slice(1, -1);
      },
      innerW() {
        return window.innerWidth
          || document.documentElement.clientWidth
          || document.body.clientWidth;
      },
      innerH() {
        return window.innerHeight
          || document.documentElement.clientHeight
          || document.body.clientHeight;
      },
      pageSize() {
        if (this.needFooter) {
          return 'max-height:' + (this.innerH - 76) + 'px;max-width:' + this.innerW + 'px;height:' + (this.innerH - 76) + 'px;width:' + this.innerW + 'px'
        } else {
          return 'max-height:' + (this.innerH) + 'px;max-width:' + this.innerW + 'px;height:' + (this.innerH) + 'px;max-width:' + this.innerW + 'px;'
        }
      },
      needFooter() {
        return this.$route.path === '/' || this.$route.path === '/index' || this.$route.path === '/mine' || this.$route.path === '/articles' || this.$route.path === '/essays' || this.$route.path === '/login' || this.$route.path === '/register' || this.$route.path === '/passwd'
      },
      alertWidth() {
        return 'width:' + this.innerW + 'px'
      },
      isLogin() {
        return this.$store.state.isLogin
      }
    },
    watch: {//使用watch 监听$router的变化
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        this.popupVisible = false;
        if (to.meta.index > from.meta.index) {
          //设置动画名称
          this.indexToggle = 'slide-left';
        } else {
          this.indexToggle = 'slide-right';
        }
      }
    },
    mounted() {
      let v = window.document.cookie.split('\\');
      for (let i = 0; i < v.length; i++) {
        if (v[i] === 'isVisited=true') {
          this.needPopup = false;
          break
        } else {
          this.needPopup = true
        }
      }
    },
    beforeMount() {
      this.axios.get(this.$store.state.url + '/api/islogin')
        .then((resp) => {
          let temp = resp.data;
          if (temp.isLogin) {
            this.$store.commit('login');
            this.$store.commit('setUsername', temp.username);
            this.$store.commit('setUserID', temp.userID);
            this.$store.commit('setUserLikeArticles', temp.likeArticles);
            this.$store.commit('setUserLikeEssays', temp.likeEssays);
            this.$store.commit('setUserLikeSecrets', temp.likeSecrets);
            // console.log(this.$store.state.userLikeArticles);
            // console.log(this.$store.state.userLikeEssays);
            // console.log(this.$store.state.userLikeSecrets);
          } else {
            if (this.needPopup) {
              this.popupVisible = true;
              setTimeout(() => {
                this.popupVisible = false;
              }, 3000)
            }
          }
        });
      // var exp = new Date();
      // exp.setTime(exp.getTime() - 1);
      // var cval=getCookie(name);
      // if(cval!=null)
      //   document.cookie= name + "="+cval+";expires="+exp.toGMTString();
      let v = window.document.cookie.split('\\');
      let count = 0;
      for (let i = 0; i < v.length; i++) {
        if (v[i] === 'isVisited=true') {
          count++
        }
      }
      if (count === 0) {
        let d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
        window.document.cookie += 'isVisited' + "=" + 'true\\' + ";path=/;expires=" + d.toGMTString();
      } else if (count > 1) {
        let d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
        window.document.cookie = 'isVisited' + "=" + 'true\\' + ";path=/;expires=" + d.toGMTString();
      }
    },
    beforeCreate(){
      this.$store.commit('setUrl',window.location.origin);
    }
  }
</script>

<style>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 500ms;
    position: absolute;
    z-index: -1;
  }

  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }

  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }

  h1 {
    margin: 15px 0 !important;
    font-size: 16px !important;
    font-weight: bold !important;
  }

  .tabbar {
    font-size: 20px;
    color: cornflowerblue;
    text-decoration: none;
    padding: 5px 0;
    line-height: 25px;
  }

  .router-link-active {
    background: #eaeaea;
    color: #1c2c3d;
    text-decoration: none !important;
  }

  a, a :hover, a :active {
    text-decoration: none !important;
  }

  ul li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  .login-alert {
    width: 100%;
    height: 100px;
    text-align: center;
    font-size: 2em;
    line-height: 100px;
  }

  .mint-field-core {
    min-width: 0;
  }

  .circle-menu-wrapping {
    padding: 14px 0;
  }

  .alert-btn {
    color: white;
    font-weight: bold;
  }

  #app{
    -webkit-overflow-scrolling: touch;
  }
  body{
    -webkit-overflow-scrolling: touch;
  }
  p img{
    width: 80%;
  }
</style>
