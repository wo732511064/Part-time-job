<template>	
	<div class="partdetails" >
		<div class="partdetails-header clearfix">
			<div @click="goback" class="partdetails-header-return"><img src="../../static/return.png">返回</div>
			<div class="partdetails-header-center">兼职详情</div>
			
		</div>
		<div v-show="loading" class="loading">
			<img src="../../static/img/loading.gif">
		</div>
		<div v-show="part">
			<div class="partdetails-content">
				<div class="partdetails-content-header clearfix" >
					<div class="partdetails-content-header-title">{{infos.title}}</div>
					<div class="partdetails-content-header-zhaomu">{{infos.state=="1"?"招募中":(infos.state=="2"?"已结束":"禁止")}}</div>
					<div class="partdetails-content-header-baoming">已报名:{{infos.participate}}人</div>
				</div>
				<div class="partdetails-content-bottom clearfix">
					<div class="partdetails-content-bottom-text">薪资：{{infos.remuneration}}元/一天</div>
					<div class="partdetails-content-bottom-text1">类型：{{infos.jobtypename}}</div>
					<div class="partdetails-content-bottom-text1">结算：{{infos.settlementtypename}}</div>
					<div class="partdetails-content-bottom-text">地点：{{infos.job_addr}}</div>
					<div class="partdetails-content-bottom-text"><span>开始</span>{{infos.start_time}} <span></span>—<span></span> <span>结束</span>{{infos.end_time}}</div>
				
				</div>
				
			</div>
			<div class="partdetails-bottom">
				<div class="partdetails-bottom-header clearfix">
					<div class="partdetails-bottom-header-frame">
						<img src="../../static/money1.png">钱太少<span>0</span>
					</div>
					<div class="partdetails-bottom-header-frame">
						<img src="../../static/time.png">时间紧<span>0</span>
					</div>
					<div class="partdetails-bottom-header-frame">
						<img src="../../static/bian.png">不靠谱<span>0</span>
					</div>
					<div class="partdetails-bottom-header-frame">
						<img src="../../static/yuan.png">离我远<span>0</span>
					</div>
				</div>
				<div class="partdetails-detailed">
					<div class="partdetails-detailed-title">
						职业描述
					</div>
					<div class="partdetails-detailed-miaosu active" v-html="infos.pdescribe" ref="miaosu">
						
					</div>
					<div class="partdetails-detailed-zhankai" @click="DJzhankai" ref="zhankai">— 点击展开 —</div>
					<div class="partdetails-detailed-zhankai" @click="DJshouhui" ref="shouhui">— 收回 —</div>
				</div>
			</div>
		</div>
		<div class="partdetails-baoming clearfix">
			<div class="partdetails-baoming-shoucang">
				<img src="../../static/img/shoucang.png">收藏
			</div>
			<div class="partdetails-baoming-button">
				报名参加
			</div>
		</div>
	</div>
	
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
	export default {
		data() {　　　　　　
			return {　
				
		        infos:{
		        		title:"知名公司招聘市场推销员",
		        		state:"1",
		        		participate:"0",
		        		remuneration:"2000",
		        		jobtypename:"跑腿办事",
		        		settlementtypename:"月结",
		        		job_addr:"广州天河区",
		        		pdescribe:"工作内容：<br>1. 负责区域内新零售便利购货柜的补货；<br>2. 确保补货货品的数量、编码等信息无误，确保货品无破损，防止不合格货品补入货柜；<br>3. 负责微仓站点理货、盘点等日常工作；<br>4. 无补货任务时，负责站点对个人客户的日常配送，按单量提成，多劳多得。<br>工作要求：<br>1. 有配送员、快递员、自提货柜等工作经验的优先；<br>2. 20-40岁，高中/中专及以上学历；<br>3. 吃苦耐劳，认真负责，具有服务意识；<br>4. 自备电动单车或电动三轮车。<br>工作薪资：<br>综合薪资7000-9000，按补货及配送单量结算（本月起，最低保底5000元/月）<br>五险+商业险（15号之前入职当月买，15号后次月买）<br>上班时间：<br>每周一至周六早8:00-晚9:00，周日可自行安排（如业务紧张需配合送货）<br>特别备注：<br>岗位合适直接来电报名，或发送姓名+电话+站点+每日优鲜补货配送员到下面号码里，微--信和下面号-码同-号。加我微--信记得备注好姓名+电话+站点+每日优鲜补货配送员。"
		        },
		        loading:true,
				part:false,　
			}　　　　
		},
		
		methods:{
			goback(){
				window.history.back()
			},
			fetchDate(){
				let _this = this
				_this.jobid = _this.$route.query.jobid
				let axiosDate = new Date()
				this.$post('parttime/job-info',{jobid:this.jobid})
			      .then((response) => {
			        	_this.infos = JSON.parse(response.data);
							
							let oDate = new Date()
				 			let time = oDate.getTime() - axiosDate.getTime()
							setTimeout(() => {
							 	 _this.loading = false;
							 	 _this.part = true;
							 }, time)
							
							if( _this.infos.start_time != 0 ){  
                                let date = new Date(_this.infos.start_time*1000);  
                                let Y = date.getFullYear() + '年';  
                                let  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';  
                                let D = date.getDate() + '日';  
                                _this.infos.start_time = Y+M+D 
                            }
							if( _this.infos.end_time != 0 ){  
                                let date = new Date(_this.infos.end_time*1000);  
                                let Y = date.getFullYear() + '年';  
                                let  M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';  
                                let D = date.getDate() + '日';  
                                _this.infos.end_time = Y+M+D 
                            }
			      })
			},
			
			 ZhanKai(){
			 	this.$nextTick(()=>{
			 		
				 	if(document.querySelector(".partdetails-detailed-miaosu").offsetHeight >= 100 * (document.documentElement.clientWidth / 750)*4.5){
				 		this.$refs.miaosu.classList.add("active");
				 		this.$refs.zhankai.classList.add("active");
				 		this.$refs.shouhui.classList.remove("active");
				 	}else{
				 		this.$refs.zhankai.classList.remove("active");
				 		this.$refs.shouhui.classList.remove("active");
				 	}
			 	})

			 },
			 DJzhankai(){
			 	this.$refs.miaosu.classList.remove("active");
				this.$refs.zhankai.classList.remove("active");
			 	this.$refs.shouhui.classList.add("active");
			 },
			 DJshouhui(){
			 	this.$refs.miaosu.classList.add("active");
			 	this.$refs.zhankai.classList.add("active");
			 	this.$refs.shouhui.classList.remove("active");
			 }
			
		},
		beforeUpdate(){
		    this.ZhanKai();
		},
		
		 watch: { 
			 '$route' (to, from) { 
			 if (to.name === 'PartDetails') {//跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面 
				 let _this = this
				 _this.loading = true;
				_this.part = false;
				this.fetchDate();
				 } 
        }
		
		},
		mounted(){
			this.fetchDate();
			
		},
		
	}
	
