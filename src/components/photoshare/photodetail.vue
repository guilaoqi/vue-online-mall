<template>
	    <div class="tmpl">
        <my-header title="图片详情"></my-header>
        <div class="photo-title">
            <p v-text="imgInfo.title"></p>
            <span>发起日期：{{imgInfo.add_time | format}}</span>
            <span>{{imgInfo.click}}次浏览</span>
            <span>分类：社会热点</span>
        </div>
        <vue-preview height="100px" :slides="imgs" @close="handleClose"></vue-preview>
        <div class="photo-desc">
            <p class="clear" v-html="imgInfo.content"></p>
        </div>
        <my-comment url='comment'></my-comment>

    </div>
</template>
<script>
	export default{
		data(){
			return{
				imgs:[],
				imgInfo:{}
			}
		},
		created(){
			let id=this.$route.query.id;
			this.$axios.get('/photoInfo?id='+id)
			.then(res=>{
				this.imgInfo=res.data.message;
			})
			.catch(err=>{
				console.log(err);
			});

			this.$axios.get('/photodetailes?id='+id)
			.then(res=>{
				this.imgs=res.data.messages;
			})
			.catch(err=>{
				consoel.log(err);
			})

		},
		methods:{
			      handleClose () {
        console.log('close event')
      }

		}
	}
</script>
<style scoped>
p.clear{
    clear:both;
}
	li {
    list-style: none;
}

ul {
    margin: 0;
    padding: 0;
}

.photo-title {
	margin-top: 10px;
    overflow: hidden;
}

.photo-title,
.photo-desc {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
    margin-bottom: 5px;
    padding-left: 5px;
}

.photo-title p {
    color: #13c2f7;
    font-size: 20px;
    font-weight: bold;
}

.photo-title span {
    margin-right: 20px;
    font-size:15px;
    color:#666;
}

.mui-table-view.mui-grid-view.mui-grid-9 {
    background-color: white;
    border: 0;
}

.mui-table-view.mui-grid-view.mui-grid-9 li {
    border: 0;
}

.photo-desc p {
    font-size: 18px;
}

.mui-table-view-cell.mui-media.mui-col-xs-4.mui-col-sm-3 {
    padding: 2 2;
}
figure {
    margin: 1em 20px;
    float: left;
}
</style>
<style>
figure	img{
	height:80px;
	width:85px;
}
figure {
    margin: 1em 20px;
    float: left;
}
</style>
