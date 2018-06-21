<template>
	<div class="my">
		<div class="my-header clearfix" v-if="denglu">
			<router-link to="/Personal">
				<div class="my-header-img">
					<div><img src="../../static/img/baoming.png"></div>
				</div>

				<div class="my-header-text">
					<div class="my-header-text-denglu clearfix">
						<div class="my-header-text-denglu-text1">点击登录</div>
						<div class="my-header-text-denglu-text2">3秒登录，体验更多功能</div>

					</div>
					<div class="my-header-text-return"><img src="../../static/img/return1.png"></div>
				</div>
			</router-link>
		</div>
		<div class="my-header clearfix" v-if="xinxi">
			<router-link to="/Info">
				<div class="my-header-img">
					<img :src="image1">
				</div>

				<div class="my-header-text">
					<div class="my-header-text-denglu clearfix">
						<div class="my-header-text-denglu-text3">{{info.nickname}}</div>
						<div class="my-header-text-denglu-text4">点击查看个人信息</div>
					</div>
					<div class="my-header-text-return"><img src="../../static/img/return1.png"></div>
				</div>
			</router-link>
		</div>
		<div class="my-center" v-if="denglu">
			<router-link to="/Personal">
				<div class="my-center-div">
				</div>
				<div class="my-center-left">
					<div class="my-center-left-text">
						个人信息
					</div>
					<div class="my-center-left-text1">
						完善个人信息让其他人更了解你！
					</div>
					<div class="my-center-left-button">
						点击完善信息
					</div>

				</div>
				<div class="my-center-right">
					<img src="../../static/img/mytianxie.png">
				</div>
			</router-link>
		</div>
		<div class="my-center" v-show="xinxi">
			<router-link to="/Info">
				<div class="my-center-div">
				</div>
				<div class="my-center-left">
					<div class="my-center-left-text">
						个人信息
					</div>
					<div class="my-center-left-text1">
						完善个人信息让他人更了解你！
					</div>
					<div class="my-center-left-button">
						点击完善信息
					</div>
	
				</div>
				<div class="my-center-right">
					<div class="myChart-text">{{info.bili}}%</div>
					<div id="myChart" style="width:2.5rem; height: 2.5rem;">
						
					</div>
				</div>
			</router-link>
		</div>
		<div class="my-baoming clearfix">
			<div class="my-baoming-geren">我的报名<img src="../../static/img/return1.png"></div>
			<div class="my-baoming-frame">
				<img src="../../static/img/yibaoming.png">
				<div>已报名</div>
			</div>
			<div class="my-baoming-frame">
				<img src="../../static/img/tongguo.png">
				<div>已通过</div>
			</div>
			<div class="my-baoming-frame">
				<img src="../../static/img/gongzuo.png">
				<div>已结束</div>
			</div>
		</div>
		<div class="my-baoming">
			<div class="my-baoming-line">
				我的报名<img src="../../static/img/return1.png">
			</div>
			<div class="my-baoming-line">
				我的收藏<img src="../../static/img/return1.png">
			</div>
			<div class="my-baoming-line">
				设置<img src="../../static/img/return1.png">
			</div>
		</div>
		<div class="my-baoming">
			<div style="width: 100%;font-size: 0.3rem;text-align: center;line-height: 0.5rem;" @click="quit()">测试注销按钮</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import qs from 'qs';
	let echarts = require('echarts/lib/echarts')
	require('echarts/lib/chart/pie')
	export default {
		data() {
			return {
				info:[],
				denglu: true,
				xinxi: false,
				userId: '',
				username: '',
				img: '../../static/img/moren.jpg',
				image1:'',
				bili:"",
				bili1:""
			};

			　　　　
		},
		mounted(){
			/*页面挂载获取保存的cookie值，渲染到页面上*/
			let _this = this	
			let uid = this.$cookie.get('userId')
			let uname = this.$cookie.get('username')
			_this.userId = uid
			_this.username = uname
			
			if(uid== null) {
				_this.denglu = true
				_this.xinxi = false
			}
			if(uid != null) {
				_this.denglu = false
				_this.xinxi = true
				this.PostInfo();
			}	
		},
		methods:{
			quit() {
				/*删除cookie*/
				let _this = this
				this.$cookie.delete('userId')
				this.$cookie.delete('username')
				_this.userId = ""
				_this.username = ""
				_this.denglu = true
				_this.xinxi = false
			},
			PostInfo(){
				let _this = this
				this.$post('user/info',qs.stringify({userId:_this.userId}))
			      .then((response) => {
			        	_this.image1 = 'http://jzadmin.bellairehc.com/' + JSON.parse(response.data.data).image
		               _this.info = JSON.parse(response.data.data)
		               _this.bili = JSON.parse(response.data.data).bili
		               if(_this.bili == 100){
		               	  document.querySelector(".myChart-text").style.marginLeft = "-0.55rem";
		               }
		               _this.bili1 =100 - JSON.parse(response.data.data).bili
		               _this.drawLine();
			      })
			},
			drawLine() {
		      // 基于准备好的dom，初始化echarts实例
		      let _this = this
		      let myChart = echarts.init(document.getElementById('myChart'))
		      // 绘制图表
		      setTimeout(function () {
			            myChart.resize();
			        }, 100)
		      window.addEventListener("resize", function () {
			        
			        setTimeout(function () {
			            myChart.resize();
			        }, 500)
			        console.log("1")
			    });
		      myChart.setOption({
				
			    color: ['rgba(176, 212, 251, 1)'], 
			    legend: {
			        show: true,
			        itemGap: 12,
			        data: ['01', '02']
			    },
			   
			    series: [{
			        name: 'Line 1',
			        type: 'pie',
			        clockWise: true,
			        radius: ['50%', '66%'],
			        itemStyle: {
			            normal: {
			                label: {
			                    show: false
			                },
			                labelLine: {
			                    show: false
			                }
			            }
			        },
			        hoverAnimation: false, 
			        data: [{
			            value: _this.bili,
			            name: '01',
			            itemStyle: {
			                normal: {
			                    color: { // 完成的圆环的颜色
			                        colorStops: [{
			                            offset: 0,
			                            color: '#00cefc' // 0% 处的颜色
			                        }, {
			                            offset: 1,
			                            color: '#367bec' // 100% 处的颜色
			                        }]
			                    },
			                    label: {
			                        show: false
			                    },
			                    labelLine: {
			                        show: false
			                    }
			                } 
			            }
			        }, {
			            name: '02',
			            value:_this.bili1
			        }]
			    }]
		      });
		    }
		},
		watch: {
			'$route' (to, from) {
				if(to.name === 'My') { //跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面 
					let _this = this
					let uid = _this.$cookie.get('userId')
					let uname = _this.$cookie.get('username')
					_this.userId = uid
					_this.username = uname
					if(_this.userId == null) {
						_this.denglu = true
						_this.xinxi = false
					}
					if(_this.userId != null) {
						console.log('chenggong')
						_this.denglu = false
						_this.xinxi = true
						this.PostInfo();
					}
				}
			}
		}

	}
