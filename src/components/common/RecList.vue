<!-- 充值列表 -->

<template>
	<div class="cg-box">
		<template v-if="czLists.length>0">
			<li v-for="czlist in czLists">
				<a :href="czlist.url" title="">
					<div class="pict">
						<img :class="['i'+type]" :src="src" alt="">
					</div>
					<div class="text">
						<b>{{ czlist.name}}</b>
						<p>{{ czlist.remarks | notext}}</p>
					</div>
					<div class="fr">
						<i class="ico-more"></i>
					</div>
				</a>
			</li>
		</template>
		<template v-else>
			<h3>当前不支持该付款方式</h3>
		</template>
	</div>
</template>

<script>
	export default {
		name:'RecList',
		props:['type','src'],
		data(){
			return{
				uid:this.param('uid'),
				token:this.param('token'),
				czLists:[]
			}
		},
		created(){
			this.data();
		},
		methods:{
			data(){
				var _this=this;
				_this.ajax('Recharge',{
					uid:_this.uid,
					token:_this.token,
					type:_this.type
				},
				data=>{
					_this.alert(data,_this);
					this.czLists=data.czList
				})

			},
			select_money(v){
				this.money=v;
			}
		},
	}
</script>