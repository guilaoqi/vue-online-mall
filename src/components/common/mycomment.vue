<template>
    <div class="mycomment">
                <!-- 评论内容开始 -->
        <div class="photo-bottom">
            <ul>
                <li class="photo-comment">
                    <div>
                        <span>提交评论</span>
                        <span><a @click="goback">返回</a></span>
                    </div>
                </li>
                <li class="txt-comment">
                    <textarea v-model="msg"></textarea>
                </li>
                <li>
                   <mt-button @click="sendComment" size="large" type="primary">发表评论按钮</mt-button>
                </li>
                <li class="photo-comment">
                    <div>
                        <span>评论列表</span>
                        <span>{{comments.length}}条评论</span>
                    </div>
                </li>
            </ul>
            <ul class="comment-list">
                <li v-for="(comment,index) in comments" :key="index">
                    {{comment.user_name}}：{{comment.comment}}       <span style="float:right">{{comment.add_time|format}}</span>
                </li>
               
            </ul>
            <mt-button type="danger" size="large" plain @click='loadMore'>加载更多按钮</mt-button>
        </div>

        <!-- 评论内容结束 -->

    
<!--改变颜色<mt-button type="default">default</mt-button>
<mt-button type="primary">primary</mt-button>
<mt-button type="danger">danger</mt-button> -->

<!-- 改变大小
<mt-button size="small">small</mt-button>
<mt-button size="large">large</mt-button>
<mt-button size="normal">normal</mt-button>
幽灵按钮
<mt-button type="danger" plain>plain</mt-button> -->


    </div>
</template>
<script>
    export default {
        data(){
            return {
                 flag:true,
                 comments:[],//存放评论数据
                 pageIndex:1,//页码
                 msg:'',//发表的评论
            }
        },created(){
            //评论操作 开始
            this.loadFirst();
            //评论操作 结束
        },props:['cid','url']
        ,methods:{
        loadFirst(){
            this.$axios.get(this.url+'?page='+'1')
            .then(res=>{
                this.comments=res.data;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        goback(){
            this.$router.go(-1);
        },
        sendComment(){
            let comm={
                user_name:'匿名用户',
                add_time:new Date(),
                comment:this.msg
            };
            this.$axios.post(this.url,comm)
            .then(res=>{
                this.comments.unshift(comm);

            })
            .catch(err=>{
                console.log(err);
            })
        },
        loadMore(){
            if(this.flag){
            this.pageIndex++;
            this.$axios.get(this.url+'?page='+this.pageIndex)
            .then(res=>{
                this.comments=[...this.comments,...res.data];
                console.log(this.comments);
                if(res.data.length<5){
                    this.flag=false;
                };
            })
            .catch(err=>{
                console.log(err);
            })
            }

        }
    }
    }
</script>
<style scoped>
.mycomment{
    padding:0 10px;
 /*评论样式 开始*/
}
.photo-comment > div span:nth-child(1) {
    float: left;
    font-weight: bold;
    margin-left: 5px;
}

.photo-comment > div span:nth-child(2) {
    float: right;
}

.photo-comment {
    height: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    line-height: 30px;
    margin-bottom: 5px;
}

.txt-comment {
    padding: 5 5;
}

.txt-comment textarea {
    margin-bottom: 5px;
}

.comment-list li {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

/*评论样式 结束*/   
</style>