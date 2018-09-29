
export default function tabs_cg(Oobj,Otabch,event){//选项卡切换  1.点击的对象  2.切换的的对象  3.事件
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

export default function pubAlert(title,content,btn,fun){

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

//随机生成数组
export default function rand(max, min) {
	return Math.round(Math.random() * (max - min) + min);
};

export default function rand_one_zhu(length,arryLength) {
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
export default function compare(property){
	return function(a,b){
		var value1 = a[property];
		var value2 = b[property];
		return value1 - value2;
	}
}

// 随机数字
export default function random(num){
	return Math.ceil(Math.random()*num)
}

// 阻止冒泡
export default function prevent(hide_obj){
	$(window).click(function(){
		$(hide_obj).hide();
	})
	$(hide_obj).parent().click(function(event) {
		event.stopPropagation();
	});
}

//给对象添加类  1.点击的对象  2.类名  3.是否清除所有-非零[可选]
export default function click_addname(obj,className,Boolean){
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
export default function downslide(main_div,fun_cirl,prev_page,next_page,types){
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
export default function auto_Fixed(){
	var domt=$(".fixed-top").outerHeight();
	$('<div style="height:'+domt+'px"></div>').insertAfter(".fixed-top");
	var domb=$(".fixed-bottom").outerHeight();
	$('<div style="height:'+domb+'px"></div>').insertBefore(".fixed-bottom");
};

// 弹窗
export default function alertbox(click_show,click_hide,obj,box_vague){//弹窗js
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
export default function Downtime(id,find){
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
export default function ShowCountDown(time){
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

export default function formatDateTime(inputTime) {  
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

// 输出
export default function log(txt){
	console.log(txt);
}

//构造符合datetime-local格式的当前日期

export default function getFormat(val){
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
export default function crilScroll(txt,obj,hei){
	var num=txt*1
	obj.append('<var>'+num+'</var>')
	setInterval(function(){
		num++
		if(num>9) num=0
		obj.append('<var>'+num+'</var>')
		var len=obj.find('var').length;
		if(len>4){
			obj.find('var').first().remove();		
		}
	},240)
}

// 去掉默认事件
export default function handler(event) {
	event.preventDefault();
}

// 返点拖拽
export default function drag(out_obj,inner_obj,that){

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
	const { playPl } ={ ...sscPlayPlList }
	// 最大赔率
	var maxFBlb=13 

	var ban=$(out_obj).find(inner_obj).outerWidth()/2
	var average=0;
	var playPlaverage=0;


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


		// 平均的值
		average=distance*maxFBlb/(width-ban);
		
		playPlaverage=distance*playPl/(width-ban);

		that.Odds.rebate=average.toFixed(1);
		that.Odds.playPl=playPl-playPlaverage*(maxFBlb/100);
		

	})

	$(out_obj).find(inner_obj).on("touchend",function(e){
		var config=that.$store.state.BuyNsidePage.NoteSetting.ssconfig
		// // 设置返点
		config.rebate=average.toFixed(1);
		var newValue=playPl-playPlaverage*(maxFBlb/100);
		// // 设置 变化的最高赔率
		config.playPl=parseFloat(newValue.toFixed(3));

		that.test();
	})
}

export default function double(txt){
	return txt<10?'0'+txt:txt
}

// 验证码
export default function draw(show_num) {
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

export default function randomColor() {//得到随机的颜色值
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + "," + g + "," + b + ")";
}