<template>
  <!--<index-layout selected="essays">-->
  <!--<keep-alive>-->
    <ul
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
      <li v-for="(item,index) in articleList">
        <essay-review :ArticleItem="item" :key="index" :index="index"></essay-review>
      </li>
    </ul>
  <!--</keep-alive>-->

  <!--</index-layout>-->
</template>

<script>
  // import IndexLayout from '../components/IndexLayout';
  import EssayReview from '../components/EssayReview';
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    components: {
      // IndexLayout,
      EssayReview
    },
    name: "EssaysPage",
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
      }
    },
    beforeMount() {
      this.axios.get(this.url, {timeout: 2500})
        .then((response) => {
          this.articleList = response.data.ArticleList;
          this.noMore=response.data.noMore;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          Toast('网络连接失败，请检查网络连接后再试');
        });
    },
    // beforeRouteUpdate() {
    //   if (this.$route.path !== '/essays') {
    //     this.loading = true
    //   }
    // }

  }
</script>

<style scoped>
  .review img{
    width: 80%;
  }

  .review .content img{
    width: 80%;
  }
  img{
    width: 80%;
  }
</style>
