<template>
	<div class="mobile-wrap center bj2">
		<Header title="棋牌大厅" assistant="1"></Header>
		<div class="qipai">
			<ul>
				<li>
					<a @click="getChessUrl(620,'德州扑克')" title="">
						<div class="pict">
							<img src="../../static/img/641b853218e9c48459e55d17eb5e85e4_109x109.png" alt="">
						</div>
						<span>德州扑克</span>
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
					<a @click="getChessUrl(830,'抢庄牛牛')" title="">
						<div class="pict">
							<img src="../../static/img/a557030ce9609680ab861e1962cb7f96_109x109.png" alt="">
						</div>
						<span>抢庄牛牛</span>
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
					<a @click="getChessUrl(610,'斗地主')" title="">
						<div class="pict">
							<img src="../../static/img/efc89d1d005cc0cf9ac7e1c1131b3592_159x159.png" alt="">
						</div>
						<span>斗地主</span>
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
					<a @click="getChessUrl(230,'极速炸金花')" title="">
						<div class="pict">
							<img src="../../static/img/7449d6e72de91bae38b91202835cd71f_105x106.png" alt="">
						</div>
						<span>极速炸金花</span>
					</a>
				</li>
				<li>
					<a @click="getChessUrl(380,'幸运五张')" title="">
						<div class="pict">
							<img src="../../static/img/98addbbb5a3af0da4d6716718055140f_110x110.png" alt="">
						</div>
						<span>幸运五张</span>
					</a>
				</li>
				<li>
					<a @click="getChessUrl(880,'欢乐红包')" title="">
						<div class="pict">
							<img src="../../static/img/e2e8a959acb90c3881d49e5200b179fb_174x173.png" alt="">
						</div>
						<span>欢乐红包</span>
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
					<a @click="getChessUrl(630,'十三水')" title="">
						<div class="pict">
							<img src="../../static/img/879d8f3b99242b3e828bf1a521a12d4d_155x156.png" alt="">
						</div>
						<span>十三水</span>
					</a>
				</li>
				<li>
					<a @click="getChessUrl(860,'三公')" title="">
						<div class="pict">
							<img src="../../static/img/31768847a73fb56f5cf1efec5a3e8471_165x165.png" alt="">
						</div>
						<span>三公</span>
					</a>
				</li>
				<li>
					<a @click="getChessUrl(730,'抢庄牌九')" title="">
						<div class="pict">
							<img src="../../static/img/8e443bbe2cdc0c66c284817adcd53346_152x153.png" alt="">
						</div>
						<span>抢庄牌九</span>
					</a>
				</li>
				
				<li>
					<a @click="getChessUrl(900,'押庄龙虎')" title="">
						<div class="pict">
							<img src="../../static/img/5b68fbe0a56472b1301ba675bc78dbe1_170x168.png" alt="">
						</div>
						<span>押庄龙虎</span>
					</a>
				</li>
				<li>
					<a @click="getChessUrl(390,'射龙门')" title="">
						<div class="pict">
							<img src="../../static/img/4d16301fc2df533dd8a11666859f688b_180x180.png" alt="">
						</div>
						<span>射龙门</span>
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
					<a @click="tishi" title="">
						<div class="pict">
							<img src="../../static/img/90af9b53bd59d3719fb9f2b730816ebc_164x155.png" alt="">
						</div>
						<span>敬请期待</span>
					</a>
				</li>
			</ul>
		</div>
		<Footer acti="2"></Footer>
		<Msg :message="msg" v-show="isShow"></Msg>
	</div>
</template>

<script>
	export default{
		name:'Chesscard',
		data(){
			return{
				msg:'',
				isShow:false,

				uid:this.param('uid'),
				token:this.param('token'),
			}
		},
		mounted(){

		},
		methods:{
			// 开元棋牌
			getChessUrl(KindID,title){
				var _this=this;
				 
				this.ajax('getChessUrl',{
					uid:_this.uid,
					token:_this.token,
					clientType:3,
					KindID:KindID
				},
				data => {
					console.log(111111111111);
					console.log(data);
					
					if(data.result==-100){
						this.$router.push({"name":"Login"})
					}else if(data.result==0){
						// var winRef = window.open("","_blank");
						tipsTotice(data.description)
						// winRef.close();
					}else{
						function web(){
							var winRef = window.open("","_blank");
							winRef.location=data.loginUrl
						}
						setTimeout(function(){
							web();
						},100)
					}
				})
			},
			tishi(){
				var _this=this
				var msg={
					result:105,
					description:'敬请期待'
				}
				_this.alert(msg,_this);
			}
		}
	}
</script>