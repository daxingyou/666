// 输出
function log(txt){
	console.log(txt);
}

function keyPress() {    
     var keyCode = event.keyCode;    
     if ((keyCode >= 48 && keyCode <= 57))    
    {    
         event.returnValue = true;    
     } else {    
           event.returnValue = false;    
    }    
 } 

// 选项卡切换
function tabs_cg(Oobj,Otabch,event){//选项卡切换  1.点击的对象  2.切换的的对象  3.事件
	$(Otabch).hide();
	var dex=$(Oobj+".acti").index()
	if(dex>-1){
		$(Otabch).eq(dex).show();
	}
	$(Oobj)[event](function(){
			$(this).addClass('acti').siblings().removeClass('acti');
			$(Otabch).hide();
			$(Otabch).eq($(this).index()).show();
		});
}

// 苹果弹窗提示
function pubAlert(title,content,btn,fun){

	var html='';
	html+='<div class="alertjs center">'
	html+='	<div class="layout">'
	html+='		<h3>'+title+'</h3>'
	html+='		<div class="content">'+content+'</div>'
	html+='		<div class="but-box">'
	html+='			<button class="Sure">'+btn+'</button>'
	html+='		</div>'
	html+='	</div>'
	html+='</div>'

	$("body").on("click",'.alertjs .Sure',function(){
		$(this).parents('.alertjs').fadeOut(400,function(){
			$(this).remove();
			if(fun){
				fun();
			}
		})
	})
	$('body').append(html).find('.alertjs').fadeIn();
}

// 数据加载
function loadding(txt){
	var html="";
	html+='<div class="dataloadding center" style="background:none;">'
	html+='	<div class="layout">'
	html+='		<img src="../../../static/img/icon/oval.svg" alt="">'
	html+='		<p>'+txt+'</p>'
	html+='	</div>'
	html+='</div>'
	$('body').append(html).find('.dataloadding').fadeIn(600);
}

// 卸载数据加载
function unloadding(){
	$('body').find('.dataloadding').fadeOut(600,function(){
		$(this).remove();
	})
}

// 提示消息
function tipsTotice(txt){
	if($('body').find('.tips-notice').length==0){
		var html='<div class="tips-notice">'+txt+'</div>';
		$('body').append(html).find('.tips-notice').fadeIn(400,function(){
			setTimeout(function(){
				$(".tips-notice").fadeOut(400,function(){
					$(this).remove();
				})
			},1200)
		});
	}
}


//随机生成数组
function rand(max, min) {
	return Math.round(Math.random() * (max - min) + min);
};

function rand_one_zhu(length,arryLength) {
	var total = length;
	var arry = [];

	for (var index = 0; index < arryLength; index++) {
		arry[index] = rand(total,1);	
	}

	for (var i = 0; i < arry.length; i++) {
		var value_i = arry[i];
		for (var j = i+1; j < arry.length; j++) {
			var value_j = arry[j];
			if(value_i==value_j){
				//如果找到重复的值的话就赋予一个新的值并重新开始循环
				arry[j] = rand(total,1);
				i=-1;
				break;
			}
			
		}
	}
	return arry;
}

// 排序
function compare(property){
	return function(a,b){
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	}
}

// 随机数字
function random(num){
	return Math.ceil(Math.random()*num)
}

// 阻止冒泡
function prevent(hide_obj){
	$(window).click(function(){
		$(hide_obj).hide();
	})
	$(hide_obj).parent().click(function(event) {
		event.stopPropagation();
	});
}

//给对象添加类  1.点击的对象  2.类名  3.是否清除所有-非零[可选]
function click_addname(obj,className,Boolean){
	if(Boolean>0){
	$(obj).click(function(){
			$(obj).removeClass(className);
			$(this).addClass(className);
		})
		}else{
				$(obj).click(function(){
			$(this).addClass(className).siblings().removeClass(className);
		})
			}
}
//轮播图 说明：swiper-container   swiper-wrapper   swiper-slide
function downslide(main_div,fun_cirl,prev_page,next_page,types){
	types=types || 'bullets'
	var swiper = new Swiper(main_div, {
		loop:true,
		speed:500,
		autoplay:{
			delay:3000,
			stopOnLastSlide:false,
			disableOnInteraction:false,
		},
		pagination: {
			el: fun_cirl,
			type:types,
		},
		navigation: {
			nextEl: next_page,
			prevEl: prev_page,
		},
	});
}

// 计算高度
function auto_Fixed(){
	var domt=$(".fixed-top").outerHeight();
	$('<div style="height:'+domt+'px"></div>').insertAfter(".fixed-top");
	var domb=$(".fixed-bottom").outerHeight();
	$('<div style="height:'+domb+'px"></div>').insertBefore(".fixed-bottom");
};

