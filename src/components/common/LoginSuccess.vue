<template>
	<div>
		<div class="null-top"></div>
		<div class="fixed-top center">
			<header>
				<div class="logo">
					<img src="../../../static/img/e39a57e02a36d351e96825ccb39e9463_356x63.png" alt="">
				</div>
				<router-link tag="p" to="/PersonalCenter" class="fr">{{ time | hour }}！{{ nickname }}</router-link>
			</header>
		</div>
	</div>
</template>
<script>
	export default {
		name:'LoginSuccess',
		data(){
			return{
				// 上午好 下午好 晚上好 => 小时
				time:new Date().getHours()
			}
		},
		created(){
			// 判断是否为空对象
			if(JSON.stringify(this.$store.state.PersonalCenter)=="{}"){
				this.$store.commit('PersonalCenter');
			}
		},
		computed:{
			nickname(){
				return this.$store.state.PersonalCenter.account
			}
		}
	}
</script>