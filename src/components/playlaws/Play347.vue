<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择1个号码 </var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
			<div class="color-ball">
				<div class="left">
					<span class="s1">第四名</span>
					<span>赔率</span>
				</div>
				<div class="right zkrg-310">
					<ul>								
						<!-- 动态获取结构 -->
						<template v-if="sscPlayPlGroupList.length>0">
							<li v-for="item in sscPlayPlGroupList" :playPlId="item.playPlId">
								<strong>{{ item.name }}</strong><p>{{ item.playPl }}</p>
							</li>
						</template>
						<template v-else>
							<div class="assembly-box">
								<img src="../../../static/img/icon/oval.svg" alt="">
								<span>加载中...</span>
							</div>
						</template>
					</ul>
				</div>
			</div>
		</div>


		<!-- 确定 -->
		<FixedBottom></FixedBottom>
		
		<!-- 注单设定 -->
		<NoteSetting></NoteSetting>


	</div>
	
	
</template>

<script>
	export default{
		name:'Play400',
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
		activated(){

			var _this=this

			// 存储方法
			_this.setPlay();

			var time=setInterval(function(){
				if(_this.$store.state.sscPlayPlGroupList.length>0){
					_this.pageData()
					clearInterval(time)
				}
			},300)

		},
		methods:{

			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			},
			pageData(){

				// 获取标题
				const { one_title } = { ...this.$store.state.BuyNsidePage}

				// 从 Vuex 获取列表
				const sscPlayPlGroupList=this.$store.state.sscPlayPlGroupList

				var arr=sscPlayPlGroupList.filter( obj =>{
					if(obj.name==one_title){
						return obj
					}
				})

				if(arr[0]){
					this.sscPlayPlGroupList = arr[0].sscPlayPlList.sort(compare('playPlId'))
				}
				else{
					return []
				}
			},
			setData(content,playPlId,playPl){
				var _this=this;

				// 创建一个空对象
				var zhu={};

				// 选中文字
				zhu.content=content
				// 赔率id
				zhu.playPlId = playPlId 
				// 赔率
				zhu.playPl = playPl 
				
				// 号码
				_this.setValue.number.push(zhu)

				_this.setPlay();
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

					var num=1;
					
					var str='';
					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							// num++;
							var playPlId=$(this).attr("playPlId") // 赔率id
							var playPl=$(this).find('p').text() // 赔率

							// zhushu.playPlId=parseFloat(playPlId)
							// zhushu.playPl=parseFloat(playPl)
							// zhushu.content=$(this).find('strong').text() // 号码							
							// _this.setValue.number.push(zhushu);
							_this.setData('第一名-'+$(this).find('strong').text(),parseFloat(playPlId),parseFloat(playPl))
							log(playPlId)
							log(playPl)
						}
						
					})

					// 注数
					_this.setValue.notes=num

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
					$oLi.find('li').eq(random(oLilen-1)).addClass('color');
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
				$(".clear-ok p").click(function(){
					$oLi.find('li').removeClass('color')
					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);
					// 调用统计
					count();
				});

				// 触发点击事件
				var total=_this.$store.state.data_list
				total.splice(0,total.length);

				for (let index = 0; index < 10; index++) {
					$('.one').trigger('click');
					var arr = _this.setValue.number[0];
					_this.$store.state.data_list.push(arr);

				}
				$(".clear-ok p").trigger('click');

			})

		}
	}
</script>
