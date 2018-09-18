<template>
  <div class="page">
    <mt-header :title="username+' 文章'">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
    </mt-header>

    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="(item,index) in articleList">
        <mt-cell-swipe
          :right="[
    {
      content:'删除',
      style: { background: 'red', color: '#fff',textAlign: 'center',fontWeight: 'bold'},
      handler: ()=>handleDelete(item.id)
    }
  ]" v-if="isUser">
          <article-review :ArticleItem="item" :key="index" :index="index"></article-review>
        </mt-cell-swipe>

        <article-review :ArticleItem="item" :key="index" :index="index" v-else></article-review>
      </li>
    </ul>
  </div>

</template>

<script>
  import ArticleReview from '../components/ArticleReview'
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {MessageBox} from 'mint-ui';

  export default {
    name: "UserAllArticles",
    components: {
      ArticleReview
    },
    data() {
      return {
        articleList: [],
        loading: true,
        username: '',
        noMore: false
      }
    },
    computed: {
      url() {
        return this.$store.state.url + '/api/user_articles/' + this.$route.params.id
      },
      isLogin() {
        return this.$store.state.isLogin
      },
      isUser() {
        if (this.isLogin) {
          return this.$store.state.userID == this.$route.params.id;
        } else {
          return false
        }
      }
    },
    methods: {
      loadMore() {
        if (!this.noMore) {
          this.Loading = true;
          Indicator.open('加载中...');
          setTimeout(() => {
            this.axios.get(this.url, {
              params: {
                'start': this.articleList.length + 1,
                'end': this.articleList.length + 11
              }
            })
              .then((response) => {
                let tempData = response.data.ArticleList;
                this.noMore = response.data.noMore;
                for (let i = 0; i < tempData.length; i++) {
                  this.articleList.push(tempData[i]);
                }
                this.Loading = false;
                Indicator.close();
              })
              .catch((error) => {
                console.log(error);
                Indicator.close();
                Toast('网络连接失败，请检查网络连接后再试');
              });
          }, 10);
        } else {
          Toast('没有更多了')
        }
      },
      lastPage() {
        history.go(-1)
      },
      handleDelete(articleId) {
        MessageBox.confirm('删除后将无法还原！', '确定删除吗？')
          .then(action => {
            Indicator.open('删除中，请稍等');
            this.axios.get(this.$store.state.url + '/api/delete_article/' + articleId)
              .then(resp => {
                Indicator.close();
                if (resp.data.result) {
                  Toast('删除成功');
                  location.reload()
                } else {
                  Toast('删除失败，失败原因：' + resp.data.failCode)
                }
              })
              .catch(err => {
                Indicator.close();
                console.log(err);
                Toast('网络连接失败，请检查网络连接后再试')
              })
          })
          .catch(cancel => {
            Toast('取消')
          })
      }
    },
    mounted() {
      Indicator.open('加载中...');
      this.axios.get(this.url, {timeout: 2500})
        .then((response) => {
          Indicator.close();
          this.articleList = response.data.ArticleList;
          this.username = response.data.username;
          this.loading = false;
          this.noMore = response.data.noMore;
        })
        .catch((error) => {
          console.log(error);
          Indicator.close();
          Toast('网络连接失败，请检查网络连接后再试');
        });
    }
  }
</script>

<style scoped>

</style>
