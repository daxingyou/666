<template>

	<div class="fixed-bottom center fixed">
		<div class="fixed-input">
			<div class="clear clear-ok">
				<i class="ico-clear"></i>
				<p>清除</p>
			</div>
			<div class="box-put">
				<span>每注</span>
				<input type="number" placeholder="输入金额" v-model="setValue.money">
				<span>元</span>
			</div>
			<div class="fr-btn">
				<button @click="annotation">立即投注</button>
			</div>
		</div>
	</div>

</template>

<script>
	export default{
		name:'FixedInput',
		computed:{
			setValue(){
				return this.$store.state.BuyNsidePage.pageConfig
			}
		},
		methods:{
			fun1(con,playPlId){

				var conPage=this.$store.state.BuyNsidePage
				var str=''
				if(playPlId==7938){
					str=conPage.two_title+'之二字不同-'
				}
				if(playPlId==7935){
					log(conPage)
					con=con.replace('-','')
					// str=conPage.two_title+'之二字相同-'
				}
				if(playPlId==7936){
					log(conPage)
					con=con.replace('-','')
					// str=conPage.two_title+'之二字相同-'
				}


				if(playPlId==8108){
					con=con.replace('-','');
				}
				if(playPlId==8138){
					con=con.replace('-','');
				}
				if(playPlId==8140){
					con=con.replace('-','');
				}
				if(playPlId==8142){
					con=con.replace('-','');
				}
				if(playPlId==8144){
					con=con.replace('-','');
				}
				if(playPlId==8146){
					con=con.replace('-','');
				}
				if(playPlId==8148){
					con=con.replace('-','');
				}
				if(playPlId==8150){
					con=con.replace('-','');
				}
				if(playPlId==8152){
					con=con.replace('-','');
				}
				if(playPlId==8154){
					con=con.replace('-','');
				}
				if(playPlId==8156){
					con=con.replace('-','');
				}
				if(playPlId==8158){
					con=con.replace('-','');
				}
				if(playPlId==8168){
					con=con.replace('-','');
				}
				if(playPlId==8170){
					con=con.replace('-','');
				}
				if(playPlId==8172){
					con=con.replace('-','');
				}
				if(playPlId==8174){
					con=con.replace('-','');
				}
				if(playPlId==7941){
					con=con.replace('-','')
				}
				if(playPlId==7939){
					con=con.replace('-','')
				}
				if(playPlId==8014){
					con=con.replace('-','')
				}
				if(playPlId==8020){
					con=con.replace('-','')
				}
				if(playPlId==8026){
					con=con.replace('-','')
				}
				if(playPlId==8032){
					con=con.replace('-','')
				}
				if(playPlId==8038){
					con=con.replace('-','')
				}
				if(playPlId==8044){
					con=con.replace('-','')
				}
				if(playPlId==8050){
					con=con.replace('-','')
				}
				if(playPlId==8056){
					con=con.replace('-','')
				}
				if(playPlId==8062){
					con=con.replace('-','')
				}
				if(playPlId==8068){
					con=con.replace('-','')
				}
				if(playPlId==8086){
					con=con.replace('-','')
				}
				if(playPlId==8092){
					con=con.replace('-','')
				}
				if(playPlId==8098){
					con=con.replace('-','')
				}
				if(playPlId==8104){
					con=con.replace('-','')
				}
				if(playPlId==8015){
					con=con.replace('-','')
				}
				if(playPlId==8021){
					con=con.replace('-','')
				}
				if(playPlId==8027){
					con=con.replace('-','')
				}
				if(playPlId==8033){
					con=con.replace('-','')
				}
				if(playPlId==8039){
					con=con.replace('-','')
				}
				if(playPlId==8045){
					con=con.replace('-','')
				}
				if(playPlId==8051){
					con=con.replace('-','')
				}
				if(playPlId==8057){
					con=con.replace('-','')
				}
				if(playPlId==8063){
					con=con.replace('-','')
				}
				if(playPlId==8069){
					con=con.replace('-','')
				}
				if(playPlId==8087){
					con=con.replace('-','')
				}
				if(playPlId==8093){
					con=con.replace('-','')
				}
				if(playPlId==8099){
					con=con.replace('-','')
				}
				if(playPlId==8105){
					con=con.replace('-','')
				}
				if(playPlId==8016){
					con=con.replace('-','')
				}
				if(playPlId==8022){
					con=con.replace('-','')
				}
				if(playPlId==8028){
					con=con.replace('-','')
				}
				if(playPlId==8034){
					con=con.replace('-','')
				}
				if(playPlId==8040){
					con=con.replace('-','')
				}
				if(playPlId==8046){
					con=con.replace('-','')
				}
				if(playPlId==8052){
					con=con.replace('-','')
				}
				if(playPlId==8058){
					con=con.replace('-','')
				}
				if(playPlId==8064){
					con=con.replace('-','')
				}
				if(playPlId==8070){
					con=con.replace('-','')
				}
				if(playPlId==8088){
					con=con.replace('-','')
				}
				if(playPlId==8094){
					con=con.replace('-','')
				}
				if(playPlId==8100){
					con=con.replace('-','')
				}
				if(playPlId==8106){
					con=con.replace('-','')
				}
				if(playPlId==8593){
					str='五行-'
				}
				if(playPlId==8594){
					str='五行-'
				}
				if(playPlId==8595){
					str='五行-'
				}
				if(playPlId==8596){
					str='五行-'
				}
				if(playPlId==8597){
					str='五行-'
				}
				if(playPlId==8590){
					str='奇偶和盘-'
				}
				if(playPlId==8591){
					str='奇偶和盘-'
				}
				if(playPlId==8592){
					str='奇偶和盘-'
				}
				if(playPlId==8587){
					str='上中下盘-'
				}
				if(playPlId==8588){
					str='上中下盘-'
				}
				if(playPlId==8582){
					str='和值-'
				}
				if(playPlId==8583){
					str='和值-'
				}
				if(playPlId==8584){
					str='和值-'
				}
				if(playPlId==8585){
					str='和值-'
				}
				if(playPlId==8586){
					str='和值-'
				}
				if(playPlId==8817){
					str='总和、龙虎-'
				}
				if(playPlId==8818){
					str='总和、龙虎-'
				}
				if(playPlId==8819){
					str='总和、龙虎-'
				}
				if(playPlId==8820){
					str='总和、龙虎-'
				}
				if(playPlId==8821){
					str='总和、龙虎-'
				}
				if(playPlId==8822){
					str='总和、龙虎-'
				}
				if(playPlId==8823){
					str='总和、龙虎-'
				}
				if(playPlId==8824){
					str='总和、龙虎-'
				}
				if(playPlId==8825){
					str='第一球-'
				}
				if(playPlId==8826){
					str='第一球-'
				}
				if(playPlId==8827){
					str='第一球-'
				}
				if(playPlId==8828){
					str='第一球-'
				}
				if(playPlId==8829){
					str='第一球-'
				}
				if(playPlId==8830){
					str='第一球-'
				}
				if(playPlId==8831){
					str='第一球-'
				}
				if(playPlId==8832){
					str='第一球-'
				}
				if(playPlId==8833){
					str='第二球-'
				}
				if(playPlId==8834){
					str='第二球-'
				}
				if(playPlId==8835){
					str='第二球-'
				}
				if(playPlId==8836){
					str='第二球-'
				}
				if(playPlId==8837){
					str='第二球-'
				}
				if(playPlId==8838){
					str='第二球-'
				}
				if(playPlId==8839){
					str='第二球-'
				}
				if(playPlId==8840){
					str='第二球-'
				}
				if(playPlId==8841){
					str='第三球-'
				}
				if(playPlId==8842){
					str='第三球-'
				}
				if(playPlId==8843){
					str='第三球-'
				}
				if(playPlId==8844){
					str='第三球-'
				}
				if(playPlId==8845){
					str='第三球-'
				}
				if(playPlId==8846){
					str='第三球-'
				}
				if(playPlId==8847){
					str='第三球-'
				}
				if(playPlId==8848){
					str='第三球-'
				}
				if(playPlId==8849){
					str='第四球-'
				}
				if(playPlId==8850){
					str='第四球-'
				}
				if(playPlId==8851){
					str='第四球-'
				}
				if(playPlId==8852){
					str='第四球-'
				}
				if(playPlId==8853){
					str='第四球-'
				}
				if(playPlId==8854){
					str='第四球-'
				}
				if(playPlId==8855){
					str='第四球-'
				}
				if(playPlId==8856){
					str='第四球-'
				}
				if(playPlId==8857){
					str='第五球-'
				}
				if(playPlId==8858){
					str='第五球-'
				}
				if(playPlId==8859){
					str='第五球-'
				}
				if(playPlId==8860){
					str='第五球-'
				}
				if(playPlId==8861){
					str='第五球-'
				}
				if(playPlId==8862){
					str='第五球-'
				}
				if(playPlId==8863){
					str='第五球-'
				}
				if(playPlId==8864){
					str='第五球-'
				}
				if(playPlId==8865){
					str='第六球-'
				}
				if(playPlId==8866){
					str='第六球-'
				}
				if(playPlId==8867){
					str='第六球-'
				}
				if(playPlId==8868){
					str='第六球-'
				}
				if(playPlId==8869){
					str='第六球-'
				}
				if(playPlId==8870){
					str='第六球-'
				}
				if(playPlId==8871){
					str='第六球-'
				}
				if(playPlId==8872){
					str='第六球-'
				}
				if(playPlId==8873){
					str='第七球-'
				}
				if(playPlId==8874){
					str='第七球-'
				}
				if(playPlId==8875){
					str='第七球-'
				}
				if(playPlId==8876){
					str='第七球-'
				}
				if(playPlId==8877){
					str='第七球-'
				}
				if(playPlId==8878){
					str='第七球-'
				}
				if(playPlId==8879){
					str='第七球-'
				}
				if(playPlId==8880){
					str='第七球-'
				}
				if(playPlId==8881){
					str='第八球-'
				}
				if(playPlId==8882){
					str='第八球-'
				}
				if(playPlId==8883){
					str='第八球-'
				}
				if(playPlId==8884){
					str='第八球-'
				}
				if(playPlId==8885){
					str='第八球-'
				}
				if(playPlId==8886){
					str='第八球-'
				}
				if(playPlId==8887){
					str='第八球-'
				}
				if(playPlId==8888){
					str='第八球-'
				}
				console.log(con,playPlId)
				return str+con;
			},
			// 储存列表
			sscBetList(){
				var _this=this

				// 获取配置信息
				var conPage=_this.$store.state.BuyNsidePage

				var content='';

				var arr=['半波','一肖','尾','特肖','混合','和值特码','特码包三','选5','选3','选4','选2','选1','其他','和值','通选','三同号单选','三不同','二同号复选','二同号单选','二不同号','猜必出','猜必不出','双面','组选三','组选六','跨度','龙虎']

				// 筛选标题
				for (let index = 0; index < arr.length; index++) {
					const element = arr[index];
					if(element!=conPage.two_title){
						content=conPage.two_title+'-'
					}else{
						content=''
						break;
					}
					
				}

				// 循环获取
				for(var i=0;i<_this.setValue.notes;i++){

					var obj={

						// 彩种编码
						playGroupId:conPage.playGroupId,
						// 期号
						number:conPage.number,
						// 玩法编码
						playId:conPage.NoteSetting.playId,
						// 赔率编码
						playPlId:_this.setValue.number[i].playPlId,
						// 注数
						zhushu:1,
						// 下注内容
						content:_this.fun1(content+_this.setValue.number[i].content,_this.setValue.number[i].playPlId),
						// 单注金额
						perMoney:_this.setValue.money.toString(),
						// 玩法赔率
						playPl:_this.setValue.number[i].playPl,
						// 每单总金额
						totalMoney:_this.setValue.money,
						// 玩法名称(type)
						newName:conPage.one_title,
					}

					// 添加投注列表
					_this.$store.commit('addListBettingSlips',obj)
				}
				
			},
			annotation(){
				var _this=this
				if(_this.setValue.notes>0){
					_this.sscBetList();
					// 跳转
					_this.$router.push({'name':'BettingSlips'})
				}else{
					alert('还没有选中');
				}
			}
		}
	}
</script>
