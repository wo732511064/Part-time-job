<template>
	<div class="xinxi">
		<div class="Info-tanchuang" v-show="tanchuang">
			保存成功
		</div>
		<div class="xinxi-header clearfix">
			<div @click="goback" class="xinxi-header-return"><img src="../../../static/return.png">返回</div>
			<div class="xinxi-header-center">基本信息</div>
			<div class="xinxi-header-save" @click="Save">保存</div>
		</div>
		<div class="xinxi-center">
			<div class="xinxi-center-line clearfix" style="position: relative;">
				<div class="xinxi-center-line-leftimg">头像</div>
				<div class="xinxi-center-line-img">
					<img :src="image">
					<img src="../../../static/img/return1.png">
				</div>
				<input  accept="image/png,image/jpg,image/jpeg" type="file" id="saveImage" style="opacity: 0;width: 1.8rem;height: 1rem;position: absolute;right: 0;top: 0.2rem;" name="myphoto"  @change="imageSubmit">
			</div>
			   
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">昵称</div>
				<div class="xinxi-center-line-right">
					<input type="text" v-model="info.nickname">
				</div>
			</div>
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">出生年份</div>
				<div class="xinxi-center-line-right">
					 <div class="fixWidth">
				        <div class="demo">
				            <div id="trigger1">{{info.birthday}}</div>
				        </div>
				    </div>
			    </div>
			</div>
			
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left1">性别</div>
				<div class="xinxi-center-line-right">
					<div class="xinxi-center-line-right-radio"><input type="radio" class="mgc mgc-success" v-model="info.sex" value="男"  checked/><span>男</span></div>
					<div class="xinxi-center-line-right-radio"><input type="radio" class="mgc mgc-success" v-model="info.sex"  value="女"/><span>女</span></div>
				</div>
			</div>
			<div class="xinxi-center-line clearfix">
				<div class="xinxi-center-line-left">学历</div>
				<div class="xinxi-center-line-right">
					<div class="fixWidth">
				        <div class="demo">
				            <div id="xueli" ref="xueli">{{info.education}}</div>
				        </div>
				    </div>
				</div>
			</div>
		</div>
	</div>
</template>

