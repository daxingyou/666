<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="个人资料">
			<div class="edit" slot="edit">
				<span @click="ajaxEditUserInfo">提交</span>
			</div>
		</Header>

		<div class="modify-data">
			<p>上次登录：{{ lastLoginTime | time }} 不是我登录?</p>
			<router-link to="/ChangePassword">修改密码</router-link>
		</div>

		<div class="per-list">
			<ul>
				<li>
					<span class="fl"><img src="../../static/img/hymPic.png" alt=""></span>
					<b>
						<span>会员名：</span>
					</b>
					<div class="fr">
						<span>{{ account }}</span>
					</div>
				</li>

				<li>
					<span class="fl"><img src="../../static/img/zsxmPic.png" alt=""></span>
					<b>
						<span>真实姓名：</span>
					</b>
					<div class="fr">
						<span>{{ name }}</span>
					</div>
				</li>

				<li v-if="ifShow">
					<span class="fl"><img src="../../static/img/sjhmPic.png" alt=""></span>
					<b>
						<span>手机号码：</span>
					</b>
					<div class="fr">
						<span v-if="!telephone">
							<a href="#" title="">立即添加</a>
						</span>
						<span v-else >{{ telephone }}<var>(已绑定)</var></span>
					</div>
				</li>
				<li v-if="ifShow">
					<span class="fl"><img src="../../static/img/dzyxPic.png" alt=""></span>
					<b>
						<span>电子邮箱：</span>
					</b>
					<div class="fr">
						<span v-if="!email">
							<a href="#" title="">立即添加</a>
						</span>
						<span v-else>{{ email }}<var>(已绑定)</var></span>
					</div>
				</li>
				<li v-if="ifShow">
					<span class="fl"><img src="../../static/img/tengxunQQ.png" alt=""></span>
					<b>
						<span>腾讯QQ：</span>
					</b>
					<div class="fr" @click="modify('腾讯QQ','qq')">
						<span>{{ qq }}<i class="ico-more1"></i></span>
					</div>
				</li>
				<li>
					<span class="fl"><img src="../../static/img/ncPic.png" alt=""></span>
					<b>
						<span>昵<i></i>称：</span>
					</b>
					<div class="fr" @click="modify('昵称','nickname')">
						<span>{{ nickname }}<i class="ico-more1"></i></span>
					</div>
				</li>
				<li>
					<span class="fl"><img src="../../static/img/xbPIc.png" alt=""></span>
					<b>
						<span>性<i></i>别：</span>
					</b>
					<div class="fr sex">
						<span>{{ sex==1?'男':'女' }}<i class="ico-more1"></i></span>
					</div>
				</li>
				<li>
					<span class="fl"><img src="../../static/img/srPic.png" alt=""></span>
					<b>
						<span>生<i></i>日：</span>
					</b>
					<div class="fr">
						<span><input class="date" type="date"><em>{{ birthday | year }}</em><i class="ico-more1"></i></span>
					</div>
				</li>

				<li>
					<span class="fl"><img src="../../static/img/8b2f551fd980b291a27dfbc37e48ee2a_60x60.png" alt=""></span>
					<b>
						<span>账户余额：</span>
					</b>
					<div class="fr">
						<span>{{ balance }}元</span>
					</div>
				</li>

				<li>
					<span class="fl"><img src="../../static/img/djPic.png" alt=""></span>
					<b>
						<span>账户等级：</span>
					</b>
					<div class="fr">
						<span>{{ layerName }}</span>
					</div>
				</li>

				<li>
					<span class="fl"><img src="../../static/img/hyfdPic.png" alt=""></span>
					<b>
						<span>会员返点：</span>
					</b>
					<div class="fr">
						<span>0.0元</span>
					</div>
				</li>

				<li>
					<span class="fl"><img src="../../static/img/sztzPic.png" alt=""></span>
					<b>
						<span>上周投注：</span>
					</b>
					<div class="fr">
						<span>{{ lastWeekValidBetMoney | money }}(有效)</span>
					</div>
				</li>
				<li>
					<span class="fl"><img src="../../static/img/b15c65bf75a3e4f7fc4ef07aa6a462b1_60x60.png" alt=""></span>
					<b>
						<span>本周投注：</span>
					</b>
					<div class="fr">
						<span>{{ thisWeekValidBetMoney | money }}(有效)</span>
					</div>
				</li>
				<li>
					<span class="fl"><img src="../../static/img/zzcunkuanPic.png" alt=""></span>
					<b>
						<span>最近存款：</span>
					</b>
					<div class="fr">
						<span>{{ lastWithdrawTime | time }}</span>
					</div>
				</li>
				<li>
					<span class="fl"><img src="../../static/img/zzqukuanPic.png" alt=""></span>
					<b>
						<span>最近取款：</span>
					</b>
					<div class="fr">
						<span>{{ lastDepositTime | time }}</span>
					</div>
				</li>

			</ul>
		</div>
		

		<div class="alert-modify-box">
			<div class="layout">
				<h2>修改{{ alert_title }}</h2>
				<b>
					<input type="text" v-model="alert_input">
					<span>
						<i class="ico-clear" v-if="alert_input">x</i>
					</span>
				</b>
				<p>
					<button class="b1">取消</button>
					<button :class="alert_input?'b2':''">确定</button>
				</p>
			</div>
		</div>
		
		<!-- 男女弹窗 -->
		<div class="alert-select-type center">
			<div class="layout">
				<ul>
					<li id="1">男</li>
					<li id="2">女</li>
				</ul>
				<button type="button">取消</button>
			</div>
		</div>

		<Msg :message="msg" v-show="isShow"></Msg>
	
	</div>
	
	<!--mobile_wrap-->