// 弹窗
function alertbox(click_show,click_hide,obj,box_vague){//弹窗js
	$(obj).find(".layout").css({"-webkit-transform":"scale(0) translate(0,-0.5rem)","transition":"0.3s"});
	$(click_hide).click(function(){
			$(obj).fadeOut();
			$(obj).find(".layout").css("transition","0s").animate({"top":0},500,function(){
				$(window).unbind("touchmove");
				$(obj).find(".layout").css({"-webkit-transform":"scale(0)  translate(0,-0.5rem)"});
				$(box_vague).removeClass("mohu");
				
			});
		})
	$(click_show).click(function(){
			$(window).on("touchmove",function(even){even.preventDefault()});
			$(obj).fadeIn();
			$(obj).find(".layout").css({"-webkit-transform":"scale(1)  translate(0,0)","transition":"0.3s"});
			$(box_vague).addClass("mohu");

			var  oHei=$(obj).find('.layout').outerHeight();
			var winHei=($(window).height()-oHei)/2;
			$(obj).find(".layout").animate({"top":winHei+"px"},100);
		})
}

// 时间戳
function Downtime(id,find){
	var time=$('[data-id="'+id+'"]').find(find).attr('time');
	var ee=setInterval(function(){
		var res=ShowCountDown(time*1)
		if (res){
			$('[data-id="'+id+'"]').find(find).text(res)
		}else{
			$('[data-id="'+id+'"]').find(find).text('已过期...')
			clearInterval(ee);
		}
	},1000)
}

// 倒计时
function ShowCountDown(time){
		var now = new Date();
		var endDate = new Date(time);
		var leftTime=endDate.getTime()-now.getTime();
		if (leftTime>0){
			var leftsecond = parseInt(leftTime/1000);
			var day1=Math.floor(leftsecond/(60*60*24)).toString();
			var hour=Math.floor((leftsecond-day1*24*60*60)/3600).toString();
			var minute=Math.floor((leftsecond-day1*24*60*60-hour*3600)/60).toString();
			var second=Math.floor(leftsecond-day1*24*60*60-hour*3600-minute*60).toString();
			// var hour=Math.floor((leftsecond-day1*24*60*60)/3600+24*day1).toString();
			if(day1<10) day1="0"+day1;
			if(hour<10) hour="0"+hour;
			if(minute<10) minute="0"+minute;
			if(second<10) second="0"+second;
			var countDown = day1+"天"+hour+"小时"+minute+"分"+second+"秒"
			return countDown
		}else{
			return false
		}

	}

// 时间戳转yyyy-MM-dd HH:mm:ss

function formatDateTime(inputTime) {  
	var date = new Date(inputTime);
	var y = date.getFullYear();  
	var m = date.getMonth() + 1;  
	m = m < 10 ? ('0' + m) : m;  
	var d = date.getDate();  
	d = d < 10 ? ('0' + d) : d;  
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;  
	second = second < 10 ? ('0' + second) : second; 
	return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;  
};

// 时间戳转yyyy-MM-dd

function formatDate(inputTime) {  
	var date = new Date(inputTime);
	var y = date.getFullYear();
	var m = date.getMonth() + 1;  
	m = m < 10 ? ('0' + m) : m;  
	var d = date.getDate();  
	d = d < 10 ? ('0' + d) : d;  

	return y + '-' + m + '-' + d
};

function tozhuo(time){
	var date = new Date(time);
	return date.getTime();
}


//构造符合datetime-local格式的当前日期

function getFormat(val){
	var format = "";
	var nTime = new Date();
	format += nTime.getFullYear()+"-";
	format += (nTime.getMonth()+1)<10?"0"+(nTime.getMonth()+1):(nTime.getMonth()+1);
	format += "-";
	if(val){
		format += "01";
	}else{
		format += nTime.getDate()<10?"0"+(nTime.getDate()):(nTime.getDate());
	}
	format += "T";
	format += nTime.getHours()<10?"0"+(nTime.getHours()):(nTime.getHours());
	format += ":";
	format += nTime.getMinutes()<10?"0"+(nTime.getMinutes()):(nTime.getMinutes());
	format += ":00";
	return format
}

// 滚动圆
function crilScroll(txt,obj,hei,dou){
	var num=txt*1
	obj.append('<var>'+num+'</var>')
	setInterval(function(){
		num++
		if(num>dou) num=0
		obj.append('<var>'+num+'</var>')
		var len=obj.find('var').length;
		if(len>4){
			obj.find('var').first().remove();		
		}
	},240)
}

// 去掉默认事件
function handler(event) {
	event.preventDefault();
}

// 处理字符串
function HandleStr(str){
	
	var newstr=str.toString();
	console.log(str)

	if(str>=85000){
		var s1=newstr.substring(0,3);
		var s2=newstr.substring(3);
		var v1=parseFloat(s1)
		var v2=parseFloat(s2)
		if(v2>=50){
			v1++
		}
		v2='00'
		return parseFloat(v1+v2)
	}else if(str>=8500 &&  str<=85000){
		var s1=newstr.substring(0,3);
		var s2=newstr.substring(3);
		var v1=parseFloat(s1)
		var v2=parseFloat(s2)
		if(v2>=5){
			v1++
		}
		v2='0'
		return parseFloat(v1+v2)
	}else{
		return str
	}

}

