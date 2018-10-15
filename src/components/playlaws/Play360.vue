<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>有且只有各选1个投注码</var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
			<div class="tpp">三字组合（三字@<span>740</span> 组三@<span>265</span> 组六@<span>158</span>）</div>
			<div class="color-ball">
				<div class="left">
					<span class="s1">选码</span>
					<span>位数</span>
				</div>
				<div class="right">
					<ul>
						<li>
							<strong>0</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>1</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>2</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>3</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>4</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>5</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>6</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>7</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>8</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>9</strong>
							<p>第1位</p>
						</li>
						<li>
							<strong>0</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>1</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>2</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>3</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>4</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>5</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>6</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>7</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>8</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>9</strong>
							<p>第2位</p>
						</li>
						<li>
							<strong>0</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>1</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>2</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>3</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>4</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>5</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>6</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>7</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>8</strong>
							<p>第3位</p>
						</li>
						<li>
							<strong>9</strong>
							<p>第3位</p>
						</li>
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
		name:'Play360',
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
		
			const { playId } = { ...this.$store.state.BuyNsidePage.NoteSetting}
			this.getSscPlayPl2(playId)
		},
		methods:{

			//获取赔率值和赔率
			getSscPlayPl2(playId){
				var _this=this;
				_this.ajax("getSscPlayPl2",{
					playId:playId
				},
				data=>{
					_this.alert(data,_this)
					_this.sscPlayPlGroupList=data.sscPlayPlGroupList
					_this.$store.state.sscPlayPlGroupList=data.sscPlayPlGroupList

					_this.log(this.Getplay)
				})
			},
			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			},
			// 添加数据
			CallData(str,arr,arr2){
				var _this=this
				console.log(str)
				var text='';
				var playPlId=0;
				var playPl=0;
				console.log(str,arr)
				if(parseInt(str)==parseInt(arr)==parseInt(arr2)){
					text="之三字";
					playPlId=7939;
					playPl=740;
				}else{
					text="之组六"
					playPlId=7941;
					playPl=158;
				}
				var zhu={};
				zhu.playPl=playPl // 赔率编码
				zhu.playPlId=playPlId // 赔率 

				zhu.content=text+'-'+str+','+arr+","+arr2 // 号码
				log(zhu.content)
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
								if(j!=i){
									if(k!=j){
										_this.CallData(arr[i],arr[j],arr[k])
									}
								}
							}
						}
					}

					// 注数
					_this.setValue.notes=_this.setValue.number.length
					console.log(_this.setValue.notes);
					

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
					
					var arr=rand_one_zhu(10,3)
					$oLi.find('li').removeClass('color');
					arr.map( (obj,index) =>{
						$oLi.find('li').eq(index*10+obj-1).addClass('color')
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

