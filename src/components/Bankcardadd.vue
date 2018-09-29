<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="添加银行卡"></Header>

		<div class="bankcardinfo">
			<ul>
				<li>
					<span>
						<img src="../../static/img/bankcard/xzyh.png" alt="">
						<var>选择银行：</var>
					</span>
					<p>
						<select name="" id="" @change="selectBank">
							<option value="">请选择银行</option>
							<option value="北京银行">北京银行</option>
							<option value="工商银行">工商银行</option>
							<option value="光大银行">光大银行</option>
							<option value="广发银行">广发银行</option>
							<option value="华夏银行">华夏银行</option>
							<option value="建设银行">建设银行</option>
							<option value="民生银行">民生银行</option>
							<option value="交通银行">交通银行</option>
							<option value="宁波银行">宁波银行</option>
							<option value="农业银行">农业银行</option>
							<option value="平安银行">平安银行</option>
							<option value="浦发银行">浦发银行</option>
							<option value="上海银行">上海银行</option>
							<option value="深圳发展银行">深圳发展银行</option>
							<option value="兴业银行">兴业银行</option>
							<option value="邮政银行">邮政银行</option>
							<option value="招商银行">招商银行</option>
							<option value="中国银行">中国银行</option>
							<option value="中信银行">中信银行</option>
							<option value="其他银行">其他银行</option>
						</select>
					</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/zxmc.png" alt="">
						<var>支行名称：</var>
					</span>
					<p>
						<input type="text" placeholder="请输入支行名称" v-model="subBankName">
					</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/kh.png" alt="">
						<var>卡号：</var>
					</span>
					<p>
						<input type="number" v-model="bankAccount" placeholder="请输入卡号">
					</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/kh.png" alt="">
						<var>确认卡号：</var>
					</span>
					<p>
						<input type="number" v-model="fmbankAccount" placeholder="请输入确认卡号">
					</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/khd.png" alt="">
						<var>开户地：</var>
					</span>
					<p>
						<input type="text" v-model="location" placeholder="请输入开户地">
					</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/zxmc.png" alt="">
						<var>开户人：</var>
					</span>
					<p>
						<input type="text" disabled="" v-model="holder" placeholder="请输入开户人">
					</p>
				</li>
			</ul>
			<div class="pub-wrap">
				<button type="button" @click="confirm">确认添加</button>
			</div>
		</div>

		<Msg :message="msg" v-show="isShow"></Msg>

	</div>
	
	<!--mobile_wrap-->

</template>

<script>

	export default {
		name:'Bankcardadd',
		data(){
			return{

				msg:'',
				isShow:false,
				
				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),
				// 银行名称
				bankName:'',
				// 支行名称
				subBankName:'',
				// 卡号
				bankAccount:'',
				// 确认卡号
				fmbankAccount:'',
				// 开户地
				location:'',
				// 开户人
				holder:this.$store.state.PersonalCenter.name,
			}
		},
		created(){
			if(JSON.stringify(this.$store.state.PersonalCenter)=='{}'){
				this.$store.commit('PersonalCenter')
			}
		},
		mounted(){
			
		},
		computed:{
			
		},
		methods:{
			// 选择银行
			selectBank(ele){
				var _this=this;
				_this.bankName = ele.target.value;
				// _this.log(ele.target.value)
			},
			// 添加银行卡
			confirm(){
				var _this=this;

				if(_this.fmbankAccount!=_this.bankAccount){
					tipsTotice('卡号不一致！')
					return 
				}

				if(_this.location.trim()==""){
					tipsTotice('开户地不能为空！')
					return 
				}

				_this.ajax('addUserBank',{
					uid:_this.uid,
					token:_this.token,

					bankName:_this.bankName,
					subBankName:_this.subBankName,
					bankAccount:_this.bankAccount,
					location:_this.location
				},
				data=>{
					_this.alert(data,_this,'添加成功','Bankcard')
				})
			}
		}
	}

</script>
