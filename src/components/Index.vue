<template>

	<div class="mobile-wrap center bj2">

		<LoginSuccess v-if="isLogin"></LoginSuccess>
		<div v-else>
			<div class="null-top"></div>
			<div class="fixed-top center">
				<div class="top">
					<router-link to="Register" class="fl"><i class="ico-reg"></i>注册</router-link>
					<h2><img src="../../static/img/9be7dc3d9b4d8d773db5571ceed06756_200x51.png" alt=""></h2>
					<router-link to="Login" class="fr"><i class="ico-login"></i>登录</router-link>
				</div>
			</div>
		</div>

		<div class="banner">
			<ul class="swiper-wrapper swiper-set">
				<li v-for="item in carouselList" class="swiper-slide">
					<a href="#" title="">
						<ImgLoadding :item="item"></ImgLoadding>
						<img :src="item.imgUrl" alt="">
					</a>
				</li>
		    </ul>
			<div class="cirl">
			</div>
		</div>

		<div class="index-notice">
			<h2><i class="ico-notice"></i>公告：</h2>
			<div class="scroll">
				<ul>
					<li v-for="item in noticeList"><router-link to="/Notice">{{ item.content }}</router-link></li>
				</ul>
			</div>
		</div>
		<div class="four-ico">
			<ul>
				<li>
					<router-link to="/Recharge">
						<img src="../../static/img/d1f4706959ed229a812251aed18e4857_99x101.png" alt="">
						<span>充值/提款</span>
					</router-link>
				</li>
				<li>
					<router-link to="/Quota">
						<img src="../../static/img/826b1d070106f0a369fbdad8360b74a4_99x101.png" alt="">
						<span>额度转换</span>
					</router-link>
				</li>
				<li>
					<router-link to="/Activity">
						<img src="../../static/img/133071d80be15db5d21371b66ebf853e_99x101.png" alt="">
						<span>优惠活动</span>
					</router-link>
				</li>
				<li>
					<router-link to="/Kefu">
						<img src="../../static/img/bb4ffa814d74317d0a59f9777ffff1b1_99x101.png" alt="">
						<span>在线客服</span>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="hot-cai">
			<div class="pub-tit"><span>热门彩种</span></div>
			<ul>
				<li>
					<router-link to="/BuyNsidePage/15">
						<i class="label"></i>
						<div class="pict">
							<img src="../../static/img/10cb893712b6a25eaf79b9db1a08cfe2_99x101.png" alt="">
						</div>
						<div class="text">
							<b>分分时时彩</b>
							<p>每1分钟一期</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/BuyNsidePage/23">
						<div class="pict">
							<img src="../../static/img/594c74878da0232a95e5ebec5a85b2b2_99x101.png" alt="">
						</div>
						<div class="text">
							<b>分分PK10</b>
							<p>每1分钟一期</p>
						</div>
					</router-link>
				</li>

				<li>
					<router-link to="/BuyNsidePage/1">
						<div class="pict">
							<img src="../../static/img/f9a26e04aa654cdd6df729dba57a6e24_99x101.png" alt="">
						</div>
						<div class="text">
							<b>重庆时时彩</b>
							<p>每10分钟一期</p>
						</div>
					</router-link>
				</li>

				<li>
					<router-link to="/BuyNsidePage/9">
						<div class="pict">
							<img src="../../static/img/44b242c1dd8c47d36b151d1bc335bf6b_99x101.png" alt="">
						</div>
						<div class="text">
							<b>北京PK10</b>
							<p>每5分钟一期</p>
						</div>
					</router-link>
				</li>

				<li>
					<router-link to="/BuyNsidePage/13">
						<div class="pict">
							<img src="../../static/img/LotteryHall/13.png" alt="">
						</div>
						<div class="text">
							<b>三分时时彩</b>
							<p>每3分钟一期</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/BuyNsidePage/14">
						<div class="pict">
							<img src="../../static/img/LotteryHall/14.png" alt="">
						</div>
						<div class="text">
							<b>幸运飞艇</b>
							<p>每5分钟一期</p>
						</div>
					</router-link>
				</li>

				<li>
					<router-link to="/BuyNsidePage/11">
						<div class="pict">
							<img src="../../static/img/LotteryHall/11.png" alt="">
						</div>
						<div class="text">
							<b>广东快乐十分</b>
							<p>每10分钟一期</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/BuyNsidePage/24">
						<div class="pict">
							<img src="../../static/img/LotteryHall/24.png" alt="">
						</div>
						<div class="text">
							<b>广东11选5</b>
							<p>每10分钟一期</p>
						</div>
					</router-link>
				</li>

				<li>
					<router-link to="/BuyNsidePage/19">
						<div class="pict">
							<img src="../../static/img/LotteryHall/19.png" alt="">
						</div>
						<div class="text">
							<b>湖北快3</b>
							<p>每10分钟一期</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/BuyNsidePage/6">
						<div class="pict">
							<img src="../../static/img/LotteryHall/6.png" alt="">
						</div>
						<div class="text">
							<b>六合彩</b>
							<p><span>2天04小时 47:36</span></p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/BuyNsidePage/7">
						<div class="pict">
							<img src="../../static/img/bd25737718e6c651bbc58136b8bd98e8_99x101.png" alt="">
						</div>
						<div class="text">
							<b>PC蛋蛋</b>
							<p>每5分钟一期</p>
						</div>
					</router-link>
				</li>
				<li>
					<router-link to="/LotteryHall">
						<div class="pict">
							<img src="../../static/img/68548e59bd980c2b18cb850eb30dfcf0_99x101.png" alt="">
						</div>
						<div class="text">
							<b>更多彩种</b>
							<p>欢乐无限</p>
						</div>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="bocai">
			<div class="pub-tit"><span>体育博弈</span></div>
			<ul>
				<li>
					<a @click="getSportUrl(1)" title="">
						<div class="pict">
							<img src="../../static/img/2d0f522818ce6230cb42cf98357af468_82x85.png" alt="">
						</div>
						<div class="text">
							<b>足球竞彩</b>
							<p>激情赛事不错过</p>
						</div>
					</a>
				</li>
				<li>
					<a @click="getSportUrl(2)" title="">
						<div class="pict">
							<img src="../../static/img/fd770a6ea5da0be5540a96679480ade2_80x79.png" alt="">
						</div>
						<div class="text">
							<b>篮球竞彩</b>
							<p>一场篮球盛宴</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
		
		<div class="qipai">
			<div class="pub-tit"><span>开元棋牌</span></div>
			<ul>
				<li>

					<a @click="getChessUrl(830,'抢庄牛牛')" title="">
						<div class="pict">
							<img src="../../static/img/a557030ce9609680ab861e1962cb7f96_109x109.png" alt="">
						</div>
						<span>抢庄牛牛</span>
					</a>
				</li>
				<li>

					<a @click="getChessUrl(720,'二八杠')" title="">
						<div class="pict">
							<img src="../../static/img/7f75088f0e0c7bf0bc2ba8ca0c7a1a75_110x110.png" alt="">
						</div>
						<span>二八杠</span>
					</a>
				</li>
				<li>

					<a @click="getChessUrl(870,'通比牛牛')" title="">
						<div class="pict">
							<img src="../../static/img/4f5209243ad2f1c59ecb9966ee4e3bf9_107x107.png" alt="">
						</div>
						<span>通比牛牛</span>
					</a>
				</li>
				<li>

					<a @click="getChessUrl(220,'炸金花')" title="">
						<div class="pict">
							<img src="../../static/img/1d9a8f5e07408ae170419d77d1ea8d56_105x106.png" alt="">
						</div>
						<span>炸金花</span>
					</a>
				</li>

				<li>

					<a @click="getChessUrl(910,'百家乐')" title="">
						<div class="pict">
							<img src="../../static/img/731d42352e8979165917fd1815e10806_180x180.png" alt="">
						</div>
						<span>百家乐</span>
					</a>
				</li>
				
				<li>

					<a @click="getChessUrl(600,'二十一点')" title="">
						<div class="pict">
							<img src="../../static/img/8c9c912b7c03af0046fad6628ee8d029_183x179.png" alt="">
						</div>
						<span>二十一点</span>
					</a>
				</li>
				<li>

					<a @click="getChessUrl(850,'三公')" title="">
						<div class="pict">
							<img src="../../static/img/31768847a73fb56f5cf1efec5a3e8471_165x165.png" alt="">
						</div>
						<span>三公</span>
					</a>
				</li>
				<li>
					<router-link to="/Chesscard">
						<div class="pict">
							<img src="../../static/img/b0c6f024310a17fe12b9349fb352ae26_180x180.png" alt="">
						</div>
						<span>+更多游戏</span>
					</router-link>
				</li>
			</ul>
		</div>
		
		<div class="zhongbang">
			<div class="pub-tit"><i class="ico-prizel"></i>最新中奖榜</div>
			<div class="updown">
				<ul>
					<li v-for="item in winningList">
						<div class="fl">
							<h2><i class="ico-prize"></i>{{ item.userName }}</h2>
							<p>{{ item.type }}</p>
						</div>
						<div class="fr">
							喜中{{ item.amount | money }}元
						</div>
					</li>
				</ul>
			</div>
		</div>
		
		<Footer acti="1"></Footer>
	
		<!-- 下载提示 -->
		<div class="down-app center hide">
			<i class="ico-close1"></i>
			<p>下载APP，随时随地，极速体验！</p>
			<a href="http://43.230.171.202:8080/mobile/app.html" title="" target="_blank">下载APP</a>
		</div>

	</div>

	<!--mobile_wrap-->

