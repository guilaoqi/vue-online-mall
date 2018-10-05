<template>
	<div>
		<mt-swipe :auto="4000">
  		<mt-swipe-item v-for="(img,index) in imgs" :key='index'>
			<img style="-webkit-user-select: none;max-width: 100%;max-height:100% ;margin: 0 auto ;display:table-cell" :src="img.img">
  		</mt-swipe-item>
		</mt-swipe>
	</div>
</template>
<script>
	export default{
		data(){
			return{
				imgs:[]
			}
		},
		props:['url'],
		created(){
			this.$axios.get(this.url)
			.then(res=>{
				this.imgs=res.data.messages;
			})
			.catch(err=>{
				console.log(err);
			})
		}
	}
</script>
<style scoped>
	.mint-swipe{
		height:234px;
	}
</style>