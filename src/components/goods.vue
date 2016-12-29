<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item" @click="menuClick">
          <span class="text">
             <span v-show="item.type > 0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="food-wrapper" id="food-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="food-list-title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item">
              <div class="food-pic">
                <img :src="food.icon" alt="">
              </div>
              <div class="food-content">
                <h2 class="food-content-name">{{ food.name }}</h2>
                <p class="food-content-description">{{ food.description }}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="food-content-price">
                  <span class="price">&yen;<b>{{food.price}}</b></span>
                  <span v-show="food.oldPrice" class="old-price">&yen;{{food.oldPrice}}</span>
                </div>

                <div class="option-box clearfix">
                  <span class="option-add" @click="addFood"> + </span>
                  <!-- undefined && 未定义 返回 false; true && true -->
                  <span class="food-count" v-if="orderFoods[food.name] && orderFoods[food.name].count">{{ orderFoods[food.name].count }}</span>
                  <span class="option-reduce" @click="reduceFood"
                        v-if="orderFoods[food.name] && orderFoods[food.name].count"> - </span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopping-cart :seller="seller" :orderFoods="orderFoods"></shopping-cart>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from 'jquery';
  import Vue from 'vue';
  import ShoppingCart from './shoppingCart.vue';

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
        goods: {},
        orderFoods: {}
      }
    },
    methods: {
      menuClick: function (e) {
        let text = e.currentTarget.innerText;
        let dom_list = document.getElementsByClassName("food-list-title");
        // 因为 safari 浏览器不支持 for of 的遍历，所以修改为 for in 遍历
        for (let index in dom_list) {
          if (dom_list[index].innerText == text) {
            document.getElementById("food-wrapper").scrollTop = dom_list[index].offsetTop;
          }
        }
      },
      addFood: function (e) {
        let foodName = $(e.currentTarget).closest('div.food-content').find('h2').text();
        let foodPrice = $(e.currentTarget).closest('div.food-content').find('b').text();
        if (!this.orderFoods[foodName]) {

          // 设置没有的属性，需要使用 Vue.set() 方法，否则 vue 无法监听被设置的属性
          Vue.set(this.orderFoods, foodName, {});
          Vue.set(this.orderFoods[foodName], 'foodPrice', foodPrice);
          Vue.set(this.orderFoods[foodName], 'count', 1);
        } else {
          this.orderFoods[foodName].count++;
        }
      },
      reduceFood: function (e) {
        let foodName = $(e.currentTarget).closest('div.food-content').find('h2').text();
        this.orderFoods[foodName].count--;
      }
    },
    components: {
      "shopping-cart": ShoppingCart
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

  .menu-wrapper::-webkit-scrollbar {
    width: 0;
  }

  .food-wrapper {
    flex: 1;
    overflow: auto;
  }

  .food-wrapper::-webkit-scrollbar {
    width: 0;
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

  .food-list-title {
    height: 26px;
    line-height: 26px;
    font-size: 12px;
    color: rgb(147, 153, 159);
    background: #f3f5f7;
    border-left: 2px solid #d9dde1;
    padding-left: 12px;
  }

  .food-item {
    padding-bottom: 18px;
    width: 100%;
    display: flex;
    position: relative;
  }

  .food-item:after {
    content: '';
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 0;
    border-bottom: 1px solid rgba(17, 27, 37, .1);
  }

  .food-item:last-child:after {
    display: none;
  }

  .food-pic {
    flex: 0 0 57px;
    font-size: 0;
    width: 57px;
    height: 57px;
    margin-top: 18px;
    margin-left: 18px;
  }

  .food-pic img {
    width: 57px;
    height: 57px;
    display: block;
  }

  .food-content {
    flex: 1;
    font-size: 0;
    vertical-align: top;
    width: 100%;
    position: relative;
  }

  .food-content .food-content-name {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    color: rgb(7, 17, 27);
    margin-top: 22px;
    margin-left: 10px;
  }

  .food-content-description {
    margin-top: 8px;
    margin-left: 10px;
    font-size: 10px;
    line-height: 10px;
    color: rgb(147, 153, 159);
  }

  .extra {
    margin-top: 8px;
    font-size: 10px;
    color: rgb(147, 153, 159);
    margin-left: 10px;
  }

  .food-content-price {
    font-size: 10px;
    color: #cc0000;
    margin-left: 10px;
    margin-right: 8px;
    margin-top: 8px;
  }

  .food-content-price .price {
    font-size: 14px;
  }

  .food-content-price .old-price {
    font-size: 10px;
    color: rgb(147, 153, 159);
    text-decoration: line-through;
  }

  .option-box {
    font-size: 0;
    position: absolute;
    right: 18px;
    bottom: -10px;
  }

  .option-reduce, .option-add, .food-count {
    display: inline-block;
    line-height: 24px;
    height: 24px;
    text-align: center;
    width: 24px;
    font-size: 10px;
    float: right;
  }

  .option-reduce, .option-add {
    color: #ffffff;
    background: rgb(0, 160, 220);
    border-radius: 1000px;
  }
</style>
