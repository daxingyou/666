<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="银行卡转账" assistant="1"></Header>

		<div class="accounts">
			<ul>
				<li>
					<span>收款账号</span>
					<input type="text" value="" v-model="bankAccount" placeholder="收款人账号">
					<button>复制</button>
				</li>
				<li>
					<span>收款人</span>
					<input type="text" value="" v-model="userBankName" placeholder="收款人姓名">
				</li>
				<li>
					<span>存入银行</span>
					<input type="text" value="" v-model="depositChannelId" placeholder="对方银行名称">
				</li>
				<li>
					<span>备注</span>
					<input type="text" value="" v-model="remarks" placeholder="填写备注">
				</li>
				<li>
					<span>存入金额</span>
					<input class="red" type="text" placeholder="请输入金额" v-model="money">
				</li>
			</ul>
			<div class="wrap">
				<p>最低限额：<i>10</i>元，最高限额：<i>50000</i>元</p>
				<a title="" @click="BankCardTransfer">转账完成 立即入款</a>
			</div>
		</div>
		
		<Footer acti="5"></Footer>

	</div>

	<!--mobile_wrap-->

</template>

<script>

	export default {
		name:'BankCardTransfer',
		data(){
			return{
				msg:'',
				is_show:false,

				remarks:'这是备注信息',

				uid:this.param('uid'),
				token:this.param('token'),

				money:'5000元',
				depositChannelId:'招商银行',
				bankCardId:'',

				bankAccount:6147524625845286,	//收款账号
				userBankName:'孙杰',//收款账号
			}
		},
		methods:{
			BankCardTransfer(){
				var _this=this
				_this.ajax('BankCardTransfer',{
					uid:_this.uid,
					token:_this.token,
					money:_this.money,
					depositChannelId:_this.depositChannelId,
					bankCardId:_this.bankCardId,
					bankAccount:_this.bankAccount,
					userBankName:_this.userBankName
				},
				data=>{
					_this.alert(data,_this)
				})
			}
		},
		components:{

		}
	}
</script>
