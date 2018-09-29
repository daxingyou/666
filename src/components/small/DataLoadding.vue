<template>
	
	<div class="dataloadding">
		<div class="layout">
			<img src="../../../static/img/icon/oval.svg" alt="">
			<p>{{ text }}</p>
		</div>
	</div>

</template>


<script>
	export default{
		name:'DataLoadding',
		data(){
			return {
				text:'加载中...'
			}
		}
	}
</script>
