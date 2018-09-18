<template>
  <div class="login-page">
    <mt-header title="登陆">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
    </mt-header>
    <div class="login">
      <div class="review">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
      <!--</div>-->
      <!--<div class="review">-->
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password" :state="passwordState"></mt-field>
        <mt-cell title="记住密码"><mt-switch v-model="isRemember"></mt-switch></mt-cell>
      </div>
      <div class="button-outside">
        <mt-button type="primary" size="large" @click="login">登陆</mt-button>
      </div>
      <div class="button-outside">
        <mt-button type="default" size="large" style="line-height: 41px" @click="toRegisterPage">没有账号？点击这里，注册一个吧！</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: "LoginPage",
    data() {
      return {
        username: '',
        password: '',
        isRemember:false
      }
    },
    computed: {
      // pageSize() {
      //   console.log((this.innerH - 76 - 40 - 207) / 2);
      //   return 'margin-top:' + (this.innerH - 76 - 40 - 207) / 2+'px';
      // },
      // innerH() {
      //   return window.innerHeight
      //     || document.documentElement.clientHeight
      //     || document.body.clientHeight;
      // }
      passwordState(){
        if(this.password.length<7&&this.password.length!==0){
          return 'error'
        }else {
          return ''
        }
      },
      isLogin(){
        return this.$store.state.isLogin
      },
      url(){
        return this.$store.state.url+'/api/login'
      }
    },
    methods:{
      lastPage(){
        history.go(-1)
      },
      toRegisterPage(){
        this.$router.push('/register')
      },
      login(){
        if(this.passwordState!=='error'&&this.username.length!==0){
          Indicator.open('登录中');
          this.axios.post(this.url,{
            'username':this.username,
            'password':this.password,
            'isRemember':this.isRemember
          },{timeout:2500})
            .then((resp)=>{
              Indicator.close();
              // console.log(resp.data);
              let temp=resp.data;
              if(resp.data.isLogin){
                Toast('登陆成功');
                this.$store.commit('login');
                this.$store.commit('setUsername',temp.username);
                this.$store.commit('setUserID',temp.userID);
                history.go(-1);
                setTimeout(()=>{location.reload()},100);
                if(this.$route.path==='/register'){
                  history.go(-1);
                }
              }else {
                Toast('登陆失败！失败原因：'+resp.data.failCode)
              }
            })
            .catch((err)=>{
              console.log(err);
              Indicator.close();
              Toast('提交失败，请检查网络后重试...')
            })
        }
      }
    },
    beforeMount(){
      if(this.isLogin){
        Toast('登陆后不能访问登陆页面');
        this.$router.push('/mine')
      }
    }
  }
</script>

<style scoped>
  .review {
    margin:20px 15px;
    background: #fff;
    border-radius: 15px;
    padding: 20px;
    overflow: auto;
    box-shadow: darkgrey 10px 10px 20px 5px;
  }

  .title {
    font-size: 2.5em;
    text-align: center;
    color: rgba(46, 110, 206, 0.98);
  }

  .button-outside {
    margin: 60px 15px;
    background: transparent;
    box-shadow: darkgrey 10px 10px 20px 5px;
    border-radius: 15px;
    font-size: 20px;
    line-height: 20px;
  }
</style>