<style>
	.xinxi{background:#f7f7f7;position: fixed;top: 0;bottom: 0;right: 0;left: 0;overflow-y: scroll;z-index: 10;}
	.Info-tanchuang{z-index: 1000;position: absolute;width: 4rem;height: 2rem;top: 50%;left: 50%;margin-left: -2rem;margin-top: -1rem;background: rgba(0,0,0,0.7);color: white;border-radius:0.5rem;text-align: center;line-height: 2rem;font-size: 0.5rem;}
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
	.xinxi-center-line-img img{width:1rem;height: 1rem;border-radius: 50%;margin-right: 0.1rem;object-fit:cover}
	.xinxi-center-line-img img:nth-child(2){width:0.3rem;height: 0.3rem;border-radius: 50%;float: right;margin-top: 0.35rem;margin-right: 0.2rem;}
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
				personalPhoto:true,
				tanchuang:false,
				image:'',
				imagesave:"",
				userId:'',　
				info:{
            		sex:'',
            	},
		        
			}　　　　
		},
		methods:{
			goback(){
				window.history.back()
			},
			 great(){  
	          document.getElementById('saveImage').onchange = function () {  
	          var imgFile = this.files[0];  
	          var fr = new FileReader();  
	          fr.readAsDataURL(imgFile);  
	          }  
	        },
	        getRoundedCanvas (sourceCanvas) {
		       
		      var canvas = document.createElement('canvas');
		      var context = canvas.getContext('2d');
		      var width = sourceCanvas.width;
		      var height = sourceCanvas.height;
		      //为了每张图片的大小不超过50k,所以不论裁剪多大，最后上传的，最大宽度不超过90。
		      if(width > 90){
		        width = 90
		      }
		      if(height > 90){
		        height = 90
		      }
		       
		      canvas.width = width;
		      canvas.height = height;
		 
		      context.imageSmoothingEnabled = true;
		      context.drawImage(sourceCanvas, 0, 0, width, height);
		      context.globalCompositeOperation = 'destination-in';
		      context.beginPath();
		      context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true);
		      context.fill();
		 
		      return canvas;
		    },
	        imageSubmit(){  
	          let _this = this
	          let x = document.getElementById('saveImage').files[0];  
	          let params = new FormData() ; //创建一个form对象  
	          params.append('file',x);  //append 向form表单添加数据  
	          params.append('userId',_this.userId);
	          //添加请求头  通过form添加的图片和文件的格式必须是multipart/form-data  
	          console.log(params)
	          let config = {  
	            headers:{'Content-Type':'multipart/form-data'}  
	          };  
	          this.$post('user/upload-img',params,config)
				      .then((response) => {
				        	_this.info.image = JSON.parse(response.data.data).imgpath
				        	console.log(_this.info.image)
				        	_this.image = 'http://jzadmin.bellairehc.com/' + _this.info.image
							console.log(response)
						})
	        }  ,
	       
			Save(){
				let _this = this
				let uid = this.$cookie.get('userId')
				if(uid == null){
			        this.$router.push('/')
			   }else{
			   		if(_this.info.sex == "女"){
						_this.info.sex = 0
					}else{
						_this.info.sex = 1
					}
					
					if(document.getElementById("xueli").innerHTML == "专科生"){
    					 _this.info.education = 0
					}
					else if(document.getElementById("xueli").innerHTML == "本科生"){
					 	_this.info.education = 1
					}
					else if(document.getElementById("xueli").innerHTML == "研究生"){
					    _this.info.education = 2
					}
					else if(document.getElementById("xueli").innerHTML == "硕士生"){
					    _this.info.education = 3
					}
					else if(document.getElementById("xueli").innerHTML == "博士生"){
					 	 _this.info.education = 4
					}
					else{
						 _this.info.education = 5
					}
					_this.info.birthday = document.getElementById("trigger1").innerHTML
					console.log(_this.info.education)
					this.$post('user/save-info',qs.stringify({userId:uid,image:_this.info.image,nickname:_this.info.nickname,birthday:_this.info.birthday,sex:_this.info.sex,education:_this.info.education}))
				      .then((response) => {
				      			_this.tanchuang = true
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
				        	console.log(JSON.parse(response.data.data))
							 _this.info = JSON.parse(response.data.data)
			               _this.image = 'http://jzadmin.bellairehc.com/' + JSON.parse(response.data.data).image
						})
				    
				},
			chusheng(){
				var weekdayArr=[];
				for(var i =1960;i<2004;i++){
					weekdayArr.push(i);
				};
				var mobileSelect1 = new MobileSelect({
				    trigger: '#trigger1',
				    title: '出生年份',
				    wheels: [
				                {data: weekdayArr}
				            ],
				    position:[20], //初始化定位 打开时默认选中的哪个 如果不填默认为0
				    transitionEnd:function(indexArr, data){
				        //console.log(data);
				    },
				    callback:function(indexArr, data){
				        console.log(data);
				    }
				});
			},
			xueli(){
				var xueliArr=['专科生','本科生','研究所','硕士生','博士生','其他'];
				var mobileSelect2 = new MobileSelect({
				    trigger: '#xueli',
				    title: '学历',
				    wheels: [
				                {data: xueliArr}
				            ],
				    position:[4], //初始化定位 打开时默认选中的哪个 如果不填默认为0
				    transitionEnd:function(indexArr, data){
				        //console.log(data);
				    },
				    callback:function(indexArr, data){
				        console.log(data);
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
			this.xueli();
			this.PostInfo();
			this.great();
			
		},
		watch: {
			'$route' (to, from) {
				if(to.name === 'XinXi') { //跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面 
					this.PostInfo()
				}
			}
		}
	}
</script>

