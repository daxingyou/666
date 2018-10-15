<template>
	
	<div class="mobile-wrap center bj2">
		<Header title="充值金额"></Header>

		<div class="amount">
			<p>充值金额</p>
			<strong>
				<span>￥</span>
				<input type="number" v-model="getMoney">
				<var>元</var>
			</strong>
			<b><i>*</i>单笔下限：<i>100.00 </i>单笔上限：<i>1000.00</i></b>
		</div>

		<div class="pub-wrap">
			<button type="button" @click="immediately">立即充值</button>
			<b><span>*注：</span>由于充值玩家较多，如遇充值失败请切换充值渠道或其他充值方式，<span>推荐使用:银行卡支付(赠送1%)</span></b>
		</div>
	</div>

</template>

<script>
	export default{
		name:"Rechargeamount",
		data(){
			return{
				
			}
		},
		created(){
			this.test()
		},
		methods:{
			// 立即充值
			immediately(){
				window.open("about:blank")
			}
		},
		mounted(){

		},
		computed:{
			getMoney(){
				return this.$store.state.config.Recharge_amount
			}
		}
	}
</script>