<template>
    <div class="tmpl">
        <my-header title="购物车"></my-header>
        <div class="pay-detail">
            <ul>
                <li v-for="(goods,index) in goodsList" :key="goods.id"  class="p-list">
                    <mt-switch v-model:value="goods.cou"></mt-switch>
                    <img :src="goods.img_url">
                    <div class="pay-calc">
                        <p v-text="goods.title"></p>
                        <div class="calc">
                            <span>￥{{goods.sell_price}}</span>
                            <span @click="sub(index)">-</span>
                            <span >{{goods.num}}</span>
                            <span @click="add(index)">+</span>
                            <a href="javascript:;" @click="del(index)">删除</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="show-price">
            <div class="show-1">
                <p>总计(不含运费):</p>
                <span>已经选择商品{{payment.num}}件，总价￥{{payment.sum}}元</span>
            </div>
            <div class="show-2">
                <mt-button type="danger" size="large">去结算</mt-button>
            </div>
        </div>
    </div>
</template>
<script>
import connect from '../common/connect.js';
//通知底部变更数据
export default {
	data(){
		return {
            goodsList:[],//商品数组数据
        }
    },
    created(){
    	this.$axios.get('cartlist')
    	.then(res=>{
    		this.goodsList=res.data.messages;
    		this.updateCartNum();
    	})
    	.catch(err=>{
    		console.log(err);
    	})
    },
    methods:{
    	sub(index){
    		if(this.goodsList[index].num>1){
    			this.goodsList[index].num--;
    			this.updateCartNum();
    		}

    	},
    	add(index){
    		this.goodsList[index].num++;
    		this.updateCartNum();
    	},
    	updateCartNum(){
    		var num =0;
    		this.goodsList.forEach(function(item){
    			num+=item.num;
    		})
    		connect.$emit('getCartNum',num);
    	},
    	del(index){
    		this.goodsList.splice(index,1);
    	}
    },
    computed:{
    	payment(){
    		var totalNum=0;
    		var totalPrice=0;
    		this.goodsList.forEach(function(item){
    			if(item.cou){
    				totalNum+=item.num;
    				totalPrice+=item.num*item.sell_price;
    			}
    		});
    		return {num:totalNum,sum:totalPrice};
    	}
    }

}



</script>
<style scoped>
.pay-detail ul li {
    list-style: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    margin-bottom: 3px;
}

.pay-detail ul {
    padding-left: 5px;
    margin-top: 5px;
}

.pay-detail ul li img {
    width: 80px;
    height: 80px;
    display: inline-block;
    vertical-align: top;
    margin-top: 10px;
}

.pay-detail ul li >:nth-child(1),
.pay-detail ul li >:nth-child(3) {
    display: inline-block;
}

.pay-calc p {
    display: inline-block;
    width: 250px;
    overflow: hidden;
    color: blue;
    font-size: 15px;
    margin-bottom: 10px;
}

.pay-detail ul li >:nth-child(1) {
    line-height: 80px;
}

.calc:nth-child(1) {
    color: red;
    font-size: 20px;
}

.calc span:not(:nth-child(1)) {
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: inline-block;
    width: 20px;
    text-align: center;
}

.calc a {
    margin-left: 20px;
}

.show-1,
.show-2 {
    display: inline-block;
}

.show-1,
.show-2 {
    margin-left: 30px;
}

.show-price {
    background-color: rgba(0, 0, 0, 0.2);
}
</style>
