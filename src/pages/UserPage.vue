<template>
  <div class="page">
    <mt-header :title="username">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
    </mt-header>
    <div class="review">
      <div class="name-title"><span v-text="username"></span></div>
      <hr>
      <div class="content" style="text-indent: 0">签名：<span v-text="selfIntro"></span></div>
    </div>
    <hr>
    <div class="review title">最新文章</div>
    <div class="review none" v-if="!articleItem">该用户还没有发布过文章</div>
    <div v-else>
      <article-review :ArticleItem="articleItem"></article-review>
      <div class="button-outside">
        <mt-button type="default" size="large" @click="toAllArticles">全部文章</mt-button>
      </div>
      <hr>
    </div>
    <div class="review title">最新随笔</div>
    <div class="review none" v-if="!essayItem">该用户还没有发布过随笔</div>
    <div v-else>
      <essay-review :ArticleItem="essayItem"></essay-review>
      <div class="button-outside">
        <mt-button type="default" size="large" @click="toAllEssays">全部随笔</mt-button>
      </div>
    </div>

  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import ArticleReview from '../components/ArticleReview'
  import EssayReview from '../components/EssayReview'

  export default {
    name: "UserPage",
    components: {
      ArticleReview,
      EssayReview
    },
    data() {
      return {
        username: '',
        selfIntro: '',
        articleItem: false,
        essayItem: false,
      }
    },
    computed: {
      url() {
        return this.$store.state.url + '/api' + this.$route.path
      },
      isLogin() {
        return this.$store.state.isLogin
      }
    },
    methods: {
      lastPage() {
        history.go(-1)
      },
      toAllArticles(){
        this.$router.push('/user_articles/'+this.$route.params.id)
      },
      toAllEssays(){
        this.$router.push('/user_essays/'+this.$route.params.id)
      }
    },
    mounted() {
      console.log(this.url);
      this.axios.get(this.url)
        .then(resp => {
          let temp = resp.data;
          this.username = temp.username;
          this.selfIntro = temp.selfIntro;
          this.articleItem = temp.lastArticle;
          this.essayItem = temp.lastEssay;
          // console.log(this.articleItem)
        })
        .catch(err => {
          console.log(err);
          Toast('网络连接错误，请检查网络连接后重试')
        })
    },
    // beforeRouteLeave(){
    //   this.$destroy();
    //   next()
    // }
  }
</script>

<style scoped>
  .name-title {
    font-size: 2.5em;
    color: rgba(46, 110, 206, 0.98);
  }

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
    font-size: 2em;
    color: rgba(46, 110, 206, 0.98);
    text-align: center;
  }

  .none {
    text-align: center;
    color: dimgrey;
  }
</style>
