// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import SuiVue from 'semantic-ui-vue';
import VueFractionGrid from 'vue-fraction-grid'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false;


Vue.use(SuiVue);
Vue.use(VueFractionGrid);
Vue.use(VueMoment);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
