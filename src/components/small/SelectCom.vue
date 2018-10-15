
<!-- 选择银行卡 组件-->

<template>
	<div class="date slide-touch">
		<h2><span class="fl">取消</span><var>{{ title }}</var><span class="fr">确定</span></h2>
		<div class="wrap">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div :id="item.id" class="swiper-slide" style="height: .48rem;" v-for="item in itemGroup">{{ item.bankName }}-{{ item.bankAccount | card }}</div>
					<div class="swiper-slide"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'SelectCom',
		props:['title','itemGroup'],
		updated(){
			if(this.itemGroup.length>0){
				var swiper = new Swiper('.date .swiper-container', {
					direction: 'vertical',
					slidesPerView: 2,
					spaceBetween: 10,
					pagination: {
						clickable: true,
					},
				});
			}
		},
		mounted(){
			var _this=this
			this.$nextTick(function(){

				$(".blank-list").click(function(event) {
					$(".date").animate({"bottom":0},300);
				});
				$(".date h2 span").click(function(event) {
					$(".date").animate({"bottom":"-"+$(".date").outerHeight()},300)
				});
				$(".date h2 .fr").click(function(event) {
					var itemId=$(this).parents('.date').find('.swiper-slide-active').attr('id');
					_this.$emit('childByValue',itemId)
				});

			})
		}
	}
</script>