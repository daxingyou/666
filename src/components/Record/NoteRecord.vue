<template>
	<div class="mobile-wrap center bj2">

		<Header title="投注记录">
			<div class="edit" slot="edit">
				<router-link tag="span" to="/Screen/two">筛选</router-link>
			</div>
		</Header>
		
		<!-- 选择 -->
		<div class="tabs-select">
			<ul>
				<li class="acti"><span @click="setcurrid(1)">今日</span></li>
				<li><span @click="setcurrid(2)">昨天</span></li>
				<li><span @click="setcurrid(3)">本月</span></li>
			</ul>
		</div>

		<div class="noterecord" v-if="record.length>0">
			<ul>
				<li v-for="item in record">
					<router-link :to="'/Noteanddetail/'+item.orderNumber">
						<div class="pict">
							<img :src="'../../static/img/LotteryHall/'+item.playGroupId+'.png'" alt="">
						</div>
						<div class="text">
							<b :class="{color:item.zjMoney>0}">输赢：{{ item.winOrLose }}</b>
							<p>{{ item.content }}</p>
						</div>
						<div class="fr">
							<template v-if="!item.status">
								<strong>0元</strong>
								<span>等待开奖</span>
							</template>
							<template v-else>
								<b :class="{color:item.zjMoney>0}">{{ item.zjMoney>0?'已中奖':'未中奖' }}</b>
								<p>{{ item.createTime | time }}</p>
							</template>
							<i class="ico-more"></i>
						</div>
					</router-link>
				</li>
			</ul>
			<h4 class="pub-loadding">已经全部加载完毕</h4>
		</div>

		<div class="no-record" v-else>没有找到符合查询条件的记录</div>
	
				
		<Footer acti="5"></Footer>

		<Msg :message="msg" v-show="isShow"></Msg>

	</div>
	<!--mobile_wrap-->
</template>

<script>
	export default {
		name:'NoteRecord',
		data(){
			return{
				msg:'',
				isShow:false,

				uid:this.param('uid'),
				token:this.param('token'),

				record:[],
				pageIndex:1,
				currid:1,
			}
		},
		created(){
			this.log(this.$store.state.screen)
		},
		mounted(){
			var _this=this;
			_this.$nextTick(()=>{

				_this.query();
				
				click_addname('.tabs-select ul li',"acti");

				$(window).scroll(function(){
					var scrollTop = $(this).scrollTop();
					var scrollHeight = $(document).height();
					var windowHeight = $(this).height();
					if(scrollTop + windowHeight == scrollHeight){
						_this.pageIndex++
						_this.query();
						_this.log('已经到最底部了！')
					}
				});

			})
		},
		methods:{
			setcurrid(id){
				// 关闭自定义查询
				this.$store.state.screen.query=false

				this.currid=id
				this.record=[]
				this.query();
			},
			query(){
				var _this=this;
				if(this.$store.state.screen.query){
					this.log('查询成功')
					$(".tabs-select ul li").removeClass('acti');
					_this.data(4)
				}else{
					_this.data(_this.currid);
				}
			},
			data(val){
				var _this=this;
				
				// 得到时间段
				var time=_this.getDate(val)

				console.log(time)
				
				if(val==4){
					time.startTime=this.$store.state.screen.starttime
					time.endTime=this.$store.state.screen.endtime
				}else{
					_this.$store.state.screen.type=''
					_this.$store.state.screen.status=''
				}


				const { status } = { ..._this.$store.state.screen }

				switch ( status ) {
					case 0:
						var isZhongjiang=''
						var isstatus=''
						break;
					case 1:
						var isZhongjiang=''
						var isstatus=0
						break;
					case 2:
						var isZhongjiang=true
						var isstatus=1
						break;
					case 3:
						var isZhongjiang=false
						var isstatus=1
						break;
					default:
						var isZhongjiang=''
						var isstatus=''
				}

				_this.ajax('NoteRecord',{
					// 用户编码
					uid:_this.uid,
					// token认证
					token:_this.token,
					// 第几页
					pageIndex:_this.pageIndex,
					// 每页多少条
					pageSize:20,
					// 开始时间
					startTime:time.startTime,
					// 结束时间
					endTime:time.endTime,
					// 彩种Id
					playGroupId:_this.$store.state.screen.type,
					// 状态
					status:isstatus,
					// 是否中奖
					isZhongjiang:isZhongjiang,
				},
				data=>{
					_this.alert(data,_this);
					_this.record=_this.record.concat(data.sscBetsList)
					_this.$store.state.Noteanddetail=data.sscBetsList
				})
			}
		},
		filters:{
			
		},
		components:{

		}
	}
</script>
