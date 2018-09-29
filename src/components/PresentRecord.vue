<template>
	<div class="mobile-wrap center bj2">

		<Header title="提款记录">
			<div class="edit" slot="edit">
				<router-link tag="span" to="/Screen/three">筛选</router-link>
			</div>
		</Header>
		
		<!-- 选择 -->
		<div class="tabs-select">
			<ul>
				<li class="acti"><span @click="data(1)">今日</span></li>
				<li><span @click="data(2)">昨天</span></li>
				<li><span @click="data(3)">本月</span></li>
			</ul>
		</div>

		<div class="recharge-new" v-if="record.length>0">
			<ul>
				<li v-for="item in record">
					<router-link :to="'Bringoutthedetails/'+item.orderNo">
						<div class="text">
							<b>银行出款</b>
							<p>{{ item.time | time }}</p>
						</div>
						<div class="fr">
							<b>+{{ item.money }}元</b>
							<p :class="{'acti':item.status==2}">{{ item.status | status }}</p>
							<i class="ico-more"></i>
						</div>
					</router-link>
				</li>
			</ul>
			<h4 class="pub-loadding">已经全部加载完毕</h4>
		</div>

		<div class="no-record" v-else>没有找到符合查询条件的记录</div>
	
				
		<Footer acti="5"></Footer>

		<Msg :message="msg" v-show="is_show"></Msg>

	</div>
	<!--mobile_wrap-->
</template>

<script>
	export default {
		name:'PresentRecord',
		props:[],
		data(){
			return{
				msg:'',
				is_show:false,

				uid:this.param('uid'),
				token:this.param('token'),

				record:[]
			}
		},
		created(){
			this.log(this.$store.state.screen)
		},
		mounted(){
			var _this=this;
			if(this.$store.state.screen.query){
				this.log('查询成功')
				$(".tabs-select ul li").removeClass('acti');
				_this.data(4)
				_this.$store.state.screen.query=false
			}else{
				_this.data(1);
			}
			
			click_addname('.tabs-select ul li',"acti");
		},
		methods:{
			data(val){
				var _this=this;
				
				// 得到时间段
				var time=_this.getDate(val)
				
				if(val==4){
					time.startTime=this.$store.state.screen.starttime
					time.endTime=this.$store.state.screen.endtime
				}else{
					_this.$store.state.screen.type=''
					_this.$store.state.screen.status=''
				}
				// 提款记录
				_this.ajax('presentrecord',{
					uid:_this.uid,
					token:_this.token,
					pageSize:10,
					startTime:time.startTime,
					endTime:time.endTime,
					// 状态
					status:_this.$store.state.screen.status,
					// 类型
					type:_this.$store.state.screen.type
				},
				data=>{
					_this.alert(data,_this);
					_this.record=data.userWithdrawList
					_this.$store.state.Presentrecord=data.userWithdrawList
					_this.test()
				})
			}
		},
		filters:{
			
		},
		components:{

		}
	}
</script>
