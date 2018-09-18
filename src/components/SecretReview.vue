<template>
  <div class="review">
    <router-link :to="'/secret/'+ArticleItem.id">
      <div class="title" v-if="ArticleItem.title!==''"><span v-text="ArticleItem.title"></span></div>
      <hr v-if="ArticleItem.title!==''">
      <div class="content"><span v-text="ArticleItem.content"></span></div>
      <hr v-if="ArticleItem.title===''">
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
    name: "SecretReview",
    props: {
      ArticleItem: {
        type: Object,
        default: {
          title: '',
          content: '',
          like: '0',
          time: '2018-9-4 21:31',
          id: 1,
        }
      },
      timeOut:{
        type:Number,
        default:50
      }

    },
    data() {
      return {
        isLiked:false,
        like:0
      }
    },
    computed:{
      isLogin() {
        return this.$store.state.isLogin
      },
      likeSecrets() {
        return this.$store.state.userLikeSecrets
      },
      url(){
        return this.$store.state.url
      }
    },
    methods: {
      clickLike() {
        if (this.isLiked === false) {
          this.axios.get(this.url+'/api/like_secret/'+this.ArticleItem.id,{timeout:2500})
            .then(resp=>{
              if(resp.data.success){
                this.$store.commit('addUserLikeSecrets', this.ArticleItem.id);
                this.isLiked = !this.isLiked;
                this.like++
              }
            })
            .catch(err=>{
              console.log(err);
              Toast('网络连接失败，请检查网络后再试')
            });
        } else {
          this.axios.get(this.url+'/api/unlike_secret/'+this.ArticleItem.id,{timeout:2500})
            .then(resp=>{
              if(resp.data.success){
                for (let i = 0; i < this.likeSecrets.length; i++) {
                  if (this.likeSecrets[i] === this.ArticleItem.id) {
                    this.isLiked = true;
                    this.$store.commit('popUserLikeSecrets',i);
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
      setTimeout(()=>{
        for (let i = 0; i < this.likeSecrets.length; i++) {
          console.log('SecretReview mounted circled number:'+i);
          if (this.likeSecrets[i] === this.ArticleItem.id) {
            this.isLiked = true;
            break
          }
        }
        this.like=this.ArticleItem.like;
      },this.timeOut);
    }
  }
</script>

<style scoped>
  .liked {
    color: red;
  }

  .like {
    float: left;
    font-size: 1em;
    cursor: pointer;
  }

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

  .content {
    text-align: justify;
    text-indent: 2em;
    color: black;
  }

  .time {
    float: right;
    color: dimgrey;
  }

  .time-like {
    margin: 15px 0;
  }

  a {
    text-decoration: none !important;
  }
</style>
