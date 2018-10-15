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
				<div class="right r10">
					<!-- <h3>龙1vs虎2 <i></i> 龙1vs虎3</h3>
					<ul>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎2</strong><p>1.98</p></li>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎3</strong><p>1.98</p></li>
					</ul>
					<h3>龙1vs虎2 <i></i> 龙1vs虎3</h3>
					<ul>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎2</strong><p>1.98</p></li>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎3</strong><p>1.98</p></li>
					</ul>
					<h3>龙1vs虎4 <i></i> 龙1vs虎5</h3>
					<ul>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎4</strong><p>1.98</p></li>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎5</strong><p>1.98</p></li>
					</ul>
					<h3>龙1vs虎6 <i></i> 龙1vs虎7</h3>
					<ul>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎6</strong><p>1.98</p></li>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎7</strong><p>1.98</p></li>
					</ul>
					<h3>龙1vs虎8 <i></i> 龙2vs虎3</h3>
					<ul>
						<li><strong>龙1</strong><p>1.98</p></li>
						<li><strong>虎8</strong><p>1.98</p></li>
						<li><strong>龙2</strong><p>1.98</p></li>
						<li><strong>虎3</strong><p>1.98</p></li>
					</ul>
					<h3>龙2vs虎4 <i></i> 龙2vs虎5</h3>
					<ul>
						<li><strong>龙2</strong><p>1.98</p></li>
						<li><strong>虎4</strong><p>1.98</p></li>
						<li><strong>龙2</strong><p>1.98</p></li>
						<li><strong>虎5</strong><p>1.98</p></li>
					</ul>
					<h3>龙2vs虎6 <i></i> 龙2vs虎7</h3>
					<ul>
						<li><strong>龙2</strong><p>1.98</p></li>
						<li><strong>虎6</strong><p>1.98</p></li>
						<li><strong>龙2</strong><p>1.98</p></li>
						<li><strong>虎7</strong><p>1.98</p></li>
					</ul>
					<h3>龙2vs虎8 <i></i> 龙3vs虎4</h3>
					<ul>
						<li><strong>龙2</strong><p>1.98</p></li>
						<li><strong>虎8</strong><p>1.98</p></li>
						<li><strong>龙3</strong><p>1.98</p></li>
						<li><strong>虎4</strong><p>1.98</p></li>
					</ul>
					<h3>龙3s虎5 <i></i> 龙3vs虎6</h3>
					<ul>
						<li><strong>龙2</strong><p>1.98</p></li>
						<li><strong>虎5</strong><p>1.98</p></li>
						<li><strong>龙3</strong><p>1.98</p></li>
						<li><strong>虎6</strong><p>1.98</p></li>
					</ul>
					<h3>龙3vs虎7 <i></i> 龙3vs虎8</h3>
					<ul>
						<li><strong>龙3</strong><p>1.98</p></li>
						<li><strong>虎7</strong><p>1.98</p></li>
						<li><strong>龙3</strong><p>1.98</p></li>
						<li><strong>虎8</strong><p>1.98</p></li>
					</ul>
					<h3>龙4vs虎5 <i></i> 龙4vs虎6</h3>
					<ul>
						<li><strong>龙4</strong><p>1.98</p></li>
						<li><strong>虎5</strong><p>1.98</p></li>
						<li><strong>龙4</strong><p>1.98</p></li>
						<li><strong>虎6</strong><p>1.98</p></li>
					</ul>
					<h3>龙4vs虎7 <i></i> 龙4vs虎8</h3>
					<ul>
						<li><strong>龙4</strong><p>1.98</p></li>
						<li><strong>虎7</strong><p>1.98</p></li>
						<li><strong>龙4</strong><p>1.98</p></li>
						<li><strong>虎8</strong><p>1.98</p></li>
					</ul>
					<h3>龙4vs虎7 <i></i> 龙4vs虎8</h3>
					<ul>
						<li><strong>龙4</strong><p>1.98</p></li>
						<li><strong>虎7</strong><p>1.98</p></li>
						<li><strong>龙4</strong><p>1.98</p></li>
						<li><strong>虎8</strong><p>1.98</p></li>
					</ul>
					<h3>龙5vs虎6 <i></i> 龙5vs虎7</h3>
					<ul>
						<li><strong>龙5</strong><p>1.98</p></li>
						<li><strong>虎6</strong><p>1.98</p></li>
						<li><strong>龙5</strong><p>1.98</p></li>
						<li><strong>虎7</strong><p>1.98</p></li>
					</ul>
					<h3>龙5vs虎8 <i></i> 龙6vs虎7</h3>
					<ul>
						<li><strong>龙5</strong><p>1.98</p></li>
						<li><strong>虎8</strong><p>1.98</p></li>
						<li><strong>龙6</strong><p>1.98</p></li>
						<li><strong>虎7</strong><p>1.98</p></li>
					</ul>
					<h3>龙6vs虎8 <i></i> 龙7vs虎8</h3>
					<ul>
						<li><strong>龙6</strong><p>1.98</p></li>
						<li><strong>虎8</strong><p>1.98</p></li>
						<li><strong>龙7</strong><p>1.98</p></li>
						<li><strong>虎8</strong><p>1.98</p></li>
					</ul> -->
					<template v-for="item in sscPlayPlGroupList">
						<div class="fll">
							<h3>{{item.name}}</h3>
							<ul>
								<template v-for="item1 in item.sscPlayPlList">
									<li :playPlId="item1.playPlId">
										<strong>{{ item1.name }}</strong>
										<p>{{item1.playPl}}</p>
									</li>
								</template>
							</ul>
						</div>
					</template>
				</div>
			</div>
		</div>

		<!-- 投注金额 -->
		<FixedInput/>


	</div>
	
	
