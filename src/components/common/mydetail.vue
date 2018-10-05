<template>
		<div>
			<div class="news-title">
            <p v-text="newsDetail.title" v-if='tot'></p>
            <div v-if='tot'>
                <span>{{newsDetail.click}}次点击</span>
                <span>分类:民生经济</span>
                <span>添加时间:{{newsDetail.add_time | format}}</span>
            </div>
        </div>
        <div class="newscontent"><div v-html="newsDetail.content"></div></div>
		</div>

</template>
<script>
	export default{
		data(){
			return{
				newsDetail:{},
				tot:this.tit!=0
			}
		},
		props:['url','tit'],
		created(){
			console.log(this.tot);
			let new_id=this.$route.query.id;
			this.$axios.get(this.url+'?id='+new_id)
			.then(res=>{
				this.newsDetail=res.data.message;
			})
			.catch(err=>{
				console.log(err);
			})
		}

	}
</script>
<style scoped>
.news-title p {
    color: #0a87f8;
    font-size: 20px;
    font-weight: bold;
}

.news-title span {
    margin-right: 30px;
}

.news-title {
    margin-top: 5px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}


/*主体文章的左右距离*/

.newscontent {
    padding: 10px 10px;
}


</style>
