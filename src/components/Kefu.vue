<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="在线客服"></Header>

		<div id="frame">
			<iframe :src="webLink"></iframe>
		</div>
	</div>

	<!--mobile_wrap-->

</template>

<script>

	export default {
		name:'Kefu',
		created(){
			// 客服链接
			if(!this.$store.state.webLink){
				this.$store.commit('webLink');
			}
		},
		computed:{
			// 客服链接
			webLink(){
				return this.$store.state.webLink;
			},
		}
	}

</script>
