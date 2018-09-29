<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="开奖">
			<span class="fr" slot="money">余额: {{ balance }} 元</span>
		</Header>

		<div class="tabs1 move-touch">
			<ul>
				<li class="acti"><a href="#" title="">全部彩种</a></li>
				<li><a href="#" title="">时时彩</a></li>
				<li><a href="#" title="">PK10</a></li>
				<li><a href="#" title="">PC蛋蛋</a></li>
				<li><a href="#" title="">快3</a></li>
			</ul>
		</div>
		
		<div class="prize">
			<ul>
				<li>8</li>
				<li>8</li>
				<b>亿</b>
				<li>9</li>
				<li>8</li>
				<li>3</li>
				<li>7</li>
				<b>万</b>
			</ul>
			<p>11086彩票累计中奖……</p>
		</div>

		<div class="hall1">
			<ul>
				<li v-for="item in sscHistoryList">
					<div class="pict">
						<img src="../../static/img/LotteryHall/5.png" alt="">
					</div>
					<div class="fr-wrap">
						<h2>{{ item.playGroupName }} <span>第{{ item.number }}期</span></h2>
						<div :class="(item.openCode).split(',').letgth>10?'table-cell':'table-cell small'" :data-code="item.openCode">
							<span class="sp1" v-for="item of (item.openCode).split(',')">{{ item }}</span>
						</div>
						<strong>距离 {{ item.number }} 期截止还有：<span :data-time="item.openTime"></span></strong>
					</div>
				</li>
				
			</ul>
		</div>
		

		<Footer acti="5"></footer>

	</div>

	<!--mobile_wrap-->

</template>

<script>
	export default{
		name:"OpenAprize",
		created(){
			this.data();
			this.getMoney();
		},
		data(){
			return{
				sscHistoryList:[],
				
				balance:'',

				uid:this.param('uid'),
				token:this.param('token'),
			}
		},
		methods:{
			data(){
				var _this=this;
				_this.ajax('OpenAprize',{
				},
				data=>{
					_this.alert(data,_this);
					_this.sscHistoryList=data.sscHistoryList
					_this.sscHistoryList.forEach( function(element) {
						_this.getSscPlayGroup(element.playGroupId);
						_this.sscHistoryList.playGroupName=''
					});
				})
			},
			getSscPlayGroup(id){
				var _this=this;
				_this.ajax('getSscPlayGroup',{
					playGroupId:id
				},
				data=>{
					_this.sscHistoryList.forEach( function(element,index) {
						if(data.id==element.playGroupId){
							_this.$set(element,"playGroupName",data.name)
							
						}
					});					
				})
			},
			getMoney(){
				var _this=this;
				_this.ajax('DataEditing',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this);
					_this.balance=data.balance

				})
			}
		},
		computed:{

		},
		mounted(){
			auto_Fixed();
			click_addname('.tabs1 ul li',"acti");
			setTimeout(function(){
				Downtime('.hall1 ul li');
			},100);
		},
		updated(){
			var wi=$(".hall1 ul .fr-wrap h2").width();
			setTimeout(function(){
				$(".hall1 ul li").find('.table-cell').width(wi);
			},100)
		}
	}
</script>

