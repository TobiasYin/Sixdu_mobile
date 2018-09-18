<template>
  <div class="register-page">
    <mt-header title="注册">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
    </mt-header>
    <div class="login">
      <div class="review">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
        <!--</div>-->
        <!--<div class="review">-->
        <mt-field label="密码" placeholder="请输入密码(大于六位)" type="password" v-model="password"></mt-field>
        <mt-field label="确认密码" placeholder="请再次输入密码" type="password" v-model="rePassword"
                  :state="passwordState"></mt-field>
        <mt-field label="验证码" v-model="checkCode" :state="checkCodeState">
          <img :src="checkCodeURL" height="45px" width="100px" @click="getCheckCode">
        </mt-field>
      </div>
      <div class="button-outside">
        <mt-button type="primary" size="large" @click="register">注册</mt-button>
      </div>
      <div class="button-outside">
        <mt-button type="default" size="large" style="line-height: 41px" @click="toLoginPage">已有账号？点击这里登陆吧！</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {Indicator} from 'mint-ui';
  import {Toast} from 'mint-ui';

  export default {
    name: "RegisterPage",
    data() {
      return {
        username: '',
        password: '',
        rePassword: '',
        checkCodeURL: '',
        checkCode: '',
        // url: 'http://127.0.0.1:5000/api/register',
        MD5: '',
        checkCodeMD5: ''

      }
    },
    computed: {
      passwordState() {
        if (this.password.length === 0 || this.rePassword.length === 0) {
          return ''
        } else if (this.password === this.rePassword) {
          if (this.password.length > 6) {
            return 'success'
          } else {
            return 'error'
          }

        } else {
          return 'error'
        }
      },
      checkCodeState() {
        if (this.checkCode.length !== 0) {
          if (this.isCheckCodeRight()) {
            return 'success'
          } else {
            return 'error'
          }
        } else {
          return ''
        }
      },
      url(){
        return this.$store.state.url+'/api'+this.$route.path
      },
      isLogin(){
        return this.$store.state.isLogin
      }
    },
    methods: {
      lastPage() {
        history.go(-1)
      },
      toLoginPage() {
        this.$router.push('/login')
      },
      isCheckCodeRight() {
        this.checkCodeMD5 = hex_md5(this.checkCode.toLowerCase());
        return this.checkCodeMD5 === this.MD5;
      },
      getCheckCode() {
        Indicator.open('加载中...');
        this.axios.get(this.url, {timeout: 2500})
          .then((resp) => {
            this.checkCodeURL = this.$store.state.url + resp.data.url;
            this.MD5 = resp.data.md5;
            Indicator.close();
          })
          .catch((error) => {
            console.log(error);
            Toast('请求验证码失败');
            Indicator.close();
          });
      },
      register() {
        if (this.passwordState === 'success' && this.checkCodeState === 'success' && this.username.length !== 0){
          Indicator.open('提交中...');
          this.axios.post(this.url, {
            "password": this.password,
            "rePassword": this.rePassword,
            "check_code": this.checkCode,
            "username": this.username
          }, {timeout: 2500})
            .then((resp) => {
              Indicator.close();
              let temp = resp.data;
              if (temp.registerState) {
                Toast('注册成功');
                this.$router.push('/login')
              } else {
                Toast('注册失败!原因:' + temp.failCode);
                this.getCheckCode();
              }
            })
            .catch((err) => {
              console.log(err);
              Indicator.close();
              Toast('提交失败,请检查网络后再试...');
            })
        }else {
          if(this.passwordState === 'error'){
            Toast('两次输入密码不一致或密码小于七位')
          }else if(this.checkCodeState === 'error'){
            Toast('验证码输入错误，请检查后重试')
          }else if (this.username.length === 0) {
            Toast('用户名不能为空')
          }else if(this.checkCode.length === 0){
            Toast('验证码不能为空')
          }else{
            Toast('未知错误')
          }
        }
      }
    },
    mounted() {
      this.getCheckCode();
    },
    beforeMount(){
      if(this.isLogin){
        Toast('登陆后不能访问注册页面');
        this.$router.push('/mine')
      }
    },
  }
  var hexcase = 0;
  function hex_md5(s) {
    return rstr2hex(rstr_md5(str2rstr_utf8(s)));
  }
  function rstr_md5(s) {
    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
  }
  function rstr2hex(input) {
    try {
      hexcase
    } catch (e) {
      hexcase = 0;
    }
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var output = "";
    var x;
    for (var i = 0; i < input.length; i++) {
      x = input.charCodeAt(i);
      output += hex_tab.charAt((x >>> 4) & 0x0F)
        + hex_tab.charAt(x & 0x0F);
    }
    return output;
  }
  function str2rstr_utf8(input) {
    var output = "";
    var i = -1;
    var x, y;

    while (++i < input.length) {
      /* Decode utf-16 surrogate pairs */
      x = input.charCodeAt(i);
      y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
      if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
        x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
        i++;
      }

      /* Encode output as utf-8 */
      if (x <= 0x7F)
        output += String.fromCharCode(x);
      else if (x <= 0x7FF)
        output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
          0x80 | (x & 0x3F));
      else if (x <= 0xFFFF)
        output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
          0x80 | ((x >>> 6) & 0x3F),
          0x80 | (x & 0x3F));
      else if (x <= 0x1FFFFF)
        output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
          0x80 | ((x >>> 12) & 0x3F),
          0x80 | ((x >>> 6) & 0x3F),
          0x80 | (x & 0x3F));
    }
    return output;
  }
  function rstr2binl(input) {
    var output = Array(input.length >> 2);
    for (var i = 0; i < output.length; i++)
      output[i] = 0;
    for (var i = 0; i < input.length * 8; i += 8)
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
    return output;
  }
  function binl2rstr(input) {
    var output = "";
    for (var i = 0; i < input.length * 32; i += 8)
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
    return output;
  }
  function binl_md5(x, len) {
    /* append padding */
    x[len >> 5] |= 0x80 << ((len) % 32);
    x[(((len + 64) >>> 9) << 4) + 14] = len;

    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;

    for (var i = 0; i < x.length; i += 16) {
      var olda = a;
      var oldb = b;
      var oldc = c;
      var oldd = d;

      a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
      d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
      c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
      b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
      a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
      d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
      c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
      b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
      a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
      d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
      c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
      b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
      a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
      d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
      c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
      b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

      a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
      d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
      c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
      b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
      a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
      d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
      c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
      b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
      a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
      d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
      c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
      b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
      a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
      d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
      c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
      b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

      a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
      d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
      c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
      b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
      a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
      d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
      c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
      b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
      a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
      d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
      c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
      b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
      a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
      d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
      c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
      b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

      a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
      d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
      c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
      b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
      a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
      d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
      c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
      b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
      a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
      d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
      c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
      b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
      a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
      d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
      c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
      b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

      a = safe_add(a, olda);
      b = safe_add(b, oldb);
      c = safe_add(c, oldc);
      d = safe_add(d, oldd);
    }
    return Array(a, b, c, d);
  }
  function md5_cmn(q, a, b, x, s, t) {
    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
  }

  function md5_ff(a, b, c, d, x, s, t) {
    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
  }

  function md5_gg(a, b, c, d, x, s, t) {
    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
  }

  function md5_hh(a, b, c, d, x, s, t) {
    return md5_cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function md5_ii(a, b, c, d, x, s, t) {
    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
  }

  function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
  }
  function bit_rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
  }
</script>

<style scoped>
  .review {
    margin: 20px 15px;
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
