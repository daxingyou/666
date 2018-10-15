<template>
	<div class="mobile-wrap center bj2">
		<Header title="支付宝转账"></Header>

		<div class="recharge-amount-transfer">
			<h3>
				<span class="fl">充值金额</span>
				<var v-text="getMoney"></var>
				<span class="fr">元</span>
			</h3> 
			<strong>最低限额：<i>{{ minMoney?minMoney:0 }}</i>元，最高限额：<i>{{ maxMoney?maxMoney:0 }}</i>元</strong>
			<div class="info">
				<span>转账信息</span>
				<input type="text" v-model="info" placeholder="支付宝昵称或订单号的后四位">
			</div>
			<div class="pub-wrap">
				<button :class="{'no':info.length==0}" @click="submitAlipayzz">确认提交，极速入款</button>
			</div>
			<div class="query">
				<b>"如何查询订单号？"</b>
				<p>1、打开支付宝，点击右下角"我的"</p>
				<p>2、进入"账单",点击对应的转账信息即可查询订单号</p>
			</div>

			<Msg :message="msg" v-show="isShow"></Msg>
			
		</div>
	</div>
</template>

<script>
	export default{
		name:"ConfirmationOfTransfer",
		data(){
			return {

				msg:'',
				isShow:false,

				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),

				// 最小金额
				minMoney:this.$store.state.config.skInfoList.minMoney,

				// 最大金额
				maxMoney:this.$store.state.config.skInfoList.maxMoney,

				// 金额
				getMoney:this.$store.state.config.Recharge_amount?this.$store.state.config.Recharge_amount:50,

				// 订单信息
				info:''
			}
		},
		methods:{
			// 提交
			submitAlipayzz(){
				var _this=this;

				var { id }={ ...this.$store.state.config.skInfoList }

				if(_this.info.length>0){
					_this.ajax("submitAlipayzz",{

						uid:_this.uid,

						token:_this.token,
						// 金额
						money:_this.getMoney,
						// 昵称
						userAlipayName:_this.info,
						// 编码
						alipayId:id,
						// 时间
						// time:new Date().getTime()
					},
					data=>{
						_this.alert(data,_this,"您的存款申请已提交，系统正在为您入款。","RechargeRecord")
					})
				}
			}
		}
	}
</script>