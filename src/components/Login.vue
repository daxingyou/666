<template>
	<div class="mobile-wrap center bj1">
		
		<Header title="登录"></Header>

		<div class="login-logo">
			<img src="../../static/img/ecdae69568a74338ce93ecbe885d0623_276x70.png" alt="">
		</div>
		<div class="login">
			<ul>
				<li>
					<i class="ico-user"></i>
					<input type="text" placeholder="请输入用户名" v-model="username">
				</li>
				<li>
					<i class="ico-pass"></i>
					<input type="password" placeholder="请输入密码" v-model="password">
				</li>
			</ul>
			<strong>
				<router-link to="/Register" class="fl">注册账号</router-link>
				<a @click="contant" class="fr">忘记密码？</a>
			</strong>
			<button type="button" @click="login">登录</button>
			<p>
				<a @click="freePlay" title="免费试玩">免费试玩</a>
				<router-link to="/Kefu">在线客服</router-link>
			</p>
		</div>
		
		<Msg :message="msg" v-show="isShow"></Msg>

	</div><!--mobile_wrap-->
</template>

<script>
	
	export default {
		name:'Login',
		data(){
			return{
				msg:'',
				isShow:false,

				username:'',
				password:'',

					username:'Niubi123456',
				password:'niubi123',

				// username:'test520',
				// password:'123456',

				// username:'mumu22',
				// password:'mm000000',

				// username:'sunjie1',
				// password:'123456s'
			}
		},
		created(){
			
		},
		mounted(){
			// 清除数据
			var number=this.$store.state.BuyNsidePage.pageConfig.number
			var sscBetList=this.$store.state.BuyNsidePage.sscBetList
			var PersonalCenter=this.$store.state.PersonalCenter
			if(number)
				number.splice(0,number.length);
			if(sscBetList)
				sscBetList.splice(0,sscBetList.length);
			if(PersonalCenter)
				PersonalCenter={}

			this.test();
		},
		methods:{
			// 联系客服弹窗
			contant(){
				pubAlert('温馨提示','请联系在线客服','OK')
			},
			// 登录
			login(){
				this.$store.commit('LoginStore',{"username":this.username,"password":this.password,"title":"登录成功","_that":this})
			},
			// 免费试玩
			freePlay(){
				var _this=this;
				_this.ajax("shiwanLogin",{
					// IP（可为空）
					ip:'192.168.0.159',
					// 登录网址
					url:'http://www.okami.net.cn/',
					// 登录类型（1-手机端，2-PC端，3-IOS，4-安卓）
					loginType:1,
				},
				data=>{
					console.log(data);
					if(data.result==1){
						var obj=JSON.stringify({"uid":data.userId,"token":data.token})
						localStorage.setItem("user",obj);
						pubAlert('温馨提示','游客盘口只供试玩，与正式会员盘口无关，试玩用户只支持彩票游戏试玩','确定',function(){
							// window.location.href="/";
							_this.$router.replace({"name":"Index"})
						})
					}					
				})
			}
		},
		computed:{

		},
		components:{
			
		}

	}

</script>