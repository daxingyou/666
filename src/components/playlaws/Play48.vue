<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>每位至少选择1个号码 </var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
			<div class="color-ball">
                
				<div class="left">
					<span class="s1">万位</span>
				</div>
				<div class="right">
					<ul>
						
						<li>
							<strong>大</strong>
						</li><li>
							<strong>小</strong>
						</li><li>
							<strong>单</strong>
						</li><li>
							<strong>双</strong>
						</li>

					</ul>
				</div>
			</div>
			<div class="color-ball">
                
				<div class="left">
					<span class="s1">千位</span>
				</div>
				<div class="right">
					<ul>
						
						<li>
							<strong>大</strong>
						</li><li>
							<strong>小</strong>
						</li><li>
							<strong>单</strong>
						</li><li>
							<strong>双</strong>
						</li>

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
		computed:{
			pageData(){
				const { two_title ,one_title} = { ...this.$store.state.BuyNsidePage}
				var arr=this.sscPlayPlGroupList.filter( obj =>{
					if(obj.name==one_title+'-'+two_title+'位'){
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
			
			hello(name){
				return name.split('-')[2];
			},
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
					var a= ''

							var playPlId=14274 // 赔率id
							var playPl=1.98 // 赔率
					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							// num++;

							// var playPlId=$(this).attr("playPlId") // 赔率id
							// var playPl=$(this).find('p').text() // 赔率

							// zhushu.playPlId=parseFloat(playPlId)
							// zhushu.playPl=parseFloat(playPl)
							// zhushu.content=$(this).find('strong').text() // 号码							
							// _this.setValue.number.push(zhushu);
							a+='|'+$(this).find('strong').text()
							

						}
					})
					var txt='';
					for(var i=0;i<$(".color-ball .right ul").length;i++){
						for(var j=0;j<$(".color-ball .right ul").eq(i).find('li.color').length;j++){
							txt+=','+$(".color-ball .right ul").eq(i).find('li.color').eq(j).text()
						}
						// txt=txt.substring(1);
						// if(i>=1){
						// 	txt=substring(1)
						// }
						txt+="|";
						
					}

					txt=txt.substring(1)
					txt=txt.slice(0,txt.length-1)
					txt=txt.replace('|,','|');
					log(txt)
					_this.setData(txt,parseFloat(playPlId),parseFloat(playPl))
					// 注数
					_this.setValue.notes=$(".color-ball .right ul").eq(0).find('li.color').length*$(".color-ball .right ul").eq(1).find('li.color').length

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
				$(".machine-select h3 p .one").click(function(){
					$(".color-ball .right ul li").removeClass('active').removeAttr('select');
					var arr1=rand_one_zhu(4,1);
					var arr2=rand_one_zhu(4,1);
					$(".color-ball").eq(0).find('li').eq(arr1[0]-1).addClass('color').siblings().removeClass('color')
					$(".color-ball").eq(1).find('li').eq(arr2[0]-1).addClass('color').siblings().removeClass('color')

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
