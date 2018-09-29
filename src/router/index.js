import Vue from 'vue'
import Router from 'vue-router'

// vuex
import store from '@/store'

let _this=Vue.prototype

Vue.use(Router)


// common

	// 头部组件
	import Header from '@/components/common/Header'

	// 底部组件
	import Footer from '@/components/common/Footer'

	// 注单设定
	import NoteSetting from '@/components/common/NoteSetting'

	// 立即投注输入框
	import FixedInput from '@/components/common/FixedInput'

	// 底部确定
	import FixedBottom from '@/components/common/FixedBottom'

	// 数据加载组件
	import DataLoadding from '@/components/small/DataLoadding'


// small

	// 提示组件
	import Msg from '@/components/small/Msg'

	// 选择组件
	import SelectCom from '@/components/small/SelectCom'

	// 图片加载
	import ImgLoadding from '@/components/small/ImgLoadding'

	// 支付列表
	import PaymentList from '@/components/small/PaymentList'



// 登录
const Login = resolve => require(['@/components/Login'],resolve)

// 提款记录明细
const Bringoutthedetails = resolve => require(['@/components/Bringoutthedetails'],resolve)

// 充值记录
const Rechargedetails = resolve => require(['@/components/Rechargedetails'],resolve)

// 注册
const Register = resolve => require(['@/components/Register'],resolve)

// 公告
const Notice = resolve => require(['@/components/Notice'],resolve)

// 站内信
const Mail = resolve => require(['@/components/Mail'],resolve)

// 客服
const Kefu = resolve => require(['@/components/Kefu'],resolve)

// 提现记录
const PresentRecord = resolve => require(['@/components/PresentRecord'],resolve)

// 投注记录
const NoteRecord = resolve => require(['@/components/NoteRecord'],resolve)

// 充值
const Recharge = resolve => require(['@/components/Recharge'],resolve)

// 转换
const BankCardTransfer = resolve => require(['@/components/BankCardTransfer'],resolve)

// 修改密码
const ChangePassword = resolve => require(['@/components/ChangePassword'],resolve)

// 个人数据
const PersonalData = resolve => require(['@/components/PersonalData'],resolve)

// 个人资料
const DataEditing = resolve => require(['@/components/DataEditing'],resolve)

// 充值记录
const RechargeRecord = resolve => require(['@/components/RechargeRecord'],resolve)

// 个人中心
const PersonalCenter = resolve => require(['@/components/PersonalCenter'],resolve)

// 首页
const Index = resolve => require(['@/components/Index'],resolve)

// 404错误页面
const Error = resolve => require(['@/components/common/Error'],resolve)

// 开奖
const OpenAprize = resolve => require(['@/components/OpenAprize'],resolve)

// 开奖
const Quota = resolve => require(['@/components/Quota'],resolve)

// 购彩大厅
const LotteryHall = resolve => require(['@/components/LotteryHall'],resolve)

// 购彩内页
import BuyNsidePage from '@/components/BuyNsidePage'

// 棋牌
const Chesscard = resolve => require(['@/components/Chesscard'],resolve)

// 登录成功后 顶部组件
const LoginSuccess = resolve => require(['@/components/common/LoginSuccess'],resolve)

// 站内信内容
const MailCon = resolve => require(['@/components/MailCon'],resolve)

// 银行卡列表
const Bankcard = resolve => require(['@/components/Bankcard'],resolve)

// 银行卡信息
const Bankcardinfo = resolve => require(['@/components/Bankcardinfo'],resolve)

// 添加银行卡
const Bankcardadd = resolve => require(['@/components/Bankcardadd'],resolve)

// 记录筛选
const Screen = resolve => require(['@/components/Screen'],resolve)

// 赛事
const Sports = resolve => require(['@/components/Sports'],resolve)

// 资金记录
const Capitalrecord = resolve => require(['@/components/Capitalrecord'],resolve)

// 转账记录
const Transferrecord = resolve => require(['@/components/Transferrecord'],resolve)

// 提款
const Drawing = resolve => require(['@/components/Drawing'],resolve)

// 活动页面
const Activity = resolve => require(['@/components/Activity'],resolve)

// 活动详情
const ActivityDetails = resolve => require(['@/components/ActivityDetails'],resolve)

// 确认投注单
const BettingSlips = resolve => require(['@/components/BettingSlips'],resolve)

// 外部链接
const ExternalLinks = resolve => require(['@/components/ExternalLinks'],resolve)

// 投注所有组件
import './Betting'

// 充值金额
const Rechargeamount = resolve => require(['@/components/common/Rechargeamount'],resolve)

// 微信转银行卡
const WxbankCard = resolve => require(['@/components/common/WxbankCard'],resolve)

// 微信添加好转账
const WxAddfriends = resolve => require(['@/components/common/WxAddfriends'],resolve)

