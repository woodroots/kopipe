// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuex from 'vuex';
import router from './router'
import store from './store'
import VueJsonp from 'vue-jsonp'
import Storage from 'vue-ls';
import VueCkeditor from 'vue-ckeditor2';
import includeJs from './components/include.js'


import copyBtn from '@/components/copybtn.vue';

import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css'


import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/custom.scss'
Vue.use(Vuex);
Vue.use(BootstrapVue);
Vue.use(VueJsonp);
Vue.use(Storage);
Vue.use(VueCkeditor);
Vue.use(includeJs,[
		'https://cdnjs.cloudflare.com/ajax/libs/exif-js/2.3.0/exif.js',
		'https://cdn.jsdelivr.net/npm/html2canvas@1.0.0-alpha.12/dist/html2canvas.min.js',
		'https://cdn.ckeditor.com/4.10.0/full/ckeditor.js'
]);





Vue.config.productionTip = false

Vue.component('nl2br', {
  functional: true,
  props: ['tag','text'],
  render: function (createElement, context) {
    return createElement(context.props.tag,
      context.props.text.split("\n").reduce(function(x,y){
          if (!Array.isArray(x)){
            return [x,createElement('br'),y];
          }
          return x.concat([createElement('br'),y]);
      }));
  }
});

Vue.component('vue-ckeditor', VueCkeditor);
Vue.component('copyBtn', copyBtn);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
