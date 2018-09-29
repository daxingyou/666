<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 机选号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择2个号码 </var>
				<p>
					<span class="one">机选一注</span>
				</p>
			</h3>
		</div>

		<!-- 选择号码 -->
		
		<div class="main">
			<div class="left">
				<span class="code">选码</span>
				<span class="odds">赔率</span>
			</div>
			<div class="right">
				<ul>
					<li><span>01</span><var>70</var></li>
					<li><span>02</span><var>70</var></li>
					<li><span>03</span><var>70</var></li>
					<li><span>04</span><var>70</var></li>
					<li><span>05</span><var>70</var></li>
					<li><span>06</span><var>70</var></li>
					<li><span>07</span><var>70</var></li>
					<li><span>08</span><var>70</var></li>
					<li><span>09</span><var>70</var></li>
					<li><span>10</span><var>70</var></li>
					<li><span>11</span><var>70</var></li>
					<li><span>12</span><var>70</var></li>
					<li><span>13</span><var>70</var></li>
					<li><span>14</span><var>70</var></li>
					<li><span>15</span><var>70</var></li>
					<li><span>16</span><var>70</var></li>
					<li><span>17</span><var>70</var></li>
					<li><span>18</span><var>70</var></li>
					<li><span>19</span><var>70</var></li>
					<li><span>20</span><var>70</var></li>
					<li><span>21</span><var>70</var></li>
					<li><span>22</span><var>70</var></li>
					<li><span>23</span><var>70</var></li>
					<li><span>24</span><var>70</var></li>
					<li><span>25</span><var>70</var></li>
					<li><span>26</span><var>70</var></li>
					<li><span>27</span><var>70</var></li>
					<li><span>28</span><var>70</var></li>
					<li><span>29</span><var>70</var></li>
					<li><span>30</span><var>70</var></li>
					<li><span>31</span><var>70</var></li>
					<li><span>32</span><var>70</var></li>
					<li><span>33</span><var>70</var></li>
					<li><span>34</span><var>70</var></li>
					<li><span>35</span><var>70</var></li>
					<li><span>36</span><var>70</var></li>
					<li><span>37</span><var>70</var></li>
					<li><span>38</span><var>70</var></li>
					<li><span>39</span><var>70</var></li>
					<li><span>40</span><var>70</var></li>
					<li><span>41</span><var>70</var></li>
					<li><span>42</span><var>70</var></li>
					<li><span>43</span><var>70</var></li>
					<li><span>44</span><var>70</var></li>
					<li><span>45</span><var>70</var></li>
					<li><span>46</span><var>70</var></li>
					<li><span>47</span><var>70</var></li>
					<li><span>48</span><var>70</var></li>
					<li><span>49</span><var>70</var></li>
				</ul>
			</div>
		</div>

		<!-- 投注金额 -->
		<FixedInput/>

	</div>
	
	
</template>

<script>
	export default{
		name:'Play418',
		data(){
			return{
				setValue:{
					// 每注金额
					money:2,
					// 总注数
					notes:0,
					// 号码
					number:[]
				},

				sscPlayPlGroupList:[]

			}
		},
		created(){

		},
		computed:{
			pageData(){
				const { two_title } = { ...this.$store.state.BuyNsidePage}
				var arr=this.sscPlayPlGroupList.filter( obj =>{
					if(obj.name==two_title){
						return obj
					}
				});
				if(arr[0])
					return arr[0].sscPlayPlList.sort(compare('playPlId'))
				else{
					return []
				}
			},
			Getplay(){
				const { two_title } = { ...this.$store.state.BuyNsidePage}
				var filter = this.sscPlayPlGroupList.filter(obj=>{
					if(obj.name==two_title){
						return obj
					}
				})
				if(filter)
					return filter[0].sscPlayPlList
			}
		},
		created(){
			// 存储方法
			this.setPlay();
			
		},
		activated(){
			const { playId } = { ...this.$store.state.BuyNsidePage.NoteSetting}
			this.getSscPlayPl2(playId)
		},
		methods:{

			//获取赔率值和赔率
			getSscPlayPl2(playId){
				var _this=this;
				_this.ajax("getSscPlayPl2",{
					playId:playId
				},
				data=>{
					_this.alert(data,_this)
					_this.sscPlayPlGroupList=data.sscPlayPlGroupList
					_this.$store.state.sscPlayPlGroupList=data.sscPlayPlGroupList
					// 输出
					_this.log(this.Getplay)
				})
			},
			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			},
			// 添加数据
			CallData(str,num){
				var _this=this
				console.log(str)
				var zhu={};
				zhu.playPl=_this.Getplay[0].playPl // 赔率
				zhu.playPlId=_this.Getplay[0].playPlId // 赔率编码
				zhu.content=str // 号码
				_this.setValue.number.push(zhu);
			},
			
		},
		mounted(){
			var _this=this

			_this.$nextTick(function(){

				// 主结构
				var $oLi=$(".main .right ul");
				// 总个数
				var oLilen=null;

				// 统计函数
				function count(obj){

					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);
					
					var arr=[];

					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							arr.push($(this).find('span').text())
						}
					})

					console.log(arr)
				
					const { two_title } = { ..._this.$store.state.BuyNsidePage}

					// 3个
					for(var i=0;i<arr.length;i++){
						for(var j=i;j<arr.length;j++){
							if(j!=i){
								_this.CallData(arr[i]+','+arr[j])
							}
						}
					}

					// 注数
					_this.setValue.notes=_this.setValue.number.length

					// 存储方法
					_this.setPlay();
					
				}

				// 最低选中个数
				var text=$(".machine-select h3 var").text();
				var number=parseInt(text.match(/\d/))


				// 计算个数
				function num(){
					oLilen=$oLi.find('li').length
				}

				// 单选
				$oLi.on("click","li",function(){
					$(this).toggleClass('color');
					// 调用统计
					count();
				})
			
				// 机选一注
				$(".one").click(function(){
					num();
					var arr=rand_one_zhu(oLilen,number)
					$oLi.find('li').removeClass('color');
					arr.map( obj =>{
						$oLi.find('li').eq(obj-1).addClass('color')
					})
					// 调用统计
					count();
				})

				// 清除
				$(".clear").click(function(){
					$oLi.find('li').removeClass('color')
					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);
					// 调用统计
					count();
				});

			})

		}
	}
</script>

