<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择1个重号2个单号 </var>
				<p>
					<span class="one">机选一注</span>
					<!-- <span class="five">机选五注</span> -->
				</p>
			</h3>
			<div class="always">
				<ul>
					<li>
						<div class="ten-thousand">
							<div class="fl">二重号</div>
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
					<li>
						<div class="ten-thousand">
							<div class="fl">单号</div>
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
                <div class="some-unit">
                    <label>
                        <input type="checkbox" name="" id="">
                        <span>万位</span>
                    </label>
                    <label>
                        <input type="checkbox" name="" id="" checked>
                        <span>千位</span>
                    </label>
                    <label>
                        <input type="checkbox" name="" id="" checked>
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
		</div>

		<!-- 确定 -->
		<FixedBottom></FixedBottom>
		
		<!-- 注单设定 -->
		<NoteSetting></NoteSetting>

	</div>
	
	
</template>

<script>
		export default{
		name:'Play17',
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
				// 号码
				_this.setValue.number.push(zhu)
				_this.setPlay();
			}
			
		},

		mounted(){
			var _this=this
			_this.$nextTick(()=>{

				// 统计函数
				function count(obj){
					// 清空
					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);

					// 注数
					var num=1;
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

					$(".machine-select ul li").each(function(index,el){
						num *=$(el).find('.number .color').length;
					})
					
					// 设置数据
					
					// 注数
					var minus = 0;
					if($(".machine-select ul li").eq(0).find('.number .color').length>$(".machine-select ul li").eq(1).find('.number .color').length){
						minus = $(".machine-select ul li").eq(1).find('.number .color').length
					}else{
						minus = $(".machine-select ul li").eq(0).find('.number .color').length
					}
					minus==1&&(minus=0);
					
					var before = ''
					$('.some-unit input').each((index,val)=>{
						if($(val).prop('checked')){
							before += $(val).next().text()[0] +',';
						}
					})
					before = before.slice(0,[before.length-1])
					_this.setData(before+'|'+arr.join("|"),0,0);
					

					var eq0 = $('.machine-select ul li').eq(0).find('.number span.color').length
					var eq1 = $('.machine-select ul li').eq(1).find('.number span.color').length

					if(eq0<1||eq1<3){
						num=0
					}
					if(eq0==1&&eq1>=2){
						if($('.machine-select ul li').eq(0).find('.number span.color').text()==0){
							num = (eq0+eq1)*(eq0+eq1-1)*(eq0+eq1-2)/6 - (eq0+eq1-1)*(eq0+eq1-2)*(eq0+eq1-3)/6
						}else{
							num = (eq0+eq1)*(eq0+eq1-1)*(eq0+eq1-2)/6 - (eq0+eq1-1)*(eq0+eq1-2)*(eq0+eq1-3)/6-1
						}
					}else{
						if(eq0>=1&&eq1==2){
							var isZero = false;
							for (let index = 0; index < eq1; index++) {
								const element = $('.machine-select ul li').eq(1).find('.number span.color').eq(index);
								if((element.text()-0)==0){
									isZero= true;	
								}
								
							}
							isZero?num = eq0-1:num = eq0
						}else{
							if(eq0>=2&&eq1>2){
								if(eq0>1&&eq1==10){
									var sum = eq1+1
									sum = ((sum)*(sum-1)*(sum-2)/6 - (sum-1)*(sum-2)*(sum-3)/6-1)*eq0;
									
									var isZero = false;
									for (let counter_index = 0; counter_index < eq0; counter_index++) {
										console.log(element);
										const element = $('.machine-select ul li').eq(0).find('.number span.color').eq(counter_index);
										if((element.text()-0)==0){
											isZero= true;	
											
										}	
									}
									num=isZero?sum+1:sum;
								}else{
									var sum = eq1+1
									num = ((sum)*(sum-1)*(sum-2)/6 - (sum-1)*(sum-2)*(sum-3)/6)*eq0
								}
								
							}
						}
					}
					if(eq0==1&&eq1==2){
						num=1;
					}
					if(eq0==eq1&&eq1==2){
						var a = 0;
						$('.machine-select ul li').eq(0).find('.number span.color').each((index,val)=>{
							console.log(index);
							console.log(val);

							if($('.machine-select ul li').eq(1).find('.number span.color').eq(index).text()!=$(val).text){
								a = 1;
							}
						})
						// console.log(1);
						
					}
					if(a){
						num = 0;
					}
					if(eq0==1&&eq1>1){
						var arr0=[],arr1=[];
						$('.machine-select ul li').eq(0).find('.number span.color').each((index,val)=>{
							arr0.push($(val).text())
						})
						$('.machine-select ul li').eq(1).find('.number span.color').each((index,val)=>{
							arr1.push($(val).text())
						})
						// console.log(arr0);
						// console.log(arr1);
						if(arr1.indexOf(arr0[0])!=-1){
							// console.log('bbbb');
							
							//选的里面有那个数组
							if(arr1.length==2){
								num= 0;
							}
							if(arr1.length>2){
								num =0;
								for(let i= 1;i<=arr1.length-2;i++){
									num+=i;
								}
							}
						}else{
							// console.log('ccc');
							if(arr1.length==2){
								num= 1;
							}
							if(arr1.length>2){
								num =0;
								for(let i= 1;i<=arr1.length-1;i++){
									num+=i;
								}
							}
						}
					}
					
					// console.log(eq0,eq1);
					// console.log(num);


					
    var result = 0;

    var count = 0;

	$('.some-unit input').each((index,val)=>{
		if($(val).prop('checked')){
			count++;
		}
	})
    // List<DoOffoicialBet> list = getAllDatas().get("二重号");
    // List<DoOffoicialBet> list1 = getAllDatas().get("单号");

    // for (Map.Entry<String, Boolean> s : getAllNameChoose().entrySet()) {
    //     if (s.getValue()) {
    //         count++;
    //     }
    // }
	var elements = $('.machine-select ul li .number').eq(0).find('span')
	var elements_length = elements.length

	var elements_2 = $('.machine-select ul li .number').eq(1).find('span')
	var elements_2_length = elements_2.length
	
	for (let i = 0; i < elements_length; i++) {
		if(elements.eq(i).hasClass('color')){
			for (let j = 0; j < elements_2_length; j++) {
				if(elements_2.eq(j).hasClass('color')){
					for (let k = j; k < elements_2_length; k++) {
						if (elements_2.eq(k).hasClass('color')) {
							if (j == k || i == j || i == k) continue;
							switch (count) {
								case 1:
									result += 0;
									break;
								case 2:
									result += 0;
									break;
								case 3:
									result += 0;
									break;
								case 4:
									result += 1;
									break;
								case 5:
									result += 5;
									break;
							}
						}	
					}
				}
			}
		}
	}
	
//     for (int i = 0; i < list.size(); i++) {
//         if (list.get(i).isCheck()) {
//             for (int j = 0; j < list1.size(); j++) {
//                 if (list1.get(j).isCheck()) {
//                     for (int k = j; k < list1.size(); k++) {
//                         if (list1.get(k).isCheck()) {
//                             if (j == k || i == j || i == k) continue;
//                             switch (count) {
//                                 case 1:
//                                     result += 0;
//                                     break;
//                                 case 2:
//                                     result += 0;
//                                     break;
//                                 case 3:
//                                     result += 0;
//                                     break;
//                                 case 4:
//                                     result += 1;
//                                     break;
//                                 case 5:
//                                     result += 5;
//                                     break;
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }


//     return result;
// }
					
					_this.setValue.notes=result
					
				}

			// 机选一注
			$(".machine-select h3 p .one").click(function(){
				$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
				$(".machine-select ul li .number span").removeClass('color')
				
				var arr = rand_one_zhu(10,3)
				for (let index = 0; index < arr.length; index++) {
					if(index<1){
						$(".machine-select ul li").eq(0).find('.number span').eq(arr[index]-1).addClass('color');
					}else{
						$(".machine-select ul li").eq(1).find('.number span').eq(arr[index]-1).addClass('color');
					}

				}
				// 调用统计
				count();
			})

			// 机选五注
			$(".machine-select h3 p .five").click(function(){
				$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
				$(".machine-select ul li .number span").removeClass('color')
				for(var i=0;i<5;i++){
					$(".machine-select ul li").eq(i).find('.number span').eq(random(10)-1).addClass('color')
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

			// 触发点击事件
			var total=_this.$store.state.data_list
			total.splice(0,total.length);

			for (let index = 0; index < 10; index++) {
				$('.one').trigger('click');
				var arr = _this.setValue.number[0];
				_this.$store.state.data_list.push(arr);

			}
			$(".clear-ok p").trigger('click');
		});
	}
}
</script>
