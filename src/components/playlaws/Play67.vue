<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少四位以上各选一位号码 </var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
			<div class="always">
					<ul>
					<li>
						<div class="ten-thousand">
							<div class="fl">万位</div>
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
							<div class="fl">千位</div>
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
							<div class="fl">百位</div>
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
							<div class="fl">十位</div>
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
							<div class="fl">个位</div>
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
			zhu.playPlId = playPlId 
			// 赔率
			zhu.playPl = playPl 
			
			// 号码
			_this.setValue.number = [zhu]

			_this.setPlay();
		}
		
	},
	mounted(){
		var _this=this
		_this.$nextTick(()=>{

			// 主结构
			var $oLi=$(".color-ball .right ul");
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
							num++
						}
					})
					str=str+text
					arr.push(str.substring(0,str.length-1))
				})
				console.log(arr.join("|"));
				var zz = arr.join("|");
				if(zz[0]=='|'){
					zz = zz.substring(1,zz.length)
				}
				
				
				  /**
     * 怎么计算注数
     *
     * @return
     */
	 var resuit = function() {
		   var result = 0;
			var elements_1 = $('.machine-select ul li .number').eq(0).find('span')
			var elements_1_length = elements_1.length
			var elements_2 = $('.machine-select ul li .number').eq(1).find('span')
			var elements_2_length = elements_2.length
			var elements_3 = $('.machine-select ul li .number').eq(2).find('span')
			var elements_3_length = elements_3.length
			var elements_4 = $('.machine-select ul li .number').eq(3).find('span')
			var elements_4_length = elements_4.length
			var elements_5 = $('.machine-select ul li .number').eq(4).find('span')
			var elements_5_length = elements_5.length
		  for (var i = 0; i < elements_1.length; i++) {
            if (elements_1.eq(i).hasClass('color')) {
                for (var j = 0; j < elements_2.length; j++) {
                    if (elements_2.eq(j).hasClass('color')) {
                        for (var k = 0; k < elements_3.length; k++) {
                            if (elements_3.eq(k).hasClass('color')) {
                                for (var l = 0; l < elements_4.length; l++) {
                                    if (elements_4.eq(l).hasClass('color')) {
                                        ++result;
                                    }
                                }
                                for (var l = 0; l < elements_5.length; l++) {
                                    if (elements_5.eq(l).hasClass('color')) {
                                        ++result;
                                    }
                                }
                            }
                        }
                        for (var k = 0; k < elements_4.length; k++) {
                            if (elements_4.eq(k).hasClass('color')) {
                                for (var l = 0; l < elements_5.length; l++) {
                                    if (elements_5.eq(l).hasClass('color')) {
                                        ++result;
                                    }
                                }
                            }
                        }
                    }
                }
                for (var j = 0; j < elements_3.length; j++) {
                    if (elements_3.eq(j).hasClass('color')) {
                        for (var k = 0; k < elements_4.length; k++) {
                            if (elements_4.eq(k).hasClass('color')) {
                                for (var l = 0; l < elements_5.length; l++) {
                                    if (elements_5.eq(l).hasClass('color')) {
                                        ++result;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        for (var i = 0; i < elements_2.length; i++) {
            if (elements_2.eq(i).hasClass('color')) {
                for (var j = 0; j < elements_3.length; j++) {
                    if (elements_3.eq(j).hasClass('color')) {
                        for (var k = 0; k < elements_4.length; k++) {
                            if (elements_4.eq(k).hasClass('color')) {
                                for (var l = 0; l < elements_5.length; l++) {
                                    if (elements_5.eq(l).hasClass('color')) {
                                        ++result;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return result;


	 }
	 console.log('hellodage:'+resuit());
	 
    // @Override
    // public Integer getZhushu() {

    //     Integer result = 0;

    //     int count1 = 0;


    //     List<DoOffoicialBet> list1 = getAllDatas().get("万位");
    //     List<DoOffoicialBet> list2 = getAllDatas().get("千位");
    //     List<DoOffoicialBet> list3 = getAllDatas().get("百位");
    //     List<DoOffoicialBet> list4 = getAllDatas().get("十位");
    //     List<DoOffoicialBet> list5 = getAllDatas().get("个位");

    //     for (int i = 0; i < list1.size(); i++) {
    //         if (list1.get(i).isCheck()) {
    //             for (int j = 0; j < list2.size(); j++) {
    //                 if (list2.get(j).isCheck()) {
    //                     for (int k = 0; k < list3.size(); k++) {
    //                         if (list3.get(k).isCheck()) {
    //                             for (int l = 0; l < list4.size(); l++) {
    //                                 if (list4.get(l).isCheck()) {
    //                                     ++result;
    //                                 }
    //                             }
    //                             for (int l = 0; l < list5.size(); l++) {
    //                                 if (list5.get(l).isCheck()) {
    //                                     ++result;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                     for (int k = 0; k < list4.size(); k++) {
    //                         if (list4.get(k).isCheck()) {
    //                             for (int l = 0; l < list5.size(); l++) {
    //                                 if (list5.get(l).isCheck()) {
    //                                     ++result;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //             for (int j = 0; j < list3.size(); j++) {
    //                 if (list3.get(j).isCheck()) {
    //                     for (int k = 0; k < list4.size(); k++) {
    //                         if (list4.get(k).isCheck()) {
    //                             for (int l = 0; l < list5.size(); l++) {
    //                                 if (list5.get(l).isCheck()) {
    //                                     ++result;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     for (int i = 0; i < list2.size(); i++) {
    //         if (list2.get(i).isCheck()) {
    //             for (int j = 0; j < list3.size(); j++) {
    //                 if (list3.get(j).isCheck()) {
    //                     for (int k = 0; k < list4.size(); k++) {
    //                         if (list4.get(k).isCheck()) {
    //                             for (int l = 0; l < list5.size(); l++) {
    //                                 if (list5.get(l).isCheck()) {
    //                                     ++result;
    //                                 }
    //                             }
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }
    //     return result;
    // }

				
				



				// 设置数据
				_this.setData(zz,0,0);
				// 注数
				_this.setValue.notes=resuit()
				
			}

				// 机选一注
				$(".machine-select h3 p .one").click(function(){
					$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
					$(".machine-select ul li .number span").removeClass('color')
					
				var arry = rand_one_zhu(5,4)

				$(".machine-select ul li").eq(arry[0]-1).find('.number span').eq(random(10-1)).addClass('color');
				$(".machine-select ul li").eq(arry[1]-1).find('.number span').eq(random(10-1)).addClass('color');
				$(".machine-select ul li").eq(arry[2]-1).find('.number span').eq(random(10-1)).addClass('color');
				$(".machine-select ul li").eq(arry[3]-1).find('.number span').eq(random(10-1)).addClass('color');
					// 调用统计
					count();
				})

				// 机选五注
				$(".machine-select h3 p .five").click(function(){
					$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
					$(".machine-select ul li .number span").removeClass('color')

					var arr=rand_one_zhu(5,5)
					arr.map(obj=>{
						$(".machine-select ul li").eq(obj-1).find('.number span').eq(random(10)-1).addClass('color')
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

				//触发点击事件
				var total=_this.$store.state.data_list
				total.splice(0,total.length);

				for (let index = 0; index < 100; index++) {
					$('.one').trigger('click');
					var arr = _this.setValue.number[0];
					_this.$store.state.data_list.push(arr);

				}
				$(".clear-ok p").trigger('click');

			});
		}
	}
</script>
