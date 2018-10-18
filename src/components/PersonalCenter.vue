<template>

	<div class="mobile-wrap center bj3">
		<div class="percenter">
			<div class="percenter-top">
				<router-link to="/Kefu" class="fl">在线客服</router-link>
				<h2>个人中心</h2>
				<a v-if="isLogin" @click="quit" class="fr">注销</a>
				<router-link v-else to="/Login" class="fr" replace>登录</router-link>
			</div>

			<div class="percenter-name">
				<div class="pict">
					<img :src="imgpath" alt="">
				</div>
				<div class="text">
					<b>{{ time | hour }} ! {{ nickname | tourist }}</b>
					<p><i class="ico-one"></i>{{ layerName }}</p>
				</div>
				<div class="sign" @click="qiandao">
					<p>立即签到:</p>
					<p>+10积分</p>
				</div>
			</div>
		</div>

		<div class="per-balance">
			<b>账户余额：<span><i>{{ balance | money }}</i> 元</span></b>
			<a title="">查看详情&gt;</a>
		</div>
		
		<!-- 余额详情弹窗 -->
		<div class="money-detail center" >
			<div class="layout">
				<h2>我的钱包 <span><var>{{ userBalance | money }}</var>元<i @click="getAllAmount('userBalance',$event)" class="ico-ref2"></i></span></h2>
				<ul>
					<li>
						<p>三昇体育</p>
						<p><span><var>{{ sportAmount | money }}</var>元</span><i @click="getAllAmount('sportAmount',$event)" class="ico-ref2"></i></p>
					</li>
					<li>
						<p>开元棋牌</p>
						<p><span><var>{{ chessAmount | money }}</var>元</span><i @click="getAllAmount('chessAmount',$event)" class="ico-ref2"></i></p>
					</li>
				</ul>
			</div>
		</div>

		<div class="per-recharge">
			<div class="box">
				<ul>
					<li>
						<router-link to="/Recharge">
							<i class="ico-i1"></i>
							<var>充值</var>
						</router-link>
					</li>
					<li>
						<router-link to="/Drawing">
							<i class="ico-i2"></i>
							<var>提款</var>
						</router-link>
					</li>
					<li>
						<a @click="qiandao">
							<b>{{ envelopes | number}}</b>
							<p>可用红包&gt;</p>
						</a>
					</li>
					<li>
						<a @click="qiandao">
							<b>{{ currentPoint | number }}</b>
							<p>积分&gt;</p>
						</a>
					</li>
				</ul>
			</div>
			<div class="box1" v-if="layerName=='试用会员'"  @click="quanxian">
					<i class="ico-i3"></i>
					<var>额度转账</var>
			</div>
			<div class="box1" v-else>
				<router-link to="/Quota">
					<i class="ico-i3"></i>
					<var>额度转账</var>
				</router-link>
			</div>
		</div>

		<div class="order-item">
			<ul>
				<li>
					<a @click="qiandao">
						<i class="ico-i7"></i>
						<span>每日加奖 <i class="ico-more"></i></span>
					</a>
				</li>
				<li  v-if="layerName=='试用会员'"  @click="quanxian">
					<a>
						<i class="ico-i8"></i>
						<span>银行卡 <i class="ico-more"></i></span>
					</a>
				</li>
					<li  v-else>
					<router-link to="/Bankcard">
						<i class="ico-i8"></i>
						<span>银行卡 <i class="ico-more"></i></span>
					</router-link>
				</li>
				<li>
					<router-link to="/NoteRecord">
						<i class="ico-i1"></i>
						<span>投注记录 <i class="ico-more"></i></span>
					</router-link>
				</li>
				<li  v-if="layerName=='试用会员'"  @click="quanxian">
					<a>
						<i class="ico-i2"></i>
						<span>充值记录 <i class="ico-more"></i></span>
					</a>
				</li>
				<li v-else>
					<router-link to="/RechargeRecord">
						<i class="ico-i2"></i>
						<span>充值记录 <i class="ico-more"></i></span>
					</router-link>
				</li>
				<li v-if="layerName=='试用会员'"  @click="quanxian">
					<a>
						<i class="ico-i3"></i>
						<span>提款记录 <i class="ico-more"></i></span>
					</a>
				</li>
					<li v-else>
					<router-link to="/PresentRecord">
						<i class="ico-i3"></i>
						<span>提款记录 <i class="ico-more"></i></span>
					</router-link>
				</li>
				<li  v-if="layerName=='试用会员'"  @click="quanxian">
					<a>
						<i class="ico-i4"></i>
						<span>转账记录 <i class="ico-more"></i></span>
					</a>
				</li>
					<li v-else>
					<router-link to="/Transferrecord">
						<i class="ico-i4"></i>
						<span>转账记录 <i class="ico-more"></i></span>
					</router-link>
				</li>
				<li  v-if="layerName=='试用会员'"  @click="quanxian">
					<a>
						<i class="ico-i4"></i>
						<span>资金记录 <i class="ico-more"></i></span>
					</a>
				</li>
				<li v-else>
					<router-link to="/Capitalrecord">
						<i class="ico-i4"></i>
						<span>资金记录 <i class="ico-more"></i></span>
					</router-link>
				</li>
				<li  v-if="layerName=='试用会员'"  @click="quanxian">
					<a>
						<i class="ico-i5"></i>
						<span>个人资料 <i class="ico-more"></i></span>
					</a>
				</li>
				<li v-else>
					<router-link to="/DataEditing">
						<i class="ico-i5"></i>
						<span>个人资料 <i class="ico-more"></i></span>
					</router-link>
				</li>
				
				<li  v-if="layerName=='试用会员'"  @click="quanxian">
					<a>
						<i class="ico-i6"></i>
						<span>站内信 <i class="ico-more"></i></span>
					</a>
				</li>
				<li v-else>
					<router-link to="/Mail">
						<i class="ico-i6"></i>
						<span>站内信 <i class="ico-more"></i></span>
					</router-link>
				</li>
			</ul>
		</div>

		<div class="per-notice auto-center">
			<ul>
			 
				<li >
					<router-link to="/Notice">
						<div class="pict">
							<i><img style="width:.81rem;" src="../../static/img/0e90023dae4e8d3836bbfb0440f721f7_81x81.png" alt=""></i>
						</div>
						<span>公告</span>
					</router-link>
				</li>
				<li  v-if="layerName=='试用会员'"  @click="quanxian">
					<a>
						<div class="pict">
							<i><img style="width:1.14rem;" src="../../static/img/528c8a48fa53c5108fa2169c3c58a8fd_114x87.png" alt=""></i>
						</div>
						<span>登入密码</span>
					</a>
				</li>
						<li v-else>
					<router-link to="/ChangePassword">
						<div class="pict">
							<i><img style="width:1.14rem;" src="../../static/img/528c8a48fa53c5108fa2169c3c58a8fd_114x87.png" alt=""></i>
						</div>
						<span>登入密码</span>
					</router-link>
				</li>
		 
					<li>
					<router-link to="/Kefu">
						<div class="pict">
							<i><img style="width:1rem;" src="../../static/img/42e86dbb3b1191a1aeac383c3b4933cb_100x87.png" alt=""></i>
						</div>
						<span>联系我们</span>
					</router-link>
				</li>
			</ul>
		</div>

		<Footer acti="5"></Footer>
			
		<Msg :message="msg" v-show="isShow"></Msg>
	</div>

	<!--mobile_wrap-->

