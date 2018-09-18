<template>
  <div class="page">
    <mt-header title="发表文章">
      <mt-button icon="back" slot="left" style="line-height: 14px" @click="lastPage">返回</mt-button>
      <mt-button slot="right" @click="publish">发送&nbsp;<span class="glyphicon glyphicon-send" aria-hidden="true"></span>
      </mt-button>
    </mt-header>
    <div>
      <mavon-editor v-model="articleContent" :subfield="false" defaultOpen="edit" :toolbars="toolbars"
                    @imgAdd="$imgAdd" ref=mda></mavon-editor>
    </div>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import {Toast} from 'mint-ui';
  import {Indicator} from 'mint-ui';

  export default {
    name: "NewArticlePage",
    data() {
      return {
        articleContent: '',
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: false, // 下划线
          strikethrough: true, // 中划线
          mark: false, // 标记
          superscript: false, // 上角标
          subscript: false, // 下角标
          quote: true, // 引用
          ol: true, // 有序列表
          ul: true, // 无序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          code: true, // code
          table: true, // 表格
          fullscreen: false, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          htmlcode: true, // 展示html源码
          help: true, // 帮助
          /* 1.3.5 */
          undo: true, // 上一步
          redo: true, // 下一步
          trash: true, // 清空
          save: false, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true, // 导航目录
          /* 2.1.8 */
          alignleft: false, // 左对齐
          aligncenter: false, // 居中
          alignright: false, // 右对齐
          /* 2.2.1 */
          subfield: true, // 单双栏模式
          preview: true, // 预览
        },
        img_file: []
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin
      },
      url() {
        return this.$store.state.url + '/api' + this.$route.path
      },
    },
    methods: {
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
      $imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        let formData = new FormData();
        formData.append('image', $file);
        this.axios({
          url: this.$store.state.url + '/api/upload_img',
          method: 'post',
          data: formData,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then(resp => {
          // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
          // $vm.$img2Url 详情见本页末尾
          if (resp.data.success) {
            this.$refs.mda.$img2Url(pos, resp.data.path);
          } else {
            this.$refs.mda.$refs.toolbar_left.$imgDelByFilename($file.filename);
            Toast('上传失败，失败原因:' + resp.data.failCode)
          }
        })
          .catch(err => {
            console.log(err);
            Toast('网络连接失败，请检查网络连接后重试')
          })
      },
      publish() {
        if (this.articleContent !== '') {
          MessageBox.prompt('请输入标题')
            .then(({value, action}) => {
              if (value !== null) {
                console.log(value);
                Indicator.open('发布中...');
                this.axios.post(this.url, {
                  'articleContent': this.articleContent,
                  'title': value
                })
                  .then(resp => {
                    Indicator.close();
                    let temp = resp.data;
                    if (temp.isPublished) {
                      Toast('发布成功');
                      this.$router.push('/article/' + temp.articleID)
                    } else {
                      Toast("发布失败!失败原因：" + temp.failCode)
                    }
                  })
                  .catch(err => {
                    console.log(err);
                    Indicator.close();
                    Toast('网络连接失败，请检查网络设置！')
                  })
              } else {
                MessageBox.alert('标题不能为空！', '提示');
              }
            })
            .catch(cancel => {
              Toast('取消')
            });
        } else {
          MessageBox.alert('不能发布空的文章！', '提示');
        }
      }
    },
    mounted() {
      setTimeout(() => {
        if (!this.isLogin) {
          Toast('登陆才能发布文章');
          this.$router.push('/login')
        }
      }, 300);
    }
  }
</script>

<style scoped>
  .page ul li {
    list-style: disc;
  }
</style>
