<template>
  <div class="review" :class="aninateIn">
    <div class="content-author">
      <div class="content"><span v-html="ArticleItem.content"></span></div>
      <div class="author">—— &nbsp;<router-link :to="'/user/'+ArticleItem.authorID"><span
        v-text="ArticleItem.author"></span></router-link>
      </div>
    </div>
    <hr>
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
            author: '',
            content: '',
            like: 0,
            time: '2018-9-4 21:31',
            authorID: 1
          }
        },
      },
      index: {
        type: Number,
        default: 0
      },
      timeOut:{
        type:Number,
        default:50
      }
    },
    data() {
      return {
        isLiked: false,
        like: 0
      }
    },
    computed: {
      aninateIn() {
        if (this.index % 2) {
          return ''//'animated fadeInLeft'
        } else {
          return ''//'animated fadeInRight'
        }
      },
      isLogin() {
        return this.$store.state.isLogin
      },
      likeEssays() {
        return this.$store.state.userLikeEssays
      },
      url() {
        return this.$store.state.url
      }
    },
    methods: {
      clickLike() {
        if (this.isLiked === false) {
          this.axios.get(this.url + '/api/like_essay/' + this.ArticleItem.id, {timeout: 2500})
            .then(resp => {
              if (resp.data.success) {
                this.$store.commit('addUserLikeEssays', this.ArticleItem.id);
                this.isLiked = !this.isLiked;
                this.like++
              }
            })
            .catch(err => {
              console.log(err);
              Toast('网络连接失败，请检查网络后再试')
            });
        } else {
          this.axios.get(this.url + '/api/unlike_essay/' + this.ArticleItem.id, {timeout: 2500})
            .then(resp => {
              if (resp.data.success) {
                for (let i = 0; i < this.likeEssays.length; i++) {
                  if (this.likeEssays[i] === this.ArticleItem.id) {
                    this.isLiked = true;
                    this.$store.commit('popUserLikeEssays', i);
                    break
                  }
                }
                this.isLiked = !this.isLiked;
                this.like--
              }
            })
            .catch(err => {
              console.log(err);
              Toast('网络连接失败，请检查网络后再试')
            });
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.like = this.ArticleItem.like;
        for (let i = 0; i < this.likeEssays.length; i++) {
          // console.log('EssayReview mounted circled number:' + i);
          if (this.likeEssays[i] === this.ArticleItem.id) {
            this.isLiked = true;
            break
          }
        }
      }, this.timeOut)
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

  .author {
    font-size: 1em;
    float: right;
    /*margin-bottom: 10px;*/
  }

  .content {
    text-align: justify;
    text-indent: 2em;
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

  .content-author {
    overflow: auto;
  }

  .author a {
    color: dimgrey;
  }
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
