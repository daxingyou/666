<template>
	<div class="mobile-wrap center bj2">
		
		<Header :title="ExternalLinks.title" v-if="ExternalLinks.isshow"></Header>

		<div id="frame" :class="{'full':!ExternalLinks.isshow}">
			<div class="return" @click="returnPrev"><i class="ico-return"></i>返回</div>
			<iframe :src="ExternalLinks.link"></iframe>
		</div>
	</div>

	<!--mobile_wrap-->

</template>

<script>

	export default {
		name:'ExternalLinks',
		created(){
			if(JSON.stringify(this.$store.state.ExternalLinks_Config)=="{}"){
				this.$router.go(-1)
			}
		},
		mounted(){
			var whei=$(window).height();
			$('#frame').height(whei)
		},
		computed:{
			// 外部链接
			ExternalLinks(){
				return this.$store.state.ExternalLinks_Config
			}
		},
		methods:{
			returnPrev(){
				this.$router.go(-1)
			}
		}
	}

</script>
