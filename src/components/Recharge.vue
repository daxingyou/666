<template>
	<div class="mobile-wrap center bj2">
	
		<Header title="充值" :assistant="1"></Header>
		
		<div class="recharge">
			<strong>
				<span class="fl">用户名：<i class="i1">{{ account }}</i></span>
				<span class="fr">账户余额：<i class="i2">{{ balance }}</i> 元 <i class="ico-refresh"></i></span>
			</strong>
			<div class="box">
				<input type="text" class="nanual" placeholder="请手动输入充值金额" v-model="inputMoney">
				<ul>
					<li :class="{'acti':inputMoney==50}" @click="select_money(50)">￥50元</li>
					<li :class="{'acti':inputMoney==100}" @click="select_money(100)">￥100元</li>
					<li :class="{'acti':inputMoney==300}" @click="select_money(300)">￥300元</li>
					<li :class="{'acti':inputMoney==500}" @click="select_money(500)">￥500元</li>
					<li :class="{'acti':inputMoney==1000}" @click="select_money(1000)">￥1000元</li>
					<li :class="{'acti':inputMoney==3000}" @click="select_money(3000)">￥3000元</li>
					<li :class="{'acti':inputMoney==5000}" @click="select_money(5000)">￥5000元</li>
					<li :class="[{'acti':inputMoney==''},'type']" @click="select_money('')"><input type="number" placeholder="自定义金额" name="" @keyup="setMoney" v-model="setMoneyNum"></li>
				</ul>
			</div>
		</div>

		<PaymentList :money="inputMoney" keep-alive></PaymentList>

	</div>

	<!--mobile_wrap-->

</template>

<script>
	export default {
		name:'Recharge',
		data(){
			return{
				inputMoney:'',
				setMoneyNum:'',

				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),

				balance:'加载中...',
			}
		},
		computed:{
			// 用户名
			account(){
				return this.$store.state.PersonalCenter.account;
			},
		},
		created(){

			this.getAllAmount()

			// 用户信息
			if(JSON.stringify(this.$store.state.PersonalCenter)=="{}"){
				this.$store.commit('PersonalCenter');
			}

			if(this.$store.state.config.Recharge_amount){
				this.inputMoney=this.$store.state.config.Recharge_amount
			}

		},
		mounted(){
			var _this=this
			// 余额刷新
			$(".recharge strong span i.ico-refresh").click(function(){
				var that=$(this);
				that.addClass('acti')
				_this.getAllAmount(1)
				
			})

		},
		methods:{
			// 获取余额
			getAllAmount(id){
				var _this=this;
				_this.ajax('getAllAmount',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this);
					_this.balance=data.userBalance
					$(".recharge strong span i.ico-refresh").removeClass('acti')
					if (id) 
						tipsTotice('刷新已完成!')
				})
			},
			// 选择金额
			select_money(v){
				this.inputMoney=v;
				this.$store.state.config.Recharge_amount=v
			},
			
			// 自定义金额
			setMoney(){
				this.inputMoney=this.setMoneyNum
				this.$store.state.config.Recharge_amount=this.setMoneyNum
			}
		}
	}

</script>