<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 机选号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择1个号码 </var>
				<p>
					<span class="one">机选一注</span>
					<span class="five">机选五注</span>
				</p>
			</h3>
		</div>

		<!-- 选择号码 -->
		
		<div class="main">
			<div class="left">
				<span class="code">选码</span>
				<span class="odds">赔率</span>
			</div>
			<div class="right">
				<ul>
					<template v-for="item in pageData">
						<li :playPlId="item.playPlId">
							<span>{{ item.name }}</span><var>{{ item.playPl }}</var>
						</li>
					</template>
				</ul>
			</div>
		</div>


		<!-- 投注金额 -->
		<FixedInput/>

	</div>
	
	
</template>

<script>
	export default{
		name:'Play405',
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
		},
		activated(){	
			const { playId } = { ...this.$store.state.BuyNsidePage.NoteSetting}
			this.getSscPlayPl2(playId)
		},
		methods:{
			getSscPlayPl2(playId){
				var _this=this;
				_this.ajax("getSscPlayPl2",{
					playId:playId
				},
				data=>{
					_this.alert(data,_this)
					_this.sscPlayPlGroupList=data.sscPlayPlGroupList
					_this.$store.state.sscPlayPlGroupList=data.sscPlayPlGroupList
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
				var $oLi=$(".main .right ul");
				// 总个数
				var oLilen=null;

				// 统计函数
				function count(obj){

					var arr=_this.$store.state.BuyNsidePage.pageConfig.number

					arr.splice(0,arr.length);

					var num=0;
				
					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							var zhushu={};
							num++;

							var playPlId=$(this).attr("playPlId") // 赔率id
							var playPl=$(this).find('var').text() // 赔率

							zhushu.playPlId=parseFloat(playPlId)
							zhushu.playPl=parseFloat(playPl)
							zhushu.content=$(this).find('span').text() // 号码

							_this.setValue.number.push(zhushu);
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
				$(".clear").click(function(){
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
				$(".clear").trigger('click');

			})

		}
	}
</script>

