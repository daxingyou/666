<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="筛选"></Header>

		<div class="screen">
			<ul>
				<li>
					<span>开始时间</span>
					<div class="fr-wrap">
						<input type="datetime-local" @change="time('starttime',$event)" v-model="starttime">
						<i class="ico-more"></i>
					</div>
				</li>
				<li>
					<span>结束时间</span>
					<div class="fr-wrap">
						<input type="datetime-local" @change="time('endtime',$event)" v-model="endtime">
						<i class="ico-more"></i>
					</div>
				</li>
				<li>
					<span>状态</span>
					<div class="fr-wrap">
						<select name="" @change="select('status',$event)">
							<option v-for="item in status[this.$route.params.name]" :value="item.index">{{ item.name }}</option>
						</select>
						<i class="ico-more"></i>
					</div>
				</li>
				<li v-if="type[this.$route.params.name.length>0]">
					<span>类型</span>
					<div class="fr-wrap">
						<select name="" @change="select('type',$event)">
							<option v-for="item in type[this.$route.params.name]" :value="item.index">{{ item.name }}</option>
						</select>
						<i class="ico-more"></i>
					</div>
				</li>
			</ul>
		</div>

		<div class="fixed-bottom center fixed">
			<div class="pub-wrap mb30">
				<button @click="query">查询</button>
			</div>
		</div>
	</div>
	
	<!--mobile_wrap-->

</template>

<script>
	
	import {status,type} from '@/api/type'
	
	export default {
		name:'Screen',
		data(){
			return{
				starttime:'',
				endtime:'',


				status:status,
				type:type

			}

		},
		created(){
			
		},
		mounted(){
			var _this=this;
			var get0=getFormat(3);
			_this.starttime=get0;
			var get1=getFormat();
			_this.endtime=get1;
		},
		computed:{
			
		},
		methods:{
			// 查询
			query(){
				this.$store.state.screen.query=true;
				this.$router.go(-1)
			},
			time(val,ele){
				console.log(ChangeData(this[val]))
				this.$store.dispatch("time",[val,ChangeData(this[val])])
			},
			select(val,ele){
				console.log(ele.target.value)
				this.$store.dispatch("select",[val,ele.target.value])
			},
		},
		components:{

		}
	}

</script>
