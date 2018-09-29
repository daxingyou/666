<template>
	<div class="mobile-wrap center bj3">
		<Header title="内容"></Header>
		<div class="context">
			<ul>
				<li v-for="item in arr" v-if="item.id==id">
					<b>{{ item.createTime | time }}</b>
					<p>
						{{ item.content }}
					</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name:'MailCon',
		data(){
			return{
				msg:'',
				is_show:false,

				id:'',
				uid:this.param('uid'),
				token:this.param('token'),
				arr:[]
			}
		},
		created(){
			this.id=this.$route.params.id;
			this.data();
			this.read();
		},
		mounted(){
			
		},
		computed:{

		},
		methods:{
			data(){
				var _this=this;

				_this.ajax("Email",{
					uid:_this.uid,
					token:_this.token,
				},
				data=>{
					_this.alert(data,_this);
					_this.arr=data.userInboxList
				})

			},
			read(){
				var _this=this;

				_this.ajax("readUserInboxNotice",{
					uid:_this.uid,
					token:_this.token,
					idList:_this.id
				},
				data=>{
					_this.alert(data,_this);
					// _this.arr=data.userInboxList
				})
			}
		},
		filters:{
			
		},
		components:{

		}
	}
</script>