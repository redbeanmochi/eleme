import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import App from './App'
import Goods from './components/goods.vue'
import Ratings from './components/ratings.vue'
import Seller from './components/seller.vue'

Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/ratings',
      component: Ratings
    },
    {
      path: '/seller',
      component: Seller
    }
  ]
});

new Vue({
  router: router,
  render: h => h(App), // 渲染到 App 组件里面的 #app 元素
  el: "#app"
});

// 默认进来是 goods
//router.push('/goods');
