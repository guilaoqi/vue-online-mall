<template>
       <div class="tmpl">
        <my-header title="图文分享"></my-header>
        <!-- 引入返回导航 -->
        <div class="photo-header">
            <ul>
                <li v-for="category in categories" :key="category.id">
                    <a href="javascript:;" @click='loadImg(category.id)'>{{category.title}}</a>
                </li>
                
            </ul>
        </div>
        <div class="photo-list">
            <ul>
                <li v-for="img in imgs" :key="img.id">
                    <router-link :to="{name:'photodetail',params:{id:img.id} }">
                         <!-- <img :src="img.img_url"> -->
                         <!-- 懒加载 -->
                         <img v-lazy="img.img_url">
                        <p>
                            <span v-text="img.title"></span>
                            <br>
                            <span v-text="img.abstract"></span>
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                categories:[],
                imgs:[]
            }
        },
        methods:{
            loadImg(id){
            this.$axios.get('/categoryimg?id='+id)
            .then(res=>{
                this.imgs=res.data.messages;
            })
            .catch(err=>{
                console.log(err);
            });
            }
        },
        created(){
            this.$axios.get('/categorylist')
            .then(res=>{
                this.categories=res.data.messages;
            })
            .catch(err=>{
                console.log(err);
            });
            this.loadImg(0);
        }

    }
</script>
<style scoped>
.photo-header li {
    list-style: none;
    display: inline-block;
    margin-left: 10px;
    height: 30px;
    line-height: 30px;
}

.photo-header ul {
    /*强制不换行*/
    white-space: nowrap;
    overflow-x: auto;
    padding-left: 0px;
    margin: 5px;
}


/*下面的图片*/

.photo-list li {
    list-style: none;
    position: relative;
    margin-bottom: 5px;
}

.photo-list li img {
    width: 100%;
    height: 230px;
    vertical-align: top;
}

.photo-list ul {
    padding-left: 0px;
    margin: 0;
}

.photo-list p {
    position: absolute;
    bottom: 0px;
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
    margin-bottom: 0px;
}

.photo-list p span:nth-child(1) {
    font-weight: bold;
    font-size: 16px;
}

/*图片懒加载的样式*/
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
