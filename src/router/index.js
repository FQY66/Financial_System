import Vue from 'vue'
import Router from 'vue-router'
import HomeMain from "../components/Home.vue";
import User from "../components/views/User.vue";
import Welcome from "../components/views/Welcome.vue"
import Finace from "../components/views/Finace.vue";
import Income from "../components/views/Income.vue";
import Loan from "../components/views/Loan.vue";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomeMain',
      component: HomeMain,
      redirect: '/Welcome',
      children: [
        {
          path: 'Welcome',
          component: Welcome
        },
        {
          path: '/User',
          component: User
        },
        {
          path: '/Finace',
          component: Finace
        },
        {
          path: '/Loan',
          component: Loan
        },
        {
          path: '/Income',
          component: Income
        }
      ]
    },
  ]
})