</template>

<script>
export default {
  name: "PersonalCenter",
  data() {
    return {
      msg: "",
      isShow: false,

      uid: this.param("uid"),
      token: this.param("token"),

      // 头像
      imgpath: "../../static/img/d936d59d56499d7cdec4791b11f23621_156x156.png",

      // 会员等级
      layerName: "",

      // 红包
      envelopes: 0,
      // 积分
      currentPoint: 0,

      // 获取小时
      time: new Date().getHours(),

      // 余额
      userBalance: 0,
      // 开元棋牌余额
      chessAmount: 0,
      // 体育剩余金额
      sportAmount: 0
    };
  },

  created() {
    // 调用积分等级
    this.showUserPointLevel();
    // 调用红包
    this.getHongbaoInfo();

    // 等级级别
    this.getUserSession();

    // 实时更新账户信息
    this.$store.commit("PersonalCenter");

    // 金额
    this.getAllAmount("userBalance");
    this.getAllAmount("chessAmount");
    this.getAllAmount("sportAmount");

    this.test();

    // 是否在线
    this.$store.commit("checkOnline");

    // 清除查询记录
    this.$store.state.screen.query = false;
  },
  mounted() {
    setTimeout(() => {
      console.log(111111111111111);
      var _this = this;
      console.log(_this.layerName); // undefind
      $(".per-balance a").click(function(event) {
        if (_this.layerName == "试用会员") {
          tipsTotice("无权限访问");
        } else {
          $(".money-detail").fadeIn();
        }
      });
    }, 1000);

    $(".money-detail").click(function(event) {
      event.stopPropagation();

      $(".money-detail .layout").css("animation", "fadeOutDownBig 1s both");
      $(this).fadeOut(600, function() {
        $(".money-detail .layout").removeAttr("style");
      });
    });
    $(".money-detail .layout").click(function(event) {
      event.stopPropagation();
    });

    $(".ico-ref2").click(function(event) {
      var that = $(this);
      that.addClass("acti");
    });
  },
  computed: {
    // 是否登录
    isLogin() {
      return this.$store.state.isLogin;
    },
    // 余额
    balance() {
      return this.$store.state.PersonalCenter.balance;
    },
    nickname() {
      return this.$store.state.PersonalCenter.account;
    }
  },
  methods: {
    // 刷新数据
    getAllAmount(val, ev) {
      var _this = this;
      _this.ajax(
        "getAllAmount",
        {
          uid: _this.uid,
          token: _this.token
        },
        data => {
          _this[val] = data[val];
          if (ev != undefined) ev.target.classList.remove("acti");
        }
      );
    },
    // 退出
    quit() {
      var _this = this;
      _this.ajax(
        "Logout",
        {
          uid: _this.uid,
          token: _this.token
        },
        data => {
          localStorage.removeItem("user");
          _this.$store.state.isLogin = false;
          _this.$store.state.PersonalCenter = {};
          _this.layerName = "游客";
          _this.alert(data, _this, "退出成功", "Login");
        }
      );
    },
    // 签到
    qiandao() {
      var _this = this;
      if (_this.layerName == "试用会员") {
        tipsTotice("无权限访问");
      } else {
        tipsTotice("活动暂未开放！");
      }
    },
    // 签到
    quanxian() {
      var _this = this;
      console.log(_this.layerName);
      if (_this.layerName == "试用会员") {
        tipsTotice("无权限访问");
      }
    },
    // 获取积分
    showUserPointLevel() {
      var _this = this;
      _this.ajax(
        "showUserPointLevel",
        {
          uid: _this.uid,
          token: _this.token
        },
        data => {
          console.log(data);
          _this.currentPoint = data.currentPoint;
        }
      );
    },
    // 会员等级
    getUserSession() {
      var _this = this;
      _this.ajax(
        "getUserSession",
        {
          uid: _this.uid,
          token: _this.token
        },
        data => {
          console.log(data);
          _this.layerName = data.layerName;
        }
      );
    },
    // 获取红包主页
    getHongbaoInfo() {
      var _this = this;
      _this.ajax(
        "getHongbaoInfo",
        {
          uid: _this.uid,
          token: _this.token
        },
        data => {
          _this.alert(data, _this);
          if (data.hongbao) {
            _this.envelopes =
              data.hongbao["hongbaoMoney" + (data.actTimes - 1)];
          }
        }
      );
    }
  },
  components: {}
};
</script>