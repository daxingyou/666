<template>
	<!-- 框架 -->
	<div id="iframe">

		<!-- 投注号码 -->
		<div class="machine-select">

			<!-- 输入框 -->
			<div class="manual">
				<div class="box">
					<div class="fl">
						<span>1.多注号码请直接输入</span>
						<span>2.自动过滤重复号码和不合法号码</span>
						<span>3.可复制号码黏贴到输入框</span>
					</div>
					<div class="fr">
						<span @click="number">机选一注</span>
					</div>
				</div>
				<textarea onpaste="return false;" placeholder="请手动输入单式投注"></textarea>
			</div>			
		</div>

		<!-- 确定 -->
		<FixedBottom></FixedBottom>
		
		<!-- 注单设定 -->
		<NoteSetting></NoteSetting>

	</div>
	
	 
</template>

<script>
	export default{
		name:'Play7',
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
				content:'',
			}
		},
		computed:{
			
		},
		created(){
			// 存储方法
			this.setPlay();
		},
		activated(){
			// 获取赔率
			this.$store.state.config.playPlId_type=0
			// 取位数
			this.$store.state.config.weishu=3
		},
		methods:{
			// 设置数据(必要)
			setPlay(){
				this.$store.state.BuyNsidePage.pageConfig=this.setValue
				this.test();
			},
			setData(content){
				var _this=this;
				// 创建一个空对象
				var zhu={};
				// 选中文字
				zhu.content=content
				// 号码
				_this.setValue.number.push(zhu)
				_this.setPlay();
			},
			number(){
				var _this=this
				var arr=_this.$store.state.BuyNsidePage.pageConfig.number
				arr.splice(0,arr.length);

				var num=vallar(random(999))
				$('textarea').val(num+',')
				$('textarea').attr('data-value',num);

				this.setData(num);
				_this.setValue.notes=_this.setValue.number.length

			}
		},
		mounted(){
			var _this=this
			_this.$nextTick(function(){
				

				$('textarea').attr('data-value', '');
				$('textarea').on('input', function (e) {
					var target = e.originalEvent.data;
					var value = $('textarea').attr('data-value');
					if (target) {
						if (target.match(/\d/) == null) {
							var temp_str = $(this).val()
							$(this).val(temp_str.substring(0, temp_str.length - 1));
						} else {
							value += target;
						}
					} else {
						if ($(this).val().length % 4 == 3) {
							return;
						}
						value = value.substring(0, value.length - 1);
					}

					$('textarea').attr('data-value', value);
					var str = '';
					if (value.length > 2) {
						for (let index = 0; index < parseInt(value.length/3); index ++) {
							str += value[index*3] + value[index*3 + 1] + value[index*3 + 2] + ',';
						}
						if (value.length % 3 == 2) {
							str +=  value[value.length - 2] + value[value.length-1]
						}
						if (value.length % 3 == 1) {
							str +=  value[value.length-1]
						}
					} else {
						str = value;
					}
					$(this).val(str)

					// 清除
					var arr=_this.$store.state.BuyNsidePage.pageConfig.number
					arr.splice(0,arr.length);

					var arr=str.split(',')

					console.log(arr)

					if(isRepeat(arr)){
						tipsTotice('数据有重复了!')
						_this.setValue.notes=0
					}else{
						var str=arr.join(',')
						var pos=str.lastIndexOf(',')

						_this.setData(str.substring(0,pos));
						
						_this.setValue.notes=arr.length-1
					}
				})

				// 清除
				$(".clear-ok p").click(function(){
					$(".manual textarea").val('')
				});
				
				// 触发点击事件
				var total=_this.$store.state.data_list
				total.splice(0,total.length);

				for (let index = 0; index < 10; index++) {
					$('.one').trigger('click');
					var arr = _this.setValue.number[0];
					_this.$store.state.data_list.push(arr);

				}
				$(".clear-ok p").trigger('click');
			})
		}
	}
</script>