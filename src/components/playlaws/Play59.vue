<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择1个号码于2个位数 </var>
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
						<!-- <li>
							<strong>大</strong>
						</li> -->
						<li data-zhu="1"><strong>0</strong></li>
                        <li data-zhu="2"><strong>1</strong></li>
                        <li data-zhu="3"><strong>2</strong></li>
                        <li data-zhu="4"><strong>3</strong></li>
                        <li data-zhu="5"><strong>4</strong></li>
                        <li data-zhu="6"><strong>5</strong></li>
                        <li data-zhu="7"><strong>6</strong></li>
                        <li data-zhu="8"><strong>7</strong></li>
                        <li data-zhu="9"><strong>8</strong></li>
                        <li data-zhu="10"><strong>9</strong></li>
                        <li data-zhu="9"><strong>10</strong></li>
                        <li data-zhu="8"><strong>11</strong></li>
                        <li data-zhu="7"><strong>12</strong></li>
                        <li data-zhu="6"><strong>13</strong></li>
                        <li data-zhu="5"><strong>14</strong></li>
                        <li data-zhu="4"><strong>15</strong></li>
                        <li data-zhu="3"><strong>16</strong></li>
                        <li data-zhu="2"><strong>17</strong></li>
                        <li data-zhu="1"><strong>18</strong></li>


					</ul>
				</div>
			</div>
            
                <div class="some-unit">
                    <label>
                        <input type="checkbox" name="" id="">
                        <span>万位</span>
                    </label>
                    <label>
                        <input type="checkbox" name="" id="">
                        <span>千位</span>
                    </label>
                    <label>
                        <input type="checkbox" name="" id="">
                        <span>百位</span>
                    </label>
                    <label>
                        <input type="checkbox" name="" id="" checked>
                        <span>十位</span>
                    </label>
                    <label>
                        <input type="checkbox" name="" id="" checked>
                        <span>个位</span>
                    </label>
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
		name:'Play27',
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

					var num=0;
					
					var str='';


					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							var str2=$(this).find("strong").text();
							str=str+','+str2;
							var att=$(this).attr("data-zhu");	
							num=num+att*1;
							
						}
						log(num)
					})
					var before = ''
					$('.some-unit input').each((index,val)=>{
						console.log();
						if($(val).prop('checked')){
							before += $(val).next().text()[0] +',';
						}
					})
					before = before.slice(0,[before.length-1])
					_this.setData(before+'|'+str.substring(1),14245,326.666)


					// 注数
					_this.setValue.notes=num

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

				//触发点击事件
				var total=_this.$store.state.data_list
				total.splice(0,total.length);

				for (let index = 0; index < 100; index++) {
					$('.one').trigger('click');
					var arr = _this.setValue.number[0];
					_this.$store.state.data_list.push(arr);

				}
				$(".clear").trigger('click');

			})

		}
	}
</script>
