<template>
	<div class="mobile-wrap center bj2">

		<Header title="体育赛事"></Header>
		
		<div id="frame">
			<iframe :src="link"></iframe>
		</div>

		<Footer acti="4"></Footer>

	</div>
</template>

<script>
	export default{
		name:'Sports',
		data(){
			return{

				uid:this.param('uid'),
				token:this.param('token'),

				link:''
			}
		},
		created(){
			
		},
		mounted(){
			this.getSportUrl(1);
		},
		methods:{
			// 体育
			getSportUrl(KindID){
				var _this=this;
				this.ajax('getSportUrl',{
					uid:_this.uid,
					token:_this.token,
					clientType:3
				},
				data => {
					// console.log(data)
					if(data.result==-100){
						this.$router.replace({"name":"Login"})
					}else if(data.result==0){
						tipsTotice(data.description)
					}else{
						_this.link=data.loginUrl
					}
					// alert(JSON.stringify(data))
				})
			}
		}
	}
</script>