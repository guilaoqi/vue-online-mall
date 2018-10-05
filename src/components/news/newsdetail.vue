<template>
	    <div class="tmpl">
        <my-header :title='text'></my-header>
        <my-detail url='newsDetail'></my-detail>
    </div>
</template>
<script>
	export default{
		data(){
			return{
				text:'哈哈哈哈'
			}
		},
		beforeRouteEnter (to, from, next) {
			if(from.name==='news'){
			next(vm => {
    			// 通过 `vm` 访问组件实例
    			vm.text='新闻详情';
    		})
			}else{
						next(vm => {
    			// 通过 `vm` 访问组件实例
    			vm.text='哈哈哈哈';
    		})
			}
		}
	}
</script>
<style >

</style>
