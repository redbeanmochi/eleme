<template>
  <div id="app">
    <!-- 将数据绑定在 v-head 组件上，传递到 v-head 组件内 -->
    <v-head v-bind:seller="seller"></v-head>

    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import head from './components/head.vue';

  export default{
    created: function () {
      this.$http.get('/api/seller').then((response) => {
          // 解析结果转换为 json 格式
          response = response.body;
          this.seller = response;
        },
        (response) => {
          // 错误的处理
        })
    },
    data: function () {
      return {
        seller: {}
      }
    },
    components: {
      'v-head': head
    }
  }
</script>

<style type="text/css">
  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    position: relative;
  }

  .tab:after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, 0.1);
  }

  @media (-webkit-min-device-pixel-ratio: 1.5) {
    .border-1px:after {
      -webkit-transform: scaleY(0.7);
      -moz-transform: scaleY(0.7);
      -ms-transform: scaleY(0.7);
      -o-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }

  @media (-webkit-min-device-pixel-ratio: 2) {
    .border-1px:after {
      -webkit-transform: scaleY(0.5);
      -moz-transform: scaleY(0.5);
      -ms-transform: scaleY(0.5);
      -o-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }

  .border-1px {

  }

  .tab-item {
    flex: 1;
    text-align: center;
  }

  .tab-item a {
    display: block;
    text-decoration: none;
    font-size: 14px;
    color: rgb(77, 85, 93);
  }

  .tab-item a.active {
    color: rgb(240, 20, 20);
  }
</style>
