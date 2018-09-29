<template>

	<div class="mobile-wrap center bj2">

		<Header title="活动列表"></Header>
		

		<div class="activity">
			<ul>
				<li v-for="item in activitys">
					<router-link :to="'/ActivityDetails/'+item.id">
						<b>{{ item.name }}</b>
						<span>活动时间：{{ item.startTime | year }}~{{ item.endTime | year }}</span>

						<div class="pict" v-if="item.smallImageId">
							<ImgLoadding :item="item"></ImgLoadding>
						</div>
						<strong>查看详情 <i class="ico-more"></i></strong>
					</router-link>
				</li>
			</ul>
		</div>

		<!-- <DataLoadding/> -->

	</div>
</template>

<script>
	
	export default {
		name:'Activity',
		data(){
			return{
				activitys:[]
			}
		},
		created(){
			if(this.$store.state.Activity.length!=0){
				this.activitys=this.$store.state.Activity
			}else{
				this.getPromotion();
			}
		},
		mounted(){
			
		},
		computed:{
			
		},
		methods:{
			getPromotion(){
				var _this=this;
				_this.ajax('getPromotion',{
				},
				data =>{
					_this.alert(data,_this)
					_this.activitys=data.promotionList
					_this.getBase64(_this.activitys,'smallImageId');
					_this.$store.state.Activity=_this.activitys
				})
			}
		},
		filters:{
			
		},
		components:{

		}
	}

</script>