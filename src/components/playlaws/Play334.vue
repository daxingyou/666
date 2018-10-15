<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择1个号码 </var>
				<p>
					<span class="one">机选一注</span>
					<span class="five">机选五注</span>
				</p>
			</h3>
			<div class="color-ball">
				<div class="left">
					<span class="s1">选码</span>
					<span>赔率</span>
				</div>
				<div class="right">
					<!-- <ul>
						<li><strong>1</strong><p>19.8</p></li>
						<li><strong>2</strong><p>19.8</p></li>
						<li><strong>3</strong><p>19.8</p></li>
						<li><strong>4</strong><p>19.8</p></li>
						<li><strong>5</strong><p>19.8</p></li>
						<li><strong>6</strong><p>19.8</p></li>
						<li><strong>7</strong><p>19.8</p></li>
						<li><strong>8</strong><p>19.8</p></li>
						<li><strong>9</strong><p>19.8</p></li>
						<li><strong>10</strong><p>19.8</p></li>
						<li><strong>11</strong><p>19.8</p></li>
						<li><strong>12</strong><p>19.8</p></li>
						<li><strong>13</strong><p>19.8</p></li>
						<li><strong>14</strong><p>19.8</p></li>
						<li><strong>15</strong><p>19.8</p></li>
						<li><strong>16</strong><p>19.8</p></li>
						<li><strong>17</strong><p>19.8</p></li>
						<li><strong>18</strong><p>19.8</p></li>
						<li><strong>19</strong><p>19.8</p></li>
						<li><strong>20</strong><p>19.8</p></li>
					</ul> -->
					<ul>
						<template v-for="item in pageData">
							<li :playPlId="item.playPlId">
								<strong>{{ item.name }}</strong><p>{{ item.playPl }}</p>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>

		<!-- 投注金额 -->
		<FixedInput/>


	</div>
	
	
</template>

<script>
	export default{
		name:'Play334',
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
		// 获取赔率
		this.$store.state.config.playPlId_type=0
		// 取位数
		this.$store.state.config.weishu=2
		
			// 根据玩法儿-读取列表
			const { playId } = { ...this.$store.state.BuyNsidePage.NoteSetting }
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
				
					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							var zhushu={};
							num++;

							var playPlId=$(this).attr("playPlId") // 赔率id
							var playPl=$(this).find('p').text() // 赔率

							zhushu.playPlId=parseFloat(playPlId)
							zhushu.playPl=parseFloat(playPl)
							zhushu.content=$(this).find('strong').text() // 号码

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
