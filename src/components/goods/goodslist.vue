<template>
    <div  style="height:577px;overflow:scroll;" >
        <my-header title="商品列表" ></my-header>
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="isAutoFill" ref="loadmore">
        <ul class="mui-table-view mui-grid-view">
            <li v-for="prod in prods" :key="prod.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <router-link :to="{name:'goodsdetail',query:{id:prod.id} }">
                    <img class="mui-media-object" :src="prod.img_url">
                    <div class="mui-media-body">{{prod.title}}</div>
                    <div class="desc">
                        <div class="sell">
                            <span>￥{{prod.sell_price}}</span>
                            <s>￥{{prod.market_price}}</s>
                        </div>
                        <div class="detail">
                            <div class="hot">
                                热卖中
                            </div>
                            <div class="count">
                                剩{{prod.stock_quantity}}件
                            </div>
                        </div>
                    </div>
                </router-link :to="{name:'goods.detail'}">
            </li>
        </ul>
        </mt-loadmore>
    </div>
</template>
<script>
export default {
    data(){
        return {
            pageIndex:1,//页码
            prods:[],//商品列表数据
            allLoaded:false,
            isAutoFill:false

        }
    },
    created(){
       this.loadList();//1
    },
    methods:{
        loadList(){
             //发起请求获取数据填充到页面
            this.$axios.get('getgoods?page=1')
            .then(res=>{
                this.prods = res.data.messages;
            })
            .catch(err=>{
                console.log(err);
            });
        }, 
        loadTop(){
            this.loadList();
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom(){
            this.pageIndex++;
            this.$axios.get('getgoods?page='+this.pageIndex)
            .then(res=>{
                this.prods = this.prods.concat(res.data.messages);
                this.$refs.loadmore.onBottomLoaded();
            })
            .catch(err=>{
                console.log(err);
            });
            
        }
        
    }
}

</script>
<style scoped>
.mui-table-view.mui-grid-view .mui-table-view-cell > a:not(.mui-btn) {
    margin: 0px;
    padding: 0px;
    border: 1px solid #5c5c5c;
    box-shadow: 0 0 4px #666;
}

.sell > span {
    float: left;
    color: red;
    text-align: left;
}

.detail >.hot {
    float: left;
    text-align: left;
    font-size: 15px;
}

.detail >.count {
    float: right;
    text-align: right;
    font-size: 15px;
}


/*撑开，去除浮动没有的高度*/

.detail {
    overflow: hidden;
}

.desc {
    color: rgba(92, 92, 92, 0.8);
    background-color: rgba(0, 0, 0, 0.2);
}

.mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
    height: 200px;
}
</style>
