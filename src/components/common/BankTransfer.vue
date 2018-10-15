<template>
	<div class="mobile-wrap center bj2">
		<Header title="银行汇款"></Header>
		<div class="collecting-bank-information">
			
			<div class="box">
				<b>收款银行信息</b>
				<ul>
					<li class="select1-show">
						<span>{{ itemCard[0].bankName }}</span>
						<div class="fr">
							<i class="ico-more"></i>
						</div>
					</li>
					<li>
						<span>开户银行</span>
						<div class="fr">
							<input readonly unselectable="on" id="bankName" type="text" v-model="itemCard[0].bankName">
							<button class="btn1" data-clipboard-target="#bankName">复制</button>
						</div>
					</li>
					<li>
						<span>开户网点</span>
						<div class="fr">
							<input readonly unselectable="on" id="subBankName" type="text" v-model="itemCard[0].subBankName">
							<button class="btn2" data-clipboard-target="#subBankName">复制</button>
						</div>
					</li>
					<li>
						<span>开户姓名</span>
						<div class="fr">
							<input readonly unselectable="on" id="userName" type="text" v-model="itemCard[0].userName">
							<button class="btn3" data-clipboard-target="#userName">复制</button>
						</div>
					</li>
					<li>
						<span>开户卡号</span>
						<div class="fr">
							<input readonly unselectable="on" id="bankAccount" type="text" v-model="itemCard[0].bankAccount">
							<button class="btn4" data-clipboard-target="#bankAccount">复制</button>
						</div>
					</li>
				</ul>
			</div>

			<div class="box">
				<b>会员存款信息</b>
				<ul>
					<li class="select3-show">
						<span>{{ card?card:'请选择转出银行' }}</span>
						<div class="fr">
							<i class="ico-more"></i>
						</div>
					</li>
					<li class="select2-show">
						<span>{{ modeName?modeName:'请选择存款方式' }}</span>
						<div class="fr">
							<i class="ico-more"></i>
						</div>
					</li>
					<li>
						<input type="number" placeholder="请输入存款金额" v-model="money">
					</li>
					<li>
						<input type="number" placeholder="请输入银行卡号后四位" v-model="fournumber">
					</li>
				</ul>
			</div>

			<div class="box">
				<b>汇款人</b>
				<ul>
					<li>
						<input disabled="" type="text" placeholder="请输入汇款人" v-model="remitter">
					</li>
				</ul>
			</div>

			<div class="pub-wrap">
				<button @click="PostSubmit">提交申请</button>
			</div>
		</div>
		
		<!-- select1 -->
		<div class="bank-select-alert center select1">
			<div class="layout">
				<h2>请选择</h2>
				<div class="box1">
					<template v-for="item in bankcardList">
						<p @click="cardId=item.id">{{ item.bankName }} {{ item.bankAccount | card }} </p>
					</template>
				</div>
				<div class="box2">
					<button type="button">取消</button>
				</div>
			</div>
		</div>

		<!-- select2 --><!-- 存款方式 -->
		<div class="bank-select-alert center select2" style="display:none;">
			<div class="layout">
				<h2>请选择</h2>
				<div class="box1">
					<template v-for="item in depositChannelList">
						<p @click="mode(item.name,item.id)">{{ item.name }} </p>
					</template>
				</div>
				<div class="box2">
					<button type="button">取消</button>
				</div>
			</div>
		</div>


		<!-- select3 -->
		<div class="bank-select-alert center select3" style="display:none;">
			<div class="layout">
				<h2>请选择</h2>
				<div class="box1">
					<template v-for="item in bankList">
						<p @click="card=item.name">{{ item.name }} </p>
					</template>
				</div>
				<div class="box2">
					<button type="button">取消</button>
				</div>
			</div>
		</div>
		
		<Msg :message="msg" v-show="isShow"></Msg>

	</div>
	<!-- mobile-wrap -->
</template>


