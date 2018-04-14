import Vue from 'vue';
import App from './App.vue';
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes";
import * as firebase from 'firebase';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// Initialize Firebase
let config = {
  apiKey: "AIzaSyBmrTjBdJ44Sm7wiWYIhkarjT6XJMDkq_o",
  authDomain: "catsolution-24930.firebaseapp.com",
  databaseURL: "https://catsolution-24930.firebaseio.com",
  projectId: "catsolution-24930",
  storageBucket: "catsolution-24930.appspot.com",
  messagingSenderId: "898800102662"
};

// set the prototypes for firebase
Vue.prototype.$firebase = firebase.initializeApp(config);
Vue.prototype.$firebase_basic = firebase;

// use vue-resource and vue-router (vue-resource not used)
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);

// initialize router
const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

// initialize website
new Vue({
  el: '#app',
  render: h => h(App),
  router: router
});
