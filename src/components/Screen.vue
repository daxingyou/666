<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="筛选"></Header>

		<div class="screen">
			<ul>
				<li>
					<span>开始时间</span>
					<div class="fr-wrap">
						<input type="date" @change="time('starttime',$event)" v-model="starttime">
						<i class="ico-more"></i>
					</div>
				</li>
				<li>
					<span>结束时间</span>
					<div class="fr-wrap">
						<input type="date" @change="time('endtime',$event)" v-model="endtime">
						<i class="ico-more"></i>
					</div>
				</li>
				<li v-if="status[this.$route.params.name].length>0">
					<span>状态</span>
					<div class="fr-wrap">
						<select name="" @change="select('status',$event)">
							<option v-for="item in status[this.$route.params.name]" :value="item.index">{{ item.name }}</option>
						</select>
						<i class="ico-more"></i>
					</div>
				</li>
				<li v-if="type[this.$route.params.name].length>0">
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
		mounted(){
			var _this=this;

			var get0=getFormat(1);
			_this.starttime=get0;

			var get1=getFormat();
			_this.endtime=get1;


			// 开始时间
			_this.time('starttime')

			// 结束时间
			_this.time('endtime')

		},
		methods:{
			// 查询
			query(){
				this.$store.state.screen.query=true;
				this.$router.go(-1)
			},

			time(val,ele){
				this.$store.dispatch("time",[val,formatDate(this[val])])
			},
			select(val,ele){
				console.log(ele.target.value)
				if(ele.target.value==-1){
					var num=''
				}else{
					var num=parseInt(ele.target.value)
				}
				this.$store.dispatch("select",[val,num])
			},
		}
	}

</script>
