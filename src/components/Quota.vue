<template>
	<div class="wrap">

		<div class="mobile-wrap center bj2">
			
			<Header title="额度转换"></Header>

			<div class="balance">
				<h4>钱包余额 : <var>{{ userBalance }}</var> 元</h4>
				<div class="fr">
					<var>游戏平台余额<i class="ico-down"></i></var>
					<div class="down-sub center">
						<div class="wrap">
							<strong>
								<span class="fl">我的钱包</span>
								<span class="fr">
									<b>{{ userBalance }}</b>
									<em>元</em>
									<i @click="getAllAmount('userBalance',$event)" class="ico-refl"></i>
								</span>
							</strong>
							<ul>
								<li>
									<b>三昇体育</b>
									<p>
										<span><i class="color">{{ sportAmount }}</i>元</span>
										<i  @click="getAllAmount('sportAmount',$event)" class="ico-ref"></i>
									</p>
								</li>
								<li>
									<b>三昇体育</b>
									<p>
										<span><i class="color">{{ chessAmount }}</i>元</span>
										<i @click="getAllAmount('chessAmount',$event)" class="ico-ref"></i>
									</p>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			<div class="change-into auto-center">
				<ul>
					<!-- <li v-for="item in itemMenu" :class="item.class" v-if="item.isadd">
						<div class="pict">
							<i>
								<img :src="'../../static/img/'+item.pic" alt="">
							</i>
						</div>
						<b>{{ item.name }}</b>
						<p>余额：<var>{{ item.name }}</var></p>
						<a class="btn" @click="test(item.event,'userBalance',userBalance)">一键转入</a>
					</li> -->

					<li class="one" v-if="itemMenu[0].isadd">
						<div class="pict">
							<i>
								<img style="width:.68rem;" src="../../static/img/cca2e9ad19f76bfd62d1e7407836aa30_68x35.png" alt="">
							</i>
						</div>
						<b>三昇体育</b>
						<p>余额：<var>{{ sportAmount }}</var></p>
						<a class="btn" title="三昇体育" @click="changeInto('sportChangeAmount','userBalance',userBalance)">一键转入</a>
					</li>
					<li class="two" v-if="itemMenu[1].isadd">
						<div class="pict">
							<i>
								<img style="width:1.05rem;" src="../../static/img/e53745e2333d420579a2040b2974fe14_105x46.png" alt="">
							</i>
						</div>
						<b>开元棋牌</b>
						<p>余额：<var>{{ chessAmount }}</var></p>
						<a class="btn" title="开元棋牌" @click="changeInto('chessChangeAmount','userBalance',userBalance)">一键转入</a>
					</li>
					<li>
						<i class="ico-add"></i>
						<strong>自定义快捷选项</strong>
					</li>
				</ul>
			</div>

			<div class="turn-money">
				<div class="box fl">
					<b>转出钱包</b>
					<div class="select-type">
						<p>我的钱包</p>
						<span><i>{{ userBalance }}</i>元</span>
					</div>
				</div>
				<i class="ico-turn"></i>
				<div class="box fr">
					<b>转入钱包</b>
					<div class="select-type">
						<p><var>选择钱包类型</var><i class="ico-more"></i></p>
						<span>
							<em>{{ sportAmount }}</em>
							<em>{{ chessAmount }}</em>
						</span>
					</div>
				</div>
			</div>


			<div class="money-num">
				<ul class="box-space-between">
					<li>
						<span @click="setMoney(userBalance,1)">全部</span>
					</li>
					<li>
						<span @click="setMoney(100)">100</span>
					</li>
					<li>
						<span @click="setMoney(300)">300</span>
					</li>
					<li>
						<span @click="setMoney(500)">500</span>
					</li>
					<li>
						<span @click="setMoney(1000)">1000</span>
					</li>
				</ul>

				<div class="clear"></div>

				<div class="amount-money">
					<b>转入金额</b>
					<div class="fl-wrap">
						<input type="number" v-model="Money" placeholder="请选择或是输入您的金额" @keydown="clear">
					</div>
				</div>

			</div>

			<div class="btn-wrap">
				<a class="a1" title="确定转换" @click="huang">确定转换</a>
				<a class="a2" title="一键回收钱包" @click="huishou">一键回收钱包</a>
			</div>

			<Footer acti="5"></Footer>
			
			<Msg :message="msg" v-show="isShow"></Msg>

			<!-- 类型弹窗 -->
			<div class="alert-select-type center">
				<div class="layout">
					<ul>
						<li id="1" :money="sportAmount | money">三昇体育</li>
						<li id="2" :money="chessAmount | money">开元棋牌</li>
					</ul>
					<button type="button">取消</button>
				</div>
			</div>
		</div>

		<!--mobile_wrap-->

		<div class="type-alert">
			<div class="layout">
				<h2><span>自定义快捷选项</span> <i class="ico-close rogate"></i></h2>
				<div class="one-box box">
					<ul>
						<li v-for="item in itemMenu" v-if="item.isadd">
							<span><var>{{ item.name }}</var><i class="ico-del" @click="jianItem(item.id)"></i></span>
						</li>
					</ul>
				</div>
				<div class="two-box box">
					<ul>
						<li v-for="item in itemMenu" v-if="!item.isadd">
							<span><var>{{ item.name }}</var><i class="ico-add1" @click="addItem(item.id)"></i></span>
						</li>
					</ul>
				</div>
			</div>
		
		</div>

	</div>

</template>

