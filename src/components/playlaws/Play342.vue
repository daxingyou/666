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
			<div class="always">
				<ul>
					<li>
						<div class="ten-thousand">
							<div class="fl">第九名</div>
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
							<span class="m d">01</span>
							<span class="m s">02</span>
							<span class="m d">03</span>
							<span class="m s">04</span>
							<span class="m d">05</span>
							<span class="l s">06</span>
							<span class="l d">07</span>
							<span class="l s">08</span>
							<span class="l d">09</span>
							<span class="l s">10</span>
						</div>
					</li>
					<li>
						<div class="ten-thousand">
							<div class="fl">第十名</div>
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
							<span class="m d">01</span>
							<span class="m s">02</span>
							<span class="m d">03</span>
							<span class="m s">04</span>
							<span class="m d">05</span>
							<span class="l s">06</span>
							<span class="l d">07</span>
							<span class="l s">08</span>
							<span class="l d">09</span>
							<span class="l s">10</span>
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
	name:'Play29',
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
	activated(){
		
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
		setData(content,playPlId,playPl){
			var _this=this;

			// 创建一个空对象
			var zhu={};

			// 选中文字
			zhu.content=content
			// 赔率id
			zhu.playPlId = 14410 
			// 赔率
			zhu.playPl = 9.8 
			
			// 号码
			_this.setValue.number.push(zhu)

			_this.setPlay();
		}
		
	},
	mounted(){
		var _this=this
		_this.$nextTick(()=>{

			// 主结构
			var $oLi=$(".machine-select ul");
			// 总个数
			var oLilen=null;

			// 统计函数
		function count(obj){
				// 清空
				var arr=_this.$store.state.BuyNsidePage.pageConfig.number
				arr.splice(0,arr.length);

				// 注数
				var num=0;
				// 选中的文字数组
				var arr=[];
				$(".machine-select ul li").each(function(index){
					var str=''
					var text='';
					$(this).find('.number span').each(function(){
						if($(this).hasClass('color')){
							text=$(this).text()+','+text
						}
					})
					str=str+text
					arr.push(str.substring(0,str.length-1))
				})
				for(var i=0;i<$(".machine-select ul li").eq(0).find('.number span.color').length;i++){
					for(var j=0;j<$(".machine-select ul li").eq(1).find('.number span.color').length;j++){
						var zhi1=$(".machine-select ul li").eq(0).find('.number span.color').eq(i).text();
						var zhi2=$(".machine-select ul li").eq(1).find('.number span.color').eq(j).text();
						if(zhi1!=zhi2){
							num++;
						}
					}
				}
				_this.setData(arr.join("|"),0,0);
				// 注数
				_this.setValue.notes=num
				
			}
			
			// 首次确定
			$(".clear-ok .annotation").click(function(){
				if(_this.setValue.notes>0){
					_this.init();
					$(".note-setting").fadeIn();
					drag(".note-setting .layout .box1 .slide-bar",'span i',_this);
					document.addEventListener('touchmove', handler, { passive: false });
				}else{
					alert('还没有选中');
				}
			})

			// 弹窗-取消按键
			$(".note-setting .layout .box3 a.a1").click(function(){
				$(".note-setting").fadeOut();
				document.removeEventListener('touchmove', handler, { passive: false });
			})

			// 机选一注
			$(".machine-select h3 p .one").click(function(){
				$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
				$(".machine-select ul li .number span").removeClass('color')
				var arry = rand_one_zhu(10,1)
				var arry2 = rand_one_zhu(10,1)
				$(".machine-select ul li").eq(0).find('.number span').eq(arry[0]-1).addClass('color');
				$(".machine-select ul li").eq(1).find('.number span').eq(arry2[0]-1).addClass('color');

				// 调用统计
				count();
			})

			// 机选五注
			$(".machine-select h3 p .five").click(function(){
				$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
				$(".machine-select ul li .number span").removeClass('color')
				var arr=rand_one_zhu(10,5);
				for(var i=0;i<5;i++){
					$(".machine-select ul li .number span").eq(arr[i]-1).addClass('color')
				}
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
			});
		}
	}
</script>