</script>

<style>
	.partdetails{background: #f7f7f7;position: fixed;top: 0;bottom: 0;right: 0;left: 0;overflow-y: scroll;z-index: 10;padding-bottom: 1.1rem;}
	.partdetails-header{height: 1rem;width: 100%;background:#5487d6;color: white;}
	.partdetails-header-return{width:1.3rem ;height: 1rem;line-height: 1rem;font-size: 0.3rem;float: left;}
	.partdetails-header-return img{width:0.2rem ;float: left;margin:0.33rem 0.1rem;}
	.partdetails-header-center{width:5rem;text-align: center;line-height: 1rem;float: left;font-size: 0.36rem;}
	.partdetails-content{width: 100%;background: white;border-bottom: 1px solid #dbdcde;}
	.partdetails-content-header{padding: 0.4rem 0 0.3rem 0;box-sizing: border-box;border-bottom:1px dotted #808080;margin-left: 0.3rem;}
	.partdetails-content-header-title{float: left;width: 5.8rem;font-size: 0.36rem;font-weight: bold;margin-bottom: 0.25rem;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
	.partdetails-content-header-zhaomu{margin-bottom: 0.4rem;float: right;margin-right: 0.2rem;font-size: 0.28rem;height: 0.36rem;border: 1px solid #5487d6;line-height: 0.38rem;color: #5487d6;text-align: center;padding: 0 0.1rem;}
	.partdetails-content-header-baoming{float: left;color: #a8a8a8;font-size: 0.28rem;}
	.partdetails-content-bottom{padding: 0.35rem 0 0.3rem 0.3rem;}
	.partdetails-content-bottom-text{width: 100%;font-size: 0.28rem;margin-bottom: 0.15rem;float: left;}
	.partdetails-content-bottom-text1{width: 50%;font-size: 0.28rem;margin-bottom: 0.15rem;float: left;}
	.partdetails-content-bottom-text span{color: #2569d2;margin-right: 0.3rem;}
	.partdetails-bottom{border:1px solid #dbdcde ;margin-top: 0.2rem;background: white;}
	.partdetails-bottom-header{background: #f9fafc;padding: 0.25rem 0.8rem 0 0.8rem;box-sizing: border-box;color: #8d8d97;}
	.partdetails-bottom-header-frame{height: 0.36rem;line-height: 0.36rem;width: 50%;text-align: center;float: left;font-size: 0.3rem;margin-bottom: 0.2rem;cursor: pointer;}
	.partdetails-bottom-header-frame img{width: 0.36rem;float: left;margin-left: 0.5rem;}
	.partdetails-bottom-header-frame span{margin: 0 0.2rem;}
	.partdetails-detailed{background: white;padding: 0.55rem 0.3rem 0.3rem 0.3rem;}
	.partdetails-detailed-title{font-size: 0.36rem;font-weight: bold;height:0.8rem;}
	.partdetails-detailed-miaosu{font-size: 0.28rem;color: #9c9c9c;line-height: 0.48rem;}
	.partdetails-detailed-miaosu.active{max-height: 5.3rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 11;-webkit-box-orient: vertical;}
	.partdetails-detailed-zhankai{font-size:0.28rem;width: 100%;left: 0;bottom: 0;text-align: center;display: none;padding: 0.5rem 0 0.3rem 0 ;}
	.partdetails-detailed-zhankai.active{display: block;}
	.partdetails-baoming{position:fixed;bottom: 0;left: 0;height: 1rem;background: white;width: 100%;}
	.partdetails-baoming-shoucang{position: relative;padding-left: 0.4rem;width: 1.9rem;box-sizing: border-box;float: left;text-align: center;line-height: 1rem;font-size: 0.32rem;}
	.partdetails-baoming-shoucang img{position:absolute;width: 0.4rem;left: 0.4rem;top: 0.3rem;}
	.partdetails-baoming-button{width: 5.5rem;background: #5487d6;float: right;text-align: center;line-height: 1rem;font-size: 0.38rem;color: white;}
</style>