</script>

<style>
	.my {
		background: #f7f7f7;
		padding-bottom: 1.2rem;
	}
	
	.my-header {
		height: 2.8rem;
		background: white;
		width: 100%;
		margin-bottom: 0.2rem;
	}
	
	.my-header-img {
		width: 2.8rem;
		height: 2.8rem;
		text-align: center;
		padding: 0.5rem;
		box-sizing: border-box;
		float: left;
	}
	
	.my-header-img img {
		object-fit: cover;
		width: 1.8rem;
		height: 1.8rem;
		border-radius: 50%;
		box-shadow: 0 0 0.1rem #cccccc;
	}
	
	.my-header-text {
		float: left;
		width: 4.7rem;
		height: 2.8rem;
		position: relative;
	}
	
	.my-header-text-denglu {
		font-weight: bolder;
		box-sizing: border-box;
		width: 4rem;
	}
	
	.my-header-text-denglu-text1 {
		font-size: 0.45rem;
		color: #3e3e3e;
		margin-top: 0.85rem;
		float: left;
		width: 4rem;
	}
	
	.my-header-text-denglu-text2 {
		font-size: 0.32rem;
		color: #3e3e3e;
		margin-top: 0.2rem;
		float: left;
		width: 4rem;
	}
	
	.my-header-text-denglu-text3 {
		font-size: 0.5rem;
		color: #3e3e3e;
		margin-top: 0.85rem;
		float: left;
		width: 4rem;
	}
	
	.my-header-text-denglu-text4 {
		font-size: 0.28rem;
		color: #3e3e3e;
		margin-top: 0.2rem;
		float: left;
		width: 4rem;
		color: #cccccc;
	}
	
	.my-header-text-return {
		width: 0.3rem;
		height: 0.3rem;
		right: 0.1rem;
		margin-right: 0.5rem;
		position: absolute;
		top: 1.4rem;
		margin-top: -0.15rem;
	}
	
	.my-header-text-return img {
		width: 100%;
	}
	
	.my-center {
		height: 2.4rem;
		width: 100%;
		background: white;
		position: relative;
		margin-bottom: 0.2rem;
	}
	
	.my-center-div {
		position: absolute;
		background: url(../../static/img/324.jpg);
		background-size: cover;
		width: 100%;
		height: 2.4rem;
		margin: 0 auto;
		opacity: 0.1;
	}
	
	.my-center-left {
		width: 60%;
		height: 2.4rem;
		box-sizing: border-box;
		padding: 0.4rem 0 0.4rem 0.4rem;
		float: left;
	}
	
	.my-center-left-text {
		color: #3e3e3e;
		font-size: 0.4rem;
		font-weight: bold;
		margin-bottom: 0.1rem;
	}
	
	.my-center-left-text1 {
		color: #3e3e3e;
		font-size: 0.24rem;
		margin-bottom: 0.15rem;
	}
	
	.my-center-left-button {
		color: #3e3e3e;
		font-size: 0.24rem;
		border: 2px solid #1296db;
		color: #1296db;
		width: auto;
		border-radius: 0.3rem;
		text-align: center;
		padding: 0.1rem 0.2rem;
		display: inline-block;
	}
	
	.my-center-right {
		width: 40%;
		float: left;
		height: 2.5rem;
		width: 2.5rem;
		position: relative;
	}
	
	.my-center-right img {
		width: 2rem;
		margin-left: 0.2rem;
		margin-top: 0.2rem;
	}
	
	.my-baoming {
		background: white;
		width: 100%;
		margin-bottom: 0.2rem;
		
	}
	
	.my-baoming-geren {
		width: 100%;
		height: 1rem;
		font-size: 0.4rem;
		font-weight: bold;
		box-sizing: border-box;
		padding-left: 0.4rem;
		line-height: 1rem;
	}
	
	.my-baoming-geren img {
		width: 0.3rem;
		float: right;
		margin-top: 0.35rem;
		margin-right: 0.2rem;
	}
	
	.my-baoming-frame {
		width: 33.3%;
		text-align: center;
		float: left;
		height: 1.7rem;
	}
	
	.my-baoming-frame img {
		height: 0.8rem;
		margin-top: 0.1rem;
	}
	
	.my-baoming-frame div {
		width: 100%;
		font-size: 0.28rem;
		margin-top: 0.2rem;
	}
	.myChart-text{position: absolute;left: 50%;left: 50%;font-size: 0.5rem;margin-top: 0.95rem;margin-left: -0.5rem;color: #367bec;}
	.my-baoming-line{height: 0.8rem;line-height: 0.8rem;margin-left: 0.4rem;border-bottom: 1px solid #F2F2F2;font-size: 0.3rem;}
	.my-baoming-line img{float: right;width: 0.3rem;margin-right: 0.2rem;margin-top: 0.3rem;}
	.my-baoming-line:last-child{border: 0;}
</style>