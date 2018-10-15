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
					<span class="s1">个位</span>
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
					var str='';
					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							str+=','+$(".color-ball .right ul li.color").find('strong').eq(index).text();
						}
					})
					var playPlId=16611 // 赔率id
					var playPl=1.98 // 赔率
					str=str.substring(1);
					_this.setData(str,parseFloat(playPlId),parseFloat(playPl))
					// 注数
					_this.setValue.notes=$(".color-ball .right ul li.color").length;

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
