<template>
	
	<div class="mobile-wrap center bj2">

		<Header title="注单明细"></Header>

		<div class="noteand-detail">
			<ul>
				<li>
					<span class="fl">订单号</span>
					<span class="fr">{{ Noteanddetail.orderNumber }}</span>
				</li>
				<li>
					<span class="fl">彩种</span>
					<span class="fr">{{ Noteanddetail.playGroupName }}</span>
				</li>
				<li>
					<span class="fl">期数</span>
					<span class="fr">{{ Noteanddetail.number }}</span>
				</li>
				<li>
					<span class="fl">玩法</span>
					<span class="fr">{{ Noteanddetail.playName }}</span>
				</li>
				<li>
					<span class="fl">投注号码</span>
					<span class="fr">{{ Noteanddetail.content }}</span>
				</li>
				<li>
					<span class="fl">开奖号码</span>
					<span class="fr">{{ Noteanddetail.openCode?Noteanddetail.openCode:'等待开奖' }}</span>
				</li>
				<li>
					<span class="fl">投注数量</span>
					<span class="fr">{{ Noteanddetail.zhushu }}</span>
				</li>
				<li>
					<span class="fl">单注金额</span>
					<span class="fr">{{ Noteanddetail.perMoney }}</span>
				</li>
				<li>
					<span class="fl">投注总额</span>
					<span class="fr">{{ Noteanddetail.totalMoney }}</span>
				</li>
				<li>
					<span class="fl">中奖金额</span>
					<span class="fr">{{ Noteanddetail.zjMoney }}</span>
				</li>
				<li>
					<span class="fl">交易时间</span>
					<span class="fr">{{ Noteanddetail.createTime | time }}</span>
				</li>
				<li>
					<span class="fl">状态</span>
					<span :class="[{'fr color color1':Noteanddetail.zjMoney>0},'fr color']">{{ Noteanddetail.zjMoney>0?'已中奖':'未中奖' }}</span>
				</li>
				<li>
					<span class="fl">盈亏</span>
					<span :class="[{'color1':Noteanddetail.zjMoney>0},'fr color']">{{ Noteanddetail.winOrLose }}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	export default{
		name:'Noteanddetail',
		data(){
			return{
				orderNumber:this.$route.params.id
			}
		},
		computed:{
			Noteanddetail(){
				var data=this.$store.state.Noteanddetail
				var arr= data.filter(obj=>{
					if(obj.orderNumber==this.orderNumber){
						return obj
					}
				})
				return arr[0]
			}
		}
	}
</script>