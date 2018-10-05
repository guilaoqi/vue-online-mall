import App from './App.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import MintUI from 'mint-ui';

// mint-ui 按需引入 开始
import Header from 'mint-ui/lib/header';
import Switch from 'mint-ui/lib/switch';
import Swipe from 'mint-ui/lib/swipe';
import SwipeItem from 'mint-ui/lib/swipe-item';
import Lazyload from 'mint-ui/lib/lazyload';
import Loadmore from 'mint-ui/lib/loadmore';
import Indicator from 'mint-ui/lib/indicator';
import Button from 'mint-ui/lib/button';
Vue.component(Header.name, Header);
Vue.component(Switch.name, Switch);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Loadmore.name, Loadmore);
Vue.component(Button.name, Button);
Vue.use(Lazyload);
// mint-ui 按需引入 结束



//es6语法
import 'babel-polyfill';
import Es6Promise from 'es6-promise';
require('es6-promise').polyfill();
Es6Promise.polyfill();


import Axios from 'axios';
Axios.defaults.baseURL="http://47.100.203.109:3030/";
// 拦截器：
// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    Indicator.open({
    	text: '加载中...',
    	spinnerType: 'fading-circle'
    });
    return config;
});

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    Indicator.close();
    return response;
  });

import moment from 'moment';
Vue.filter('format',function(value){
	return moment(value).format('YYYY-MM-DD');
});
import VuePreview from 'vue-preview';










import 'mint-ui/lib/style.css';
import './static/vendor/mui-master/dist/css/mui.css';
import './static/font/iconfont.css';
import './static/css/global.css';




const  Home =()=>import( './components/home/home.vue');
const  Vip =()=>import( './components/vip/vip.vue');
const  Cart =()=>import( './components/cart/cart.vue');
const  Search =()=>import( './components/search/search.vue');
const  Carousel =()=>import( './components/common/carousel.vue');
const  News =()=>import( './components/news/news.vue');
const  MyHeader =()=>import( './components/common/myheader.vue');
const  newsDetail =()=>import( './components/news/newsdetail.vue');
const  photoShare =()=>import( './components/photoshare/photoshare.vue');
const  photoDetail =()=>import( './components/photoshare/photodetail.vue');
const  myComment =()=>import( './components/common/mycomment.vue');
const  goodsList =()=>import( './components/goods/goodslist.vue');
const  goodsDetail =()=>import( './components/goods/goodsdetail.vue');
const  goodsComment =()=>import( './components/goods/goodscomment.vue');
const  goodsIntro =()=>import( './components/goods/goodsintro.vue');
const  myDetail =()=>import( './components/common/mydetail.vue')


Vue.prototype.$axios = Axios;
Vue.use(VueRouter);
// Vue.use(MintUI);
Vue.use(VuePreview);

Vue.component('myCarousel',Carousel); //my-carousel
Vue.component('myHeader',MyHeader);
Vue.component('myComment',myComment);
Vue.component('myDetail',myDetail);



let router=new VueRouter({
	linkActiveClass:'mui-active',  //设置激活状态的Class
	routes:[
		{path:'/',redirect:{name:'home'}},
		{name:'home',path:'/home',component:Home},
		{name:'vip',path:'/vip',component:Vip},
		{name:'cart',path:'/cart',component:Cart},
		{name:'search',path:'/search',component:Search},
		{name:'news',path:'/news',component:News},
		{name:'newsDetail',path:'/news/detail',component:newsDetail},
		{name:'photoshare',path:'/photo/share',component:photoShare},
		{name:'photodetail',path:'/photo/detail',component:photoDetail},
		{name:'goodslist',path:'/goods/list',component:goodsList},
		{name:'goodsdetail',path:'/goods/detail',component:goodsDetail},
		{name:'goodscomment',path:'/goods/comment',component:goodsComment},
		{name:'goodsIntro',path:'/goods/Intro',component:goodsIntro}




	]
})

new Vue({
	el:'#app',
	router:router,
	render:create=>create(App)
})