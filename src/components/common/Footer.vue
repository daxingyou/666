<template>
	<div class="bottom">
	<div class="null-box"></div>
	<div class="fixed-bottom center fixed">
		<div class="footer">
			<ul class="fl">
				<li :class="{acti:acti==1}">
					<router-link to="/">
						<i class="ico-index"></i>
						<span>首页</span>
					</router-link>
				</li>
				<li :class="{acti:acti==2}">
					<router-link to="/Chesscard">
						<i class="ico-goucai"></i>
						<span>棋牌</span>
					</router-link>
				</li>
			</ul>
			<div :class="['quota',{'acti':acti==3}]">
				<router-link to="/LotteryHall">
					<i class="ico-transformation"></i>
					<span>购彩大厅</span>
				</router-link>
			</div>
			<ul class="fr">
				<li :class="{acti:acti==4}">
					<router-link to="/Sports">
						<i class="ico-live"></i>
						<span>体育</span>
					</router-link>
				</li>
				<li :class="{acti:acti==5}">
					<router-link to="PersonalCenter">
						<i class="ico-my"></i>
						<span>我的</span>
					</router-link>
				</li>
			</ul>
		</div>
	</div>
	</div>

</template>

<script>

	export default{
		name:'Footer',
		props:['acti']
	}

</script>