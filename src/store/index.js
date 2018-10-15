import Vue from 'vue'
import Vuex from 'vuex'

// 导入函数
import { conversion } from '@/api/pub-fun'

// 域名配置
import config from '@/api/config'
import { randomBytes } from 'crypto';

Vue.use(Vuex)

const _this=Vue.prototype

export const store=new Vuex.Store({
	 state: {
		// 配置
		config:{},
		// 客服链接
		webLink:null,
		// 是否在线
		isLogin:false,
		// 查询配置
		screen:{
			starttime:'',
			endtime:'',
			status:'',
			type:'',
			query:false
		},

		// 彩种状态
		BuyNsidePage:{
			// 注单
			sscBetList:[],
			// 每页的配置
			pageConfig:{},
			// 注单配置
			NoteSetting:{
				// 最大赔率
				sscPlayPlList:{

				},
				ssconfig:{
					playPl:0,
					rebate:0
				}
			}
		},

		// 个人中心
		PersonalCenter:{},
		// 首页
		Index:{
			banner:[],
			noticeList:[],
			winningList:[]
		},
		// 活动
		Activity:[],
		
		// 切换组件列表
		sscPlayPlGroupList:[],

		//存放机选数据
		data_list:[],

		// 提现记录
		Presentrecord:[],

		// 充值记录
		Rechargerecord:[],

		// 注单明细
		Noteanddetail:[]

	},
	mutations: {
		// 客服链接
		webLink(state) {
			_this.ajax('WebSetting',{
			},
			data =>{
				state.webLink=data.kefuUrl
			})
		 },
		// 是否在线
		checkOnline(state){
			_this.ajax('checkOnline',{
				uid:_this.param('uid')?_this.param('uid'):'',
				token:_this.param('token')?_this.param('token'):''
			},
			data =>{
				if(data.result==1){
					state.isLogin=true
				}else{
					state.isLogin=false
				}
			})
		},
		// 查询时间
		time:(state,payload)=>{
			state.screen[payload[0]]=payload[1]
		},
		// 选择查询状态
		select:(state,payload)=>{
			state.screen[payload[0]]=payload[1]
		},
		//添加列表
		addListBettingSlips:(state,pyload)=>{
			state.BuyNsidePage.sscBetList.push(pyload)
		},
		// 个人中心
		PersonalCenter:(state)=>{
			_this.ajax('DataEditing',{
				uid:_this.param('uid')?_this.param('uid'):'',
				token:_this.param('token')?_this.param('token'):''
			},
			data=>{
				if(data.result!=108){
					state.PersonalCenter=data
					state.isLogin=true
				}
				if(data.result==108){
					state.isLogin=false
				}
			})
		},
		// 登录
		LoginStore:(state,pyload)=>{
			_this.ajax('Login',{
				account:pyload.username,
				password:pyload.password?_this.md5(pyload.password):pyload.password,
				loginType:1
			},
			data => {
				if(data.result==1){
					var obj=JSON.stringify({"uid":data.userId,"token":data.token})
					localStorage.setItem("user",obj);
				}
				_this.alert(data,pyload._that,pyload.title,"Index");
			})
		},
		// 添加一注
		addArr:(state)=>{
			var obj=state.data_list[random(10-1)]
			state.BuyNsidePage.sscBetList.push(obj)
		},
		// 输出
		Track(state){
			console.log(state);
		}
	 },
	actions:{
		// 查询时间
		time:(context,payload)=>{
			setTimeout(function(){
				context.commit('time',payload)
			},100)
		},
		select:(context,payload)=>{
			setTimeout(function(){
				context.commit('select',payload)
			},100)
		}

	}

})

export default store
