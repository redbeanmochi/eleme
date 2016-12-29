<template>
  <div class="shopping-cart">
    <div class="cart-icon">
      <span class="icon-cart"></span>
    </div>

    <div class="current-price">
      &yen;{{totalPrice}}元
    </div>
    <div class="extra-money">
      另需要配送费{{seller.deliveryPrice}}元
    </div>
    <div class="submit-button">
      &yen;{{seller.minPrice}}元起送
    </div>
  </div>
</template>

<script>
  import $ from 'jquery';

  export default{
    created: function () {

    },
    props: ['seller', 'orderFoods'],
    data: function () {
      return {}
    },
    methods: {},
    components: {},
    mounted: function () {

    },
    computed: {
      totalPrice: function () {
        let totalPrice = 0;
        for (let item in this.orderFoods) {
          totalPrice += this.orderFoods[item].count * this.orderFoods[item].foodPrice;
        }
        return totalPrice;
      }
    }
  };
</script>

<style>
  .shopping-cart {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45px;
    background: rgb(19, 29, 38);
  }

  .cart-icon {
    height: 50px;
    width: 50px;
    background: rgb(19, 29, 38);
    border-radius: 100px;
    position: absolute;
    bottom: 8px;
    left: 18px;
    z-index: 100;
  }

  .cart-icon .icon-cart {
    color: rgba(255, 255, 255, .4);
    display: block;
    font-size: 20px;
    line-height: 40px;
    width: 40px;
    margin-left: 5px;
    margin-top: 5px;
    text-align: center;
    background: rgba(255, 255, 255, .2);
    border-radius: 10000px;
  }

  .current-price {
    display: inline-block;
    font-size: 16px;
    font-weight: 700;
    color: rgba(255, 255, 255, .4);
    line-height: 45px;
    height: 45px;
    margin-left: 80px;
  }

  .current-price:after {
    content: '';
    border-left: 1px solid rgba(255, 255, 255, .1);
    height: 45px;
    display: inline-block;
    line-height: 45px;
    margin-left: 12px;
    vertical-align: top;
  }

  .extra-money {
    line-height: 45px;
    height: 45px;
    display: inline-block;
    font-size: 10px;
    color: rgba(255, 255, 255, .4);
    margin-left: 12px;
  }

  .submit-button {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 45px;
    line-height: 45px;
    color: rgba(255, 255, 255, .4);
    background: rgba(255, 255, 255, .2);
    font-size: 12px;
    text-align: center;
    width: 105px;
  }
</style>
