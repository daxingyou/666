<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="银行卡管理">
			<div class="edit" slot="edit">
				<router-link tag="span" to="/Bankcardadd">添加</router-link>
			</div>
		</Header>
		<div class="bankcard">
			<ul>
				<li v-for="item in cards">
					<router-link :to="/Bankcardinfo/+item.id">
						<div class="pict">
							<img :src="'../../static/img/blank/'+ cardname(item.bankName) +'.png'" alt="">
						</div>
						<div class="text">
							<b>{{ item.bankAccount | card }}</b>
							<p class="p1" v-if="item.default">默认银行卡( {{ item.bankName }})</p>
							<p v-else>{{ item.bankName }}</p>
						</div>
						<div class="fr">
							<i class="ico-more"></i>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
	
	</div>
	
	<!--mobile_wrap-->

</template>

<script>

	export default {
		name:'Bankcard',
		data(){
			return{
				uid:this.param('uid'),
				token:this.param('token'),

				// 银行卡列表
				cards:[]
			}
		},
		created(){
			this.data();
		},
		mounted(){
			var _this=this;
		},
		methods:{
			// 银行卡
			data(){
				var _this=this;
				_this.ajax('getUserBankCardList',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this)
					_this.cards=data.userBankCardList.sort((a, b) => a.default < b.default)
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
		components:{

		}
	}

</script>
