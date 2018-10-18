<template>

	<div class="mobile-wrap center bj1">
		<ul>
			<li><router-link to="/Index">首页</router-link></li>

			<li><router-link to="/Login">登录</router-link></li>

			<li><router-link to="/Register">注册</router-link></li>

			<li><router-link to="/Notice">公告</router-link></li>

			<li><router-link to="/Mail">站内信</router-link></li>

			<li><router-link to="/RechargeRecord">充值记录</router-link></li>

			<li><router-link to="/PresentRecord">提现记录</router-link></li>

			<li><router-link to="/DetailsRechargeRecords">充值记录明细</router-link></li>

			<li><router-link to="/NoteRecord">投注记录</router-link></li>

			<li><router-link to="/Recharge">充值</router-link></li>

			<li><router-link to="/BankCardTransfer">银行卡转账</router-link></li>

			<li><router-link to="/ChangePassword">修改登录密码</router-link></li>

			<li><router-link to="/PersonalData">个人资料</router-link></li>

			<li><router-link to="/DataEditing">资料编辑</router-link></li>

			<li><router-link to="/PersonalCenter">个人中心</router-link></li>

			<li><router-link to="/OpenAprize">开奖</router-link></li>

			<li><router-link to="/Quota">额度转换</router-link></li>

			<!-- <li><router-link to="/LotteryHall">购彩大厅</router-link></li> -->

			<li><router-link to="/Chesscard">棋牌</router-link></li>

		</ul>
	</div>

</template>

<script>

	export default {
		name:'Menu'
	}

</script>

<style scoped>
	.mobile-wrap{
		font-size: .3rem;
	}
	.mobile-wrap ul li{
		width: 33.33%;
		line-height: .8rem;
		text-align: center;
	}
	.mobile-wrap ul li a{
		display: block;
	}
</style>
