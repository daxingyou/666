<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择3个号码</var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
		</div>
		<div class="hcl-container">
			<div class="tips">胆码</div>
			<div class="number">
				<div class="item double"><span>01</span></div>
				<div class="item double"><span>02</span></div>
				<div class="item double"><span>03</span></div>
				<div class="item double"><span>04</span></div>
				<div class="item double"><span>05</span></div>
				<div class="item double"><span>06</span></div>
				<div class="item double"><span>07</span></div>
				<div class="item double"><span>08</span></div>
				<div class="item double"><span>09</span></div>
				<div class="item double"><span>10</span></div>
				<div class="item double"><span>11</span></div>
			</div>
		</div>
		<div class="hcl-container">
			<div class="tips">拖码</div>
			<div class="number">
				<div class="item"><span>01</span></div>
				<div class="item"><span>02</span></div>
				<div class="item"><span>03</span></div>
				<div class="item"><span>04</span></div>
				<div class="item"><span>05</span></div>
				<div class="item"><span>06</span></div>
				<div class="item"><span>07</span></div>
				<div class="item"><span>08</span></div>
				<div class="item"><span>09</span></div>
				<div class="item"><span>10</span></div>
				<div class="item"><span>11</span></div>
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
			//机选一注
				function count(total_zhu){
					// 清空
					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);

					// 注数
					var num=total_zhu;
					// 选中的文字数组
					var arr=[];
					var str = ''
					$('.hcl-container').each((index,val)=>{
						$(val).find('.number .item.active').each((inde,val)=>{
							str+=','+$(val).text();
						})
						str+='|';
					})
					str = str.slice(1,arr.length-1)
					str = str.replace(/\|\,/g,'|');
					console.log(str);
					
					// 设置数据
					_this.setData(str,14448,975.15);
					// 注数
					_this.setValue.notes=num
					
				}

			
			$('.machine-select h3 p span').on('click',function() {
				var total = $('.hcl-container .number').eq(0).children('.item').length;
				var resuit = rand_one_zhu(total,3);
				$('.hcl-container .number .item').removeClass('active');
				for (let index = 0; index < resuit.length; index++) {
                    if(index<1){
						$('.hcl-container .number').eq(0).children('.item').eq(resuit[index]-1).addClass('active');
						$('.hcl-container').eq(0).attr('data-first',resuit[index]-1)
                    }else{
                        $('.hcl-container .number').eq(1).children('.item').eq(resuit[index]-1).addClass('active');
                    }
				}
				count(1);
			})
			//选一注


            //3     1
            //4     4       3
            //5     10      6
            //6     20      10
            //7     35      15
            //8     56      21
            //9     84      28
            //10    120     36
            //11    165     45
            // 1 2 3  4 5 

            // 1 2 3
            // 2 3 4
            // 3 4 5
            // 4 5 1
            // 5 1 2
            function zhu_check() {
                var length = $('.hcl-container .number .item.active')
                if(length.length<3){
                    return false;
                    //所选个数小于3
                }else{
                    if($('.hcl-container .number').eq(0).children('.item.active').length>0&&$('.hcl-container .number').eq(1).children('.item.active').length>0){
                        return true;   
                    }else{
                        return false;   
                    }
                }
            }
            function total_zhu() {
                var type = $('.hcl-container .number').eq(0).children('.item.active').length
                if(type==1){
                    var length = $('.hcl-container .number .item.active').length
                    return (length*(length-1)*(length-2))/6-((length-1)*(length-2)*(length-3))/6;
                }
                if(type==2){
                    return $('.hcl-container .number').eq(1).children('.item.active').length
                }
            }

            
			//默认点击事件
			$('.hcl-container .number .item').on('click',function() {
                $(this).toggleClass('active');
                if($(this).hasClass('double active')){
                    if(!$(this).parents('.hcl-container').attr('data-first')){
                        $(this).parents('.hcl-container').attr('data-first',$(this).index())
                    }else{
                        if(!$(this).parents('.hcl-container').attr('data-second')){
                            $(this).parents('.hcl-container').attr('data-second',$(this).index())
                        }else{
                            var first = $(this).parents('.hcl-container').attr('data-first')-0
                            $(this).parents('.hcl-container').attr('data-first',$(this).parents('.hcl-container').attr('data-second'))
                            $(this).parents('.hcl-container').attr('data-second',$(this).index());
                            $(this).parents('.hcl-container').eq(0).find('.number .item').eq(first).removeClass('active')
                        }
                    }
                }
                $(this).parents('.hcl-container').siblings('.hcl-container').find('.number .item').eq($(this).index()).removeClass('active');
                // console.log(total_zhu());
                if(zhu_check()){
                    console.log(total_zhu());
                    count(total_zhu());
                }else{
					count(0);
				}
                
            })
			})
		}
	}
</script>

