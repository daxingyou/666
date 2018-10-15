<template>
	
	<div class="head-wrapper">
		<div class="top center fixed-top">
			<a @click="reutrn" class="fl"><i class="ico-return"></i>返回</a>

			<h2>{{ title }}</h2>
			
			<a v-if="free" class="fr" @click="freePlay">免费试玩</a>
			
			<div class="zhushou" v-if="assistant">
				<b><i class="ico-set"></i>助手</b>
				<div class="down">
					<router-link to="/Quota"><i class="ico-i1"></i>额度转换</router-link>
					<router-link v-if="chongzhi" to="/Recharge"><i class="ico-i2"></i>账户充值</router-link>
					<router-link to="/Kefu"><i class="ico-i3"></i>在线客服</router-link>
				</div>
			</div>

			<slot name="money"></slot>
			<slot name="wan"></slot>
			<slot name="fr"></slot>
			<slot name="edit"></slot>

			<slot name="link"></slot>
			
			<slot name="jian"></slot>
		</div>
		<div class="null-top"></div>
	</div>

</template>

<script>

	export default{
		name:'Header',
		props:['title','free','assistant'],
		data(){
			return {
				chongzhi:true,
			}
		},
		created(){
			if(this.$route.path=="/Recharge"){
				this.chongzhi=false;
			}
		},
		methods:{
			reutrn(){
				this.$router.go(-1)
			},
			// 免费试玩
			freePlay(){
				var _this=this;
				_this.ajax("shiwanLogin",{
					// IP（可为空）
					ip:'',
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
		mounted(){
			this.$nextTick(()=>{
				
				$(".zhushou b").click(function(event) {
					$(this).toggleClass('acti');
					$(this).parent().find('.down').toggle();
				});
				prevent('.zhushou .down');
			})
			
		},
		computed:{
			webLink(){
				return this.$store.state.webLink
			}
		}
	}
</script>