<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择5个号码</var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
			<div class="color-ball">
				<div class="left">
					<span class="s1">选码</span>
				</div>
				<div class="right">
					<ul>
						<li><strong>0</strong></li>
						<li><strong>1</strong></li>
						<li><strong>2</strong></li>
						<li><strong>3</strong></li>
						<li><strong>4</strong></li>
						<li><strong>5</strong></li>
						<li><strong>6</strong></li>
						<li><strong>7</strong></li>
						<li><strong>8</strong></li>
						<li><strong>9</strong></li>
					</ul>
					<!-- <template v-for="item in pageData">
						<li :playPlId="item.playPlId">
							<strong>{{ item.name }}</strong>
						</li>
					</template> -->
					<!-- {{
						sscPlayPlGroupList
					}} -->
				</div>
			</div>
		</div>

		<!-- 投注金额 -->
		<FixedInput/>

	</div>
	
	
</template>


<script>
	export default{
		name:'Play366',
		data(){
			return{
				setValue:{
					// 每注金额
					money:2,
					// 总注数
					notes:0,
					// 号码
					number:[]
				},

				sscPlayPlGroupList:[]

			}
		},
		computed:{
			Getplay(){
				const { two_title } = { ...this.$store.state.BuyNsidePage}
				var filter = this.sscPlayPlGroupList.filter(obj=>{
					if(obj.name==two_title){
						return obj
					}
				})
				if(filter)
					return filter[0].sscPlayPlList[0]
			},
			pageData(){
				const { two_title } = { ...this.$store.state.BuyNsidePage}
				var arr=this.sscPlayPlGroupList.filter( obj =>{
					if(obj.name==two_title){
						return obj
					}
				});
				if(arr[0])
					return arr[0].sscPlayPlList.sort(compare('playPlId'))
				else{
					return []
				}
			}
		},
		created(){

			// 存储方法
			this.setPlay();
			// 根据玩法儿-读取列表
			this.getSscPlayPl2(this.$store.state.BuyNsidePage.NoteSetting.playId)

		},
		activated(){
			const { playId } = { ...this.$store.state.BuyNsidePage.NoteSetting}
			this.getSscPlayPl2(playId)
		},
		methods:{
			hello(name){
				var index = name.indexOf('（');
				if(index!=-1){
					return name[index+1];
				}
				return name;
			},
			getSscPlayPl2(playId){
				var _this=this;
				_this.ajax("getSscPlayPl2",{
					playId:playId
				},
				data=>{
					_this.alert(data,_this)
					_this.sscPlayPlGroupList=data.sscPlayPlGroupList
				})
			},
			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			}

		},
		mounted(){
			var _this=this

			_this.$nextTick(function(){

				// 主结构
				var $oLi=$(".color-ball .right ul");
				// 总个数
				var oLilen=null;

				// 统计函数
				function count(obj){

					var arr=_this.$store.state.BuyNsidePage.pageConfig.number

					arr.splice(0,arr.length);

					var num=0;
				
				var str = ''
					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							num++;
							str +=',' +$(this).find('strong').text()
						}
					})
					var zhushu={};
					switch (num) {
						case 4:
							zhushu.playPlId=8192
							zhushu.playPl=25.3
							break;
						case 5:
							zhushu.playPlId=8193
							zhushu.playPl=10.1
							break;
						case 6:
							zhushu.playPlId=8194
							zhushu.playPl=5
							break;
						case 7:
							zhushu.playPlId=8195
							zhushu.playPl=2.9
							break;
						case 8:
							zhushu.playPlId=8196
							zhushu.playPl=1.8
							break;
					}


					zhushu.content=str.slice(1) // 号码

					_this.setValue.number.push(zhushu);

					// 注数
					_this.setValue.notes=1

					// 存储方法
					_this.setPlay();
					
				}
				// 计算个数
				function num(){
					oLilen=$oLi.find('li').length
				}

				// 单选
				$oLi.on("click","li",function(){
					$(this).toggleClass('color');
					// 调用统计
					count();
				})
			
				// 机选一注
				$(".one").click(function(){
					num();
					$oLi.find('li').removeClass('color')
					var arry = rand_one_zhu(10,4)
					arry.forEach(element => {
						$oLi.find('li').eq(element-1).addClass('color');
					});
					// 调用统计
					count();
				})

				// 机选五注
				$(".five").click(function(){
					num();
					var arr=rand_one_zhu(oLilen,5)
					$oLi.find('li').removeClass('color');
					arr.map( obj =>{
						$oLi.find('li').eq(obj-1).addClass('color')
					})
					// 调用统计
					count();
				})

				// 清除
				$(".clear").click(function(){
					$oLi.find('li').removeClass('color')
					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);
					// 调用统计
					count();
				});

			})

		}
	}
</script>
