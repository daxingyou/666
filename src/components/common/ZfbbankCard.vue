<template>
	
	<div class="mobile-wrap center bj2">
		<Header title="支付宝账银行卡">
			<div class="course" slot="jian">
				<a>
					<img src="../../../static/img/1ceffc81e0b884850b236422266b397d_2x154.gif" alt="">
				</a>
			</div>
		</Header>

		<div class="tabs-two">
			<span class="acti">转账信息</span>
			<span>支付完成提交订单！</span>
		</div>
		
		<div class="wx-wrap">
			<div class="cg list">
				<ul>
					<li>
						<span>收款银行：</span>
						<input type="text" readonly v-model="itemCard[0].bankName">
						<b class="more-btn">更多账号</b>
					</li>
					<li>
						<span>转账卡号：</span>
						<input type="text" readonly v-model="itemCard[0].bankAccount">
						<button class="btn1" :data-clipboard-text="itemCard[0].bankAccount">复制</button>
					</li>
					<li>
						<span>开户姓名：</span>
						<input type="text" readonly v-model="itemCard[0].userName">
						<button class="btn2" :data-clipboard-text="itemCard[0].userName">复制</button>
					</li>
					<li>
						<span>开户网点：</span>
						<input type="text" readonly v-model="itemCard[0].subBankName">
						<button class="btn3" :data-clipboard-text="itemCard[0].subBankName">复制</button>
					</li>
				</ul>
				<div class="pub-wrap">
					<a @click="openApp">打开支付宝</a>
				</div>
			</div>
			<div class="cg order">
				<ul>
					<li>
						<span>充值金额:</span>
						<input class="in1" type="number" v-model="getMoney" placeholder="请输入充值的金额">
					</li>
					<li>
						<span>入款时间:</span>
						<input type="text" id="beginTime" placeholder="请选择入款时间">
					</li>
					<li>
						<span>{{ item.dyParam }}:</span>
						<input type="text" v-model="zfbname" :placeholder="item.dyParamTip">
					</li>
				</ul>
				<div class="pub-wrap">
					<button @click="postData" type="button">提交订单，审核入款！</button>
				</div>
			</div>
		</div>

		
		<!-- 教程弹窗 -->
		<div class="alert-box-course">
			<div class="layout">
				<h2>转账教程 <span class="fr">关闭</span></h2>
				<div class="box">
					<p><i>1.</i>打开支付宝“首页”，点击“转账”：</p>
					<div class="pict">
						<img style="width: 6.82rem;" src="../../../static/img/jiaocheng/zfbyhk_1.png" alt="">
					</div>
					<p><i>2.</i>进入转账页面，点击“转到银行卡”：</p>
					<div class="pict">
						<img style="width: 7.06rem;" src="../../../static/img/jiaocheng/zfbyhk_2.png" alt="">
					</div>
					<p><i>3.</i>根据提示填写对应信息，提交即可。</p>
					<div class="pict">
						<img style="width: 7.04rem;" src="../../../static/img/jiaocheng/zfbyhk_1.png" alt="">
					</div>
				</div>
			</div>
		</div>

		<div class="alertjs center">
			<div class="layout">
				<h3>提示</h3>
				<div class="content">请转账完成后切换至该页面提交订单！</div>
				<div class="but-box">
					<a @click="result" class="Sure" href="alipay://" target="_blank">立即转账</a>
				</div>
			</div>
		</div>
		
		<!-- 银行选择弹窗 -->
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
			
		<!-- 日期插件主结构 -->
		<div id="datePlugin"></div>

		<Msg :message="msg" v-show="isShow"></Msg>
	</div>

</template>

<script>
	export default{
		name:"WxbankCard",
		data(){
			return{
				msg:'',
				isShow:false,
				// 收款银行
				bankcardList:[],
				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),

				// 昵称
				zfbname:'',

				// 金额
				getMoney:this.$store.state.config.Recharge_amount?this.$store.state.config.Recharge_amount:'',

				// 默认显示的银行卡ID
				cardId:null,

				item:{}
			}
		},
		created(){
			this.getSystemBankCard();
			this.alipayName();
		},

		mounted(){

			this.$nextTick(function(){

				tabs_cg(".tabs-two span",".cg",'click');
				

				$("#beginTime").val(formatDateTime(new Date().getTime()))

				new Clipboard('.btn1');
				new Clipboard('.btn2');
				new Clipboard('.btn3');

				$('#beginTime').date({theme:"datetime"});
				
				// 转账教程
				$(".course").click(function(){
					$(".alert-box-course").fadeIn();
				})
				$(".alert-box-course .layout > h2 span").click(function(){
					$(".alert-box-course").fadeOut();
				})

				$(".bank-select-alert .layout .box1").on("click","p",function(){
					$(".bank-select-alert").fadeOut();
				})

				// 弹窗
				$(".bank-select-alert .layout .box2 button").click(function(){
					$(".bank-select-alert").fadeOut();
				})
				$(".wx-wrap .list ul li .more-btn").click(function(){
					$(".bank-select-alert").fadeIn();
				})

				$(".wx-wrap .list ul li button").click(function(){
					tipsTotice('复制成功!')
				})

			})
		},
		methods:{
			alipayName(){
				var _this=this;
				_this.ajax("getDyParam4AliPay",{
					uid:_this.param('uid'),
					token:_this.param('token')
				},
				data=>{
					console.log(data)
					_this.item=data
				})
			},
			result(){
				$(".alertjs").fadeOut();
				$(".tabs-two span").eq(1).addClass('acti').siblings().removeClass('acti')
				$('.wx-wrap .cg').eq(1).show().siblings().hide()
			},
			openApp(){
				$(".alertjs").fadeIn();
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
					_this.cardId=_this.bankcardList[0].id
				})
			},
			postData(){
				var _this=this;
				// 入款时间
				var rkTime=$('#beginTime').val();
				if(rkTime==""){
					tipsTotice('请选择入款时间!')
					 return
				}
				_this.ajax("submitAliPay2Bank",{
					uid:_this.uid,
					token:_this.token,
					money:_this.getMoney,
					rkTime:rkTime,
					unParam:_this.zfbname,
					bankCardId:_this.cardId
				},
				data=>{
					_this.alert(data,_this,"您的存款申请已提交，系统正在为您入款。","RechargeRecord")
				})
			}
		},
		computed:{
			itemCard(){
				var card = this.bankcardList.filter((obj)=>{
					if(obj.id==this.cardId){
						return obj
					}
				})
				if(card.length==0){
					var obj={
						bankName:'请选择 >',
					}
					card.push(obj)
					return card
				}else{
					return card
				}
			}
		}
	}
</script>