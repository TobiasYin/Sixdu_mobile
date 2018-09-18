<template>
  <div class="page">
    <mt-header :title="title">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
      <mt-button slot="right" @click="publish">发送&nbsp;<span class="glyphicon glyphicon-send" aria-hidden="true"></span>
      </mt-button>
    </mt-header>
    <div class="review">
      <mt-field placeholder="请输入你的签名！字数限制在300字以内" type="textarea" rows="25" v-model="introduction"></mt-field>
    </div>
  </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {MessageBox} from 'mint-ui'
  import {Indicator} from 'mint-ui'


  export default {
    name: "NewSelfIntroducePage",
    data(){
      return {
        introduction:'',
        title:'签名'
      }
    },
    computed:{
      url(){
        return this.$store.state.url+'/api/change_self_intro'
      },
      isLogin(){
        return this.$store.state.isLogin
      }
    },
    watch: {
      introduction: function (val) {
        if (val.length !== 0) {
          this.title = val.length + '/300';
          if (val.length > 300) {
            this.introduction = this.introduction.slice(0, 300);
            Toast({message: '超过字数限制！', position: 'bottom'})
          }
        }
      }
    },
    methods:{
      lastPage() {
        if (this.articleContent !== '') {
          MessageBox.confirm('确定执行此操作,你输入的内容将不会被保存?').then(action => {
            history.go(-1)
          }).catch(cancel => {
            Toast('取消')
          });
        } else {
          history.go(-1)
        }
      },
      publish(){
        MessageBox.confirm('确认发送？')
          .then(action=>{
            Indicator.open('发送中...');
            this.axios.post(this.url,{
            'selfIntro':this.introduction
            },{timeout:2500})
              .then(resp=>{
                Indicator.close();
                if(resp.data.isPublished){
                  Toast('发送成功');
                  history.go(-1)
                }else {
                  Toast('发送失败，失败原因：'+resp.data.failCode)
                }
              })
              .catch(err=>{
                Indicator.close();
                console.log(err);
                Toast('网络连接失败，请检查网络后重试')
              })
          })
      }
    },
    mounted(){
      setTimeout(() => {
        if (!this.isLogin) {
          Toast('登陆才能发布签名');
          this.$router.push('/login')
        }
      }, 300);
      this.axios.get(this.url)
        .then(resp=>{
        this.introduction=resp.data.selfIntro
      })
        .catch(err=>{
          console.log(err);
          Toast('网络连接错误，请检查网络连接后重试。')
        })
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
</style>
