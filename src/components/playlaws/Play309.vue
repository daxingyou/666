<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">
			<h3>
				<var>至少选择4个号码</var>
				<p>
					<span class="one">机选一注</span>
					<span class="five">机选五注</span>
				</p>
			</h3>
			<em class="tpp">选4 (中4@<span>51</span> 中3@<span>6</span> 中2@<span>2</span>)</em>
			<div class="color-ball">
				<div class="left">
					<span class="s1">选码</span>
				</div>
				<div class="right">
					<!-- <ul>
						<li><strong>1</strong></li>
						<li><strong>2</strong></li>
						<li><strong>3</strong></li>
						<li><strong>4</strong></li>
						<li><strong>5</strong></li>
						<li><strong>6</strong></li>
						<li><strong>7</strong></li>
						<li><strong>8</strong></li>
						<li><strong>9</strong></li>
						<li><strong>10</strong></li>
						<li><strong>11</strong></li>
						<li><strong>12</strong></li>
						<li><strong>13</strong></li>
						<li><strong>14</strong></li>
						<li><strong>15</strong></li>
						<li><strong>16</strong></li>
						<li><strong>17</strong></li>
						<li><strong>18</strong></li>
						<li><strong>19</strong></li>
						<li><strong>20</strong></li>
						<li><strong>21</strong></li>
						<li><strong>22</strong></li>
						<li><strong>23</strong></li>
						<li><strong>24</strong></li>
						<li><strong>25</strong></li>
						<li><strong>26</strong></li>
						<li><strong>27</strong></li>
						<li><strong>28</strong></li>
						<li><strong>29</strong></li>
						<li><strong>30</strong></li>
						<li><strong>31</strong></li>
						<li><strong>32</strong></li>
						<li><strong>33</strong></li>
						<li><strong>34</strong></li>
						<li><strong>35</strong></li>
						<li><strong>36</strong></li>
						<li><strong>37</strong></li>
						<li><strong>38</strong></li>
						<li><strong>39</strong></li>
						<li><strong>40</strong></li>
						<li><strong>41</strong></li>
						<li><strong>42</strong></li>
						<li><strong>43</strong></li>
						<li><strong>44</strong></li>
						<li><strong>45</strong></li>
						<li><strong>46</strong></li>
						<li><strong>47</strong></li>
						<li><strong>48</strong></li>
						<li><strong>49</strong></li>
						<li><strong>50</strong></li>
						<li><strong>51</strong></li>
						<li><strong>52</strong></li>
						<li><strong>53</strong></li>
						<li><strong>54</strong></li>
						<li><strong>55</strong></li>
						<li><strong>56</strong></li>
						<li><strong>57</strong></li>
						<li><strong>58</strong></li>
						<li><strong>59</strong></li>
						<li><strong>60</strong></li>
						<li><strong>61</strong></li>
						<li><strong>62</strong></li>
						<li><strong>63</strong></li>
						<li><strong>64</strong></li>
						<li><strong>65</strong></li>
						<li><strong>66</strong></li>
						<li><strong>67</strong></li>
						<li><strong>68</strong></li>
						<li><strong>69</strong></li>
						<li><strong>70</strong></li>
						<li><strong>71</strong></li>
						<li><strong>72</strong></li>
						<li><strong>73</strong></li>
						<li><strong>74</strong></li>
						<li><strong>75</strong></li>
						<li><strong>76</strong></li>
						<li><strong>77</strong></li>
						<li><strong>78</strong></li>
						<li><strong>79</strong></li>
						<li><strong>80</strong></li>
					</ul> -->
					<ul>
						<template v-for="item in pageData">
							<li :playPlId="item.playPlId">
								<strong>{{ item.name }}</strong>
								<p>{{ item.playPl }}</p>
							</li>
						</template>
					</ul>
				</div>
			</div>
		</div>

		<!-- 投注金额 -->
		<FixedInput/>

	</div>
	
	
</template>


<script>
	export default{
		name:'Play309',
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
			getSscPlayPl2(playId){
				var _this=this;
				_this.ajax("getSscPlayPl2",{
					playId:playId
				},
				data=>{
					_this.alert(data,_this)
					_this.sscPlayPlGroupList=data.sscPlayPlGroupList
				})
			},
			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			}

		},
		mounted(){
			var _this=this

			_this.$nextTick(function(){

				// 主结构
				var $oLi=$(".color-ball .right ul");
				// 总个数
				var oLilen=null;

				// 统计函数
				function count(obj){

					var arr=_this.$store.state.BuyNsidePage.pageConfig.number

					arr.splice(0,arr.length);

					var num=0;
				
					$($oLi).find('li').each(function(index){
						if($(this).hasClass('color')){
							var zhushu={};
							num++;

							var playPlId=$(this).attr("playPlId") // 赔率id
							var playPl=$(this).find('p').text() // 赔率

							zhushu.playPlId=parseFloat(playPlId)
							zhushu.playPl=parseFloat(playPl)
							zhushu.content=$(this).find('strong').text() // 号码

							_this.setValue.number.push(zhushu);
						}
					})

					// 注数
					_this.setValue.notes=num

					// 存储方法
					_this.setPlay();
					
				}
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
					$oLi.find('li').removeClass('color')
					$oLi.find('li').eq(random(oLilen-1)).addClass('color');
					// 调用统计
					count();
				})

				// 机选五注
				$(".five").click(function(){
					num();
					var arr=rand_one_zhu(oLilen,5)
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
