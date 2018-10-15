<template>
	
	<div class="mobile-wrap center bj2">
		<Header title="充值明细"></Header>
		<div class="usernama">
			<h2><img src="../../static/img/d936d59d56499d7cdec4791b11f23621_156x156.png" alt="">{{ username }}</h2>
			<div class="text">
				<b>{{ pageData[0].money }}元</b>
				<span class="sp0">{{ pageData[0].status | status }}</span>
			</div>
			<ul>
				<li>
					<span>订单号</span>
					<div class="fr">{{ pageData[0].orderNo }}</div>
				</li>
				<li>
					<span>时间</span>
					<div class="fr">{{ pageData[0].time | time }}</div>
				</li>
				<li>
					<span>存款方式</span>
					<div class="fr">{{ pageData[0].type | Rechargetype }}</div>
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
		name:'Rechargedetails',
		data(){
			return{
				id:this.$route.params.id
			}
		},
		created(){
			console.log(this.$store.state.Rechargerecord)
		},
		methods:{

		},
		computed:{
			pageData(){
				var data=this.$store.state.Rechargerecord
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