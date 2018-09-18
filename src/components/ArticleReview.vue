<template>
  <div class="review" :class="aninateIn">
    <router-link :to="'/article/'+ArticleItem.id">
      <div class="title"><span v-text="ArticleItem.title"></span></div>
    </router-link>
    <router-link :to="'/user/'+ArticleItem.authorID">
      <div class="author"><span v-text="ArticleItem.author"></span></div>
    </router-link>
    <router-link :to="'/article/'+ArticleItem.id">
      <div>
        <hr>
        <div class="content"><span v-text="ArticleItem.content"></span></div>
      </div>
    </router-link>
    <div class="time-like">
      <div class="time"><span v-text="ArticleItem.time"></span></div>
      <div class="like" :class="{liked:isLiked}" @click="clickLike"><span class="glyphicon glyphicon-heart"
                                                                          aria-hidden="true">&nbsp;</span><span
        v-text="like"></span></div>
    </div>
  </div>

</template>

<script>
  import {Toast} from 'mint-ui'
  export default {
    name: 'ArticleReview',
    props: {
      ArticleItem: {
        type: Object,
        default() {
          return {
            title: '',
            author: '',
            content: '',
            like: 0,
            time: '2018-9-4 21:31',
            id: 1,
            authorID: 1
          }
        },
      },
      index: {
        type: Number,
        default: 1
      },
      timeOut:{
        type:Number,
        default:50
      }
    },
    data() {
      return {
        isLiked: false,
        like:0
      }
    },
    computed: {
      aninateIn() {
        if (this.index % 2) {
          return ''//'animated fadeInRight'
        } else {
          return ''//'animated fadeInLeft'
        }
      },
      isLogin() {
        return this.$store.state.isLogin
      },
      likeArticles() {
        return this.$store.state.userLikeArticles
      },
      url(){
        return this.$store.state.url
      }
    },
    methods: {
      clickLike() {
        // console.log('clickLike');
        if (this.isLiked === false) {
          // console.log('this.isLiked=false');
          this.axios.get(this.url+'/api/like_article/'+this.ArticleItem.id,{timeout:2500})
            .then(resp=>{
              if(resp.data.success){
                // console.log('return true');
                this.$store.commit('addUserLikeArticles', this.ArticleItem.id);
                this.isLiked = !this.isLiked;
                this.like++;
                console.log('this.isLiked:'+this.isLiked);
              }
            })
            .catch(err=>{
              console.log(err);
              Toast('网络连接失败，请检查网络后再试')
            });
        } else {
          // console.log('this.isLiked=true');
          this.axios.get(this.url+'/api/unlike_article/'+this.ArticleItem.id,{timeout:2500})
            .then(resp=>{
              if(resp.data.success){
                console.log('return true');
                for (let i = 0; i < this.likeArticles.length; i++) {
                  if (this.likeArticles[i] === this.ArticleItem.id) {
                    this.isLiked = true;
                    this.$store.commit('popUserLikeArticles',i);
                    break
                  }
                }
                this.isLiked = !this.isLiked;
                this.like--
              }
            })
            .catch(err=>{
              console.log(err);
              Toast('网络连接失败，请检查网络后再试')
            });
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.like = this.ArticleItem.like;
        for (let i = 0; i < this.likeArticles.length; i++) {
          // console.log('ArticleReview mounted circled number:' + i);
          if (this.likeArticles[i] === this.ArticleItem.id) {
            this.isLiked = true;
            break
          }
        }
      },this.timeOut)
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

  .title {
    font-size: 2.5em;
    color: rgba(46, 110, 206, 0.98);
  }

  .author {
    font-size: 1em;
    float: right;
    color: #006;
  }

  .content {
    text-align: justify;
    text-indent: 2em;
    color: black;
  }

  .like {
    float: left;
    font-size: 1em;
    cursor: pointer;
  }

  .time {
    float: right;
    color: dimgrey;
  }

  .time-like {
    margin: 10px 0px;
  }

  .liked {
    color: red;
  }

  a {
    text-decoration: none !important;
  }

  .author {
    color: dimgrey;
  }
</style>
