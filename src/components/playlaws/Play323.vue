<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择重号及单号1个 </var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
			<div class="color-ball">
				<div class="left">
					<span class="s1">重号</span>
					<span>赔率</span>
				</div>
				<div class="right zkrg-310">
					<ul>
						<li><strong>11</strong><p>60</p></li>
						<li><strong>22</strong><p>60</p></li>
						<li><strong>33</strong><p>60</p></li>
						<li><strong>44</strong><p>60</p></li>
						<li><strong>55</strong><p>60</p></li>
						<li><strong>66</strong><p>60</p></li>
					</ul>
				</div>
			</div>
			<div class="color-ball cb2">
				<div class="left">
					<span class="s1">单号</span>
					<span>赔率</span>
				</div>
				<div class="right zkrg-310">
					<ul>
						<li><strong>1</strong><p>60</p></li>
						<li><strong>2</strong><p>60</p></li>
						<li><strong>3</strong><p>60</p></li>
						<li><strong>4</strong><p>60</p></li>
						<li><strong>5</strong><p>60</p></li>
						<li><strong>6</strong><p>60</p></li>
						
						<!-- <template v-for="item in pageData">
							<li :playPlId="item.playPlId">
								<strong>{{ item.name }}</strong>
								<p>{{ item.playPl }}</p>
							</li>
						</template> -->
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
		name:'Play323',
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
					var str='';
					

					// $($oLi).find('li').each(function(index){
					// 	if($(this).hasClass('color')){
					// 		num++;

					// 		var playPlId=$(this).attr("playPlId") // 赔率id
					// 		var playPl=$(this).find('p').text() // 赔率

					// 		zhushu.playPlId=parseFloat(11708)
					// 		zhushu.playPl=parseFloat(playPl)
					// 		str+=','+$(this).find('strong').text();
							
					// 	}
					// })
					for(var i=0;i<$(".color-ball").eq(0).find('li.color').length;i++){
						// $(".color-ball").eq(i).find('li.color').length;
						
						var str=$(".color-ball").eq(0).find('li.color').eq(i).find('strong').text();
						for(var j=0;j<$(".color-ball").eq(1).find('li.color').length;j++){

							var str2=$(".color-ball").eq(1).find('li.color').eq(j).find('strong').text();
							num++;
							var zhushu={};
							zhushu.playPlId=parseFloat(11708)
							zhushu.playPl=parseFloat(60)
							zhushu.content=str+','+str2 // 号码
							_this.setValue.number.push(zhushu);
						}
					}
					
					
					// 注数
					_this.setValue.notes=num

					// 存储方法
					_this.setPlay();
					
				}
				// 计算个数
				function num(){
					oLilen=$oLi.find('li').length
					log(oLilen)
				}

				// 单选
				$oLi.on("click","li",function(){
					$(this).toggleClass('color');
					if($(this).hasClass('color')){
						var zk=$(this).index();
						$(this).parents(".color-ball").siblings().find('li').eq(zk).removeClass('color')
					}
					// 调用统计
					count();
				})
			
				// 机选一注
				$(".one").click(function(){
					num();
					var arr=rand_one_zhu(6,2)
					$oLi.find('li').removeClass('color');
					arr.map( (obj,index) =>{
						$(".color-ball .right").eq(index).find("li").eq(obj-1).addClass('color')
					})
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
