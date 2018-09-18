<template>
  <!--<index-layout selected="mine">-->
  <keep-alive>
    <div v-if="isLogin">
      <div class="review">
        <div class="title"><span v-text="username"></span></div>
        <hr>
        <div class="content" style="text-indent: 0" @click="toNewIntro">签名：<span v-text="selfIntro"></span></div>
      </div>
      <div class="button-outside">
        <mt-button type="default" size="large" @click="toMyArticles">我的文章</mt-button>
      </div>
      <div class="button-outside">
        <mt-button type="default" size="large" @click="toMyEssays">我的随笔</mt-button>
      </div>
      <div class="review">
        <div class="title">关于本站</div>
        <hr>
        <div class="content">
          <p>你一定听说过六度分隔理论(<em>Six Degrees of Separation</em>)吧？</p>
          <p>如果没有听过,也没有关系,你可以把它简单的理解为<em>"你和任何一个陌生人之间所间隔的人不会超过六个，也就是说，最多通过六个人你就能够认识任何一个陌生人。"</em></p>
          <p>本站的名字就来源于这里，本站是一个博客型论坛，想要了解更多信息，请点击<b>
            <router-link to="/about">这里</router-link>
          </b>了解详情
          </p>
        </div>
      </div>
      <div class="button-outside">
        <mt-button type="primary" size="large" @click="toPasswd">修改密码</mt-button>
      </div>
      <div class="button-outside">
        <mt-button type="default" size="large" @click="logout">退出当前账号</mt-button>
      </div>
    </div>
    <div v-else>
      <div class="review">
        <div class="title">关于本站</div>
        <hr>
        <div class="content">
          <p>你一定听说过六度分隔理论(<em>Six Degrees of Separation</em>)吧？</p>
          <p>如果没有听过,也没有关系,你可以把它简单的理解为<em>"你和任何一个陌生人之间所间隔的人不会超过六个，也就是说，最多通过六个人你就能够认识任何一个陌生人。"</em></p>
          <p>本站的名字就来源于这里，本站是一个博客型论坛，想要了解更多信息，请点击<b>
            <router-link to="/about">这里</router-link>
          </b>了解详情
          </p>
        </div>
      </div>
      <div class="review">
        <b>登陆</b>或<b>注册</b>，使用本站的全部功能吧！
      </div>
      <div class="button-outside">
        <mt-button type="primary" size="large" @click="toLoginPage">登陆</mt-button>
      </div>
      <div class="button-outside">
        <mt-button type="default" size="large" @click="toRegisterPage">注册</mt-button>
      </div>
      <hr>
    </div>
  </keep-alive>
  <!--</index-layout>-->
</template>

<script>
  // import IndexLayout from '../components/IndexLayout';
  import ArticleReview from '../components/ArticleReview';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    components: {
      // IndexLayout,
      ArticleReview
    },
    name: "MinePage",
    data() {
      return {
        articleList: [],
        essaysList: [],
        loading: true,
        // url: 'http://127.0.0.1:5000',
        // isLogin: false,
        selfIntro: '暂时没有签名，点击设置一个签名吧！'
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin
      },
      username() {
        return this.$store.state.username
      },
      userID() {
        return this.$store.state.userID
      },
      url() {
        return this.$store.state.url +'/api'+ this.$route.path
      },
    },
    methods: {
      toLoginPage() {
        this.$router.push('/login')
      },
      toRegisterPage() {
        this.$router.push('/register')
      },
      toMyArticles() {
        this.$router.push('/user_articles/' + this.userID)
      },
      toMyEssays() {
        this.$router.push('/user_essays/' + this.userID)
      },
      toNewIntro() {
        this.$router.push('/new_intro')
      },
      logout() {
        Indicator.open('注销中,请稍等');
        this.axios.get(this.$store.state.url + '/api/logout')
          .then((resp) => {
            let temp = resp.data;
            this.$store.commit('logout');
            Indicator.close();
            if (temp.isLogout) {
              Toast('注销成功')
            } else {
              Toast('注销失败，失败原因：' + temp.failCode)
            }
          })
          .catch((err) => {
            console.log(err);
            Indicator.close();
            Toast('网络连接错误，请检查网络连接后重试')
          })
      },
      toPasswd(){
        this.$router.push('/passwd')
      }
    },
    beforeMount() {
      if(this.isLogin){
        this.axios.get(this.url)
          .then((response) => {
            if (response.data.selfIntro !== '') {
              this.selfIntro = response.data.selfIntro;
            }
          })
          .catch((error) => {
            console.log(error);
            Toast('网络连接失败，请检查网络连接后重试');
          });
      }
    }
  }
</script>

<style scoped>
  .review {
    margin: 15px;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    overflow: auto;
    box-shadow: darkgrey 10px 10px 20px 5px;
  }

  .button-outside {
    margin: 30px 15px;
    background: transparent;
    box-shadow: darkgrey 10px 10px 20px 5px;
    border-radius: 15px;
    font-size: 20px;
    line-height: 20px;
  }

  .title {
    font-size: 2.5em;
    color: rgba(46, 110, 206, 0.98);
  }

  .content {
    text-align: justify;
    text-indent: 2em;
  }
</style>
