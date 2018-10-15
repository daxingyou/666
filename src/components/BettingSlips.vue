<template>
	<div class="mobile-wrap center bj2">
		<Header title="确认投注单"></Header>

		<div class="count-down">
			<span class="fl"><i class="ico-time"></i>距{{ Nextphase }}期截止：{{ downTime(OpenCode.leftTime) }}</span>

			<span class="fr">余额:
				<span v-if="balance>-1"><i>{{ balance }}</i> 元</span>
				<router-link v-else to="/Login">请登录</router-link>
			</span>
		</div>

		<div class="betting">
			<strong class="box-space-between">
				<span @click="returnFun">返回添加一注</span>
				<span @click="addRandom">添加机选一注</span>
				<span @click="clearList"><i class="ico-delete"></i>清空列表</span>
			</strong>
			<ul>
				<li v-for="(item,item_index) in betsList">
					<div class="box">
						<div class="fl">
							<b>{{ item.content }}</b>
							<p>赔率：<i class="i1">{{ item.playPl }}</i><template v-if="item.fandian"> 返利：<i class="i2">{{ item.fandian }}</i></template></p>
							<span>{{ item.newName }} {{item.zhushu}}注/{{ item.zhushu * item.perMoney }}元</span>
						</div>
						<div class="fr">
							<i class="ico-close1" @click="deleteItem(item_index)"></i>
						</div>
					</div>
				</li>
			</ul>
		</div>
		
		<div class="null-box1"></div>
		<div class="fixed-bottom center fixed">
			<div class="continuity">
				<p><span>连续</span><input type="number" pattern="[0-9]*" v-model="stages" @keyup="down($event,'stages')"><span>期</span></p>
				<div class="fr">
					<span>投</span>
					<div class="box">
						<var @click="multiple>1?multiple--:multiple" class="jian">-</var>
						<input type="number" pattern="[0-9]*" v-model="multiple" @keyup="down($event,'multiple')">
						<var @click="multiple++" class="jia">+</var>
					</div>
					<span>倍</span>
				</div>
			</div>
			<div class="confirm">
				<p>合计 <i>{{ Total }}</i> 元　总共: <i>{{ totalNotes }}</i> 注</p>
				<button @click="conSuccess"><i class="ico-ok"></i>确认投注</button>
			</div>
		</div>
		
		<!-- 投注成功弹窗 -->
		<div class="alert-success center">
			<div class="layout">
				<h2>
					<img src="../../static/img/56792b1680a857aab29566ab40a7d0ab_101x100.png" alt="">
				</h2>
				<b>恭喜你，投注成功！</b>
				<p><var>{{ success.title }}</var><i></i>元</p>
				<span>投注时间：{{ success.timer }}</span>
				<strong>
					<router-link class="fl" to="/NoteRecord" replace>查看订单</router-link>
					<a @click="tiao" class="fr">继续投注</a>
				</strong>
			</div>
		</div>
		
		<!-- 弹窗 -->
		<Msg :message="msg" v-show="isShow"></Msg>
	</div>
</template>

