<template>
	<div class="mobile-wrap center bj2">

		<Header title="充值记录">
			<div class="edit" slot="edit">
				<router-link tag="span" to="/Screen/one">筛选</router-link>
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

		<div class="recharge-new" v-if="record.length>0">
			<ul>
				<li v-for="item in record">
					<router-link :to="'Rechargedetails/'+item.orderNo">
						<div class="text">
							<b>{{ item.type | Rechargetype }}</b>
							<p>{{ item.time | time }}</p>
						</div>
						<div class="fr">
							<b>+{{ item.money }}元</b>
							<p>{{ item.status | Rechargestate }}</p>
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
		name:'RechargeRecord',
		data(){
			return{
				msg:'',
				isShow:false,

				uid:this.param('uid'),
				token:this.param('token'),

				record:[],
				pageIndex:1,
				currid:1
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
				
				// 充值记录
				_this.ajax('getDepositList',{
					uid:_this.uid,
					token:_this.token,
					// 第几页
					pageIndex:_this.pageIndex,
					// 每页多少条
					pageSize:20,
					// 开始时间
					startTime:time.startTime,
					// 结束时间
					endTime:time.endTime,
					// 状态
					status:_this.$store.state.screen.status,
					// 类型
					type:_this.$store.state.screen.type
				},
				data=>{
					_this.alert(data,_this);
					_this.record=data.userDepositList
					_this.$store.state.Rechargerecord=data.userDepositList
				})
			}
		},
		filters:{
			
		},
		components:{

		}
	}
</script>