<script>
	export default {
		name:'Quota',
		data(){
			return{
				msg:'',
				isShow:false,

				uid:this.param('uid'),
				token:this.param('token'),
				Money:'',
				// 余额
				userBalance:'加载中...',
				// 三昇体育
				sportAmount:'加载中...',
				// 开元棋牌
				chessAmount:'加载中...',

				Moneydata:{},

				change:false,

				itemMenu:[
					{
						id:0,
						pic:'cca2e9ad19f76bfd62d1e7407836aa30_68x35.png',
						name:'三昇体育',
						class:"one",
						isadd:true
					},
					{
						id:1,
						pic:'e53745e2333d420579a2040b2974fe14_105x46.png',
						name:'开元棋牌',
						class:"two",
						event:'chessChangeAmount',
						isadd:true
					}
				]


			}
		},
		created(){
			// 移除
			// localStorage.removeItem('itemMenu');

			this.getMoney(1);
			var data=JSON.parse(localStorage.getItem('itemMenu'))
			if(data){
				this.itemMenu=data
			}
		},
		methods:{
			test(v){
				alert(v)
			},
			getMoney(v,calback){
				var _this=this;
				_this.ajax('getAllAmount',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this);
					_this.Moneydata=data
					if(v){
						_this.userBalance=data.userBalance
						_this.sportAmount=data.sportAmount
						_this.chessAmount=data.chessAmount
						$(".turn-money .box.fr span i").text('0.00');
						unloadding();
					}else{
						calback();
					}
				})
			},
			setMoney(num,id){
				if(id){
					this.Money=num
				}else{
					this.Money=this.Money*1+num
				}
			},
			getAllAmount(val,ev){
				var _this=this;
				_this.getMoney(0,()=>{
					_this[val]=_this.Moneydata[val]
					if(ev!=undefined)
						ev.target.classList.remove("acti")
				});
			},
			// 回收钱包
			huishou(){
				loadding('正在回收中...')
				var _this=this;
				_this.ajax('allRecovery',{
					uid:_this.uid,
					token:_this.token
				},
				data=>{
					_this.alert(data,_this);
					_this.getMoney(1);
				})
			},
			changeInto(name,user,num,id){

				var _this=this;

				var arr=['sport','chess'];

				if(id){
					user=arr[parseInt(id)-1]+user
					console.log(user)
				}
				if(num>0){

					_this.ajax(name,{
						uid:_this.uid,
						token:_this.token,
						[user]:num
					},
					data=>{
						_this.alert(data,_this)
						if(data.result==1){
							_this.getMoney(1);
							loadding('正在转换中...')
						}
					})
				}else{
					_this.alert({result:1},_this,'金额不能少于1');
				}

			},
			huang(){
				var _this=this;
				// 出账
				var arr=['sportChangeAmount','chessChangeAmount'];
				// 进账
				var arr1=['sportUnChangeAmount','chessUnChangeAmount'];

				var id=$(".turn-money .box.fr").attr('id');
				if(id){
					if(_this.change){
						_this.changeInto(arr1[id-1],'Amount',_this.Money,id)
					}else{
						_this.changeInto(arr[id-1],'userBalance',_this.Money)
					}
				}else{
					_this.alert({result:1},_this,'请选择类型');
				}
			},
			clear(){
				$(".money-num ul li").removeClass('acti');
			},
			addItem(id){
				this.$set(this.itemMenu[id],"isadd",true)
			},
			jianItem(id){
				var num=0;
				this.itemMenu.forEach(obj=>{
					if(obj.isadd){
						num++
					}
				})
				if(num>1){
					this.$set(this.itemMenu[id],"isadd",false)
				}else{
					alert('至少保留一项!')
				}
			}
		},
		mounted(){

			var _this=this;

			loadding('加载中...');

			$('.ico-refl,.ico-ref').click(function(){
				$(this).addClass('acti');
			})

			$(".balance .fr var").click(function(){
				$(".down-sub").fadeToggle();
				$(this).toggleClass('roga')
			})

			$(".alert-select-type .layout button").click(function(){
				var hei=$(".alert-select-type .layout").height();
				$(".alert-select-type .layout").animate({"bottom":-hei+'px'},300,function(){
					$(this).parents('.alert-select-type').fadeOut();
				})
			})

			$(".turn-money .fr .select-type").click(function(){
				$(".alert-select-type").fadeIn().find('.layout').animate({"bottom":0},300);
			})

			$(".alert-select-type .layout ul li").click(function(){
				var dex=$(this).index();
				var money=$(this).attr('money');
				var id=$(this).attr('id');
				var hei=$(".alert-select-type .layout").height();
				$(".alert-select-type .layout").animate({"bottom":-hei+'px'},300,function(){
					$(this).parents('.alert-select-type').fadeOut();
				})
				$(".turn-money .box.fr").attr('id',id);
				$(".turn-money .box.fr p var").text($(this).text())
				$(".turn-money .box.fr span").css('opacity','1').find('em').eq(dex).css("display","block").siblings().css("display","none");

			})
			$(".turn-money .ico-turn").click(function(){
				
				if(_this.change){
					_this.change=false
					$(".turn-money").removeClass('chang');
				}else{
					_this.change=true
					$(".turn-money").addClass('chang');
				}
			})
			click_addname(".money-num ul li","acti");
			alertbox(".change-into ul li:last-child",".type-alert .layout h2 i",".type-alert",".mobile-wrap");

			$(".type-alert .layout h2 i").click(function(){

				localStorage.setItem('itemMenu',JSON.stringify(_this.itemMenu));
				
			})
			// $(".type-alert .layout .one-box ul li span i").click(function(){
			// 	var text=$(this).parents('span').find('var').text();
			// 	$(this).parents('li').remove();

			// 	var html='<li><span><var>'+text+'</var><i class="ico-add1"></i></span></li>'

			// 	$(".type-alert .layout .two-box ul").append(html)
			// })
		}
	}
</script>
