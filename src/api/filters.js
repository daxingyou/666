import Vue from 'vue'

Vue.filter('time', function (value) {
	var timestamp = new Date(value);
	return timestamp.toLocaleDateString().replace(/\//g, "-") + " " + timestamp.toTimeString().substr(0, 8)
})

Vue.filter('year', function (value) {
	var timestamp = new Date(value);
	return timestamp.toLocaleDateString().replace(/\//g, "-")
})

Vue.filter('money', function (value) {
	if(value==undefined){
		return '0.00'
	}else{
		return parseFloat(value).toFixed(2)
	}
})

Vue.filter('notext', function (value) {
	if(value==null || value==''){
		return '暂无'
	}else{
		return value
	}
})

// 时间
Vue.filter("hour",(value)=>{
	var str='';
	if(value>=0 && value<6){
		str='凌晨'
	}
	if(value>5 && value<12){
		str='上午'
	}
	if(value==12){
		str=' 中午'
	}
	if(value>12 && value<19){
		str='下午'
	}
	if(value>18 && value<=23){
		str='晚上'
	}
	return str+'好'
});

Vue.filter("number", value => {

	if(value=='' || value==undefined){
		return '0'
	}else{
		return value
	}
})

Vue.filter("tourist", value => {

	if(value=='' || value==undefined){
		return '未登录'
	}else{
		return value
	}
})

Vue.filter("card",value => {
	var len=value.length;
	var str0=value.substring(0,4)
	var str1=value.substring(12)
	return str0+'********'+str1
})


// 类型
Vue.filter("status",value => {
	var str='';

	if(value==0){
		str='正在出款'
	}

	if(value==1){
		str='出款成功'
	}

	if(value==2){
		str='出款拒绝'
	}	
	return str
})


// 记录

Vue.filter('Capitalrecord',value =>{

	var str='';
	if(value==24) str='三昇转钱包';
	if(value==25) str='钱包转三昇';
	if(value==26) str='开元转钱包';
	if(value==27) str='钱包转开元';

	if(value==16) str='提现/用户出款(拒绝)';
	if(value==15) str='手动存款';
	if(value==14) str='手动扣款';
	if(value==12) str='派奖/投注派奖';
	if(value==11) str='投注/投注扣款';
	if(value==9) str='彩金/入款优惠';
	if(value==2) str='提现/用户出款';
	if(value==3) str='充值/用户入款';

	return str
})

// 充值状态
Vue.filter('Rechargestate',value =>{

	var str='';

	switch(value)
	{
		case 0: str='正在入款'; break;
		case 1: str='充值成功'; break;
		case 2: str='充值失败'; break;
	}

	return str
})


// 充值类型
Vue.filter('Rechargetype',value =>{

	var str='';
	switch(value)
	{
		case 9: str='微信转银行卡';break;
		case 11: str='支付宝转银行卡';break;
		case 1: str='银行转账';break;
		case 3: str='微信转账';break;
		case 2: str='支付宝转账';break;
		case 5: str='在线支付';break;
	}
	
	return str
})

