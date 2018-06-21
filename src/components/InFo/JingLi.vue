<template>
	<div class="xinxi">
		<div class="Info-tanchuang" v-show="tanchuang">
			保存成功
		</div>
		<div class="xinxi-header clearfix">
			<div @click="goback" class="xinxi-header-return"><img src="../../../static/return.png">返回</div>
			<div class="xinxi-header-center">教育经历</div>
			<div class="xinxi-header-save" @click="Save">保存</div>
		</div>
		<div class="xinxi-center">
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">学校名称</div>
				<div class="xinxi-center-line-right">
					<input type="text" :placeholder="info.school">
				</div>
			</div>
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">入学年份</div>
				<div class="xinxi-center-line-right">
					 <div class="fixWidth">
				        <div class="demo">
				            <div id="nianfen">{{info.ruxuetime}}</div>
				        </div>
				    </div>
			    </div>
			</div>
		</div>	
			
	</div>
</template>

<style>
	.xinxi{background:#f7f7f7;position: fixed;top: 0;bottom: 0;right: 0;left: 0;overflow-y: scroll;z-index: 10;}
	.Info-tanchuang{position: absolute;width: 4rem;height: 2rem;top: 50%;left: 50%;margin-left: -2rem;margin-top: -1rem;background: rgba(0,0,0,0.7);color: white;border-radius:0.5rem;text-align: center;line-height: 2rem;font-size: 0.5rem;}
	.xinxi-header{height: 1rem;width: 100%;background:#5487d6;color: white;margin-bottom: 0.2rem;}
	.xinxi-header-return{width:20%;height: 1rem;line-height: 1rem;font-size: 0.3rem;float: left;}
	.xinxi-header-return img{width:0.2rem ;float: left;margin:0.33rem 0.1rem 0 0.2rem;}
	.xinxi-header-center{width:60%;text-align: center;line-height: 1rem;float: left;font-size: 0.36rem;}
	.xinxi-header-save{width:20% ;height: 1rem;line-height: 1rem;font-size: 0.3rem;float: left;text-align: center;}
	.xinxi-center{background: white;}
	.xinxi-center-line{padding: 0.2rem 0;margin-left: 0.4rem;border-bottom:1px solid #DBDCDE;}
	.xinxi-center-line:last-child{border: 0;}
	.xinxi-center-line-leftimg{font-size: 0.28rem;line-height: inherit;float: left;line-height: 1rem;}
	.xinxi-center-line-img{float: right;}
	.xinxi-center-line-img img{width:1rem;border-radius: 50%;}
	.xinxi-center-line-img img:nth-child(2){width:0.3rem;border-radius: 50%;float: right;margin-top: 0.35rem;margin-right: 0.2rem;}
	.xinxi-center-line-left{font-size: 0.28rem;float: left;width: 2rem;}
	.xinxi-center-line-left1{font-size: 0.28rem;float: left;width: 2rem;line-height: 0.6rem;}
	.xinxi-center-line-right{float: left;width: 60%;}
	.xinxi-center-line-right input{border: 0;outline: none;font-size: 0.28rem;}
	.xinxi-center-line-right-radio{width: 2rem;float: left;font-size: 0.28rem;}
	.xinxi-center-line-right-radio span{padding: 0 0.2rem;line-height: 0.6rem;float: left;}
</style>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import qs from 'qs';
	
	export default {
		
		data() {　　　　　　
			return {　
				tanchuang:false,
		        info:{
		        	ruxuetime:'',
		        }
			}　　　　
		},
		methods:{
			goback(){
				window.history.back()
			},
			PostInfo(){
					let _this = this
					this.$post('user/info',qs.stringify({userId:_this.userId}))
				      .then((response) => {
				        	console.log(JSON.parse(response.data.data))
							 _this.info = JSON.parse(response.data.data)
//							  if( _this.info.ruxuetime != 0 ){  
//		                        let date = new Date(_this.info.ruxuetime*1000);  
//		                        let Y = date.getFullYear();  
//		                        _this.info.ruxuetime = Y
//		                    }
						})
				},
			Save(){
				let _this = this
				let uid = this.$cookie.get('userId')
				if(uid == null){
			        this.$router.push('/')
			    }
				console.log(uid)
				this.info.ruxuetime = document.getElementById("nianfen").innerHTML
				console.log(_this.info.ruxuetime)
				this.$post('user/save-info',qs.stringify({userId:uid,school:_this.info.school,ruxuetime:_this.info.ruxuetime}))
			      .then((response) => {
			      			_this.tanchuang = true
			      			setTimeout(function(){
					                _this.$router.push('/Info')
					            },1000)
					})
			},
			chusheng(){
				var ruxueArr=[];
				var date=new Date;
				var year=date.getFullYear(); 
				for(var i =1990;i<=year;i++){
					ruxueArr.push(i)
					
				};
				
				var mobileSelect1 = new MobileSelect({
				    trigger: '#nianfen',
				    title: '入学年份',
				   
				    wheels: [
				                {data: ruxueArr}
				            ],
				    position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
				    transitionEnd:function(indexArr, data){
				        //console.log(data);
				    },
				    callback:function(indexArr, data){
				        //console.log(data);
				    }
				});		
			}
		},
		mounted(){
			let _this = this
			let uid = this.$cookie.get('userId')
			_this.userId = uid
			if(uid == null){
		        this.$router.push('/')
		    }
			this.chusheng();
			this.PostInfo();
		},
		watch: {
			'$route' (to, from) {
				if(to.name === 'JingLi') { //跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面 
					this.PostInfo()
				}
			}
		}
	}
</script>