</template>


<script>
	
	export default {
		name:'Index',
		data(){
			return{
				uid:this.param('uid'),
				token:this.param('token'),

				// 轮播图
				carouselList:[],
				// 公告
				noticeList:[],			
				// 中奖榜
				winningList:[]
			}
		},
		created(){

			// 清除数据
			var number=this.$store.state.BuyNsidePage.pageConfig.number
			var sscBetList=this.$store.state.BuyNsidePage.sscBetList
			if(number)
				number.splice(0,number.length);
			if(sscBetList)
				sscBetList.splice(0,sscBetList.length);


			// 轮播图
			const {banner,noticeList,winningList}={...this.$store.state.Index}

			if(banner.length==0){
				this.banner();
			}else{
				this.carouselList=banner
				setTimeout(function(){
					downslide(".banner",".banner .cirl","","","");
				},1)
			}
			// 公告
			if(noticeList.length==0){
				this.notice();
			}else{
				this.noticeList=noticeList
				setTimeout(function(){
					$(".index-notice .scroll").kxbdMarquee({isEqual:"up"});
				},1)
			}		
			// 中奖榜
			if(winningList.length==0){
				this.winninglist();
			}else{
				this.winningList=winningList
				setTimeout(function(){
					$(".zhongbang .updown").kxbdMarquee({direction:"up",isEqual:false});
				},1)
			}
			this.$store.commit('checkOnline');

			if(JSON.stringify(this.$store.state.PersonalCenter)=='{}'){
				this.$store.commit('PersonalCenter')
			}
		},
		mounted(){
			$(".down-app .ico-close1").click(function(){
				$('.down-app').fadeOut();
			})
		},
		computed:{

			// 是否登录
			isLogin(){
				return this.$store.state.isLogin
			}
		},
		methods:{
			// 开元棋牌
			getChessUrl(KindID,title){
				var _this=this;
				var winRef = window.open("","_blank");
				this.ajax('getChessUrl',{
					uid:_this.uid,
					token:_this.token,
					clientType:3,
					KindID:KindID
				},
				data => {
					// console.log(data)
					if(data.result==-100){
						this.$router.push({"name":"Login"})
						winRef.close();
					}else if(data.result==0){
						tipsTotice(data.description)
						winRef.close();
					}else{
						function web(){
							winRef.location=data.loginUrl
						}
						setTimeout(function(){
							web();
						},100)
					}
				})
			},
			// 体育
			getSportUrl(KindID,title){
				
				var _this=this;

				var winRef = window.open("","_blank");

				this.ajax('getSportUrl',{
					uid:_this.uid,
					token:_this.token,
					clientType:3
				},
				data => {

					// console.log(data)
					if(data.result==-100){
						this.$router.push({"name":"Login"})
						winRef.close();
					}else if(data.result==0){
						tipsTotice(data.description)
						winRef.close();
					}else{
						function web(){
							winRef.location=data.loginUrl
						}
						setTimeout(function(){
							web();
						},100)
					}
							
				})
			},
			// 轮播
			banner(){
				var _this=this;
				this.ajax('Banner',{
					type:1
				},
				data => {
					_this.log('轮播');
					_this.log(data);
					_this.carouselList=data.carouselList
					if(data.carouselList){
						_this.getBase64(_this.carouselList,'imageId',()=>{
							setTimeout(function(){
								_this.$store.state.Index.banner=_this.carouselList
								downslide(".banner",".banner .cirl","","","");
							},1)
						});
					}
				})
			},
			// 公告
			notice(){
				var _this=this;
				_this.ajax('Notice',{
				},
				data => {
					_this.log('公告');
					_this.log(data.webNoticeList)
					_this.noticeList=data.webNoticeList
					// 设置store
					_this.$store.state.Index.noticeList=data.webNoticeList
					setTimeout(function(){
						$(".index-notice .scroll").kxbdMarquee({isEqual:"up"});
					},1)
				})
			},
			// 中奖榜
			winninglist(){
				var _this=this;
				_this.ajax('Winninglist',{
				},
				data => {
					_this.log('中奖榜');
					_this.log(data);
					_this.winningList=data.noticeList
					// 设置store
					_this.$store.state.Index.winningList=data.noticeList
					setTimeout(function(){
						$(".zhongbang .updown").kxbdMarquee({direction:"up",isEqual:false});
					},1)
				})
			}
		}
	}

</script>