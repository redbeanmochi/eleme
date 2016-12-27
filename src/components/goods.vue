<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <span class="text">
             <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    props: ['seller'],
    created(){
      this.$http.get('/api/goods').then((res) => {
          res = res.body;
          this.goods = res;
        },
        (res) => {
          // 错误处理
        });
      this.classMap = ['des', 'des', 'des', 'des', 'des', 'des', 'des'];
    },
    data(){
      return {
        goods: {}
      }
    }
  };
</script>

<style type="text/css">
  .goods {
    position: absolute;
    display: flex;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
  }

  .menu-wrapper {
    /* 3个参数分别为：等分 缩放 宽度 */
    flex: 0 0 80px;
    /* 为了兼容安卓 */
    width: 80px;
    background: #f3f5f7;
    overflow: auto;
  }

  .food-wrapper {
    flex: 1;
  }

  .menu-item {
    display: table;
    height: 54px;
    max-width: 80px;
    padding: 0 12px;
    line-height: 14px;
    position: relative;
    box-sizing: border-box;
  }

  .menu-item .icon {
    width: 12px;
    height: 12px;
    margin-right: 2px;
  }

  .menu-item .icon, .des {
    background: url("./decrease_1@3x.png") top center no-repeat;
    background-size: 12px 12px;
  }

  .menu-item .text {
    font-size: 12px;
    color: rgb(40, 20, 20);
    display: table-cell;
    width: 56px;
    vertical-align: middle;
  }

  .menu-item:after {
    content: "";
    display: block;
    position: absolute;
    left: 12px;
    bottom: 0;
    border-top: 1px solid rgba(7, 17, 27, .1);
    width: 56px;
  }
</style>
