import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';
import router from './router';
import store from './store';
import cookie from 'js-cookie';

import { createBootstrap } from 'bootstrap-vue-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css';
import './assets/style.css'

axios.defaults.baseURL = 'https://payrollium.b2camp.id/';
if(cookie.getJSON("token")!== undefined) 
  {
    let auth=cookie.getJSON("token")
    store.state.token = auth
    const token = store.state.token;
    axios.interceptors.request.use(
      (config) => {

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }


const app = createApp(App);
app.config.globalProperties.$axios = axios;
app.use(store);
app.use(router);
app.use(createBootstrap({ components: true, directives: true }));
app.mount('#app');