<template>
	<div class="Info">
		<div class="Info-header clearfix">
			<div @click="goback" class="Info-header-return"><img src="../../static/return.png">返回</div>
		</div>
		<div v-show="loading" class="loading"></div>
		<div v-show="info">	
			<div class="Info-top clearfix">
				<div class="Info-top-header clearfix">
					<div class="Info-top-header-left">
						基本信息
					</div>
					<router-link to="Info/XinXi">
						<div class="Info-top-header-right">
							编辑 <img src="../../static/img/return1.png">
						</div>
					</router-link>
				</div>
				<div class="Info-top-img">
					<img :src="image">
				</div>
	
				<div class="Info-top-text">	
					<div class="Info-top-text-denglu-text">{{info.nickname}}</div>
					<div class="Info-top-text-denglu-frame">
						<div class="Info-top-text-denglu-frame-text">
							{{info.birthday}}
						</div>
						<div class="Info-top-text-denglu-frame-text">
							{{info.sex}}
						</div>
						<div class="Info-top-text-denglu-frame-text">
							{{info.phonenum}}
						</div>
					</div>
					<div class="Info-top-text-denglu-Education">
						学历: {{info.education}}
					</div>
				</div>
				
			</div>
			<div class="Info-top clearfix">
				<div class="Info-top-header clearfix">
					<div class="Info-top-header-left">
						求职偏好
					</div>
					<router-link to="Info/PianHao">
						<div class="Info-top-header-right">
							编辑 <img src="../../static/img/return1.png">
						</div>
					</router-link>
				</div>
				<div class="Info-frame">
					<div class="Info-frame-line">
						求职类型：{{info.qiuzhitype}}
					</div>
					<div class="Info-frame-line">
						偏好地区：{{info.address}}
					</div>
					<div class="Info-frame-line">
						空闲时间：{{info.mytime}}
					</div>
					<div class="Info-frame-line">
						工作时间：{{info.jobtime}}
					</div>
					<div class="Info-frame-line">
						期望职业：{{info.expectjob}}
					</div>
				</div>
			</div>
			<div class="Info-top clearfix">
				<div class="Info-top-header clearfix">
					<div class="Info-top-header-left">
						教育经历
					</div>
					<router-link to="Info/JingLi">
						<div class="Info-top-header-right">
							编辑 <img src="../../static/img/return1.png">
						</div>
					</router-link>
				</div>
				<div class="Info-frame">
					<div class="Info-frame-line">
						学校名称：{{info.school}}
					</div>
					<div class="Info-frame-line">
						入学年份：{{info.ruxuetime}}
					</div>
					
				</div>
			</div>
			<div class="Info-top clearfix">
				<div class="Info-top-header clearfix">
					<div class="Info-top-header-left">
						详细信息
					</div>
					<router-link to="Info/XiangXi">
						<div class="Info-top-header-right">
							编辑 <img src="../../static/img/return1.png">
						</div>
					</router-link>
				</div>
				<div class="Info-frame">
					<div class="Info-frame-line">
						身高：{{info.height}}
					</div>
					<div class="Info-frame-line">
						体重：{{info.weight}}
					</div>
					<div class="Info-frame-line">
						微信号：{{info.weixin}}
					</div>
					<div class="Info-frame-line">
						qq：{{info.qq}}
					</div>
					<div class="Info-frame-line">
						联系邮箱：{{info.email}}
					</div>
					<div class="Info-frame-line">
						我的描述：{{info.mydes}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.Info{background:#f7f7f7;position: fixed;top: 0;bottom: 0;right: 0;left: 0;overflow-y: scroll;z-index: 10;}
	
	.Info-header{height: 1rem;width: 100%;background:#5487d6;color: white;}
	.Info-header-return{width:1.3rem ;height: 1rem;line-height: 1rem;font-size: 0.3rem;float: left;}
	.Info-header-return img{width:0.2rem ;float: left;margin:0.33rem 0.1rem 0 0.2rem;}
	.Info-top{width: 100%;background: white;margin-bottom: 0.2rem;color: #3b3b3b;padding-bottom: 0.2rem;}
	.Info-top-header{height: 0.9rem;width: 100%;}
	.Info-top-header-left{float: left;line-height: 0.9rem;font-size: 0.34rem;margin-left: 0.4rem;font-weight: bold;}
	.Info-top-header-right{float: right;margin-right: 0.2rem;font-size:0.3rem ;line-height: 0.9rem;}
	.Info-top-header-right img{width:0.3rem;float: right;margin: 0.3rem 0.1rem;}
	.Info-top-img {width: 2.6rem;height: 2.4rem;text-align: center;padding: 0.2rem;box-sizing: border-box;float: left;}
	.Info-top-img img {object-fit: cover;width: 2rem;height: 2rem;border-radius: 50%;box-shadow: 0 0 0.1rem #cccccc;}
	.Info-top-text{float: left;box-sizing: border-box;padding-top: 0.2rem;width: 4.5rem;}
	.Info-top-text-denglu-text{font-size: 0.5rem;font-weight: bold;float: left;height: 0.8rem;}
	.Info-top-text-denglu-sex{font-size: 0.28rem;float: left;line-height: 0.8rem;margin-left: 0.3rem;}
	.Info-top-text-denglu-frame{float: left;width: 4.5rem;}
	.Info-top-text-denglu-frame-text{background: #F7F7F7;font-size: 0.28rem;display: inline-block;padding:0.05rem 0.1rem;margin-right: 0.1rem;}
	.Info-top-text-denglu-Education{width: 100%;font-size: 0.3rem;float: left;margin-top: 0.2rem;}
	.Info-frame{width: 100%;box-sizing: border-box;padding: 0.2rem;}
	.Info-frame-line{width: 100%;font-size: 0.3rem;line-height: 0.6rem;box-sizing: border-box;padding: 0 0.2rem;}
</style>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import qs from 'qs';
	export default {
		data(){
            return{
            	info:{
            		
            	},
                image:"",
                loading:false,
				info:true,
            }
       },
       methods:{
				goback(){
					let _this = this
					 _this.$router.push('/My')
				},
				PostInfo(){
					let _this = this
					this.$post('user/info',{userId:_this.userId})
				      .then((response) => {
				        	console.log(JSON.parse(response.data))
							_this.image = 'http://jzadmin.bellairehc.com/' + JSON.parse(response.data).image
			               _this.info = JSON.parse(response.data)
			             })
				},
		},
		mounted() {
			/*页面挂载获取保存的cookie值，渲染到页面上*/
			let _this = this
			let uname = this.$cookie.get('username')
			let uid = this.$cookie.get('userId')
			_this.name = uname
			_this.userId = uid
			this.PostInfo()
			if(uname == ""){
		        this.$router.push('/')
		    }
		},
		watch: {
			'$route' (to, from) {
				if(to.name === 'Info') { //跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面 
					let _this = this
					let uid = _this.$cookie.get('userId')
					_this.userId = uid
					this.PostInfo()
				}
			}
		}
      }
</script>

