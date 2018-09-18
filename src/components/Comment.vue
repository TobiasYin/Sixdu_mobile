<template>
  <div class="review">
    <div class="content"><span v-text="ArticleItem.content"></span></div>
    <hr>
    <div class="author"><span v-text="ArticleItem.author"></span></div>
    <div class="time"><span v-text="ArticleItem.time"></span></div>
  </div>
</template>

<script>
  export default {
    name: 'Comment',
    props: {
      ArticleItem: {
        type: Object,
        default() {
          return {
            author: '',
            content: '',
            time: '2018-9-4 21:31'
          }
        },
      },
    },
    data() {
      return {}
    },
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
  }

  .content {
    text-align: justify;
    text-indent: 2em;
  }


  .time {
    float: left;
    color: dimgrey;
    margin: 10px 0;
  }

</style>
