<template>
	<div class="mobile-wrap center bj3">

		<Header assistant="1">
			<div class="select" slot="wan">
				<h3>玩法</h3>
				<div class="select-input">
					<b>{{ pageTitle.onetitle }}-{{ pageTitle.twotitle }}</b>
				</div>
			</div>
		</Header>
		
		<!-- ./small/Playthelaw 下拉 -->
		<Playthelaw :playGroupId="playGroupId" @info="Nameofplay"></Playthelaw>
		
		<div class="tabs3 box-space-between">
			<router-link to="" class="acti">投注</router-link>
			<router-link to="/NoteRecord">投注记录</router-link>
			<a @click="qiandao">走势图</a> <!-- TrendChart -->
			<router-link to="/Sports">体育投注</router-link>
			<router-link to="/Chesscard">棋牌游戏</router-link>
		</div>
		
		<div class="stage">
			<div class="count-down">
				<span class="fl"><i class="ico-time"></i>距第{{ Nextphase }}期还有：{{ downTime(OpenCode.leftTime) }}</span>

				<span class="fr">余额 :
					<span v-if="balance>-1"><i>{{ balance }}</i> 元</span>

					<router-link v-else to="/Login">请登录</router-link>
				</span>
			</div>
			<div class="stage-box">
				<ul>
					<li>
						<var>第<i>{{ Thisperiod }}</i>期</var>
						<p v-if="!OpenCode.opening">
							<span v-for="item of arrSplit(OpenCode.lastOpenCode)">{{ item }}</span>
						</p>
						<strong :class="{'eight':playGroupId==8}" v-else>
							<span v-for="item of arrSplit(OpenCode.lastOpenCode)" :data-val="item"></span>
						</strong>
					</li>
				</ul>
			</div>
			<div class="down-five">
				<i class="ico-down1"></i>
				<ul :class="{'more':playGroupId==14 || playGroupId==9 || playGroupId==23 || playGroupId==8}">
					<li v-for="(item,index) in sscHistoryList" :class="{'first':OpenCode.opening && index==0}">
						<template v-if="OpenCode.opening && index==0">
							<var>第<i>{{ item.number }}</i>期</var>
							<b>开奖中</b>
						</template>
						<template v-else>
							<var>第<i>{{ item.number }}</i>期</var>
							<p>
								<span v-for="item1 of arrSplit(item.openCode)">{{ item1 }}</span>
							</p>
						</template>
					</li>
				</ul>
			</div>
		</div>
		
		<!-- 选择投注 -->
		<keep-alive>
			<component v-bind:is="playType"></component>
		</keep-alive>
	
		<div class="null-box"></div>
		
		<Msg :message="msg" v-show="isShow"></Msg>
		
	</div>
	
	<!--mobile_wrap-->

</template>

