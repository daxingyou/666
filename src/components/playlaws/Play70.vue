<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择2个号码 </var>
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
			_this.setValue.number.push(zhu)

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
				var before = ''
				$('.some-unit input').each((index,val)=>{
					console.log();
					if($(val).prop('checked')){
						before += $(val).next().text()[0] +',';
					}
				})
				before = before.slice(0,[before.length-1])



    var result = 0;

    var count = 0;

	$('.some-unit input').each((index,val)=>{
		if($(val).prop('checked')){
			count++;
		}
	})
	var elements = $('.machine-select ul li .number').eq(0).find('span')
	var elements_length = elements.length

	// var elements_2 = $('.machine-select ul li .number').eq(1).find('span')
	// var elements_2_length = elements_2.length
	for (var i = 0; i < elements_length; i++) {
		if (elements.eq(i).hasClass('color')) {
			for (var j = i; j < elements_length; j++) {
				if (elements.eq(j).hasClass('color')) {
					if (i == j) continue;
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
				
/**
	* 怎么计算注数
	*
	* @return
*/

// @Override
// public Integer getZhushu() {

// 	Integer result = 0;

// 	int count = 0;

// 	List<DoOffoicialBet> list = getAllDatas().get("二重号");

// 	for (Map.Entry<String, Boolean> s : getAllNameChoose().entrySet()) {
// 		if (s.getValue()) {
// 			count++;
// 		}
// 	}

// 	for (int i = 0; i < list.size(); i++) {
// 		if (list.get(i).isCheck()) {
// 			for (int j = i; j < list.size(); j++) {
// 				if (list.get(j).isCheck()) {
// 					if (i == j) continue;
// 					switch (count) {
// 						case 1:
// 							result += 0;
// 							break;
// 						case 2:
// 							result += 0;
// 							break;
// 						case 3:
// 							result += 0;
// 							break;
// 						case 4:
// 							result += 1;
// 							break;
// 						case 5:
// 							result += 5;
// 							break;
// 					}
// 				}
// 			}

// 		}
// 	}


// 	return result;
// }




				// 设置数据
				_this.setData(before+'|'+arr.join("|"),0,0);
				// 注数
				_this.setValue.notes=num*(num-1)/2
				
			}
			

			// 机选一注
			$(".machine-select h3 p .one").click(function(){
				$(".machine-select ul li .ten-thousand span").removeClass('active').removeAttr('select');
				$(".machine-select ul li .number span").removeClass('color')
				var arry = rand_one_zhu(10,4)
				$(".machine-select ul li .number span").eq(arry[0]-1).addClass('color');
				$(".machine-select ul li .number span").eq(arry[1]-1).addClass('color');

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
