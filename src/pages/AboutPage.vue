<template>
  <div class="page">
    <mt-header title="关于六度">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
    </mt-header>
    <div class="review title">欢迎来到六度!</div>
    <div class="review"><p>
      你一定听说过六度分隔理论(Six Degrees of Separation),如果没有听过,也没有关系,简单地说："你和任何一个陌生人之间所间隔的人不会超过六个，也就是说，最多通过六个人你就能够认识任何一个陌生人。"</p>

      <p>本站可以给陌生的,或者已经熟识的各位提供一个重新认识的机会.建立一个全新的,匿名的关系网.当全网的关系符合六度分割理论时,即完成了本站建立的初衷.
      </p></div>
    <div class="review title">技术相关</div>
    <div class="review"><p>本站移动端前端采用vue.js框架开发，后端采用python flask框架开发，找到了性能和效率的完美契合点，使用了一些开源的组件，感谢作者们。</p>
      <p>桌面端网站前端采用HTML+CSS+JavaScript技术开发,其中使用少量BootStrap组件.</p>
      <p>当然这是一个大学生假期闲得慌做出来的小网站,网站的前端,后端,设计,素材均由一个人完成,所以可能会有各种各样的bug.如果你在使用过程中,不幸遇到了bug,你可以给我发邮件.点击Connect me.</p>
      <p>
        想要了解网站更多的细节，或者查看网站的源代码，可以点击<a href="https://github.com/TobiasYin/Sixdu_mobile" >here</a>前往github页面了解更多手机端前端详情和细节。
        点击<a href="https://github.com/TobiasYin/sixdu">here</a>可以了解更多服务器后端代码和电脑端页面的更多详情
      </p>
    </div>
    <div class="review title">更新日志</div>
    <div class="review">
      <div class="time">2018-9-24</div>
      <hr>
      <p>修复电脑端bug少许</p>
    </div>
    <div class="review">
      <div class="time">2018-9-13</div>
      <hr>
      <p>移动端发布界面支持图片上传功能，欢迎大家体验</p>
      <p>增加密码修改接口</p>
      <p>优化移动端滑动体验，让页面切换及滑动更加流畅</p>
      <p>修复bug若干</p>
    </div>
    <div class="review">
      <div class="time">2018-9-12</div>
      <hr>
      <p>推出全新的移动版网页，界面全新设计，使用全新UI，带来无限接近原生APP的体验。</p>
      <p>移动端新增树洞功能，可以分享你心中的小秘密。</p>
      <p>网站采用PWA技术打包而成，所以可以发送到桌面获取接近原生APP的体验</p>
      <p>安卓用户可使用Google Chrome或者夸克浏览器等内核较新的浏览器，点击发送到桌面快捷方式或添加到主屏幕等按钮，通过主屏幕的图标进入，可获取最好体验。</p>
      <p>IOS用户请使用safari浏览器打开，点击分享按钮添加到主屏幕。</p>
    </div>
    <div class="review">
      <div class="time">2018-7-26</div>
      <hr>
      <p>修复bug若干</p>
      <p>调整了一些地方的样式，使网站看起来更顺眼</p>
      <p>由于导航栏图标难以辨认，于是增加鼠标悬浮时的提醒，增加可辨认性</p>
    </div>
    <div class="review">
      <div class="time">2018-7-24</div>
      <hr>
      <p>修复bug若干，优化代码，重构了一些组件</p>
      <p>优化markdown解析方式，全面支持表格等格式</p>
      <p>重构发布组件，将某些错误界面植入提交页面，减少跳转操作，减轻服务器负担，并提升用户体验</p>
      <p>更新网站界面，采用了新的banner图</p>
    </div>
    <div class="review">
      <div class="time">2018-7-18</div>
      <hr>
      <p>新增关注功能和取消关注功能,为建构人际关系网迈出重要一步!</p>
      <p>重新设计导航栏UI,使用更加漂亮直观的图标形式.</p>
      <p>更换某些组件为图标形式,增加网站易用性</p>
    </div>
    <div class="review">
      <div class="time">2018-7-17</div>
      <hr>
      <p class="contents">修复bug若干,清除了主页精选栏内的html标签,优化主页精选栏目显示模式</p>
      <p class="contents">新增删除功能,在个人主义,全部文章,随笔等界面下,登陆后可看见自己的文章,随笔,评论下面会有删除按钮</p>
      <p class="contents">新增文章评论功能,在登陆情况下,登陆文章详情界面可以看见评论框,欢迎大家踊跃评论</p>
      <p class="contents">新增注册时密码验证功能,防止注册时手滑输错密码</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "AboutPage",
    methods:{
      lastPage(){
        history.go(-1)
      }
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

  .review p {
    text-indent: 2em;
  }

  .time {
    font-size: 1.5em;
    color: rgba(46, 110, 206, 0.98);
  }
</style>
