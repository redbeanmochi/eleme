<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img alt="" width="64" height="64" :src="seller.avatar">
      </div>

      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>

        <div class="description">{{ seller.description}}/{{ seller.deliveryTime }}分钟送达</div>

        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>

      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{ seller.supports.length }}个 ></span>
      </div>

    </div>

    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span>
      <span class="bulletin-content">{{ seller.bulletin }}</span>
      <span class="bulletin-details"> > </span>
    </div>

    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>

    <div v-show="detailShow" class="details">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <p class="detail-name">{{ seller.name }}</p>

          <div class="star-wrapper">
            <!--Star 组件引用-->
            <Star :size="48" :score="seller.score"></Star>
          </div>

          <div class="detail-title">
            <div class="detail-line"></div>
            <div class="detail-text">优惠信息</div>
            <div class="detail-line"></div>
          </div>

          <ul v-if="seller.supports" class="detail-support">
            <li v-for="support in seller.supports">
              <span class="detail-icon" :class="classMap[0]"></span>
              <span class="detail-support-text">{{ support.description }}</span>
            </li>
          </ul>

          <div class="detail-title">
            <div class="detail-line"></div>
            <div class="detail-text">商家公告</div>
            <div class="detail-line"></div>
          </div>

          <p class="detail-bulletin">
            {{ seller.bulletin }}
          </p>

        </div>
      </div>
      <div class="detail-close" @click="closeDetail">+</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Star from './star.vue';

  export default{
    created: function () { // 声明周期函数，在组件被创建的时候调用
      // 增加一个 classMap 映射数组，给 template 调用, 必须用 this,说明这个变量是 Vue 实例内的变量,如果没有 this, 那 classMap 指的是 template 中的变量
      this.classMap = ['des'];
    },
    props: ['seller'], // 用 props 属性来接受上一个组件传递过来的数据: seller
    data: function () {
      // data 函数里面存放数据，return 返回里面的是 Object
      return {
        detailShow: false
      }
    },
    methods: { // 里面封装了所有的事件
      showDetail: function () {
        this.detailShow = true;
      },
      closeDetail: function () {
        this.detailShow = false;
      }
    },
    components: { // 注册组件
      Star: Star
    }
  };
</script>

<style type="text/css">
  html, body {
    line-height: 1;
    font-weight: 200;
    font-family: "PingFang SC", "STHeiti", "Helvetica", Arial, sans-serif;
  }

  .clearfix {
    *zoom: 1;
  }

  .clearfix:after {
    clear: both;
    content: "";
    height: 0;
    display: none;
    visibility: hidden;
  }

  .header {
    color: #ffffff;
    position: relative;
    background: rgba(7, 17, 27, 0.5);
    overflow: hidden;
  }

  .content-wrapper {
    padding: 24px 12px 18px 24px;
    font-size: 0;
    position: relative;
  }

  .avatar {
    display: inline-block;
  }

  .avatar img {
    border-radius: 2px;
  }

  .content {
    margin-left: 16px;
    vertical-align: top;
    display: inline-block;
    font-size: 14px;
  }

  .content .title {
    margin: 2px 0 8px 0;
  }

  .content .title .brand {
    width: 30px;
    height: 18px;
    display: inline-block;
    background: url("./brand@3x.png") top center no-repeat;
    background-size: 30px 18px;
  }

  .content .name {
    font-size: 16px;
    line-height: 18px;
    height: 18px;
    color: #ffffff;
    display: inline-block;
    vertical-align: top;
    font-weight: bold;
  }

  .content .description {
    font-size: 12px;
    height: 12px;
    line-height: 12px;
    margin-top: 8px;
  }

  .content .support {
    font-size: 10px;
    font-weight: 200;
    line-height: 12px;
    margin-top: 10px;
  }

  .text {
    display: inline-block;
    vertical-align: top;
  }

  .icon {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }

  .icon, .des {
    background: url("./decrease_1@3x.png") top center;
    background-size: 12px 12px;
  }

  .support-count {
    position: absolute;
    right: 12px;
    bottom: 18px;
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    border-radius: 14px;
    background: rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .support-count span {
    font-size: 10px;
    color: #ffffff;
  }

  .bulletin-wrapper {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 28px;
    line-height: 28px;
    padding: 0 12px;
    padding-right: 24px;
    background: rgba(7, 17, 27, .2);
    position: relative;
  }

  .bulletin-title {
    display: inline-block;
    margin-right: 4px;
    margin-top: 7px;
    vertical-align: top;
    height: 12px;
    width: 22px;
    background: url("./bulletin@3x.png") top center no-repeat;
    background-size: 22px 12px;
  }

  .bulletin-content {
    font-size: 10px;
    vertical-align: top;
  }

  .bulletin-details {
    font-size: 10px;
    position: absolute;
    right: 12px;
    bottom: 0;
  }

  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }

  .details {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    -webkit-backdrop-filter: blur(10px);
  }

  /* sticky footer 布局 start */
  .detail-wrapper {
    width: 100%;
    min-height: 100%;
  }

  .detail-main {
    padding-top: 64px;
    padding-bottom: 64px;
  }

  .detail-close {
    /* 去除 position: relative 暂时未发现问题 */
    position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    /* 去除 clear: both 暂时未发现问题 */
    clear: both;
    font-size: 32px;
    color: #ffffff;
    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  /* sticky footer 布局 end */

  .detail-name {
    text-align: center;
    line-height: 16px;
    font-size: 16px;
    font-weight: 700;
  }

  .star-wrapper {

    margin-top: 18px;
    padding: 2px 0;
    text-align: center;
  }

  .detail-title {
    display: flex;
    width: 80%;
    margin: 28px auto 24px auto;
  }

  .detail-line {
    flex: 1;
    position: relative;
    top: -6px;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
  }

  .detail-text {
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }

  .detail-support {
    width: 80%;
    margin: 0 auto;
    margin-top: 12px;
    font-size: 0;
  }

  .detail-support > li {
    margin-top: 12px;
  }

  .detail-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: top;
  }

  .detail-icon, .des {
    background: url("./decrease_1@3x.png") top center no-repeat;
    background-size: 16px 16px;
    vertical-align: top;
    margin-right: 6px;
  }

  .detail-support-text {
    font-size: 12px;
    font-weight: 200;
    color: #ffffff;
    line-height: 12px;
    display: inline-block;
    vertical-align: top;
    margin-top: 2px;
  }

  .detail-bulletin{
    width: 80%;
    padding: 0 12px;
    margin: 24px auto 0 auto;
    font-size: 12px;
    line-height: 24px;
    font-weight: 200;
  }
</style>