<script>
	
	// 玩法下拉 组件
	import Playthelaw from './small/Playthelaw'

	export default {
		name:'BuyNsidePage',
		data(){
			return{

				msg:'',
				isShow:false,

				// 下一期号码
				Nextphase:' [***] ',

				// 本期号码
				Thisperiod:' [***] ',

				// 接收彩种编码
				playGroupId:this.$route.params.id,
								
				// 获取彩种当前开奖时间
				OpenCode:{},

				// 获取赔率
				sscPlayPlList:[],

				// 最近五期
				sscHistoryList:[],

				// 由子组件 获取 玩法信息(标题,赔率ID,)
				pageTitle:{},

				// 存放赔率
				getSscPlayPl2Data:{}

			}
		},
		created(){
			
			const { playGroupId } = { ...this.$store.state.BuyNsidePage }

			if ( this.playGroupId != playGroupId ){
				this.$store.state.config.Playthelaw=-1
			}

			this.$store.state.BuyNsidePage.playGroupId=parseInt(this.playGroupId) // 存储当前彩种ID *******************

			// 最近五期
			this.getPlanOpenDataHistory();

			// 获取彩种当前开奖时间
			this.getSscOpenTimePer();

		},
		updated(){
			
		},
		mounted(){
			// 显示隐藏5期
			$(".stage .down-five .ico-down1").click(function(){
				if($(".stage .down-five ul").css("display")=="none"){
					$(".stage .down-five ul").slideDown();
					$(this).addClass('acti')
				}else {
					$(".stage .down-five ul").slideUp();
					$(this).removeClass('acti')
				}
			})

			// 玩法下拉
			$(".select .select-input b").click(function(){
				$(".alert-the").show();
				$(".mobile-wrap").addClass('overflow')
			})

		},
		computed:{

			// 组件挂载
			playType(){
				return this.pageTitle.playType
			},
			// 得到账户余额
			balance(){
				const { balance } = {...this.$store.state.PersonalCenter}
				return balance
			},
			
		},
		methods:{

			// 获得计划内开奖结果（包含开奖中）连续6期
			getPlanOpenDataHistory(){
				var _this=this;
				_this.ajax('getPlanOpenDataHistory',{
					size:6,
					playGroupId:_this.playGroupId
				},
				data=>{
					_this.alert(data,_this);
					_this.sscHistoryList=data.sscHistoryList

					_this.Nextphase=_this.subStr(_this.sscHistoryList[0]['number'],3,1)
					_this.Thisperiod=_this.subStr(_this.sscHistoryList[0]['number'],3)

					_this.$store.state.BuyNsidePage.number=(_this.sscHistoryList[0]['number']*1+1).toString() // 存储开奖编号*******************
				})
			},
			// 获取指定彩种开奖时间和封盘时间
			getSscOpenTimePer(){
				var _this=this;
				_this.ajax('getSscOpenTimePer',{
					playGroupId:_this.playGroupId
				},
				data=>{
					_this.alert(data,_this);
					// 是否开奖 和  开奖倒计时间
					_this.OpenCode=data

					setTimeout(function(){
						// 开奖倒计时
						_this.cutDown();
					},1)
					setTimeout(function(){
						// 开奖滚动
						_this.numScroll();
					},100)
				})
			},
			// 开奖倒计时
			cutDown(){
				var _this=this;
				var time=setInterval(function(){
					if(_this.OpenCode.leftTime>0){
						_this.OpenCode.leftTime=_this.OpenCode.leftTime-1
					}else{
						clearInterval(time)
					}
				},1000)
			},
			// 获得玩法赔率2  => 通过玩法编码 能获取 赔率编码 14261
			getSscPlayPl2(playId){
				var _this=this;
				_this.ajax("getSscPlayPl2",{
					playId:playId
				},
				data=>{
					
					function abs(ndata){
						// 存储数据
						_this.$store.state.sscPlayPlGroupList=ndata.sscPlayPlGroupList
						var obj=ndata.sscPlayPlGroupList[0].sscPlayPlList[_this.$store.state.config.playPlId_type]
						console.log('%c%s','color:#fff;background:#4a93ff;padding:4px 6px;','第一步')
						console.log(obj)
						_this.getSscPlayPl2Data=obj
						_this.getSscPlayPl_gfwf()
					}

					setTimeout(function(){
						abs(data)
					},500)
					
				})
			},
			// 获取彩种所有赔率
			getSscPlayPl_gfwf(){
				var _this=this
				_this.ajax("getSscPlayPl_gfwf",{
					playGroupId:_this.playGroupId
				},
				data=>{
					console.log('%c%s','color:#fff;background:#4a93ff;padding:4px 6px;','第二步')
					console.log(data);
					var newData=data.sscPlayPlList.filter(obj=>{
						if(obj.playPlId==_this.getSscPlayPl2Data.playPlId){
							console.log(obj)
							_this.$store.state.BuyNsidePage.NoteSetting.sscPlayPlList=obj
							_this.$store.state.BuyNsidePage.NoteSetting.ssconfig.playPl=obj.playPl // 赋值 玩法编码*******************
							_this.test();
						}
					})
				})
			},
			// 从子组件获到玩法名称
			Nameofplay(obj){
				var _this=this;
				_this.pageTitle=obj;
				
				_this.log('Playthelaw => 标题名称-玩法编码-赔率编码-组件名称')
				_this.log(_this.pageTitle)

				// 通过玩法编码 得到 所有赔率
				this.getSscPlayPl2(_this.pageTitle.playId)

				console.log('%c%s',"color:#fff;background:#ad2c2c;padding:10px 20px;",'老大！ 你选择了 => '+_this.pageTitle.playType+'')
				
				_this.$store.state.BuyNsidePage.NoteSetting.playId=_this.pageTitle.playId	// 添加玩法编码 playId *******************
				_this.$store.state.BuyNsidePage.playType=_this.pageTitle.playType	// 存储玩法组件类型 *******************
				_this.$store.state.BuyNsidePage.one_title=_this.pageTitle.onetitle // 存储玩法标题一 **********************
				_this.$store.state.BuyNsidePage.two_title=_this.pageTitle.twotitle // 存储玩法标题二 **********************


			},
			// 号码滚动
			numScroll(){
				var $span=$(".stage .stage-box ul li strong span")
				var spanLen=$span.length;
				var maxLen=9;
				if(spanLen>9) maxLen=99
				$span.each(function(){
					var hei=$(this).height();

					crilScroll($(this).attr("data-val"),$(this),hei,maxLen)
				})
			},
			qiandao(){
				this.alert({result:1},this,'功能暂未开放！');
			},

		},
		components:{
			Playthelaw
		}
	}
</script>

<style scoped>
	.overflow{
		max-height: 100vh;
		overflow: hidden;
	}
</style>
