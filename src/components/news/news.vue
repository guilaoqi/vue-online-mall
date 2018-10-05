<template>
	<div>
	<my-header :title='text'></my-header>
	<ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for='(list,index) in newslist' :key='index'>
					<router-link :to="{name:'newsDetail',query:{id:list.id}}">
						<img class="mui-media-object mui-pull-left" :src="list.img_url">
						<div class="mui-media-body">
							<span>{{list.abstract}}</span>
							<div class="news-desc">
								<p>点击数：{{list.click}}</p>
								<p>发表时间：{{list.add_time|format}}</p>
							</div>
						</div>
					</router-link>
				</li>
	</ul>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				text:'新闻列表',
				newslist:[]
			}
		},
		created(){
			this.$axios.get('newslist')
			.then(res=>{
				this.newslist=res.data.messages;
			})
			.catch(err=>{
				console.log(err);
			})
		}
	}
</script>
<style scoped>
	.news-desc p{
		color:#94cdc4;
	}
	.news-desc p:nth-child(1){
		float:left;
	}
	.news-desc p:nth-child(2){
		float:right;
	}
</style>
