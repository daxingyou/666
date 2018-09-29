<template>
	<div class="mobile-wrap center bj2">
				
		<Header title="个人资料"></Header>

		<div class="per-data">
			<ul>
				<li>
					<a href="#" title="">
						<span class="fl">会员名：</span>
						<span class="fr">{{ nickname }}</span>
					</a>
				</li>
				<li>
					<a href="#" title="">
						<span class="fl">真实姓名：</span>
						<span class="fr">{{ name }}</span>
					</a>
				</li>
				<li>
					<a href="#" title="">
						<span class="fl">会员名：</span>
						<span class="fr color">立即绑定<i class="ico-more"></i></span>
					</a>
				</li>
				<li>
					<a href="#" title="">
						<span class="fl">电子邮箱：</span>
						<span :class="email?'fr':'fr color'">{{ email }}<i class="ico-more"></i></span>
					</a>
				</li>
				<li>
					<a href="#" title="">
						<span class="fl">腾讯QQ：</span>
						<span class="fr">{{ qq }}<i class="ico-more"></i></span>
					</a>
				</li>
				<li>
					<a href="#" title="">
						<span class="fl">上次登陆时间：</span>
						<span class="fr">{{ lastLoginTime | time }}</span>
					</a>
				</li>
				<li>
					<a href="#" title="">
						<span class="fl">上次访问IP：</span>
						<span class="fr">{{ lastLoginIp }}</span>
					</a>
				</li>
				<li>
					<a href="#" title="">
						<span class="fl">性别：</span>
						<span class="fr">{{ sex?'男':'女' }}</span>
					</a>
				</li>
				<li>
					<a href="#" title="">
						<span class="fl">生日：</span>
						<span class="fr">{{ birthday | year }}</span>
					</a>
				</li>
			</ul>
		</div>
		
		<Footer acti="5"></Footer>

	</div>

	<!--mobile_wrap-->

</template>

<script>
	export default {
		name:'PersonalData',
		data(){
			return{
				
				uid:this.param('uid'),
				token:this.param('token'),

				nickname:'',
				name:'',
				email:'',
				qq:'',
				lastLoginTime:'',
				lastLoginIp:'',
				sex:'',
				birthday:''
			}
		},
		created(){
			this.data();
		},
		methods:{
			data(){
				var _this=this;
				_this.ajax('DataEditing',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this);
					_this.nickname=data.nickname,
					_this.name=data.name,
					_this.email=data.email,
					_this.qq=data.qq,
					_this.lastLoginTime=data.lastLoginTime,
					_this.lastLoginIp=data.lastLoginIp,
					_this.sex=data.sex,
					_this.birthday=data.birthday
				})
			}
		},
		components:{

		}
	}
</script>
