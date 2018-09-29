<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择1个号码 </var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>

			<div class="color-ball">
				<div class="left">
					<span class="s1">和值</span>
				</div>
				<div class="right">
					<ul>
						<li data-zhu="1"><strong>0</strong></li>
						<li data-zhu="3"><strong>1</strong></li>
						<li data-zhu="6"><strong>2</strong></li>
						<li data-zhu="10"><strong>3</strong></li>
						<li data-zhu="15"><strong>4</strong></li>
						<li data-zhu="21"><strong>5</strong></li>
						<li data-zhu="28"><strong>6</strong></li>
						<li data-zhu="36"><strong>7</strong></li>
						<li data-zhu="45"><strong>8</strong></li>
						<li data-zhu="55"><strong>9</strong></li>
						<li data-zhu="63"><strong>10</strong></li>
						<li data-zhu="69"><strong>11</strong></li>
						<li data-zhu="73"><strong>12</strong></li>
						<li data-zhu="75"><strong>13</strong></li>
						<li data-zhu="75"><strong>14</strong></li>
						<li data-zhu="73"><strong>15</strong></li>
						<li data-zhu="69"><strong>16</strong></li>
						<li data-zhu="63"><strong>17</strong></li>
						<li data-zhu="55"><strong>18</strong></li>
						<li data-zhu="45"><strong>19</strong></li>
						<li data-zhu="36"><strong>20</strong></li>
						<li data-zhu="28"><strong>21</strong></li>
						<li data-zhu="21"><strong>22</strong></li>
						<li data-zhu="15"><strong>23</strong></li>
						<li data-zhu="10"><strong>24</strong></li>
						<li data-zhu="6"><strong>25</strong></li>
						<li data-zhu="3"><strong>26</strong></li>
						<li data-zhu="1"><strong>27</strong></li>
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
			
				var $oLi=$(".color-ball .right ul li");
				var $oLen=$oLi.length;

				

				// 统计
				function count(){
					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);

					var arr=[]
					var num=0;
					$oLi.each(function(index, el) {
						if($(this).hasClass('color')){
							var text=$(this).text();
							arr.push(text);
							var zhu=$(this).attr('data-zhu');
							num+=zhu*1

						}
					});

					_this.setData(arr.join(','))
					_this.setValue.notes=num
				}

				// 机选一注
				$(".machine-select h3 p .one").click(function(){

					var arr=rand_one_zhu($oLen,1)
					console.log(arr)
					arr.map(obj=>{
						$oLi.eq(obj).addClass('color').siblings().removeClass('color')
					})
					// 调用统计
					count();
				})

				// 单选
				$oLi.click(function(){
					$(this).toggleClass('color');
					// 调用统计
					count();
				})

				// 清除
				$(".claar-ok p").click(function(){
					$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
					$("span").removeClass('color');
					// 调用统计
					count();
				});

				//触发点击事件
				var total=_this.$store.state.data_list
				total.splice(0,total.length);

				for (let index = 0; index < 100; index++) {
					$('.one').trigger('click');
					var arr = _this.setValue.number[0];
					_this.$store.state.data_list.push(arr);

				}
				$(".clear-ok p").trigger('click');
			
			})
		}
	}
</script>