<script>
	export default {
		name:'BankTransfer',
		data(){
			return{
				msg:'',
				isShow:false,
				
				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),

				// 收款银行
				bankcardList:[],

				// 存款方式
				depositChannelList:[],

				// 转出银行
				bankList:[],

				cardId:null,

				// 金额
				money:this.$store.state.config.Recharge_amount?this.$store.state.config.Recharge_amount:50,

				// 卡号后4位
				fournumber:'',

				bankName:'',

				modeName:'',

				// 存款方式渠道 不能为字符串
				modeId:0,
				// 用户银行名称
				card:''
			}
		},
		computed:{
			// 转账人
			remitter(){
				return this.$store.state.PersonalCenter.name;
			},

			itemCard(){
				var card = this.bankcardList.filter((obj)=>{
					if(obj.id==this.cardId){
						return obj
					}
				})
				if(card.length==0){
					var obj={
						bankName:'请选择>',
					}
					card.push(obj)
					return card
				}else{
					return card
				}
			}
		},
		created(){
			this.$nextTick(function(){

				this.getSystemBankCard();
				this.getDepositChannel();
				this.getEnums();

				new Clipboard('.btn1');
				new Clipboard('.btn2');
				new Clipboard('.btn3');
				new Clipboard('.btn4');

				// 用户信息
				if(JSON.stringify(this.$store.state.PersonalCenter)=="{}"){
					this.$store.commit('PersonalCenter');
				}
			})
		},
		mounted(){
			$(".bank-select-alert .layout .box2 button").click(function(){
				$(".bank-select-alert").fadeOut();
			})
			$(".bank-select-alert .layout .box1").on("click","p",function(){
				$(".bank-select-alert").fadeOut();
			})
			$(".select1-show").click(function(){
				$(".select1").fadeIn();
			})
			$(".select2-show").click(function(){
				$(".select2").fadeIn();
			})
			$(".select3-show").click(function(){
				$(".select3").fadeIn();
			})
			$('.collecting-bank-information .box ul li .fr button').click(function(){
				tipsTotice('复制成功!')
			})
		},
		methods:{
			mode(name,id){
				this.modeName=name
				this.modeId=id
			},
			// 转出银行
			getEnums(){
				var _this=this;
				_this.ajax("getEnums",{
					uid:_this.param('uid'),
					token:_this.param('token')
				},
				(data)=>{
					_this.alert(data,_this)
					_this.bankList=data.bankList
				})
			},
			// 获取存款方式
			getDepositChannel(){
				var _this=this;
				_this.ajax("getDepositChannel",{
					uid:_this.param('uid'),
					token:_this.param('token')
				},
				(data)=>{
					_this.alert(data,_this)
					_this.depositChannelList=data.depositChannelList
				})
			},
			getSystemBankCard(){
				var _this=this;
				_this.ajax("getSystemBankCard",{
					uid:_this.param('uid'),
					token:_this.param('token')
				},
				(data)=>{
					_this.alert(data,_this)
					_this.bankcardList=data.bankcardList
					// 默认选择第一个银行卡
					_this.cardId=_this.bankcardList[0].id

				})
			},
			// 提交
			PostSubmit(){

				var _this=this;

				_this.ajax("submitYhzz",{

					// 用户ID
					uid:_this.param('uid'),
					// 鉴权码
					token:_this.param('token'),
					// 金额（2位小数）
					money:_this.money,
					// 存款渠道
					depositChannelId:_this.modeId,
					// 系统收款银行编码
					bankCardId:this.itemCard[0].id,
					// 用户银行账号
					bankAccount:_this.fournumber,	// 后四位
					// 用户银行名称
					userBankName:_this.card,

					// name:_this.remitter,	// 汇款人
				},
				(data)=>{
					_this.alert(data,_this,'提交申请成功','RechargeRecord')

				})
			}
		},
		filters:{
			
		},
		components:{
			
		},
		beforeDestroy(){
						
		}
	}
</script>