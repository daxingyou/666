<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="购彩大厅"></Header>
		
		<div class="tabs move-touch">
			<ul>
				<li class="acti"><a @click="selectState([])">全部彩种</a></li>
				<li><a @click="selectState([1,3,5,7,11,15,20,23])">高频彩</a></li>
				<li><a @click="selectState([4,5,6,12])">低频彩</a></li>
				<li><a @click="selectState([1,2,3,13,15,16])">时时彩</a></li>
				<li><a @click="selectState([9,14,23])">PK10</a></li>
				<li><a @click="selectState([10,11])">快乐十分</a></li>
				<li><a @click="selectState([18,19,20,21])">快3</a></li>
				<li><a @click="selectState([7])">PC蛋蛋</a></li>
			</ul>
		</div>

		<div class="hall">
			<ul>
				<li v-for="item in newData" :data-id="item.playGroupId">
					<router-link :to="'BuyNsidePage/'+ item.playGroupId">
						<div class="pict">
							<img :src="'../../static/img/LotteryHall/'+item.playGroupId+'.png'" alt="">
						</div>
						<div class="fr-wrap">
							<h2>{{ item.playGroupName }} <span>第 {{ item.lastOpenNumber }} 期</span></h2>
							<div class="table-cell">
								<span :class="judgeGroupId(item.playGroupId,name)" v-for="(name,index) of arrSplit(item.lastOpenData)">{{ name }}</span>
							</div>
							<strong>距离 {{ item.lastOpenNumber }} 期截止还有：<span :time="item.leftTime"></span></strong>
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
				sscTimeList:[],

				state:[]
			}
		},
		created(){
			this.getAllSscOpenTime();
		},
		mounted(){
			click_addname('.tabs ul li',"acti");
		},
		computed:{
			newData(){
				var _this=this;
				if(_this.state.length>0){
					var arr=[];
					_this.sscTimeList.filter(obj =>{
						_this.state.map(id=>{
							if(id==obj.playGroupId){
								arr.push(obj)
							}
						})
					})
					return arr
				}else{
					return _this.sscTimeList
				}
			}
		},
		methods:{
			judgeGroupId(id,num){

				var red=['01', '02', '07', '08', 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46]
				var blue=['03', '04', '09', 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]
				var green=['05', '06', 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49]

				switch (id) {

					case 6:
						if(IsInArray(red,num)){
							return 'sp11'
						}
						if(IsInArray(blue,num)){
							return 'sp02'
						}
						if(IsInArray(green,num)){
							return 'sp10'
						}
						
						break;
					case 9:
						return 'sp'+num
						break;
					case 14:
						return 'sp'+num
						break;
					case 23:
						return 'sp'+num
						break;
					default:
						return 'sp11'
						break;
				}
				
			},
			// 选项切换
			selectState(arr){
				var _this=this
				this.state=arr
				setTimeout(function(){
					var $structure=$(".hall ul li")
					setDownTime($structure,_this);
				},100)
			},
			// 获取开奖时间
			getAllSscOpenTime(){
				var _this=this;
				_this.ajax("getAllSscOpenTime",{
					type:3
				},
				data=>{
					// 输出所有彩种26个
					_this.log('彩种列表名称')
					_this.alert(data,_this);
					_this.sscTimeList=data.sscTimeList.filter(obj=>{
						// 过滤彩种
						if(obj.enable){
							return obj
						}
					})
					setTimeout(function(){
						var $structure=$(".hall ul li")
						setDownTime($structure,_this);
					},100)
				})	
			}
		}
	}
</script>

