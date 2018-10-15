<template>
	
	<div class="mobile-wrap center">
		<Header title="微信转账">
			<div class="course" slot="jian">
				<a>
					存款教程
				</a>
			</div>
		</Header>

		<div class="minimum">
			<h1>最低限额:<i>{{ itemCard[0].minMoney }}</i>元，最高限额:<i>{{ itemCard[0].maxMoney }}</i>元</h1>
			<ul>
				<li class="more-select">
					<span>收款信息</span>
					<div class="fr">
						<i class="ico-more"></i>
					</div>
				</li>
				<li>
					<span>微信号：</span>
					<b>{{ itemCard[0].account }}</b>
					<button class="btn1" :data-clipboard-text="itemCard[0].account">复制</button>
				</li>
				<li>
					<span>收款人:</span>
					<var>{{ itemCard[0].username }}</var>
				</li>
				<li>
					<span>存入金额</span>
					<input type="number" v-model="getMoney">
				</li>
			</ul>
		</div>

		<!-- 二维码 -->
		<div class="wxcode" v-if="itemCard[0].imageId">
			<div class="pict">
				<ImgLoadding :item="itemCard[0]"></ImgLoadding>
			</div>
			<div class="sao">
				<img src="../../../static/img/93c413941c657f766cc7393e0d51ee61_57x56.png" alt="">
				<span>请使用微信扫描<br>二维码完成支付</span>
			</div>

			<p>
				<a title="">保存二维码</a> |
				<a href="weixin://" title="" target="_blank">加微信好友-付款</a> |
				<a class="course-change" title="">付款教程&gt;</a>
			</p>

			<div class="wx-course">
				<strong><i>1.</i>打开微信，右上角+，点击扫一扫二维码进行转账</strong>
				<div class="pict1">
					<img style="width: 3.25rem;" src="../../../static/img/wxyhk_1.png" alt="">
				</div>
				<strong><i>2.</i>添加收款人微信号（如：田伟伟），进行微信转账</strong>
				<div class="pict1">
					<img style="width: 4.8rem;" src="../../../static/img/wxyhk_2.png" alt="">
				</div>
			</div>

		</div>

		<div class="pub-wrap">
			<router-link to="/WxConfirmationOfTransfer" replace>提交</router-link>
		</div>

		<div class="rechargelink">
			<router-link to="/BankTransfer">大额充值</router-link> |
			<a :href="webLink" title="" target="_blank">联系客服</a>
		</div>
		
		<!-- 教程弹窗 -->
		<div class="alert-box-course">
			<div class="layout">
				<h2>转账教程 <span class="fr">关闭</span></h2>
				<div class="box">
					<p><i>1.</i>打开微信，右上角+，点击扫一扫二维码进行转账</p>
					<div class="pict">
						<img style="width: 6.82rem;" src="../../../static/img/wxyhk_1.png" alt="">
					</div>
					<p><i>2.</i>添加收款人微信号（如：田伟伟），进行微信转账</p>
					<div class="pict">
						<img style="width: 7.06rem;" src="../../../static/img/wxyhk_2.png" alt="">
					</div>
				</div>
			</div>
		</div>
		
		<!-- 银行选择弹窗 -->
		<div class="bank-select-alert center">
			<div class="layout">
				<h2>请选择</h2>
				<div class="box1">
					<template v-for="item in skInfoList">
						<p @click="cardId=item.id">{{ item.account }} {{ item.username}} </p>
					</template>
				</div>
				<div class="box2">
					<button type="button">取消</button>
				</div>
			</div>
		</div>

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
				skInfoList:[],
				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),

				// 入款时间
				rkTime:'2018-09-10 13:30:40',

				// 金额
				getMoney:this.$store.state.config.Recharge_amount?this.$store.state.config.Recharge_amount:50,

				// 默认显示的联系人ID
				cardId:null,
			}
		},
		created(){
			this.showkuan();
		},
		mounted(){
			this.rkTime=getFormat();

			this.$nextTick(function(){
				tabs_cg(".tabs-two span",".cg",'click');

				new Clipboard('.btn1');
				
				// 转账教程
				$(".course").click(function(){
					$(".alert-box-course").fadeIn();
				})
				$(".alert-box-course .layout > h2 span").click(function(){
					$(".alert-box-course").fadeOut();
				})

				// 弹窗隐藏
				$(".bank-select-alert .layout .box1").on("click","p",function(){
					$(".bank-select-alert").fadeOut();
				})

				$(".bank-select-alert .layout .box2 button").click(function(){
					$(".bank-select-alert").fadeOut();
				})

				// 显示
				$(".more-select").click(function(){
					$(".bank-select-alert").fadeIn();
				})


				$(".course-change").click(function(event) {
					$(this).toggleClass('acti');
					$(".wx-course").slideToggle();
				});

			})
		},
		methods:{
			// 收款
			showkuan(){
				var _this=this;
				_this.ajax("getPayOnline3",{
					uid:_this.param('uid'),
					token:_this.param('token'),
					type:1,
				},
				(data)=>{
					_this.alert(data,_this)
					_this.skInfoList=data.skInfoList
					_this.cardId=_this.skInfoList[0].id
					_this.getBase64(_this.skInfoList,"imageId",function(){})
				})
			}
		},
		computed:{
			// 客服链接
			webLink(){
				return this.$store.state.webLink
			},
			itemCard(){
				var card = this.skInfoList.filter((obj)=>{
					if(obj.id==this.cardId){
						this.$store.state.config.skInfoList=obj
						return obj
					}
				})
				if(card.length==0){
					var obj={
						account:'请选择 >',
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