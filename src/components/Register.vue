<template>
	<div class="mobile-wrap center bj1">
		<Header title="注册" :free="1"></Header>
		<div class="register">
			<ul>
				<li>
					<i class="ico-user"></i>
					<input type="text" placeholder="请输入用户名" v-model="account">
				</li>
				<li>
					<i class="ico-name"></i>
					<input type="text" placeholder="请输入真实姓名" v-model="name">
				</li>
				<li>
					<i class="ico-pass"></i>
					<input type="password" placeholder="请输入您的密码" v-model="password">
				</li>
				<li>
					<i class="ico-pass"></i>
					<input type="password" placeholder="请确认您的密码" v-model="fmpassword">
				</li>
				<li v-if="checkPhone">
					<i class="ico-phone"></i>
					<input type="text" placeholder="请输入您的手机" v-model="phone">
				</li>
				<li v-if="checkEmail">
					<i class="ico-email"></i>
					<input type="text" placeholder="请输入您的邮箱" v-model="email">
				</li>
				<li v-if="checkQq">
					<i class="ico-qq"></i>
					<input type="text" placeholder="请输入您的QQ" v-model="qq">
				</li>
				<li v-if="vcSwtich">
					<i class="ico-code"></i>
					<input class="short" type="text" placeholder="请输入验证码" v-model="code">
					<div class="fr">
						<canvas id="canvas" width="100" height="43"></canvas>
					</div>
				</li>
			</ul>
			<b><label><input @click="isAree=!isAree" type="checkbox" :checked="isAree">我已阅读并同意</label><a title="">《移动彩票服务条款》</a></b>
			<button :class="{acti:isAree}" @click="register">注册</button>
			<p>已有账号，<router-link to="/Login">立即登入</router-link></p>
		</div>

		<Msg :message="msg" v-show="isShow"></Msg>

		<!-- 协议弹窗 -->
		<div class="alert-box-course center">
			<div class="layout">
				<h2>开户协议<span class="fr">关闭</span></h2>
				<div class="text" v-html="getKhxy">
					
				</div>
			</div>
		</div>

	</div>
	<!--mobile_wrap-->
</template>

<script>
	export default {
		name:'Register',
		data(){
			return{
				// 是否同意协议
				isAree:false,

				msg:'',
				isShow:false,

				account:'',
				name:'',
				password:'',
				fmpassword:'',
				qq:'',
				email:'',
				phone:'',
				code:'',


				 // 配置开关
				checkPhone:null,
				checkEmail:null,
				checkQq:null,

				needRchgCard:null,
				needRequiredEmail:null,
				needRequiredQq:null,
				needRequredPhone:null,
				vcSwtich:null,

				//协议内容
				getKhxy:'',

				codeId:'',

			}
		},
		created(){
			this.getRegisterConfig();
			this.getKhxytext()
		},
		mounted(){
			var _this=this;
			this.$nextTick(()=>{

				$(".register b a").click(function(){
					$('.alert-box-course').fadeIn();
				})

				$(".alert-box-course .layout h2 span").click(function(){
					$('.alert-box-course').fadeOut();
				})

				$(document).ready(function(){

					setTimeout(function(){

						var show_num = [];
						draw(show_num);
						_this.codeId=show_num.join("")

						$("#canvas").on('click',function(){
							draw(show_num);
							_this.codeId=show_num.join("")
						})
						
					},1000)

				});
				
			})

		},
		methods:{
			// 获得开户协议
			getKhxytext(){
				var _this=this;
				_this.ajax('getKhxy',{

				},
				data=>{
					_this.getKhxy=data.khxy
				})
			},
			// 获取配置
			getRegisterConfig(){
				var _this=this;
				_this.ajax('getRegisterConfig',{

				},
				data=>{
					_this.log(data)
					_this.checkEmail=data.checkEmail
					_this.checkPhone=data.checkPhone
					_this.checkQq=data.checkQq

					_this.needRchgCard=data.needRchgCard
					_this.needRequiredEmail=data.needRequiredEmail
					_this.needRequiredQq=data.needRequiredQq
					_this.needRequredPhone=data.needRequredPhone
					_this.vcSwtich=data.vcSwtich
				})

			},
			// 注册
			register(){

				var _this=this;

				if(!_this.isAree){
					var msg={
						result:1
					}
					_this.alert(msg,_this,'请阅读协议并同意');
					return
				}

				if(_this.account.trim()==""){
					var msg={
						result:1
					}
					_this.alert(msg,_this,'请输入账户名');
					return
				}
				if(_this.name.trim()==""){
					var msg={
						result:1
					}
					_this.alert(msg,_this,'请输入真实姓名');
					return
				}else{
					var str=_this.name.trim();
					var han = /^[\u4e00-\u9fa5]+$/;
					if (!han.test(str) || str.length<2) {
						var msg={
							result:1
						}
						_this.alert(msg,_this,'姓名必须是2个汉字以上');
						return
					}
					
				}
				
				if(_this.fmpassword!=_this.password){
					var msg={
						result:1
					}
					_this.alert(msg,_this,'两次密码不一样');
					return
				}

				// 验证码

				if(_this.codeId!=_this.code){
					var msg={
						result:1
					}
					_this.alert(msg,_this,'验证码错误');
					return
				}

				_this.ajax('Register',{
					// 用户账号
					account:_this.account,
					// 密码（32位MD5加密后，小写）
					password:_this.password?_this.md5(_this.password):_this.password,
					// 姓名
					name:_this.name,
					// 用户IP
					ip:'163.125.144.75',
					// 代理ID
					agentId:'1314520',
					// 客户端类型
					clientType:2,
					// 注册网址
					// url:'www.baidu.com',
					// 充值卡
					// cardCode:'nonon',
					// 设备号
					deviceNo:'359172077148207',
					// QQ号码
					qq:_this.qq,
					// 手机号
					phone:_this.phone,
					// Email电子邮箱
					email:_this.email,
					// 验证码
					code:_this.code,
				},
					data => {
						this.alert(data,this);
						if(data.result==1){
							this.$store.commit('LoginStore',{"username":this.account,"password":this.password,"title":"注册成功","_that":this})
						}
					}
				);
			}

		},
		components:{
			
		}
	}

</script>