</template>

<script>

	export default {
		name:'DataEditing',
		data(){
			return{
				msg:'',
				isShow:false,

				ifShow:false,


				alert_input:'',
				alert_title:'',
				key:"",

				account:'',
				balance:'',
				email:'',
				enable:'',
				fandian:'',
				frozen:'',
				lastGameId:'',
				lastLoginIp:'',
				lastLoginTime:'',
				lastPlayId:'',
				layerId:'',
				layerName:'',
				name:'',
				nickname:'',
				privateUrl:'',
				qq:'',
				sex:'',
				registerTime:'',
				birthday:'',
				telephone:'',
				lastWeekValidBetMoney:'',
				thisWeekValidBetMoney:'',
				totalFandianMoney:'',
				username:'',
				lastDepositTime:'',
				lastWithdrawTime:'',
				uid:this.param('uid'),
				token:this.param('token')
			}
		},
		created(){
			this.data();
			this.info();

			if(JSON.stringify(this.$store.state.PersonalCenter)=='{}'){
				this.$store.commit('PersonalCenter')
				this.test()
			}

		},
		mounted(){

			var _this=this;
			$(".alert-modify-box .layout b span").on("click",".ico-clear",function(){
				_this.alert_input='';
				$(".alert-modify-box .layout b input").focus();
			})
			$(".alert-modify-box .layout p").on("click","button.b2",function(event) {
				_this[_this.key]=_this.alert_input
				$(".alert-modify-box").fadeOut();
			});
			$(".alert-modify-box .layout p").on("click","button.b1",function(event) {
				$(".alert-modify-box").fadeOut();
			});
			$(".date").change(function(){
				var val=$(this).val();
				_this.birthday=val;
			})

			$(".alert-select-type .layout button").click(function(){
				var hei=$(".alert-select-type .layout").height();
				$(".alert-select-type .layout").animate({"bottom":-hei+'px'},300,function(){
					$(this).parents('.alert-select-type').fadeOut();
				})
			})

			$(".sex").click(function(){
				$(".alert-select-type").fadeIn().find('.layout').animate({"bottom":0},300);
			})

			$(".alert-select-type .layout ul li").click(function(){
				var id=$(this).attr('id')
				_this.sex=id;
				var hei=$(".alert-select-type .layout").height();
				$(".alert-select-type .layout").animate({"bottom":-hei+'px'},300,function(){
					$(this).parents('.alert-select-type').fadeOut();
				})

			})
		},
		methods:{
			modify(txt,key1){
				var _this=this;
				this.alert_title=txt
				this.alert_input=this[key1]
				this.key=key1
				$(".alert-modify-box").fadeIn();
			},
			// 更新资料
			ajaxEditUserInfo(){
				var _this=this

				var time=new Date();
				var curr=time.getTime()

				if(tozhuo(_this.birthday)>curr){
					tipsTotice('生日日期不能大于当前日期')
					return 
				}

				_this.ajax('ajaxEditUserInfo',{
					uid:_this.uid,
					token:_this.token,
					// 昵称
					nickname:_this.nickname,
					// 生日
					birthday:formatDate(_this.birthday),
					// 腾讯QQ
					qq:'',
					// 电话
					telephone:'',
					// 电子邮箱
					email:'',
					// 性别
					sex:_this.sex

				},
				data=>{
					_this.alert(data,this,'修改成功!')
				})
			},
			// 个人资料
			data(){
				var _this=this;
				_this.ajax('DataEditing',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this)

					_this.account=data.account
					_this.balance=data.balance
					_this.email=data.email
					_this.enable=data.enable
					_this.fandian=data.fandian
					_this.frozen=data.frozen
					_this.lastGameId=data.lastGameId
					_this.lastLoginIp=data.lastLoginIp
					_this.lastLoginTime=data.lastLoginTime
					_this.lastPlayId=data.lastPlayId
					_this.lastWeekValidBetMoney=data.lastWeekValidBetMoney
					_this.layerId=data.layerId
					_this.layerName=data.layerName
					_this.name=data.name
					_this.nickname=data.nickname
					_this.privateUrl=data.privateUrl
					_this.qq=data.qq
					_this.birthday=data.birthday
					_this.sex=data.sex
					_this.registerTime=data.registerTime
					_this.telephone=data.telephone
					_this.thisWeekValidBetMoney=data.thisWeekValidBetMoney
					_this.totalFandianMoney=data.totalFandianMoney
				})
			},
			info(){
				var _this=this;
				_this.ajax('getUserLastInfo',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this)
					// 最近存款时间
					_this.lastWithdrawTime=data.lastWithdrawTime
					// 最近取款时间
					_this.lastDepositTime=data.lastLoginTime
				})
			}
		},
		components:{

		}
	}

</script>
