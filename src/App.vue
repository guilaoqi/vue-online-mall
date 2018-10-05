<template>
	<div>
	<mt-header  title="在线购物平台"></mt-header>
	<transition name='page' mode="out-in"><router-view @putnum='getNum' ></router-view></transition>
			<nav class="mui-bar mui-bar-tab " >
			<router-link class="mui-tab-item " :to="{name:'home'}">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item " :to="{name:'vip'}">
				<span class="mui-icon iconfont icon-huiyuan "></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item " :to="{name:'cart'}">
				<span class="mui-icon iconfont icon-cart"><span class="mui-badge">{{cartNum}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item " :to="{name:'search'}">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">查找</span>
			</router-link>
			</nav>					
	</div>
</template>
<script>
	import connect from './components/common/connect.js'
	export default{
		data(){
			return{
				cartNum:9
			}
		},
		created(){
			connect.$on('getCartNum',num=>{   //这是中间组件传值
				this.cartNum=num;
				console.log(num);
			})
		},
		methods:{
			getNum(num){         //父组件通过属性传方法的形式传值
				this.cartNum+=num;
			}
		}
	}
</script>
<style scoped>
	.page-enter-active, .page-leave-active {
  		transition: opacity .2s;
	}
	.page-enter, .page-leave-to {
  		opacity: 0;
	}

</style>