<template>
	<div class="mobile-wrap center bj2">
		
		<Header title="站内信">
			<div class="edit" slot="edit">
				<span>编辑</span>
			</div>
		</Header>

		<div class="web-mail">
			<ul>
				<li v-for="(email,index) in emails" :class="email.hasRead?'':'noread'">
					<router-link :to="'/MailCon/'+email.id">
						<b>
							{{ email.content }}
						</b>
						<span>{{ email.createTime | time }}<i class="ico-more"></i></span>
					</router-link>
					<div class="delete" @click="delUserInboxNotice(email.id,index)">删除</div>
				</li>
			</ul>
			<div class="clear"></div>
			<h3>已经全部加载完毕</h3>
		</div>

		<Footer :acti="5"></Footer>
		
		<Msg :message="msg" v-show="is_show"></Msg>
	</div>

	<!--mobile_wrap-->

</template>

<script>

	export default {
		name:'Mail',
		data(){
			return{
				msg:'',
				is_show:false,

				uid:this.param('uid'),
				token:this.param('token'),

				// 分页
				pageIndex:1,

				emails:[],

				opent:true
			}
		},
		created(){
			this.data();
		},
		mounted(){
			var _this=this
			$(".top .edit span").click(function(){
				if(_this.opent){
					$(this).text('完成')
					$(".web-mail").addClass('edit')
					_this.opent=false
				}else{
					$(this).text('编辑')
					$(".web-mail").removeClass('edit')
					_this.opent=true
				}
			})

		},
		methods:{
			// 删除站内信
			delUserInboxNotice(id,index){
				var _this=this
				
				_this.ajax('delUserInboxNotice',{
					// 用户ID
					uid:_this.uid,
					// 鉴权码
					token:_this.token,
					// 站内信编码
					idList:id
				},
				data=>{
					if(data.result==1){
						_this.emails.splice(index,1)
						var msg={
							result:105,
							description:'删除成功'
						}
						_this.alert(msg,_this);
						$(".top .edit span").text('编辑')
						$(".web-mail").removeClass('edit')
						_this.opent=true
						
					}
				})
			},
			data(){
				var _this=this
				_this.ajax('Email',{
					uid:_this.uid,	//用户ID
					token:_this.token,	//鉴权码
					pageIndex:_this.pageIndex	//第几页
				},
				data=>{
					_this.alert(data,_this)
					_this.emails=data.userInboxList
				})
			}
		},
		components:{
			
		}
	}

</script>
