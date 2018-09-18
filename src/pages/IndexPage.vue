<template>
  <!--<index-layout selected="index">-->
  <!--<keep-alive>-->
  <!--<ul-->
  <!--v-infinite-scroll="loadMore"-->
  <!--infinite-scroll-disabled="loading"-->
  <!--infinite-scroll-distance="10">-->
  <!--<li v-for="(item,index) in articleList">-->
  <!--<article-review :ArticleItem="item" :key="index" :index="index"></article-review>-->
  <!--</li>-->
  <!--</ul>-->
  <!--</keep-alive>-->
  <div class="page">
    <div class="review title">树洞</div>
    <div class="review introduce" v-if="needHelp"><p>树洞是一个匿名的交流平台，在树洞发布的信息，会隐去作者信息，所以，你可以尽情的畅所欲言。</p>
      <p>你可以在这表白，在这讲难以启齿的事，也可以讲不想让人知道的故事。</p>
      <p>树洞是手机端专属功能，只能在手机端发送和查看。</p>
      <hr>
      <mt-button size="small" style="float: right" type="primary" @click="learned">我知道了</mt-button>
    </div>
    <!--<secret-review></secret-review>-->
    <secret-review :ArticleItem="SecretItem" timeOut="300"></secret-review>
    <div class="button-outside">
      <mt-button size="large" @click="toSecretsPage">查看更多树洞</mt-button>
    </div>
    <div class="review title">最新随笔</div>
    <essay-review :ArticleItem="EssayItem" timeOut="300"></essay-review>
    <div class="button-outside">
      <mt-button size="large" @click="toEssaysPage">查看更多随笔</mt-button>
    </div>
    <div class="review title">最新文章</div>
    <article-review :ArticleItem="ArticleItem" timeOut="300"></article-review>
    <div class="button-outside">
      <mt-button size="large" @click="toArticlesPage">查看更多文章</mt-button>
    </div>
  </div>
  <!--</index-layout>-->
</template>

<script>
  import EssayReview from '../components/EssayReview'
  // import IndexLayout from '../components/IndexLayout';
  import ArticleReview from '../components/ArticleReview';
  import SecretReview from '../components/SecretReview'
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    components: {
      // IndexLayout,
      ArticleReview,
      EssayReview,
      SecretReview
    },
    name: "IndexPage",
    data() {
      return {
        // articleList: [],
        // loading: true,
        // url: 'http://127.0.0.1:5000'
        needHelp: true,
        EssayItem: {},
        ArticleItem: {},
        SecretItem: {}
      }
    },
    computed: {
      url() {
        return this.$store.state.url + '/api' + '/index'
      },
    },
    methods: {
      //   loadMore() {
      //     // if(this.$route.path==='/index'){
      //     this.Loading = true;
      //     Indicator.open('加载中...');
      //     setTimeout(() => {
      //       this.axios.get(this.url, {
      //         params: {
      //           'start': this.articleList.length + 1,
      //           'end': this.articleList.length + 11
      //         }
      //       })
      //         .then((response) => {
      //           let tempData = response.data.ArticleList;
      //           for (let i = 0; i < 10; i++) {
      //             this.articleList.push(tempData[i]);
      //           }
      //           this.Loading = false;
      //           Indicator.close();
      //         })
      //         .catch((error) => {
      //           console.log(error);
      //           Toast('加载失败');
      //           Indicator.close();
      //         });
      //     }, 10);
      //   }
      // }
      learned() {
        let d = new Date;
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
        window.document.cookie += 'learned' + "=" + 'true\\' + ";path=/;expires=" + d.toGMTString();
        this.needHelp = false
      },
      toArticlesPage() {
        this.$router.push('/articles')
      },
      toEssaysPage() {
        this.$router.push('/essays')
      },
      toSecretsPage() {
        this.$router.push('/secrets')
      }
    },
    mounted() {
      let v = window.document.cookie.split('\\');
      for (let i = 0; i < v.length; i++) {
        if (v[i] === 'learned=true') {
          this.needHelp = false;
          break
        } else {
          this.needHelp = true
        }
      }
    },
    beforeMount() {
      this.axios.get(this.url, {timeout: 2500})
        .then((resp) => {
          let temp = resp.data;
          this.SecretItem={
            title: temp.SecretItem.title,
            content: temp.SecretItem.content,
            like: temp.SecretItem.like,
            time: temp.SecretItem.time,
            id: temp.SecretItem.id,
          };
          // this.SecretItem = temp.SecretItem;
          // this.ArticleItem=temp.ArticleItem;
          this.ArticleItem={
            title: temp.ArticleItem.title,
            author: temp.ArticleItem.author,
            authorID: temp.ArticleItem.authorID,
            content: temp.ArticleItem.content,
            like: temp.ArticleItem.like,
            time: temp.ArticleItem.time,
            id: temp.ArticleItem.id,
          };
          this.EssayItem={
            author: temp.EssayItem.author,
            authorID: temp.EssayItem.authorID,
            content: temp.EssayItem.content,
            like: temp.EssayItem.like,
            time: temp.EssayItem.time,
            id: temp.EssayItem.id,
          };
        })
        .catch((error) => {
          console.log(error);
          Toast('网络连接失败，请检查网络连接后重试');
        });
    },
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

  .title {
    font-size: 2.5em;
    color: rgba(46, 110, 206, 0.98);
  }

  .introduce {
    text-indent: 2em;
  }

  .button-outside {
    margin: 20px 15px;
    background: transparent;
    box-shadow: darkgrey 10px 10px 20px 5px;
    border-radius: 15px;
    font-size: 20px;
    line-height: 20px;
  }
  .review img{
    width: 100%;
  }
</style>
