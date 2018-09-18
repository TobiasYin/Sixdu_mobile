<template>
  <!--<index-layout selected="articles">-->
  <!--<keep-alive>-->
  <div class="page">
    <mt-header title="树洞空间">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
    </mt-header>
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="(item,index) in articleList">
        <secret-review :ArticleItem="item" :key="index" :index="index"></secret-review>
      </li>
    </ul>
  </div>

  <!--</keep-alive>-->

  <!--</index-layout>-->
</template>

<script>
  // import IndexLayout from '../components/IndexLayout';
  import SecretReview from '../components/SecretReview';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    components: {
      // IndexLayout,
      SecretReview
    },
    name: "SecretsPage",
    data() {
      return {
        articleList: [],
        loading: true,
        noMore:false
        // url: 'http://127.0.0.1:5000'
      }
    },
    computed: {
      url() {
        return this.$store.state.url + '/api' + this.$route.path
      },
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
      lastPage(){
        history.go(-1)
      }
    },
    mounted() {
      Indicator.open('加载中...');
      this.axios.get(this.url, {timeout: 2500})
        .then((response) => {
          Indicator.close();
          this.articleList = response.data.ArticleList;
          this.noMore=response.data.noMore;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          Indicator.close();
          Toast('网络连接失败，请检查网络连接后再试');
        });
    },

  }
</script>

<style scoped>

</style>
