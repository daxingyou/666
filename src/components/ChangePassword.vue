<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="修改登录密码"></Header>

		<div class="modify">
			<ul>
				<li>
					<span>旧密码：</span>
					<input type="password" name="" placeholder="请输入旧密码" v-model="oldPassword">
				</li>
				<li>
					<span>新密码：</span>
					<input type="password" name="" placeholder="请输入新密码" v-model="newPassword">
				</li>
			</ul>
		</div>

		<div class="tips">
			<p>密码由<i>6-16</i>个字符组成，区分大小写 ( 不能是9位以下纯数字，不能包含空格 ) 为了提升您的安全性，建议使用<i>英文加数字</i>或者<i>混合组合密码</i></p>
		</div>

		<div class="modify">
			<ul>
				<li>
					<span>确认密码：</span>
					<input type="password" name="" placeholder="确认新密码" v-model="fmnewPassword">
				</li>
			</ul>
		</div>


		<div class="btn-wrap1">
			<button @click="ChangePassword">提交</button>
		</div>

		<Msg :message="msg" v-show="isShow"></Msg>	
		
	</div>
	<!--mobile_wrap-->
</template>

<script>
	export default {
		name:'ChangePassword',
		props:[],
		data(){
			return{
				msg:'',
				isShow:false,

				uid:this.param('uid'),
				token:this.param('token'),
				// 旧密码
				oldPassword:'',
				// 新密码
				newPassword:'',
				// 确认密码
				fmnewPassword:''
				
			}
		},
		created(){
			
		},
		mounted(){

		},
		methods:{
			ChangePassword(){
				var _this=this;
				if(_this.fmnewPassword!=_this.newPassword){
					var obj={
						"result":120,
						"description":"重复密码不一致"
					}
					_this.alert(obj,_this,'','');
					return
				}
				_this.ajax('ChangePassword',{
					uid:_this.uid,
					token:_this.token,
					oldPassword:_this.md5(_this.oldPassword),
					newPassword:_this.md5(_this.newPassword)
				},
				data=>{
					_this.alert(data,_this,'修改成功!','Login');
				})
			}
		},
		filters:{
			
		},
		components:{

		}
	}
</script>