// 支付宝转银行卡
const ZfbbankCard = resolve => require(['@/components/common/ZfbbankCard'],resolve)

// 支付宝添加好友转账
const ZfbAddfriends = resolve => require(['@/components/common/ZfbAddfriends'],resolve)

// 银行卡
const BankTransfer = resolve => require(['@/components/common/BankTransfer'],resolve)

// 支付宝确认转账
const ConfirmationOfTransfer = resolve => require(['@/components/common/ConfirmationOfTransfer'],resolve)

// 微信确认转账
const WxConfirmationOfTransfer = resolve => require(['@/components/common/WxConfirmationOfTransfer'],resolve)


// 全局注册组件
Vue.component("Header",Header)
Vue.component("Footer",Footer)
Vue.component("Msg",Msg)
Vue.component("LoginSuccess",LoginSuccess)
Vue.component("SelectCom",SelectCom)
Vue.component("ImgLoadding",ImgLoadding)
Vue.component("PaymentList",PaymentList)

Vue.component("FixedBottom",FixedBottom)
Vue.component("NoteSetting",NoteSetting)
Vue.component("FixedInput",FixedInput)

Vue.component("DataLoadding",DataLoadding)

const routes= [
	{	
		path: '/',	//首页
		name: 'Index',
		component: Index,
		meta:{
			index:-1
		}
	},
	{	
		path: '/Login',	//登录
		name: 'Login',
		component: Login,
		meta:{
			index:0
		}
	},
	{	
		path: '/Bringoutthedetails/:id',	//提款记录明细
		name: 'Bringoutthedetails',
		component: Bringoutthedetails,
		meta:{
			index:7
		}
	},
	{	
		path: '/Rechargedetails/:id',	//提款记录明细
		name: 'Rechargedetails',
		component: Rechargedetails,
		meta:{
			index:7
		}
	},
	{
		path: '/Register',	//注册
		name: 'Register',
		component:Register,
		meta:{
			index:1
		}
	},
	{
		path: '/PersonalCenter',	//个人中心
		name: 'PersonalCenter',
		component:PersonalCenter,
		meta:{
			index:5,
			tologin:true
		}
	},
	{
		path: '/Notice',	//公告
		name: 'Notice',
		component:Notice,
		meta:{
			index:6
		}
	},
	{
		path: '/Mail',	//站内信
		name: 'Mail',
		component:Mail,
		meta:{
			index:6
		}
	},
	{
		path: '/Kefu',	//站内信
		name: 'Kefu',
		component:Kefu,
		meta:{
			index:6
		}
	},
	{
		path: '/MailCon/:id',	//站内信内容
		name: 'MailCon',
		component:MailCon,
		meta:{
			index:7
		}
	},
	{
		path: '/RechargeRecord',	//充值记录
		name: 'RechargeRecord',
		component:RechargeRecord,
		meta:{
			index:6
		}
	},
	{
		path: '/PresentRecord',	//提现记录
		name: 'PresentRecord',
		component:PresentRecord,
		meta:{
			index:7
		}
	},
	{
		path: '/Capitalrecord',	//资金记录
		name: 'Capitalrecord',
		component:Capitalrecord,
		meta:{
			index:6
		}
	},
	{
		path: '/Transferrecord',	//转账记录
		name: 'Transferrecord',
		component:Transferrecord,
		meta:{
			index:6
		}
	},
	{
		path: '/Drawing',	//提现
		name: 'Drawing',
		component:Drawing,
		meta:{
			index:6
		}
	},
	{
		path: '/Chesscard',	//棋牌
		name: 'Chesscard',
		component:Chesscard,
		meta:{
			index:0
		}
	},
	{
		path: '/NoteRecord',	//投注记录
		name: 'NoteRecord',
		component:NoteRecord,
		meta:{
			index:6
		}
	},
	{
		path: '/Recharge',	//充值
		name: 'Recharge',
		component:Recharge,
		meta:{
			index:6,
			trial:true, //试玩用户验证
		}
	},
	{
		path: '/BankCardTransfer',	//充值记录明细
		name: 'BankCardTransfer',
		component:BankCardTransfer,
		meta:{
			index:7
		}
	},
	{
		path: '/PersonalData',	//个人资料
		name: 'PersonalData',
		component:PersonalData,
		meta:{
			index:2
		}
	},
	{
		path: '/DataEditing',	//资料编辑
		name: 'DataEditing',
		component:DataEditing,
		meta:{
			index:6
		}
	},
	{
		path: '/OpenAprize',	//开奖
		name: 'OpenAprize',
		component:OpenAprize,
		meta:{
			index:2
		}
	},
	{
		path: '/ChangePassword',	//修改密码
		name: 'ChangePassword',
		component:ChangePassword,
		meta:{
			index:7
		}
	},{
		path: '/Quota',	//额度转换
		name: 'Quota',
		component:Quota,
		meta:{
			index:6,
			trial:true, //试玩用户验证
		}
	},
	{
		path: '/LotteryHall',	//购彩大厅
		name: 'LotteryHall',
		component:LotteryHall,
		meta:{
			index:2
		}
	},
	{
		path: '/BuyNsidePage/:id',	//购彩内页
		name: 'BuyNsidePage',
		component:BuyNsidePage,
		meta:{
			index:3
		}
	},
	{
		path: '/Bankcard',	//银行卡列表
		name: 'Bankcard',
		component:Bankcard,
		meta:{
			index:7
		}
	},
	{
		path: '/Bankcardinfo/:id',	//银行卡信息
		name: 'Bankcardinfo',
		component:Bankcardinfo,
		meta:{
			index:8
		}
	},
	{
		path: '/Bankcardadd',	//添加银行卡
		name: 'Bankcardadd',
		component:Bankcardadd,
		meta:{
			index:8
		}
	},
	{
		path: '/Screen/:name',	//查询筛选
		name: 'Screen',
		component:Screen,
		meta:{
			index:8
		}
	},
	{
		path: '/Sports',	//体育赛事
		name: 'Sports',
		component:Sports,
		meta:{
			index:4,
			trial:true
		}
	},
	{
		path: '/BettingSlips',	//确认投注单
		name: 'BettingSlips',
		component:BettingSlips,
		meta:{
			index:4,
			tologin:true
		}
	},
	{
		path: '/ExternalLinks',	//外部链接
		name: 'ExternalLinks',
		component:ExternalLinks,
		meta:{
			index:4,
			tologin:true
		}
	},
	{
		path: '/Activity',	//活动页面
		name: 'Activity',
		component:Activity,
		meta:{
			index:1
		}
	},
	{
		path: '/ActivityDetails/:id',	//活动详情
		name: 'ActivityDetails',
		component:ActivityDetails,
		meta:{
			index:2
		}
	},
	{
		path: '/Rechargeamount',	//充值金额
		name: 'Rechargeamount',
		component:Rechargeamount,
		meta:{
			index:7
		}
	},
	{
		path: '/WxbankCard',	//微信转银行卡
		name: 'WxbankCard',
		component:WxbankCard,
		meta:{
			index:7
		}
	},
	{
		path: '/WxAddfriends',	//微信添加好转账
		name: 'WxAddfriends',
		component:WxAddfriends,
		meta:{
			index:7
		}
	},
	{
		path: '/ZfbAddfriends',	//支付宝添加好转账
		name: 'ZfbAddfriends',
		component:ZfbAddfriends,
		meta:{
			index:7
		}
	},
	{
		path: '/ZfbbankCard',	//支付宝转银行卡
		name: 'ZfbbankCard',
		component:ZfbbankCard,
		meta:{
			index:7
		}
	},
	{
		path: '/BankTransfer',	//银行卡
		name: 'BankTransfer',
		component:BankTransfer,
		meta:{
			index:8
		}
	},
	{
		path: '/ConfirmationOfTransfer',	//支付宝确认转账
		name: 'ConfirmationOfTransfer',
		component:ConfirmationOfTransfer,
		meta:{
			index:8
		}
	},
	{
		path: '/WxConfirmationOfTransfer',	//支付宝确认转账
		name: 'WxConfirmationOfTransfer',
		component:WxConfirmationOfTransfer,
		meta:{
			index:8
		}
	},
	{
		path: '/Error',	//404页面
		name: 'Error',
		component:Error,
		meta:{
			index:6
		}
	},
	{
		path: '*',	//重定向指定地址
		redirect:'/Error'
	}
]

const router=new Router({
	// mode:"history",
	routes,
	//滚动行为
	scrollBehavior (to, from, savedPosition) {
	  return { x: 0, y: 0 }
	}
})

export default router

// 全局守卫
router.beforeEach((to,from,next)=>{

	// console.log('%c%s','color:#ff0','全局守卫 => '+to.path)
	// console.log('%c%s','color:#0f0','meta 配置')
	// console.log(to.meta)

	// console.log(router.app.$store.state.PersonalCenter)
	
	var str=router.app.$store.state.PersonalCenter.account?router.app.$store.state.PersonalCenter.account:"";


	if(to.meta.trial){
		if (str.substring(0,1)=="T"){
			tipsTotice('试玩用户无权访问!')
		}else{
			next();
		}
	}else{
		next();
	}

	// 实时更新账户信息
	store.commit('PersonalCenter');
	
});


// router.afterEach((to, from) => {
// 	setTimeout(function(){
// 		$('body').find('.dataloadding').fadeOut(200,function(){
// 			$(this).remove();
// 		})
// 	},500)
// })