// 返点拖拽
function drag(out_obj,inner_obj,that){

	var tx = 0;
	var mx = 0;
	var ex = 0;
	var start = true;

	var left=$(out_obj).find(inner_obj).offset().left

	var width=$(out_obj).width();

	// log(left)
	// log(width)

	// 注单弹窗 左侧 最高赔率
	
	const sscPlayPlList=that.$store.state.BuyNsidePage.NoteSetting.sscPlayPlList

	const maxFdBl=sscPlayPlList.maxFdBl
	const playPl=sscPlayPlList.playPl
	const minPl=sscPlayPlList.minPl

	const weishu=that.$store.state.config.weishu

	// 最大赔率
	var maxFBlb=13 

	var ban=$(out_obj).find(inner_obj).outerWidth()/2

	var average=0;
	var baifen=0;


	$(out_obj).find(inner_obj).on("touchstart",function(e){
		var touch = e.originalEvent.targetTouches[0];
		mx = touch.pageX;
	})

	
	$(out_obj).find(inner_obj).on("touchmove",function(e){
		var touch = e.originalEvent.targetTouches[0];
		tx = touch.pageX;
	
		var distance=tx-left

		// console.log(distance)
		if(distance<=0){
			distance=0;
		}
		if(distance>width-ban){
			distance=width-ban
		}
		$(this).parent().width(distance+ban)

		// console.log(width-ban)
		// console.log(distance)
		
		// 赔率 - （(最大赔率 - 最小赔率) / 每格偏移赔率值 * 总偏移赔率）
		
		// 百分比
		baifen=(distance/(width-ban)).toFixed(2)

		// console.log(baifen)
		var a=parseFloat(playPl - (( playPl - minPl ) * baifen))
		var b=HandleStr(a)
		// 最高赔率
		that.Odds.playPl=b.toFixed(weishu)

		// 返点
		that.Odds.rebate=(maxFdBl * baifen).toFixed(1);
		

	})

	$(out_obj).find(inner_obj).on("touchend",function(e){
		var config=that.$store.state.BuyNsidePage.NoteSetting.ssconfig
		// 最高赔率
		var a=parseFloat(playPl - (( playPl - minPl ) * baifen))
		var b=HandleStr(a)
		config.playPl=b.toFixed(weishu)
		// 设置返点
		config.rebate=(maxFdBl * baifen).toFixed(1);

		that.test();
	})
}

function double(txt){
	return txt<10?'0'+txt:txt
}

function vallar(zhi){
	console.log(zhi)
	if(zhi<10){
		return '00'+zhi
	}else if(zhi<100){
		return '0'+zhi
	}else{
		return zhi
	}
	
}
// 验证码
function draw(show_num) {
	var canvas_width=$('#canvas').width();
	var canvas_height=$('#canvas').height();
	var canvas = document.getElementById("canvas");//获取到canvas的对象，演员
	var context = canvas.getContext("2d");//获取到canvas画图的环境，演员表演的舞台
	canvas.width = canvas_width;
	canvas.height = canvas_height;
	var sCode = "A,B,C,E,F,G,H,J,K,L,M,N,P,Q,R,S,T,W,X,Y,Z,1,2,3,4,5,6,7,8,9,0";
	var aCode = sCode.split(",");
	var aLength = aCode.length;//获取到数组的长度
	
	for (var i = 0; i <= 3; i++) {
		var j = Math.floor(Math.random() * aLength);//获取到随机的索引值
		var deg = Math.random() * 30 * Math.PI / 180;//产生0~30之间的随机弧度
		var txt = aCode[j];//得到随机的一个内容
		show_num[i] = txt.toLowerCase();
		var x = 10 + i * 20;//文字在canvas上的x坐标
		var y = 20 + Math.random() * 8;//文字在canvas上的y坐标
		context.font = "bold 23px 微软雅黑";

		context.translate(x, y);
		context.rotate(deg);

		context.fillStyle = randomColor();
		context.fillText(txt, 0, 0);

		context.rotate(-deg);
		context.translate(-x, -y);
	}
	for (var i = 0; i <= 5; i++) { //验证码上显示线条
		context.strokeStyle = randomColor();
		context.beginPath();
		context.moveTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.lineTo(Math.random() * canvas_width, Math.random() * canvas_height);
		context.stroke();
	}
	for (var i = 0; i <= 30; i++) { //验证码上显示小点
		context.strokeStyle = randomColor();
		context.beginPath();
		var x = Math.random() * canvas_width;
		var y = Math.random() * canvas_height;
		context.moveTo(x, y);
		context.lineTo(x + 1, y + 1);
		context.stroke();
	}
}

function randomColor() {//得到随机的颜色值
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}