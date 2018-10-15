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
				</div>
			</div>
		</div>

		<!-- 投注金额 -->
		<FixedInput/>

	</div>
	
	
</template>


<script>
	export default{
		name:'Play365',
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
				// name:'5个投注号码'
				// playPl:7.2
				// playPlId:8181

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
				var $oLi=$(".color-ball .right ul");
				// 总个数
				var oLilen=null;

				// 统计函数
				function count(obj){

					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);
					
					var arr=[];

					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							arr.push($(this).find('strong').text())
						}
					})

					console.log(arr)
					

					const { two_title } = { ..._this.$store.state.BuyNsidePage}

					for(var i=0;i<arr.length;i++){
						for(var j=i;j<arr.length;j++){
							for(var k=j;k<arr.length;k++){
								for(var l=k;l<arr.length;l++){
									for(var m=l;m<arr.length;m++){
										if(j!=i){
											if(k!=j){
												if(l!=k){
													if(m!=l){
														_this.addZhu(arr[i]+','+arr[j]+','+arr[k]+','+arr[l]+','+arr[m])
													}
												}
											}
										}
									}
								}
							}
						}
					}

					// 注数
					_this.setValue.notes=_this.setValue.number.length
					console.log('%c%s','color:#fff;background:#784D3A;padding:6px 10px','注数 => ' + _this.setValue.notes)
					
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
