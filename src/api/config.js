const config={
		// 主地址
		webAddress:'/apis',
		// 公司名称
		companyShortName:'11086',
		// 登录
		Login:'/member/login.json',
		// 注册
		Register:'/member/register.json',
		// 公告
		Notice:'/notice/getPopupNoticeList.json',
		// 站内信
		Email:'/member/getUserInboxList.json',
		// 提款记录
		presentrecord:'/member/getWithdrawList.json',
		// 充值记录明细
		DetailsRechargeRecords:'/member/getWithdrawList.json',
		// 投注记录
		NoteRecord:'/member/getSscBetsList.json',
		// 充值
		Recharge:'/member/getAppCzList.json',
		// 修改密码
		ChangePassword:'/member/resetPassword.json',
		// 资料编辑
		DataEditing:'/member/getUserBaseInfo.json',
		// 注销
		Logout:'/member/sigout.json',
		// 获取用户上次信息，登录，游戏，存款，取款
		getUserLastInfo:'/member/getUserLastInfo.json',
		// 轮播图
		Banner:'/carousel/getCarouselList.json',
		// 获取Base64图片数据
		GetImages:'/image/getImageData.json',
		// 获取中奖公告
		Winninglist:'/notice/getZjNotice.json',
		// 获取热门开奖
		OpenAprize:'/app/getHotSscDataHistory.json',
		// 获取彩种信息
		getSscPlayGroup:'/ssc/getSscPlayGroup.json',
		// 获取客服链接
		WebSetting:'/webSetting/getKefu.json',
		// 获取注册配置
		getRegisterConfig:'/member/getRegisterConfig.json',
		// 检查用户在线
		checkOnline:'/member/checkOnline.json',
		// 获取用户积分等级
		showUserPointLevel:'/member/showUserPointLevel.json',
		// 等级
		getUserSession:'/member/getUserSession.json',
		// 获取红包主页
		getHongbaoInfo:'/activity/getHongbaoInfo.json',
		// 阅读站内信
		readUserInboxNotice:'/member/readUserInboxNotice.json',
		// 获取用户站内信
		getUserInbox:'/member/getUserInbox.json',
		// 删除站内信
		delUserInboxNotice:'/member/delUserInboxNotice.json',
		// 获取用户银行卡列表
		getUserBankCardList:'/member/getUserBankCardList.json',
		// 删除用户银行卡
		delUserBank:'/member/delUserBank.json',
		// 设置默认银行卡
		setUserBankDefault:'/member/setUserBankDefault.json',
		// 添加用户银行卡
		addUserBank:'/member/addUserBank.json',
		// 获取用户存款记录
		getDepositList:'/member/getDepositList.json',
		// 获取资金记录
		getLogUserCoinList:'/member/getLogUserCoinList.json',
		// 转账记录
		getLogUserCoinListBySC:'/member/getLogUserCoinListBySC.json',
		// 申请取款
		submitWithdraw:'/member/submitWithdraw.json',
		// 获取优惠活动列表
		getPromotion:'/promotion/getPromotion.json',
		// 获取开元棋牌剩余金额
		getChessAmount:'/chess/getChessAmount.json',
		// 获取体育剩余金额
		getSportAmount:'/sport/getSportAmount.json',
		// 获取所有账户余额
		getAllAmount:'/sport/getAllAmount.json',
		// 一键回收钱包
		allRecovery:'/sport/allRecovery.json',

		// 彩票账户额度转换至棋牌账户
		chessChangeAmount:'/chess/changeAmount.json',
		// 棋牌账户额度转换至彩票账户
		chessUnChangeAmount:'/chess/unChangeAmount.json',

		// 彩票账户额度转换至体育账户
		sportChangeAmount:'/sport/changeAmount.json',
		// 体育账户额度转换至彩票账户
		sportUnChangeAmount:'/sport/unChangeAmount.json',

		// 获取开奖时间
		getAllSscOpenTime:'/ssc/getAllSscOpenTime.json',

		// 获得玩法赔率_官方玩法
		getSscPlayPl_gfwf:'/ssc/getSscPlayPl_gfwf.json',
		
		// 获得玩法赔率2
		getSscPlayPl2:'/ssc/getSscPlayPl2.json',
		// 获得玩法赔率
		getSscPlayPl:'/ssc/getSscPlayPl2.json',
		
		// 获取指定彩种开奖时间和封盘时间
		getSscOpenTime2:'/ssc/getSscOpenTime2.json',
		
		// 获得计划内开奖结果（包含开奖中）
		getPlanOpenDataHistory:'/ssc/getPlanOpenDataHistory.json',

		// 彩票投注
		bet:'/ssc/bet.json',
		// 试玩登录
		shiwanLogin:"/member/shiwanLogin.json",

		// 提交支付宝转银行卡
		submitAliPay2Bank:'/member/submitAliPay2Bank.json',
		// 提交微信转银行卡
		submitWeChat2Bank:'/member/submitWeChat2Bank.json',

		// 支付列表
		getAppCzInfo4:'/member/getAppCzInfo4.json',

		// 银行卡
		getSystemBankCard:'/member/getSystemBankCard.json',

		// 获取存款方式
		getDepositChannel:'/member/getDepositChannel.json',

		// 银行卡转账
		submitYhzz:'/member/submitYhzz.json',

		// 转出银行
		getEnums:'/app/getEnums.json',

		// 微信收款 支付宝收款 信息  1,2 
		getPayOnline3:'/member/getPayOnline3.json',

		// 微信转账 提交
		submitWeixinzz:'/member/submitWeixinzz.json',

		// 支付宝转账 提交
		submitAlipayzz:'/member/submitAlipayzz.json',

		// 获得开户协议
		getKhxy:"webSetting/getKhxy.json",

		// 体育链接
		getSportUrl:'sport/getSportUrl.json',

		// 开元棋牌
		getChessUrl:"chess/getChessUrl.json",

		// 资料修改
		ajaxEditUserInfo:'/member/editUserInfo.json',

		// 提现限制金额
		getAppConfig:'/app/getAppConfig.json',

		// 获取微信转账人
		getDyParam:'/member/getDyParam.json',

		// 获取支付宝转账人
		getDyParam4AliPay:'/member/getDyParam4AliPay.json',
}

export default config