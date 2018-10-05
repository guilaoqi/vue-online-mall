<template>
    <div>
        <my-header title="商品详情"></my-header>
        <div class="outer-swiper">
            <div class="swiper">
               <my-carousel :url="goodsDetailUrl"></my-carousel>
            </div>
        </div>
        <div class="product-desc">
            <ul>
                <li><span class="product-desc-span">
                    {{prodInfo.title}}
                </span></li>
                <li class="price-li">市场价：
                    <s>￥{{prodInfo.market_price}}</s> 销售价：<span>￥{{prodInfo.sell_price}}</span></li>
                <li class="number-li">购买数量：<span @click='reduceNum'>-</span><span>{{num}}</span><span @click='addNum'>+</span></li>
                <li>
                    <mt-button type="primary">立即购买</mt-button>
                    <mt-button type="danger" @click='addToCart' >加入购物车</mt-button>
                </li>
            </ul>
        </div>
            <transition name="ball" v-on:after-enter="afterEnter" >
                <div class="ball" v-if="isShow"></div>
            </transition>
        <div class="product-props">
            <ul>
                <li>商品参数</li>
                <li>商品货号：{{prodInfo.goods_no}}</li>
                <li>库存情况：{{prodInfo.stock_quantity}}件</li>
                <li>上架时间：{{prodInfo.add_time | format}}</li>
            </ul>
        </div>
        <div class="product-info">
            <ul>
                <li>
                    <mt-button type="primary" size="large" plain @click='goodsIntro'>图文介绍</mt-button>
                </li>
                <li>
                    <mt-button type="danger" size="large" plain @click='goodsComment'>商品评论</mt-button>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>

    export default {
        data(){
            return {
                isShow:false,//控制小球是否显示
                imgs:[],//缩略图数组
                prodInfo:{}, //商品信息
                goodsDetailUrl:'',//商品详情轮播图url
                num:1, //添加购物车的商品数量
            }
        },
        created(){
            this.goodsDetailUrl='goodsDetailUrl?id='+this.$route.query.id;
           this.$axios.get('getdetail?id='+this.$route.query.id)
           .then(res=>{
            this.prodInfo=res.data.message;
           })
           .catch(err=>{
            console.log(err);
           })

        },
        props:['putnum'],
        methods:{
            afterEnter: function (el) {
                el.style.opacity=0;
                this.isShow=false;
            },
            addNum(){
                if(this.num<this.prodInfo.stock_quantity) this.num++;
            },
            reduceNum(){
                if(this.num>1) this.num--;
            },
            addToCart(){
                this.$emit('putnum',this.num);
                this.num=1;
                this.isShow=true;
            },
            goodsComment(){
                this.$router.push({name:'goodscomment',query:{id:this.$route.query.id}})
            },
            goodsIntro(){
                this.$router.push({name:'goodsIntro',query:{id:this.$route.query.id}})
            }
        }

    }
</script>
<style scoped>
.ball-enter-active{
    animation: bounce-in .5s;
}
  @keyframes bounce-in {
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        /*x,y,z轴的位置*/
        transform: translate3d(100px, -60px, 0);
    }
    75% {
        transform: translate3d(130px, 0px, 0);
    }
    100% {
        transform: translate3d(120px, 300px, 0);
    }
}
.swiper {
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 8px;
    width: 95%;
    border-radius: 15px;
    overflow: hidden;
}

.outer-swiper,
.product-desc,
.product-props,
.product-info {
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin: 3px;
}


/*请ulpadding*/

.outer-swiper ul,
.product-desc ul,
.product-props ul,
.product-info ul {
    padding: 0;
}

.product-desc ul li,
.product-props ul li,
.product-info ul li {
    list-style: none;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.5);
    margin-top: 8px;
}

.product-desc ul >:nth-child(1) span {
    color: blue;
    font-size: 22px;
    font-weight: bold;
}

.product-desc ul >:nth-child(1) {
    border-bottom: 1px solid rgba(0, 0, 0, 0.5);
}

.product-desc ul,
.product-info ul,
.product-props ul {
    padding-left: 5px;
    padding-right: 5px;
}

.price-li span {
    color: red;
    font-size: 25px;
}

.price-li s {
    margin-right: 16px;
}


/*加减*/

.number-li span {
    display: inline-block;
    border: 2px solid rgba(0, 0, 0, 0.1);
    width: 25px;
}


/*商品参数*/

.product-props ul >:nth-child(1) {
    text-align: left;
}

.product-props ul:not(:nth-child(1)) {
    margin-left: 40px;
}

.product-info ul {
    margin-bottom: 70px;
    padding: 0 5;
}

.number-li span {
    text-align: center;
}

.number-li >:nth-child(2) {
    width: 40px;
}

.ball {
    border-radius: 50%;
    background-color: red;
    width: 24px;
    height: 24px;
    position: absolute;
    top: 440px;
    left: 120px;
    display: inline-block;
    z-index: 9999;
}
</style>
