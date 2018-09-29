<template>
	
	<div class="mobile-wrap center bj2">

		<Header title="提现">
			<router-link to="/Presentrecord" class="fr" slot="link">提现记录</router-link>
		</Header>
		
		<div class="drawing">
			<b>提现金额</b>
			<h3><span>￥</span><input type="number" placeholder="请输入提现金额" v-model="Money" onkeypress="keyPress()"><var>元</var></h3>
			<p>*单笔下限 : <i>{{ appEmbedApiAddress.qkMinMoney }}</i> 元　　单笔上限 : <i>{{ appEmbedApiAddress.qkMaxMoney }}</i> 元</p>
		</div>

		<div class="blank-list">
			<template v-for="card in cards">
				<div class="pict">
					<img :src="'../../static/img/blank/'+cardname(card.bankName)+'.png'" alt="">
				</div>
				<div class="text">
					<p>{{ card.bankAccount | card }}</p>
					<b>{{ card.bankName }}</b>
				</div>
				<div class="fr">
					<i class="ico-more"></i>
				</div>
			</template>
		</div>

		<div class="menage">
			<router-link to="/Bankcard">前往管理银行卡&gt;</router-link>
		</div>

		<div class="pub-wrap">
			<button @click="cash">立即提现</button>
		</div>
		
		<SelectCom title="请选择银行卡" :itemGroup="itemGroup" @childByValue="childByValue"></SelectCom>
		

		<Msg :message="msg" v-show="isShow"></Msg>


		<Footer acti="5"></Footer>

	</div>
</template>

<script>
	export default {
		name:'Drawing',
		props:[],
		data(){
			return{
				msg:'',
				isShow:false,

				// 充值金额
				
				Money:'',

				itemId:'',

				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),

				// 选择框内容
				itemGroup:[],

				appEmbedApiAddress:{}
			}
		},
		created(){
			this.getBank();
			this.minMoney();
		},
		mounted(){
			
		},
		computed:{
			cards(){
				var _this=this
				return _this.itemGroup.filter( obj =>{
					if(obj.id==_this.itemId) return obj
				})
				
			}
		},
		methods:{
			minMoney(){
				var _this=this
				_this.ajax("getAppConfig",{

				},
				data=>{
					_this.appEmbedApiAddress=data
				})
			},
			childByValue(val){
				this.itemId=val
			},
			// 立即提现
			cash(){
				var _this=this;

				_this.ajax('submitWithdraw',{
					uid:_this.param('uid'),
					token:_this.param('token'),
					id:_this.cards[0].id,
					money:_this.Money,
					drawPassword:''
				},
				data =>{
					_this.alert(data,_this,null,'PresentRecord')
				})
			},

			// 设置银行卡
			getBank(){
				var _this=this;
				_this.ajax('getUserBankCardList',{
					uid:this.param('uid'),
					token:this.param('token'),
				},
				data =>{
					_this.alert(data,_this);
					_this.itemGroup=data.userBankCardList

					// 设置默认
					_this.itemId=_this.itemGroup[0].id

				})
			},
			cardname(name){
				switch(name){
					case '中国银行': return 1;break;
					case '工商银行': return 2;break;
					case '交通银行': return 3;break;
					case '北京银行': return 4;break;
					case '光大银行': return 5;break;
					case '广发银行': return 6;break;
					case '华夏银行': return 7;break;
					case '建设银行': return 8;break;
					case '民生银行': return 9;break;
					case '宁波银行': return 10;break;
					case '农业银行': return 11;break;
					case '平安银行': return 12;break;
					case '浦发银行': return 13;break;
					case '其他银行': return 14;break;
					case '上海银行': return 15;break;
					case '深圳发展银行': return 16;break;
					case '兴业银行': return 17;break;
					case '邮政银行': return 18;break;
					case '招商银行': return 19;break;
					case '中信银行': return 20;break;
				}
			}			
		},
		filters:{
			
		},
		components:{

		}
	}
</script>