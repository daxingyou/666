<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="购彩大厅"></Header>
		
		<div class="tabs move-touch">
			<ul>
				<li class="acti"><a @click="selectState([])">全部彩种</a></li>
				<li><a @click="selectState([1,2,3,13,15,16])">时时彩</a></li>
				<li><a @click="selectState([9,14,23])">PK10</a></li>
				<li><a @click="selectState([10,11])">快乐十分</a></li>
				<li><a @click="selectState([18,19,20,21])">快3</a></li>
				<li><a @click="selectState([7])">PC蛋蛋</a></li>
				<li><a @click="selectState([1,3,5,7,11,15,20,23])">高频彩</a></li>
				<li><a @click="selectState([4,5,6,12])">低频彩</a></li>
			</ul>
		</div>

		<div class="hall">
			<ul>
				<li v-for="item in newData" :data-id="item.id">
					<router-link :to="'BuyNsidePage/'+ item.id">
						<div class="pict">
							<img :src="'../../static/img/LotteryHall/'+item.id+'.png'" alt="">
						</div>
						<div class="fr-wrap">
							<h2>{{ item.name }} <span>第 {{ item.number }} 期</span></h2>
							<div class="table-cell">
								<template v-if="arrSplit(item.lastOpenCode).length==10">
									<span :class="'sp'+ name" v-for="(name,index) of arrSplit(item.lastOpenCode)">{{ name }}</span>
								</template>
								<template v-else>
									<span class="sp11" v-for="(name,index) of arrSplit(item.lastOpenCode)">{{ name }}</span>
								</template>
							</div>
							<strong>距离 {{ item.number }} 期截止还有：<span :time="item.openDataTime"></span></strong>
						</div>
					</router-link>
				</li>
			</ul>
		</div>
		
		<Footer acti="3"></Footer>

	</div>

	<!--mobile_wrap-->

</template>


<script>
	export default {
		name:'LotteryHall',
		props:[],
		data(){
			return{
				// 彩种列表数据
				sscPlayGroupList:[],

				state:[]
			}
		},
		created(){
			if(this.$store.state.LotteryHall.length>0){
				this.sscPlayGroupList=this.$store.state.LotteryHall
			}else{
				this.LotteryHall();
			}
		},
		mounted(){
			click_addname('.tabs ul li',"acti");
		},
		computed:{
			newData(){
				var _this=this;
				if(_this.state.length>0){
					var arr=[];
					_this.sscPlayGroupList.filter(obj =>{
						_this.state.map(id=>{
							if(id==obj.id){
								arr.push(obj)
							}
						})
					})
					return arr
				}else{
					return _this.sscPlayGroupList
				}
			}
		},
		methods:{

			// 选项切换
			selectState(arr){
				this.state=arr
			},

			// 获取所有彩种
			LotteryHall(){
				var _this=this;
				_this.ajax('LotteryHall',{
					type:3
				},
				data=>{
					// 输出所有彩种26个
					_this.log('彩种列表名称')
					_this.alert(data,_this);
					_this.sscPlayGroupList=data.sscPlayGroupList.filter(obj=>{
						// 过滤彩种
						if(obj.enable){
							return obj
						}
					})

					// 缓存彩种列表
					_this.$store.state.LotteryHall=_this.sscPlayGroupList

					_this.sscPlayGroupList.forEach((obj,index)=>{
						_this.getSscOpenTime(obj.id,index)
						_this.getSscOpenTimePer(obj.id,index)
					})
				})
			},
			
			// 获取彩种列表
			getSscOpenTime(playGroupId,index){
				var _this=this;
				_this.ajax("getSscOpenTime2",{
					playGroupId:playGroupId
				},
				data=>{
					if(data.number){
						_this.$set(_this.sscPlayGroupList[index],'number',data.number)
						_this.$set(_this.sscPlayGroupList[index],'openDataTime',data.openDataTime)
						setTimeout(function(){
							Downtime(playGroupId,'.fr-wrap strong span');
						},500)
					}
				})
			},
			// 获取指定彩种开奖时间和封盘时间
			getSscOpenTimePer(playGroupId,index){
				var _this=this;
				_this.ajax("getSscOpenTimePer",{
					playGroupId:playGroupId
				},
				data=>{
						console.log(data);
						_this.$set(_this.sscPlayGroupList[index],'lastOpenCode',data.lastOpenCode)
				})
			}
			
		}
	}
</script>

