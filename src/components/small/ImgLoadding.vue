<template>
	<div class="div" v-if="item.imageId || item.smallImageId">
		<img v-if="item.imgUrl" class="up" :src="item.imgUrl" alt="">
		<div class="loading" v-else>
			<img src="../../../static/img/50c5e3e79b276c92df6cc52caeb464f0_12x32.gif" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		name:'ImgLoadding',
		props:['item']
	}
</script>

<style scoped>
	.up{
		animation:fadeIn 1s both;
	}
	.loading{
		text-align: center;
	}
	.loading img{
		width: .32rem !important;
	}
</style>