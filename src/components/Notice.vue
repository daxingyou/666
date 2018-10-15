<template>
	<div class="mobile-wrap center bj2">
		
		<Header :title="'公告'"></Header>
		
		<div class="notice">
			<ul>
				<li v-for="data in datas">
					<router-link to="#" title="">
						<h2>{{ data.title }}</h2>
						<span>公告时间：{{ data.createTime | time }}</span>
						<p>{{ data.content }}</p>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
	<!--mobile_wrap-->
</template>

<script>
	export default {
		name:'Notice',
		data(){
			return{
				datas:[]
			}
		},
		created(){
			this.notice();
		},
		methods:{
			notice(){
				var _this=this
				this.ajax('Notice',{
				},
				data=>{
					console.log(data)
					this.datas=data.webNoticeList;
				})
			}
		},
		filters:{
			
		},
		components:{

		}
	}
</script>