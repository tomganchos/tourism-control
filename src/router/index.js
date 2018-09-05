import Vue from 'vue'
import Router from 'vue-router'
import 'semantic-ui-css/semantic.min.css';
import HelloWorld from '@/components/HelloWorld'
import LandingPage from '@/components/LandingPage'
import News from '@/components/News'
import Plans from '@/components/Plans'
import Publications from '@/components/Publications'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/news',
      name: 'News',
      component: News
    },
    {
      path: '/plans',
      name: 'Plans',
      component: Plans
    },
    {
      path: '/publications',
      name: 'Publications',
      component: Publications
    }
  ]
})
