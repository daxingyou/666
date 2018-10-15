<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 机选号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择8个号码</var>
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
					<li><span>1</span><var>3.72</var></li>
					<li><span>2</span><var>3.72</var></li>
					<li><span>3</span><var>3.72</var></li>
					<li><span>4</span><var>3.72</var></li>
					<li><span>5</span><var>3.72</var></li>
					<li><span>6</span><var>3.72</var></li>
					<li><span>7</span><var>3.72</var></li>
					<li><span>8</span><var>3.72</var></li>
					<li><span>9</span><var>3.72</var></li>
					<li><span>10</span><var>3.72</var></li>
					<li><span>11</span><var>3.72</var></li>
					<li><span>12</span><var>3.72</var></li>
					<li><span>13</span><var>3.72</var></li>
					<li><span>14</span><var>3.72</var></li>
					<li><span>15</span><var>3.72</var></li>
					<li><span>16</span><var>3.72</var></li>
					<li><span>17</span><var>3.72</var></li>
					<li><span>18</span><var>3.72</var></li>
					<li><span>19</span><var>3.72</var></li>
					<li><span>20</span><var>3.72</var></li>
					<li><span>21</span><var>3.72</var></li>
					<li><span>22</span><var>3.72</var></li>
					<li><span>23</span><var>3.72</var></li>
					<li><span>24</span><var>3.72</var></li>
					<li><span>25</span><var>3.72</var></li>
					<li><span>26</span><var>3.72</var></li>
					<li><span>27</span><var>3.72</var></li>
					<li><span>28</span><var>3.72</var></li>
					<li><span>29</span><var>3.72</var></li>
					<li><span>30</span><var>3.72</var></li>
					<li><span>31</span><var>3.72</var></li>
					<li><span>32</span><var>3.72</var></li>
					<li><span>33</span><var>3.72</var></li>
					<li><span>34</span><var>3.72</var></li>
					<li><span>35</span><var>3.72</var></li>
					<li><span>36</span><var>3.72</var></li>
					<li><span>37</span><var>3.72</var></li>
					<li><span>38</span><var>3.72</var></li>
					<li><span>39</span><var>3.72</var></li>
					<li><span>40</span><var>3.72</var></li>
					<li><span>41</span><var>3.72</var></li>
					<li><span>42</span><var>3.72</var></li>
					<li><span>43</span><var>3.72</var></li>
					<li><span>44</span><var>3.72</var></li>
					<li><span>45</span><var>3.72</var></li>
					<li><span>46</span><var>3.72</var></li>
					<li><span>47</span><var>3.72</var></li>
					<li><span>48</span><var>3.72</var></li>
					<li><span>49</span><var>3.72</var></li>
				</ul>
			</div>
		</div>


		<!-- 投注金额 -->
		<FixedInput />

	</div>
	
	
</template>

<script>
	export default{
		name:'Play452',
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
		activated(){
			// 存储方法
			this.setPlay();
		},
		computed:{
			getPlay(){

				// 获取 指定 赔率
				// name:'5个投注号码'
				// playPl:7.2
				// playPlId:8181

				var arr=this.$store.state.sscPlayPlGroupList[3]
				return arr.sscPlayPlList[0]
			}
		},
		methods:{
			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			},
			// 添加数据
			addZhu(str){
				var _this=this
				console.log(str)
				var zhu={};			
				zhu.playPl=_this.getPlay.playPl // 赔率值
				zhu.playPlId=_this.getPlay.playPlId // 赔率编码
				zhu.content=str // 号码				
				_this.setValue.number.push(zhu);
			}
		},
		mounted(){
			var _this=this

			_this.$nextTick(function(){

				// 主结构
				var $oLi=$(".main .right ul");
				// 总个数
				var oLilen=null;

				// 选中的个数
				var count_num=0;

				// 统计函数
				function count(obj){

					// 先清除所有
					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);				
					var str='';
					$($oLi).find('li').each(function(index){

						if($(this).hasClass('color')){
							count_num++;
							if(count_num==1){
								str+=$(this).find('span').text()
							}else{
								str+=','+$(this).find('span').text()
							}
							
						}
					})
					_this.addZhu(str)
					// 注数
					_this.setValue.notes=_this.setValue.number.length

					// 存储方法
					_this.setPlay();
					
				}

				// 计算个数
				function num(){
					oLilen=$oLi.find('li').length
				}

				var text=$(".machine-select h3 var").text();
				var number=parseInt(text.match(/\d/))			

				// 单选
				$oLi.on("click","li",function(){
					
					if(count_num<number){
						$(this).toggleClass('color');
						// 调用统计
						count();
					}else{
						alert('不能超出'+number+'个号码')
					}
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

				// 触发点击事件
				var total=_this.$store.state.data_list
				total.splice(0,total.length);

				for (let index = 0; index < 10; index++) {
					$('.one').trigger('click');
					var arr = _this.setValue.number[0];
					_this.$store.state.data_list.push(arr);

				}
				$(".clear").trigger('click');

			})

		}
	}
</script>
