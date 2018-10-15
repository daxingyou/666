<template>
	

	<!-- 动态获取结构 -->
	<template v-if="sscPlayPlGroupList.length>0">
		<li v-for="item in sscPlayPlGroupList" :playPlId="item.playPlId">
			<span>{{ item.name }}</span><var>{{ item.playPl }}</var>
		</li>
	</template>
	<template v-else>
		<div class="assembly-box">
			<img src="../../../static/img/icon/oval.svg" alt="">
			<span>加载中...</span>
		</div>
	</template>


</template>


<script>
export default{

	activated(){
		var _this=this
		// 清除
		$(".clear-button").trigger('click');
		// 存储方法
		_this.setPlay()
		var time=setInterval(function(){
			if(_this.$store.state.sscPlayPlGroupList.length>0){
				_this.pageData()
				clearInterval(time)
			}
		},300)
	},

	methods:{
		// 设置数据(必要)
		setPlay(){
			this.$store.state.BuyNsidePage.pageConfig=this.setValue
			this.test();
		},
		pageData(){
			// 获取副标题
			const { two_title } = { ...this.$store.state.BuyNsidePage}
			// 从 Vuex 获取列表
			const sscPlayPlGroupList=this.$store.state.sscPlayPlGroupList
			// 过滤赔率
			var arr=sscPlayPlGroupList.filter( obj =>{
				if(obj.name==two_title){
					this.sscPlayPlGroupList = obj.sscPlayPlList.sort(compare('playPlId'))
				}
			})
		}
	},

	// "添加随机一注"
	generateFun(_this,true)
	

}
</script>
