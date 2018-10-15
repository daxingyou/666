<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="银行卡信息"></Header>
		
		<div class="bankcardinfo" v-for="item in filCards">
			<ul>
				<li>
					<span>
						<img src="../../static/img/bankcard/xzyh.png" alt="">
						<var>开户银行：</var>
					</span>
					<p>{{ item.bankName }}</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/zxmc.png" alt="">
						<var>支行名称：</var>
					</span>
					<p>{{ item.subBankName }}</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/kh.png" alt="">
						<var>卡号：</var>
					</span>
					<p>{{ item.bankAccount }}</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/khd.png" alt="">
						<var>开户地：</var>
					</span>
					<p>{{ item.location }}</p>
				</li>
				<li>
					<span>
						<img src="../../static/img/bankcard/zxmc.png" alt="">
						<var>开户人：</var>
					</span>
					<p>{{ item.userName }}</p>
				</li>
			</ul>
			<div class="pub-wrap">
				<button v-if="!item.default" type="button" @click="setDefault">设置默认银行卡</button>
				<button type="button" @click="Delete">删除银行卡</button>
			</div>
		</div>
		
		<Msg :message="msg" v-show="isShow"></Msg>
	</div>
	
	<!--mobile_wrap-->

</template>

<script>

	export default {
		name:'Bankcardinfo',
		data(){
			return{
				msg:'',
				isShow:false,

				uid:this.param('uid'),
				token:this.param('token'),
				
				cardsInfo:[],
				id:this.$route.params.id

			}
		},
		created(){
			this.data();
		},
		mounted(){
			var _this=this;
		},
		computed:{
			// 过滤
			filCards(){
				var _this=this;
				return _this.cardsInfo.filter( data =>{
					if(data.id==_this.id){
						return data
					}
				});
			}

		},
		methods:{
			// 设置默认银行卡
			setDefault(){
				var _this=this;
				_this.ajax('setUserBankDefault',{
					uid:_this.uid,
					token:_this.token,
					id:_this.id
				},
				data=>{
					_this.alert(data,_this,'设置成功',1);
				})
			},
			// 删除银行卡
			Delete(){
				var _this=this;
				_this.ajax('delUserBank',{
					uid:_this.uid,
					token:_this.token,
					id:_this.id
				},
				data=>{
					_this.alert(data,_this,'删除成功',1);
				})
			},
			// 银行卡列表
			data(){
				var _this=this;
				_this.ajax('getUserBankCardList',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this)
					_this.cardsInfo=data.userBankCardList
				})
			}
		},
		components:{

		}
	}

</script>
