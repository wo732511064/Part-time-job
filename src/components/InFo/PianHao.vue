<template>
	<div class="xinxi">
		<div class="Info-tanchuang" v-show="tanchuang">
			保存成功
		</div>
		<div class="xinxi-popur" v-show="popur">
			<div class="xinxi-frame">
				<div class="xinxi-frame-header clearfix">
					<div class="frame-header-button" @click="Cheaked">确认</div>
					<div class="frame-header-button" @click="PopurNone">取消</div>
				</div>
				<div class="xinxi-frame-bottom clearfix" id="xuanze">
				</div>
			</div>	
		</div>
		<div class="xinxi-header clearfix">
			<div @click="goback" class="xinxi-header-return"><img src="../../../static/return.png">返回</div>
			<div class="xinxi-header-center">求职偏好</div>
			<div @click="Save" class="xinxi-header-save">保存</div>
		</div>
	
		<div class="xinxi-center">
			
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">求职类型</div>
				<div class="xinxi-center-line-right" @click="Popur">
					{{info.qiuzhitype}}
			    </div>
			</div>
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">偏好地区</div>
				<div class="xinxi-center-line-right">
					<input type="text" v-model="info.address">
				</div>
			</div>
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">空闲时间</div>
				<div class="xinxi-center-line-right">
					 <div class="fixWidth">
				        <div class="demo">
				            <div id="kongxian">{{info.mytime}}</div>
				        </div>
				    </div>
			    </div>
			</div>
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">工作时间</div>
				<div class="xinxi-center-line-right">
					 <div class="fixWidth">
				        <div class="demo">
				            <div id="gongzuo">{{info.jobtime}}</div>
				        </div>
				    </div>
			    </div>
			</div>
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">期望职业</div>
				<div class="xinxi-center-line-right">
					<input type="text" v-model="info.expectjob">
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.xinxi{background:#f7f7f7;position: fixed;top: 0;bottom: 0;right: 0;left: 0;overflow-y: scroll;z-index: 10;}
	.xinxi-popur{position: absolute;width: 100%;height: 100%;background: rgba(0,0,0,0.5);}
	.xinxi-frame{z-index: 1000;border-radius: 0.1rem;background: white;position: absolute;top: 50%;left: 50%;width: 5rem;margin-top: -2rem;margin-left: -2.5rem;}
	.xinxi-frame-header{height: 0.8rem;width: 100%;border-bottom: 1px solid #f9f9f9;}
	.frame-header-button{text-align: center;padding:0 0.1rem;border-radius:0.1rem ;line-height: 0.5rem;width: 0.6rem;font-size: 0.26rem;height: 0.5rem;margin-top: 0.15rem;margin-right: 0.15rem;float: right;background: #1296DB;color: white;}
	.frame-header-button:nth-child(2){background: #FF0000;}
	.xinxi-frame-bottom{padding:0.5rem 0 0.5rem 0.5rem ;box-sizing: border-box;}
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
	.xinxi-center-line-right{float: left;width: 60%;font-size: 0.28rem;height: 0.32rem;}
	.xinxi-center-line-right input{border: 0;outline: none;font-size: 0.28rem;}
	.xinxi-center-line-right-radio{width: 2rem;float: left;font-size: 0.28rem;}
	.xinxi-center-line-right-radio span{padding: 0 0.2rem;line-height: 0.6rem;float: left;}
</style>

<script>
	import axios from 'axios'
	import Vue from 'vue'
	import qs from 'qs';
	import "@/assets/js/mobileSelect.min.js"
	
	export default {
		
		data() {　　　　　　
			return {　
				tanchuang:false,
				popur:false,
				info:{
					
				}
		        
			}　　　　
		},
		
		methods:{
			goback(){
				window.history.back()
			},
			
			Popur(){
				let _this = this
				_this.popur = true
			},
			PopurNone(){
				let _this = this
				_this.popur = false
			},
			Cheaked(){
				let _this = this
				_this.popur = false
				let obj = document.getElementsByName("qiuzhi");
				let check_val = [];
				let check_html = [];
			    for(var k=0;k<obj.length;k++){
			        if(obj[k].checked){
			        	check_val.push(obj[k].value);
			        	check_html.push(obj[k].nextSibling.innerHTML)
			        }    
			    }
			    _this.info.qiuzhitypeId = ""
			    _this.info.qiuzhitypeId = check_val.join(",");
			     _this.info.qiuzhitype = ""
			    _this.info.qiuzhitype = check_html.join(",");
			},
			Save(){
				let _this = this
				let uid = this.$cookie.get('userId')
				if(uid == null){
			        this.$router.push('/')
			    }else{
			    	if(document.getElementById("kongxian").innerHTML == "不限"){
    					 _this.info.mytime = 1
					}
					else if(document.getElementById("kongxian").innerHTML == "仅周末"){
					    _this.info.mytime = 2
					}
					else if(document.getElementById("kongxian").innerHTML == "仅工作日"){
					    _this.info.mytime = 3
					}
					else if(document.getElementById("kongxian").innerHTML == "寒暑假"){
					 	 _this.info.mytime = 4
					}
					else{
						 _this.info.mytime = 5
					}
					_this.info.jobtime = document.getElementById("gongzuo").innerHTML
					this.$post('user/save-info',qs.stringify({userId:uid,qiuzhitype:_this.info.qiuzhitypeId,address:_this.info.address,mytime:_this.info.mytime,jobtime:_this.info.jobtime,expectjob:_this.info.expectjob}))
				      .then((response) => {
				      			_this.tanchuang = true
				      			console.log(_this.info.qiuzhitypeId)
				      			setTimeout(function(){
						                _this.$router.push('/Info')
						            },1000)
						})
			    }
				
			},
			PostInfo(){
					let _this = this
					this.$post('user/info',qs.stringify({userId:_this.userId}))
				      .then((response) => {
							 _this.info = JSON.parse(response.data.data)
							 console.log(_this.info)
						})
				},
			chusheng(){
				let _this = this 
			   this.$post('parttime/filter-type')
			      .then((response) => {
			        	let data1 = JSON.parse(response.data.data).jobList							
							let jslength=0;
							 for(var js2 in data1){
							 	jslength++;
							 }
							 
							for(var i=1;i<jslength;i++){
								var div = document.createElement('div'); 
								div.innerHTML="<div class='xinxi-center-line-right-radio'><input type='checkbox' name='qiuzhi' class='mgc mgc-success1'  value="+i+"><span>"+ data1[i].tname +"</span></div>";
								document.getElementById("xuanze").appendChild(div) 
							}
							
			      })
		       
				
				
				var kongxianArr=['不限','仅周末','仅工作日','寒暑假','节假日'];
				
				var mobileSelect2 = new MobileSelect({
				    trigger: '#kongxian',
				    title: '空闲时间',
				    wheels: [
				                {data: kongxianArr}
				            ],
				    position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
				    transitionEnd:function(indexArr, data){
				        //console.log(data);
				    },
				    callback:function(indexArr, data){
				        //console.log(data);
				    }
				});
				var numArr=[];
				for(var i =0;i<24;i++){
					
					if(i<10){
						numArr.push("0"+i);
					}else{
						numArr.push(i)
					}
					
				};
				var numArr1=[':'];
				var numArr2=[];
				for(var i =0;i<60;i+=5){
					
					if(i<10){
						numArr2.push("0"+i);
					}else{
						numArr2.push(i)
					}
					
				};
				var numArr3=['-'];
				var numArr4=[];
				for(var i =0;i<24;i++){
					
					if(i<10){
						numArr4.push("0"+i);
					}else{
						numArr4.push(i)
					}
					
				};
				var numArr5=[':'];
				var numArr6=[];
				for(var i =0;i<60;i+=5){
					
					if(i<10){
						numArr6.push("0"+i);
					}else{
						numArr6.push(i)
					}
					
				};
				
				var mobileSelect3 = new MobileSelect({
				    trigger: '#gongzuo',
				    title: '工作时间',
				    wheels: [
				                {data: numArr},
				                {data: numArr1},
				                {data: numArr2},
				                {data: numArr3},
				                {data: numArr4},
				                {data: numArr5},
				                {data: numArr6}
				            ],
				    position:[0, 0, 0, 0, 0],
				    transitionEnd:function(indexArr, data){
//				        console.log(data);
				        
				    },
				    callback:function(indexArr, data){
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
				if(to.name === 'PianHao') { //跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面 
					this.PostInfo()
				}
			}
		}
	}
</script>

