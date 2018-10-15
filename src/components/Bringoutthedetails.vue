<template>
	
	<div class="mobile-wrap center bj2">
		<Header title="提现明细"></Header>
		<div class="usernama">
			<h2><img src="../../static/img/d936d59d56499d7cdec4791b11f23621_156x156.png" alt="">{{ username }}</h2>
			<div class="text">
				<b>{{ pageData[0].money }}元</b>
				<span class="sp1" v-if="pageData[0].status==2">出款拒绝</span>
			</div>
			<ul>
				<li>
					<span>订单号</span>
					<div class="fr">{{ pageData[0].orderNo }}</div>
				</li>
				<li>
					<span>时间</span>
					<div class="fr">{{ pageData[0].time | year }}</div>
				</li>
				<li>
					<span>备注</span>
					<div class="fr">{{ pageData[0].remarks }}</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default{
		name:'Bringoutthedetails',
		data(){
			return{
				id:this.$route.params.id
			}
		},
		created(){
			console.log(this.$store.state.Presentrecord)
		},
		methods:{

		},
		computed:{
			pageData(){
				var data=this.$store.state.Presentrecord
				return data.filter(obj=>{
					if(obj.orderNo==this.id){
						return obj
					}
				})
			},
			username(){
				return this.$store.state.PersonalCenter.account
			}
		},
		mounted(){
			console.log(this.id)
		}

	}
</script>