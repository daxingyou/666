<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择2个号码</var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
			<div class="always">
				<ul>
					<li>
						<div class="ten-thousand">
							<div class="fl">组选</div>
							<div class="fr">
								<span>全</span>
								<span>大</span>
								<span>小</span>
								<span>单</span>
								<span>双</span>
								<span>清</span>
							</div>
						</div>
						<div class="number">
							<span class="m d">0</span>
							<span class="m s">1</span>
							<span class="m d">2</span>
							<span class="m s">3</span>
							<span class="m d">4</span>
							<span class="l s">5</span>
							<span class="l d">6</span>
							<span class="l s">7</span>
							<span class="l d">8</span>
							<span class="l s">9</span>
						</div>
					</li>
					
				</ul>
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
				}
			}
		},
		computed:{
			
		},
		created(){
			// 存储方法
			this.setPlay();

		},
		methods:{
			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			},
			setData(content){
				console.log(content)
				var _this=this;
				// 创建一个空对象
				var zhu={};
				// 选中文字
				zhu.content=content
				// 号码
				_this.setValue.number.push(zhu)
				_this.setPlay();
			}

		},
		mounted(){
			var _this=this
			_this.$nextTick(function(){	

				// 统计
				function count(obj){

					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);
					
					var arr=[];

					$(".machine-select ul li").find('span').each(function(index){
						if($(this).hasClass('color')){
							arr.push($(this).text())
						}
					})

					_this.setData(arr.join(','))
					console.log(arr)

					var num=0
					for(var i=0;i<arr.length;i++){
						for(var j=i;j<arr.length;j++){
							if(j!=i){
								num++
							}
						}
					}

					// 注数
					_this.setValue.notes=num

					// 存储方法
					_this.setPlay();
					
				}

				// 机选一注
				$(".machine-select h3 p .one").click(function(){
					$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
					$(".machine-select ul li .number span").removeClass('color')
					var arr=rand_one_zhu(9,2)
					arr.map(obj=>{
						$(".machine-select ul li").eq(0).find('.number span').eq(obj).addClass('color');
					})

					// 调用统计
					count();
				})

				// 选择号码
				$(".machine-select ul li").each(function(){

					var $this=$(this);

					$this.find('.ten-thousand .fr span').eq(0).click(function(event) {
						$(this).parents('.ten-thousand').next().find('span').addClass('color')
					});

					$this.find('.ten-thousand .fr span').eq(1).click(function(event) {
						$(this).parents('.ten-thousand').next().find('span').removeClass('color')
						$(this).parents('.ten-thousand').next().find('.l').addClass('color')
					});
					$this.find('.ten-thousand .fr span').eq(2).click(function(event) {
						$(this).parents('.ten-thousand').next().find('span').removeClass('color')
						$(this).parents('.ten-thousand').next().find('.m').addClass('color')
					});

					$this.find('.ten-thousand .fr span').eq(3).click(function(event) {
						$(this).parents('.ten-thousand').next().find('span').removeClass('color')
						$(this).parents('.ten-thousand').next().find('.s').addClass('color')
					});
					$this.find('.ten-thousand .fr span').eq(4).click(function(event) {
						$(this).parents('.ten-thousand').next().find('span').removeClass('color')
						$(this).parents('.ten-thousand').next().find('.d').addClass('color')
					});

					$this.find('.ten-thousand .fr span').eq(5).click(function(event) {
						$(this).parents('.ten-thousand').next().find('span').removeClass('color')
					});

					// 单选
					$this.find('.number span').click(function(event) {
						$(this).toggleClass('color');
						// 调用统计
						count()
					});

					// 全大小单双清
					$this.find('.ten-thousand .fr span').click(function(event) {
						$(this).siblings().removeAttr('select').removeClass('active');
						if($(this).attr('select')){
							$(this).removeClass('active');
							$(this).removeAttr('select','1');
							$(this).parents('.ten-thousand').next().find('span').removeClass('color')
						}else{
							$(this).addClass('active');
							$(this).attr('select','1');
						}
						// 调用统计
						count();
					});

				})

				// 清除
				$(".clear-ok p").click(function(){
					$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
					$("span").removeClass('color');
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