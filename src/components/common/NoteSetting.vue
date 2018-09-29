<!-- 注单设定 组件-->
<template>
	
	<div class="note-setting center">
		<div class="layout">
			<h2>注单设定</h2>
			<div class="box1">
				<p>最高赔率：{{ format(Odds.playPl) }}<span>返利{{ notext(Odds.rebate) }}%</span></p>
				<div class="slide-bar">
					<span><i></i></span>
				</div>
			</div>
			<div class="box2">
				<p>
					<var>单注金额：</var>
					<input type="text" value="" v-model="setValue.money">
					<b>元</b>
				</p>
				<span>下注注数: {{ setValue.notes }} 注</span>
				<span>下注总额: {{ (setValue.notes * setValue.money) | money }} 元</span>
				<span>若中奖，单注最高中：<i>{{ format(Odds.playPl * setValue.money) }}</i> 元</span>
			</div>
			<div class="box3">
				<a class="a1" @click="cancel">取消</a>
				<a class="a2" @click="conok">确认</a>
			</div>
		</div>
	</div>
	

</template>

<script>
	export default{
		name:'NoteSetting',
		computed:{
			setValue(){
				return this.$store.state.BuyNsidePage.pageConfig
			},
			Odds(){
				console.log(this.$store.state.BuyNsidePage.NoteSetting.ssconfig)
				return this.$store.state.BuyNsidePage.NoteSetting.ssconfig
			}
			
		},
		mounted(){
			var _this=this;

			// 弹窗-取消按键
			$(".note-setting .layout .box3 a.a1").click(function(){
				$(".note-setting").fadeOut();
				document.removeEventListener('touchmove', handler, { passive: false });
			})

		},
		methods:{
			// 储存列表
			sscBetList(){
				var _this=this
				// 获取配置信息
				var conPage=_this.$store.state.BuyNsidePage		
				// 循环获取
				for(var i=0;i<_this.setValue.number.length;i++){
					var obj={
						// 彩种编码
						playGroupId:conPage.playGroupId,
						// 期号
						number:conPage.number,
						// 玩法编码
						playId:conPage.NoteSetting.playId.toString(),
						// 赔率编码
						playPlId:conPage.NoteSetting.sscPlayPlList.playPlId,
						// 注数
						zhushu:_this.setValue.notes,
						// 下注内容
						content:_this.setValue.number[i].content,
						// 单注金额
						perMoney:_this.setValue.money.toString(),
						// 玩法赔率
						playPl:conPage.NoteSetting.ssconfig.playPl,
						// 每单总金额
						totalMoney:(_this.setValue.money*_this.setValue.notes).toFixed(3),
						// 返点
						fandian:conPage.NoteSetting.ssconfig.rebate.toString(),
						// 倍数
						beishu:1,
						// 类型
						type:2,
						// wap端
						mode:1,
						// 名称
						newName:conPage.one_title+'-'+conPage.two_title,
					}
					// 添加投注列表
					_this.$store.commit('addListBettingSlips',obj)
				}

			},
			
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			},
			format(val){
				if(val){
					return parseFloat(val).toFixed(3)
				}else{
					return '正在计算...'
				}
			},
			notext(val){
				if(val && val!='NaN'){
					return val
				}else{
					return '0.0'
				}
			},
			// 确定
			conok(){
				var _this=this

				if(_this.Odds){
					// 提交
					this.sscBetList();

					// 跳转
					this.$router.push({'name':'BettingSlips'})

					// 隐藏
					$(".note-setting").fadeOut();

					// 删除
					setTimeout(function(){
						_this.removeAttr();
					},600)
				}else{
					tipsTotice('赔率加载中，如长时间未加载，请取消重新下注!')
				}

			},
			// 取消
			cancel(){
				var _this=this;
				// 注单设定取消
				$(".note-setting").fadeOut(600,function(){
					$(".mobile-wrap").removeClass('overflow');
					_this.removeAttr();
				});
			},
			removeAttr(){
				$(".note-setting .layout .box1 .slide-bar span").removeAttr('style')
			}
		}
	}
</script>