</template>

<script>
	export default{
		name:'Play336',
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
			// 根据玩法儿-读取列表
			this.getSscPlayPl2(this.$store.state.BuyNsidePage.NoteSetting.playId)

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
			},

			haha(t1,t2,t3){

				var zhushu={};
				zhushu.content=t1;
				zhushu.playPl=t2
				zhushu.playPlId=t3

				console.log(zhushu)

				this.setValue.number.push(zhushu);

			}

		},
		mounted(){
			var _this=this

			_this.$nextTick(function(){

				// 主结构
				var $oLi=$(".color-ball .right");
				// 总个数
				var oLilen=null;

				// 统计函数
				function count(obj){

					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);

				
					$($oLi).find('.fll .color').each(function(index){
						var t4=$(this).parent().prev().text()

						var t1=t4+'-'+$(this).find('strong').text()
						var t2=$(this).find('p').text()
						var t3=$(this).attr('playplid')

						_this.haha(t1,t2,t3)

						
					})

					// 注数
					_this.setValue.notes=_this.setValue.number.length

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

<style scoped>
	.color-ball .right ul li{
		width: 25%;
	}
	.color-ball .right .fll{
		width: 50%;
		float: left;
		text-align: center;
	}
	.color-ball .right .fll ul li{width:50%;text-align:center;border:none;padding:0;margin-bottom:0.1rem}
	.color-ball .right .fll ul li strong{cursor:pointer;-webkit-transition:.2s;-o-transition:.2s;transition:.2s;width:.66rem;height:.66rem;border:.02rem solid #e3e3e3;-webkit-border-radius:50%;border-radius:50%;text-align:center;line-height:.66rem;font-size:.24rem;color:#ff5353;display: inline-block;margin: 0 .2rem;background:#fff}.color-ball .right .fll ul li.color strong{background:#ff3e44;color:#fff;border-color:#ff3e44}.color-ball .right .fll ul li p{color:#c2c8cf;font-size:.2rem;text-align:center;line-height:1.4}.color-ball .right .fll h3{text-align:center;color:#0983fe;font-size:0.26rem;margin:0.4rem 0 0.2rem;line-height:.44rem}.color-ball .right .fll.r10 h3{margin-top:.1rem;margin-bottom:.1rem}.color-ball .right .fll h3 i{width:.7rem;display:inline-block}.tpp{width:100%;display:block;padding:0 4%;line-height:1.4;color:#bbb;font-size:.16rem}.tpp span{color:#f00}
</style>
