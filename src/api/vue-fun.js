// 导入MD5
import crypto from 'crypto'
// 导入axios模块
import axios from 'axios'
// 导入接口配置
import config from './config'
// 导入函数
import { conversion,formatTwoNumber } from './pub-fun'

import ccc from '../../config/index.js'



export function vuefun(Vue,options){
	// 数据请求
	Vue.prototype.$http=axios
	// 配置
	Vue.prototype.config=config;
	// 调试输出
	Vue.prototype.log=function(text){
		console.log(text);
	},
	// 提示弹窗
	Vue.prototype.alert=function(data,$,txt,address){

		var _this=this;

		_this.log(data);
		
		if(data.result==1 && txt!=undefined){
			$.msg=txt;
			$.isShow=true;
			setTimeout(function(){
				$.isShow=false;
			},1600)
			if(address){
				setTimeout(function(){
					if(typeof(address)=='number'){
						$.$router.go(-address);
					}else{
						$.$router.replace({"name":address});
					}
				},1800)
			}
		}else if(data.result==108){
				// 超时登录跳转
				$.$router.replace({"name":"Login"})
				localStorage.removeItem('user');

			}else if(data.description){
					$.msg=data.description;
					$.isShow=true;
					setTimeout(function(){
						$.isShow=false;
					},1600)
					if(address && data.result==1){
						setTimeout(function(){
							if(typeof(address)=='number'){
								$.$router.go(-address);
							}else{
								$.$router.replace({"name":address});
							}
						},1800)
					}
				}
	},

	//获取参数
	Vue.prototype.param=function(val){
		var obj=JSON.parse(localStorage.getItem("user"));
		if(obj!=null){
			return obj[val];
		}
	},

	// MD5加密
	Vue.prototype.md5=function(str){
		var result;
		var md5 = crypto.createHash("md5");
		md5.update(str);
		var result = md5.digest('hex');
		return result;
	},

	// 数据请求函数
	Vue.prototype.ajax=function(apiName,object,fun,debug){
		// 添加默认参数
		object.companyShortName=this.config.companyShortName

		// 设置 【打印调试】 缺省值
		debug=debug?debug:0

		if(debug){
			console.clear()

			var target=ccc.dev.proxyTable['/apis'].target

			console.log('%c%s',"color:#f60",'配置名称　=>　'+apiName)
			console.log('%c%s',"color:#22ac38",'请求的接口完整链接　=>　'+target+this.config[apiName])
			console.log('%c%s',"color:#00b7ee",'参数是　=>')
			this.log(object)
			console.log('%c%s',"color:#e5004f",'转换成字符串后　=>')
			console.log('%c%s',"background:#000;color:#fff;line-height:1.6;padding:5px 20px",target+this.config[apiName]+'?'+conversion(object))
		}
		this.$http({
			method:'post',
			url:this.config.webAddress+this.config[apiName],
			data:conversion(object)
		})
		.then(data=>{
			fun(data.data);
		})
		// 错误处理
		.catch(error=>{
			// if (error.response) {
			// 	console.log(error.response.data);
			// 	console.log(error.response.status);
			// 	// console.log(error.response.headers);
			// } else {
			// 	console.log('Error', error.message);
			// }
			// console.log(error.config);
			fun(error)
		})
		//添加请求拦截器
		this.$http.interceptors.request.use(config => {
			// console.log('正在请求数据中....')
			// $('body').append('<div class"loadding"><img src="static/img/50c5e3e79b276c92df6cc52caeb464f0_12x32.gif" alt="" /></div>')
			return config
		}, error => {
			return Promise.reject(error)
		})

		axios.interceptors.response.use(response => {
			//console.log('end')
			return response
		}, error => {
			return Promise.reject(error)
		})

	},

	Vue.prototype.getDate=(val)=>{

		var date=new Date();
		var year=date.getFullYear();
		var m=date.getMonth()+1;
		var d=date.getDate();
		if(m<10){
			m="0"+m;
		}
		
		var obj={};
		// 今天
		if(val==1){
			obj.startTime=year+'-'+m+'-'+formatTwoNumber(d)
			obj.endTime=year+'-'+m+'-'+formatTwoNumber(d+1)
		}

		// 昨天	
		if(val==2){
			if(d-1==0){
				obj.startTime=year+'-'+formatTwoNumber(m-1)+'-'+"31"
				obj.endTime=year+'-'+m+'-'+formatTwoNumber(d)
			}else{
				obj.startTime=year+'-'+m+'-'+formatTwoNumber(d-1)
				obj.endTime=year+'-'+m+'-'+formatTwoNumber(d)
			}
		}

		// 本月
		if(val==3){
			var a=d+1-d;
			obj.startTime=year+'-'+ m +'-'+formatTwoNumber(a)
			obj.endTime=year+'-'+ m +'-'+formatTwoNumber(d+1)
		}
		return obj

	},


	// 获取图片地址
	
	Vue.prototype.getBase64=function(data,idName,successFun){
		var errImgLength=0;
		var _this=this;
		data.forEach(function(ele, index) {
			if(ele[idName]==null) errImgLength++;
			_this.getImg(ele[idName],(img_id,img_data)=>{
				_this.setImg(img_id,img_data,data,idName,successFun,errImgLength)
			},_this)
		});
	},
	
	Vue.prototype.getImg=function(imgId,fun){
		if(imgId){
			this.ajax('GetImages',{
				id:imgId
			},
			data => {
				fun(imgId,'data:image/jpeg;base64,'+data.imageData)
			})
		}
	},

	Vue.prototype.setImg=function(img_id,img_data,data,idName,successFun,errImgLength){
		var _this=this;
		data.forEach( function(ele, index) {
			if(ele[idName]==img_id){
				_this.$set(data[index],"imgUrl",img_data)
				_this.getLength(data,successFun,errImgLength)
			}
		});
	},

	Vue.prototype.getLength=function(data,successFun,errImgLength){
		var i=0;
		data.forEach( function(ele, index) {
			if(ele.imgUrl){
				i++
				if(data.length-errImgLength==i){
					console.log("%c%s",'color:#00ce3f','页面图片已全部加载完成~~~');
					if(successFun){
						successFun();
					}
				}
			}
		});
	},

	// store测试
	Vue.prototype.test=function(){
		console.log('%c%s',"color:#fff;background:#009944;padding:10px 20px;",'触发 Track 事件  数据跟踪------------------------')
		this.$store.commit('Track')
	},

	Vue.prototype.arrSplit=function(str){
		return str ? str.split(','):[]
	},

	// 截取字符串 取后三位
	Vue.prototype.subStr=function(str,num,offcet){
		var offcet=offcet?offcet:0;
		if(str){

			var numb=str.substring(str.length-num)*1

			if(numb==120){
				var new_str=1
			}else{
				var new_str=numb+offcet
			}

			if(new_str.toString().length==2){
				new_str='0'+new_str
			}
			return new_str
		}
		else{
			return '***'
		}
	},

	Vue.prototype.downTime=function(time){
		if(time){
			var day1=Math.floor(time/(60*60*24)).toString();
			var hour=Math.floor((time-day1*24*60*60)/3600).toString();
			var minute=Math.floor((time-day1*24*60*60-hour*3600)/60).toString();
			var second=Math.floor(time-day1*24*60*60-hour*3600-minute*60).toString();
			
			if(day1<10) day1="0"+day1;
			if(hour<10) hour="0"+hour;
			if(minute<10) minute="0"+minute;
			if(second<10) second="0"+second;

			if(day1=='00' && hour!='00'){
				var countDown =hour+":"+minute+":"+second
			}else if(hour=='00'){
				var countDown =minute +":"+second
			}else{
				var countDown = day1+":"+hour+":"+minute+":"+second
			}
			return countDown
		}else{
			return '加载中...'
		}
	}
		
}
