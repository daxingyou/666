<template>

	<div class="mobile-wrap center bj2">

		<Header title="活动详情"></Header>

		<div class="activity">
			<ul>
				<li v-for="item in Nactivitys">
					<router-link to="">
						<b>{{ item.name }}</b>
						<span>活动时间：{{ item.startTime | year }}~{{ item.endTime | year }}</span>

						<div class="pict" v-if="item.smallImageId">
							<ImgLoadding :item="item"></ImgLoadding>
						</div>
						<div class="context1" v-html="item.content"></div>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	
	export default {
		name:'',
		props:[],
		data(){
			return{
				activitys:[],
				id:this.$route.params.id
			}
		},
		created(){
			if(this.$store.state.Activity.length!=0){
				this.activitys=this.$store.state.Activity
			}else{
				this.data();
			}
		},
		mounted(){
			
		},
		computed:{
			Nactivitys(){
				var _this=this;
				return _this.activitys.filter((obj)=>{
					if(obj.id==_this.id){
						return obj
					}
				});
			}
		},
		methods:{
			data(){
				var _this=this;
				_this.ajax('getPromotion',{
				},
				data =>{
					_this.alert(data,_this)
					_this.activitys=data.promotionList

					this.$store.state.Activity=_this.activitys
					
					_this.getBase64(data.promotionList,'smallImageId');
				}
				)
			}
		},
		filters:{
			
		},
		components:{

		}
	}

</script>