<script>
	export default{
		name:'BettingSlips',
		data(){
			return{
				msg:'',
				isShow:false,

				// 下一期号码
				Nextphase:'',

				// 历史5期
				sscHistoryList:[],

				// 连续1期
				stages:1,
				// 倍数
				multiple:1,

				// 获取彩种当前开奖时间
				OpenCode:{},

				// 用户ID
				uid:this.param('uid'),
				// 鉴权码
				token:this.param('token'),

				// 成功
				success:{
					title:'',
					timer:'',
				}
			}
		},
		created(){
			
			if(this.$store.state.BuyNsidePage.sscBetList.length==0){
				this.$router.go(-1)
			}

			// 实时更新账户信息
			this.$store.commit('PersonalCenter');


			this.getPlanOpenDataHistory();
			this.getSscOpenTime2();

		},
		computed:{
			playGroupId(){
				const { playGroupId } = { ...this.$store.state.BuyNsidePage }
				return playGroupId
			},
			// 余额
			balance(){
				const { balance } = {...this.$store.state.PersonalCenter}
				return balance
			},
			// 列表
			betsList(){
				return this.$store.state.BuyNsidePage.sscBetList
			},
			// 合计
			Total(){
				var totle=0;
				var arr=this.$store.state.BuyNsidePage.sscBetList
				arr.map( obj =>{
					totle+=obj.perMoney*obj.zhushu
				})

				var money=0

				for(var i=1;i<=this.stages;i++){
					money+=totle*(Math.pow(this.multiple,i))
				}

				return money
			},
			// 总注数
			totalNotes(){
				var totle=0;
				var arr=this.$store.state.BuyNsidePage.sscBetList
				arr.map( obj =>{
					totle+=obj.zhushu
				})
				return totle*this.stages
			}
		},
		mounted(){

			var _this=this
			_this.$nextTick(function(){

				_this.getSscPlayGroup();

				$(".continuity p input,.continuity .fr .box input").keydown(function(e){
					digitInput($(this),e)
				})

			})
			
		},
		methods:{
			// 获得计划内开奖结果（包含开奖中）
			getPlanOpenDataHistory(){
				var _this=this;
				const { playGroupId } = { ..._this.$store.state.BuyNsidePage }

				_this.ajax('getPlanOpenDataHistory',{
					size:6,
					playGroupId:playGroupId
				},
				data=>{
					_this.alert(data,_this);
					_this.sscHistoryList=data.sscHistoryList
					_this.Nextphase=_this.subStr(_this.sscHistoryList[0]['number'],3,1)
				})
			},
			// 获取彩种当前开奖时间
			getSscOpenTime2(){
				var _this=this;
				const { playGroupId } = { ..._this.$store.state.BuyNsidePage }
				_this.ajax('getSscOpenTime2',{
					playGroupId:playGroupId
				},
				data=>{
					_this.alert(data,_this);
					_this.OpenCode=data
					setTimeout(function(){
						// 开奖倒计时
						_this.cutDown();
					},1)
				})
			},
			// 开奖倒计时
			cutDown(){
				var _this=this;
				var time=setInterval(function(){
					if(_this.OpenCode.leftTime>-1){
						_this.OpenCode.leftTime=_this.OpenCode.leftTime-1
					}else{
						clearInterval(time)
						// 调用
						_this.getPlanOpenDataHistory()
						_this.getSscOpenTime2()
					}
				},1000)
			},
			// 检测不能为0
			down(ev,sta_name){
				if(ev.target.value=='0'){
					this[sta_name]=1
				}
			},
			// 返回添加一注
			returnFun(){
				this.$router.go(-1)
			},
			// 清空列表
			clearList(){
				var arr=this.$store.state.BuyNsidePage.sscBetList
				arr.splice(0,arr.length);

				this.tiao();
			},
			// 删除单个
			deleteItem(index){
				var ssc=this.$store.state.BuyNsidePage.sscBetList
				ssc.splice(index,1)
				if(ssc.length==0){
					this.tiao();
				}

			},
			tiao(){
				var id=this.$store.state.BuyNsidePage.playGroupId
				this.$router.replace({"path":"BuyNsidePage/"+id})
				this.$router.go(-1)
			},
			// 获取彩种信息
			getSscPlayGroup(){
				var _this=this
				const { playGroupId } = { ..._this.$store.state.BuyNsidePage }
				_this.ajax('getSscPlayGroup',{
					playGroupId:playGroupId
				},
				data=>{
					_this.success.title=data.name
					_this.$store.state.BuyNsidePage.title=data.name
				})
			},
			// 确认投注(提交)
			conSuccess(){
				var _this=this;
				var obj={
					// 总注数
					totalZhushu:_this.totalNotes,
					// 总金额
					totalMoney:_this.Total,
					// 连续期数
					lianxuQishu:_this.stages.toString(),
					// 连续倍数
					lianxuBeishu:_this.multiple.toString(),
					// 注单列表
					sscBetList:_this.$store.state.BuyNsidePage.sscBetList
				}

				_this.ajax('bet',{
					uid:_this.uid,
					token:_this.token,
					betForm:JSON.stringify(obj)
				},
				data=>{
					var money=_this.Total

					if(data.result==1){
						this.$store.state.BuyNsidePage.sscBetList=[]

						_this.success.timer=formatDateTime(new Date().getTime())

						$(".alert-success .layout p i").text(money)

						$(".alert-success").fadeIn(400);

						_this.$store.commit('PersonalCenter');

					}else{
						_this.alert(data,_this)
					}
				})


			},
			// 添加机选一注
			addRandom(){
				if(this.betsList.length>0){
					this.$store.commit("addArr");
				}
			}

		}
	}
</script>