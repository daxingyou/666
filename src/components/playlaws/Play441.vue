<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 机选号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择3个号码 </var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
		</div>

		<!-- 选择号码 -->
		
		<div class="main">
			<div class="left">
				<span class="code">种类</span>
				<span class="odds">赔率</span>
			</div>
			<div class="right three">
				<ul>
					<li><b>鼠</b><var>8</var></li>
					<li><b>牛</b><var>8</var></li>
					<li><b>虎</b><var>8</var></li>
					<li><b>兔</b><var>8</var></li>
					<li><b>龙</b><var>8</var></li>
					<li><b>蛇</b><var>8</var></li>
					<li><b>马</b><var>8</var></li>
					<li><b>羊</b><var>8</var></li>
					<li><b>猴</b><var>8</var></li>
					<li><b>鸡</b><var>8</var></li>
					<li><b>狗</b><var>8</var></li>
					<li><b>猪</b><var>8</var></li>
				</ul>
			</div>
		</div>

		<!-- 投注金额 -->
		<FixedInput />

	</div>
	
	
</template>

<script>
	export default{
		name:'Play441',
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
		created(){

		},
		activated(){
			// 存储方法
			this.setPlay();
		},
		computed:{
			getPlay(){

				// 获取 指定 赔率
				// name:'三肖连不中'
				// playPl:3.5
				// playPlId:6795

				var arr=this.$store.state.sscPlayPlGroupList[5]
				return arr.sscPlayPlList[0]
			}
		},
		methods:{
			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			},
			// 添加数据
			addZhu(str){
				var _this=this
				console.log(str)
				var zhu={};			
				zhu.playPl=_this.getPlay.playPl // 赔率值
				zhu.playPlId=_this.getPlay.playPlId // 赔率编码
				zhu.content=str // 号码				
				_this.setValue.number.push(zhu);
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
					
					var arr=[];

					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							arr.push($(this).find('b').text())
						}
					})

					console.log(arr)
				
					const { two_title } = { ..._this.$store.state.BuyNsidePage}

					// 3个
					for(var i=0;i<arr.length;i++){
						for(var j=i;j<arr.length;j++){
							for(var k=j;k<arr.length;k++){
								if(j!=i){
									if(k!=j){
										_this.addZhu(arr[i]+','+arr[j]+','+arr[k])
									}
								}
							}
						}
					}

					// 注数
					_this.setValue.notes=_this.setValue.number.length

					// 存储方法
					_this.setPlay();
					
				}

				// 最低选中个数
				var text=$(".machine-select h3 var").text();
				var number=parseInt(text.match(/\d/))


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
					var arr=rand_one_zhu(oLilen,number)
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

