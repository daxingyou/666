<!-- 清除确定 组件-->
<template>
	<div class="fixed-bottom center fixed">
		<div class="clear-ok">
			<p>
				<i class="ico-clear"></i>
				<var>清除</var>
			</p>
			<span>共 <i>{{ setValue.notes }}</i> 注 <i>{{ (setValue.notes * setValue.money) }}</i> 元</span>
			<a @click="annotation" class="annotation">确定</a>
		</div>

	</div>
</template>

<script>
	export default{
		name:'FixedBottom',
		data(){
			return{
				sscPlayPlGroupList:[]
			}
		},
		// 组件创建之前
		created(){
			
		},
		// 激活周期
		activated(){
			
		},
		// 计算属性
		computed:{
			setValue(){
				return this.$store.state.BuyNsidePage.pageConfig
			},
			Odds(){
				return this.$store.state.BuyNsidePage.NoteSetting.ssconfig
			}
		},

		// 事件方法
		methods:{

			// 确定操作
			annotation(){
				var _this=this
				// 重置操作
				const { playPl } = { ...this.$store.state.BuyNsidePage.NoteSetting.sscPlayPlList }
				_this.$store.state.BuyNsidePage.NoteSetting.ssconfig.rebate=0
				_this.$store.state.BuyNsidePage.NoteSetting.ssconfig.playPl=playPl
				_this.test()

				var open=true;
				if(_this.setValue.notes>0){
					$(".note-setting").fadeIn();
					$(".mobile-wrap").addClass('overflow');
					if(open){
						drag(".note-setting .layout .box1 .slide-bar",'span i',_this);
						open=false;
					}
				}else{
					alert('还没有选中');
				}
			}
		}
	}

</script>
