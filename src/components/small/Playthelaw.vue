<!-- 玩法下拉选项 -->

<template>
	<div class="alert-the center">
		<div class="layout">
			<h2>{{ structure.one }}</h2>
			<div class="box box1">
				<span @click="tabs_one(item.id)" :class="{'acti':item.isSelect?1:0}" v-for="item in structure.oneName">{{ item.Name }}</span>
			</div>
			<h2>{{ structure.two }}</h2>
			<div class="box box2">
				<div class="cg" v-for="cg in structure.twoSelects" v-if="cg.id==selectId">
					<span  @click="tabs_two(cg.id,item.id)" :class="{'acti':item.isSelect?1:0}" v-for="(item,index) in cg.twoName">{{ item.Name }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
	var mainJson = require('@/json/main.js');
	
	export default{

		name:'Playthelaw',

		props:['playGroupId'],

		data(){
			return{

				// 读取json
				structure:mainJson['Arr'+this.playGroupId][0],
				
				// 切换Id
				selectId:0,

				msg:{
					// 标题一
					onetitle:'',
					// 标题二
					twotitle:'',
					// 组件名称
					playType:'',
					// 玩法名称
					playId:0,
					
				}
			}
		},
		created(){
			
			this.$nextTick(function(){

				console.log("%c%s","color:#0f0;","id => Arr"+this.playGroupId+'.json');

				const { Playthelaw } = { ...this.$store.state.config }

				// 默认显示第一个
				this.tabs_one(Playthelaw>-1?Playthelaw:0);

				// 隐藏
				$(".alert-the").click(function(e){
					$(this).hide();
					$(".mobile-wrap").removeClass('overflow');
				})
				
				// 阻止冒泡
				$(".alert-the .layout").click(function(e){
					e.stopPropagation();
				})

			})
		},
		methods:{
			tabs_one(id){

				this.$store.state.config.Playthelaw=id
				
				this.selectId=id;

				this.$set(this.structure,"one",this.structure.oneName[id].Name)
				this.msg.onetitle=this.structure.oneName[id].Name

				this.structure.twoSelects[id].twoName.forEach(obj=>{
					if(obj.isSelect==true){
						this.$set(this.structure,"two",obj.Name)
						this.msg.twotitle=obj.Name
						this.msg.playType=obj.playType
						this.msg.playId=obj.playId
					}
				})

				if(this.structure.twoSelects[id].twoName.length==1){
					$(".alert-the").hide();
					$(".mobile-wrap").removeClass('overflow');
				}

				this.structure.oneName.forEach((obj)=>{
					this.$set(obj,"isSelect",false)
				})
				this.$set(this.structure.oneName[id],"isSelect",true);
				
				this.$emit('info',this.msg)
			},
			tabs_two(cgid,itemid){
				this.$set(this.structure,"one",this.structure.oneName[cgid].Name)
				
				this.structure.twoSelects[cgid].twoName.forEach(obj_one=>{
					if(obj_one.id==itemid){
						this.$set(obj_one,"isSelect",true)
						this.$set(this.structure,"two",obj_one.Name)
						this.msg.twotitle=obj_one.Name
						this.msg.playType=obj_one.playType
						this.msg.playId=obj_one.playId
					}else{
						this.$set(obj_one,"isSelect",false)
					}
				})
				this.$emit('info',this.msg)

				$(".alert-the").hide();
				$(".mobile-wrap").removeClass('overflow');

			}
		},
	}
</script>