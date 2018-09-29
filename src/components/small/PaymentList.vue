<template>
	<div class="play-mode">
		<strong>
			请选择充值方式,如有充值未到账请联系<a :href="webLink" target="_blank">【在线客服】</a>
		</strong>
		<div class="wrap">
			<div class="mode-name">
				<template v-for="(item,index) in typeList">
					<span @click="cgPay(index)" :class="{'acti':cgIndex==index}">{{ item.name }}</span>
				</template>
			</div>
			<ul>
				<li v-for="item in czList">
					<a @click="changeLink(item.payType,item.type,item.openType,item.url)">
						<div class="pict">
							<img :src="item.imgUrl" alt="">
						</div>
						<div class="text">
							<b>{{ item.name }}</b>
							<p>{{ item.remarks }}</p>
						</div>
					</a>
				</li>
			</ul>

		</div>
	</div>
</template>

<script>
	
	export default{
		name:'PaymentList',
		data(){
			return{
				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),

				cgIndex:0,

				typeList:[],

			}
		},
		computed:{
			// 客服链接
			webLink(){
				return this.$store.state.webLink
			},
			czList(){
				var _this=this
				var arr=[];
				_this.typeList.forEach((obj,index)=>{
					if(index==_this.cgIndex){
						arr=obj.czList
					}
				})
				return arr
			}
		},
		created(){
			this.data()
			// 客服链接
			if(!this.$store.state.webLink){
				this.$store.commit('webLink')
			}

		},
		methods:{
			changeLink(payType,type,openType,url){

				// Rechargeamount

				var str='';
				// 银行卡
				if(payType==4 && type==1) str='BankTransfer';

				// 在线银行
				if(payType==4 && type==2 && url.length>15) str=url; //通用

				// 微信转银行卡
				if(payType==9 && type==1) str='WxbankCard';
				
				// 支付宝转银行卡
				if(payType==11 && type==1) str='ZfbbankCard';

				// 微信添加好友转账
				if(payType==1 && type==1) str='WxAddfriends';

				// 微信转账支付
				if(payType==1 && type==2 && openType==0) str='Rechargeamount';

				// test_3
				if(payType==1 && type==2 && openType==1) str=url;

				// test
				if(payType==1 && type==2 && openType==0 && url.length>15) str=url;

				// 支付宝转账支付
				if(payType==2 && type==1) str='ZfbAddfriends';

				// 支付宝wap-充值更快捷！
				if(payType==2 && type==2 && openType==0 && url.length>15) str=url;

				// 京东扫码
				if(payType==5 && type==2 && openType==0 && url.length>15) str=url;

				if(this.$store.state.config.Recharge_amount){
					if(this.$store.state.config.Recharge_amount>0){
						if(str.length>15){
							window.open(url); 
						}else{
							this.$router.push(str)
						}
					}
				}else{
					pubAlert("温馨提示","请输入充值金额","OK")
				}

			},
			data(){
				var _this=this;
				_this.ajax("getAppCzInfo4",{
					uid:_this.uid,
					// 鉴权码
					token:_this.token
				},
				data=>{
					_this.alert(data,_this)
					_this.typeList=data.czTypeList
					if(_this.typeList.length>0){
						_this.typeList.forEach((obj)=>{
							_this.getBase64(obj.czList,'imageId',function(){

							})
						})
					}
				})
			},
			// 支付方式切换
			cgPay(dex){
				this.cgIndex=dex
			},
		}
	}
</script>
