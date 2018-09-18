<template>
  <div class="page">
    <mt-header :title="title">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
      <mt-button slot="right" class="btn" @click="share" :data-clipboard-text="clipBoardData"><span
        class="glyphicon glyphicon-share"
        aria-hidden="true"></span></mt-button>
    </mt-header>

    <div class="title review" v-if="articleData.title!==''"><span v-text="articleData.title"></span></div>
    <div class="review" v-if="articleData.title!==''"><div class="time" v-text="articleData.time"></div></div>
    <div class="review">
      <div class="content">
        <div v-html="articleData.content"></div>
      </div>
      <div class="like" @click="clickLike" :class="{liked:isLiked}"><span class="glyphicon glyphicon-heart"
                                                                          aria-hidden="true"></span>&nbsp;<span
        v-text="articleData.like"></span></div>
    </div>
    <div class="review" v-if="articleData.title===''"><div class="time" v-text="articleData.time"></div></div>
    <hr>
    <div class="comment">
      <div class="title review">评论</div>
      <div class="review" v-if="isLogin">
        <mt-field label="" placeholder="请输入评论的内容" type="textarea" rows="4" v-model="commentContent"></mt-field>
        <mt-button type="default" size="large" @click="publishNewComment">发送</mt-button>
      </div>
      <div v-else class="button-outside">
        <mt-button type="default" size="large" style="line-height: 41px" @click="toLoginPage">点击登陆即可发送评论</mt-button>
      </div>
      <ul>
        <li v-for="item in articleData.comment">
          <secret-comment :ArticleItem="item"></secret-comment>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import SecretComment from '../components/SecretComment';
  import {MessageBox} from 'mint-ui'
  import ClipboardJS from 'clipboard'

  export default {
    name: "SecretPage",
    components: {
      SecretComment,
    },
    data() {
      return {
        articleData: {},
        // url: 'http://127.0.0.1:5000/article/' + this.$route.params.id,
        isLiked: false,
        // isLogin: false,
        commentContent: ''
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin
      },
      url() {
        return this.$store.state.url + '/api' + this.$route.path
      },
      clipBoardData() {
        return '六度，连接你我。\n' +
          '世界这么大，总有知你懂你之人。写下你的心声，寻找那个填补你心灵空缺的灵魂，愿我们都能拥有那奇迹般的瞬间！\n '+this.title+':'+this.$store.state.url + '/#' + this.$route.path
      },
      likeSecrets() {
        return this.$store.state.userLikeSecrets
      },
      title(){
        if(this.articleData.title===''){
          return '神秘树洞'
        }else {
          return this.articleData.title
        }
      }
    },
    methods: {
      clickLike() {
        if (this.isLiked === false) {
          this.axios.get(this.$store.state.url + '/api/like_secret/' + this.$route.params.id, {timeout: 2500})
            .then(resp => {
              if (resp.data.success) {
                this.$store.commit('addUserLikeSecrets', this.articleData.id);
                this.isLiked = !this.isLiked;
                this.articleData.like++
              }
            })
            .catch(err => {
              console.log(err);
              Toast('网络连接失败，请检查网络后再试')
            });
        } else {
          this.axios.get(this.$store.state.url + '/api/unlike_secret/' + this.$route.params.id, {timeout: 2500})
            .then(resp => {
              if (resp.data.success) {
                for (let i = 0; i < this.likeSecrets.length; i++) {
                  if (this.likeSecrets[i] === this.articleData.id) {
                    this.isLiked = true;
                    this.$store.commit('popUserLikeSecrets', i);
                    break
                  }
                }
                this.isLiked = !this.isLiked;
                this.articleData.like--
              }
            })
            .catch(err => {
              console.log(err);
              Toast('网络连接失败，请检查网络后再试')
            });
        }
      },
      lastPage() {
        history.go(-1)
      },
      toLoginPage() {
        this.$router.push('/login')
      },
      share() {
        let clipboard = new ClipboardJS('.btn');
        clipboard.on('success', function (e) {
          MessageBox.alert('已复制链接，粘贴可分享给好友', '提示');
          e.clearSelection();
        });
        clipboard.on('error', function (e) {
          MessageBox.alert('暂时不支持此浏览器的复制，请手动选择以下链接后再复制分享:\n' + this.clipBoardData, '提示');

        });
      },
      publishNewComment(){
        if(this.commentContent!==''){
          MessageBox.confirm('确认发送？')
            .then(action=>{
              Indicator.open('发送中...');
              this.axios.post(this.$store.state.url+'/api/new_secret_comment/'+this.$route.params.id,{
                'comment':this.commentContent
              },{timeout:2500})
                .then(resp=>{
                  Indicator.close();
                  if(resp.data.isPublish){
                    location.reload();
                    Toast('发布成功')
                  }else {
                    Toast('发布失败，失败原因：'+resp.data.failCode)
                  }
                })
                .catch(err=>{
                  console.log(err);
                  Indicator.close();
                  Toast('网络连接失败，请检查网络连接后重试')
                })
            })
            .catch(cancel=>{
              Toast('已取消')
            })
        }else {
          MessageBox.alert('不能发送空的评论！','提示')
        }
      }
    },
    mounted() {
      console.log(this.url);
      Indicator.open('加载中...');
      this.axios.get(this.url)
        .then((response) => {
          this.articleData = response.data;
          Indicator.close();
        })
        .catch((error) => {
          console.log(error);
          Indicator.close();
          Toast('网络连接失败，请检查网络连接后重试');
        });
      setTimeout(() => {
        for (let i = 0; i < this.likeSecrets.length; i++) {
          if (this.likeSecrets[i] === this.articleData.id) {
            this.isLiked = true;
            break
          }
        }
      }, 500);
    },
    // beforeRouteLeave(){
    //   this.$destroy();
    //   next()
    // }

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
    /*width: 100%;*/
  }

  .title {
    font-size: 2.5em;
    color: rgba(46, 110, 206, 0.98);
  }

  .time {
    float: right;
    font-size: 1em;
    color: dimgrey;
  }

  .content {
    text-align: justify;
    text-indent: 2em;
    font-size: 1.2em;
  }

  .content p {
    margin-left: 15px;
  }

  .like {
    float: right;
    font-size: 1em;
    cursor: pointer;
  }

  .liked {
    color: red;
  }

  .comment {
    margin: 0;
  }

  ul li {
    list-style: none;
  }

  ul {
    margin: 0;
    padding: 0;
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
    width: 80%;
  }

  .review .content img{
    width: 80%;
  }
  img{
    width: 80%;
  }
</style>
