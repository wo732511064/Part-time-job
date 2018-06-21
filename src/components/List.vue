<template>
	<div>
		<div class="index-list-header" >
		
	    	<div class="index-list-header-frame" @click.prevent.stop="listShow()" 
	                @keydown.prevent.40="arrowDown1" @keydown.prevent.38="arrowUp1">
	            {{selectItem}}
	            <span  :class="['triangle',showList==false?'triangleShow':'triangleHidden']"></span>
	        </div>
	        <div class="index-popur" v-if="showList" @click="showList=false">
	            <div class="index-list-block"  @click.prevent.stop>	                
	                <div v-for="item in obj" class="index-list-block-line" @click="selectOption(item)" >  {{item.tname}} </div>
	            </div>
	    	</div>
	       
	       
	   
	        <div class="index-list-header-frame" @click.prevent.stop="listShow2()" 
	                @keydown.prevent.40="arrowDown2" @keydown.prevent.38="arrowUp2">
	            {{selectItem2}}
	            <span  :class="['triangle',showList2==false?'triangleShow':'triangleHidden']"></span>
	        </div>
	        <div class="index-popur" v-if="showList2" @click="showList2=false">      	
	            <div class="index-list-block" @click.prevent.stop>
	                <div v-for="item in obj2" class="index-list-block-line" @click="selectOption2(item)">  {{item.tname}} </div>
	            </div>
	    	</div>
	    
	    
	        <div class="index-list-header-frame" @click.prevent.stop="listShow3()" 
	                @keydown.prevent.40="arrowDown3" @keydown.prevent.38="arrowUp3">
	            {{selectItem3}}
	            <span  :class="['triangle',showList3==false?'triangleShow':'triangleHidden']"></span>
	        </div>
	        <div class="index-popur" v-if="showList3" @click="showList3=false">
	            <div class="index-list-block" @click.prevent.stop>
	                <div v-for="item in obj3" class="index-list-block-line" @click="selectOption3(item)">  {{item.tname}} </div>
	            </div>
	    	</div>
	</div>
	<div style="position: relative;">
		<div v-show="loading" class="loading">
			<img src="../../static/img/loading.gif">
		</div>
		<div class="index-list-frame" ref="foodsWrapper" v-show="list">
			
			<div class="index-list-frame-list" v-for="(list,index) in Lists">
				<router-link :to="{path:'/PartDetails',query:{jobid:list.jobid}}" style="display: block;" >
					<img class="frame-list-img" :src="'http://jzadmin.bellairehc.com/'+list.listsrc">
					<div class="frame-list-1 clearfix">
						<div class="frame-list-title">{{list.title}}</div>
						
					</div>
					<div class="frame-list-2 clearfix">
						
						<div class="frame-list-time"><img src="../../static/img/baoming.png">已报名{{list.participate}}人</div>
						<div class="frame-list-baoming"><img src="../../static/img/jiesuan.png">{{list.days}}</div>
					</div>
					<div class="frame-list-2 clearfix">
						<div class="frame-list-money">{{list.money}}</div>
						<div class="frame-list-day">{{list.recruittype}}</div>
						
					</div>
				</router-link>
			</div>
			<div class="index-list-frame-tishi1" ref="shangla">上拉加载更多</div>
			<div class="index-list-frame-tishi" ref="tishi">没有更多了...</div>
		</div>
	</div>
	
	</div>
</template>
<script>
import axios from 'axios'
import Vue from 'vue'
import qs from 'qs';
Vue.prototype.$http = axios
// let serverUrl = '/api/' //本地调试时 
//let serverUrl = 'http://jz.bellairehc.com/' //打包部署上线时 


export default {
	data() {　　　　　　
		return {　　
			loading:true,
			list:false,
	        listHeight: [],
	        foodsScrollY: 0,
			selectedFood:"",
			offset:0,
			scroll: '',
			gongzuoid:'0',
			zhaomuid:'0',
			jiesuanid:'0',
			Lists:[
				{
					listsrc:'upload/jobtypeimg/20180528071502.jpg',
					jobid:"",
					days:"123",
					money:'100元/天',
					participate:'0',
					recruittype:'个人',
					title:'发传单活动',
				}
			],
			showList:false,
                obj:[
                    {tname:"全部",id:"0"},
                    
                ],
                filterText:"",
                selectItem:"工作类型",

                showList2:false,
                obj2:[
                    {tname:"个人/团队"},
                    
                ],
                filterText2:"",
                selectItem2:"招募类型",
                
                showList3:false,
                obj3:[
                	{tname:"全部"},
                   
                ],
                filterText3:"",
                selectItem3:"结算类型"
		}　　　　
	},
	created() {
	    this.postdata();
	  },
	
	methods: {
		
		menu() {
			let _this = this 
	        this.scroll = document.documentElement.scrollTop || document.body.scrollTop;
	        if(document.documentElement.offsetHeight == document.documentElement.clientHeight+this.scroll){
				_this.offset += 20;
			  
				this.$post('parttime/item-list',qs.stringify({offset:_this.offset,jobtype:_this.gongzuoid,recruittype:_this.zhaomuid,settlementtype:_this.jiesuanid}))
			      .then((response) => {
			        if(response.data.status == "success"){
						let data1 = JSON.parse(response.data.data)
						_this.Lists = _this.Lists.concat(JSON.parse(response.data.data))
						_this.$refs.shangla.style.display = "block";
						_this.$refs.tishi.style.display = "none";
					}else{
						_this.$refs.shangla.style.display = "none";
						_this.$refs.tishi.style.display = "block";
					}
			      })
	       }	       
	     },
		
	    postdata(){
				let _this = this
				let axiosDate = new Date()
				this.$post('parttime/item-list',JSON.stringify({"data":{offset:_this.offset,jobtype:_this.gongzuoid,recruittype:_this.zhaomuid,settlementtype:_this.jiesuanid}}))
			      .then((response) => {
			        console.log(response)
//			        	let oDate = new Date()
//						 let time = oDate.getTime() - axiosDate.getTime()
//						console.log(JSON.parse(response.data.data))
//						_this.Lists = JSON.parse(response.data.data);
//						setTimeout(() => {
//						 	 _this.loading = false;
//							
//						 }, time)
//						_this.list = true;
			      })
//			    this.$post('parttime/filter-type')
//			      .then((response) => {
//			        _this.obj = JSON.parse(response.data.data).jobList;
//					_this.obj2 = JSON.parse(response.data.data).recruitTypeList;
//					_this.obj3 = JSON.parse(response.data.data).settlementType;
//			      })
			},
	    ListPost(item){
	    		let _this = this 
				_this.offset = 0;
				this.$post('parttime/item-list',qs.stringify({offset:_this.offset,jobtype:_this.gongzuoid ,recruittype:_this.zhaomuid,settlementtype:_this.jiesuanid}))
			      .then((response) => {
			        _this.Lists = JSON.parse(response.data.data);
					if(_this.Lists === null){
			       		_this.$refs.shangla.style.display = "none";
						_this.$refs.tishi.style.display = "block";
				    }else{
				    	if(document.documentElement.offsetHeight >= document.documentElement.clientHeight){
				       		_this.$refs.shangla.style.display = "none";
							_this.$refs.tishi.style.display = "block";
						
				       }else{
				       		_this.$refs.shangla.style.display = "block";
							_this.$refs.tishi.style.display = "none";
							
				       }
				    }
			      })
				
		       
	   },
		listShow(){
                this.showList=!this.showList;
                if (this.showList2) {
                    this.showList2 = false;
                }
                if (this.showList3) {
                    this.showList3 = false;
                }
            },
            selectOption(item){
                this.selectItem=item.tname;
                this.showList=false;
				let _this = this 
				_this.gongzuoid = item.id;
                this.ListPost(item);
            },
            // 第一个下拉列表 按键：向下的箭头
            arrowDown1(e){
                if (!this.showList) {
                    this.showList = true;
                }
                if (this.showList2) {
                    this.showList2 = false;
                }
                if (this.showList3) {
                    this.showList3 = false;
                }
            },
            // 第一个下拉列表 按键：向上的箭头
            arrowUp1(e){
                if (this.showList) {
                    this.showList = false;
                }
                if (this.showList2) {
                    this.showList2 = false;
                }
                if (this.showList3) {
                    this.showList3 = false;
                }
            },
            listShow2(){
                this.showList2=!this.showList2;
                if (this.showList) {
                    this.showList = false;
                }
                if (this.showList3) {
                    this.showList3 = false;
                }
            },
            selectOption2(item){
                this.selectItem2=item.tname;
                this.showList2=false;
				let _this = this 
				_this.zhaomuid = item.id;
			   this.ListPost(item);
            },
            // 第二个下拉列表 按键：向下的箭头
            arrowDown2(e){
                if (!this.showList2) {
                    this.showList2 = true;
                }
                if (this.showList) {
                    this.showList = false;
                }
                if (this.showList3) {
                    this.showList3 = false;
                }
            },
            // 第一个下拉列表 按键：向上的箭头
            arrowUp2(e){
                if (this.showList2) {
                    this.showList2 = false;
                }
                if (this.showList) {
                    this.showList = false;
                } 
                if (this.showList3) {
                    this.showList3 = false;
                }
            },
            listShow3(){
                this.showList3=!this.showList3;
                if (this.showList) {
                    this.showList = false;
                }
                if (this.showList2) {
                    this.showList2 = false;
                }
            },
            selectOption3(item){
                this.selectItem3=item.tname;
                this.showList3=false;
				let _this = this 
				_this.jiesuanid = item.id;
			    this.ListPost(item);
            },
            // 第二个下拉列表 按键：向下的箭头
            arrowDown3(e){
                if (!this.showList3) {
                    this.showList3 = true;
                }
                if (this.showList) {
                    this.showList = false;
                }
                if (this.showList2) {
                    this.showList2 = false;
                }
            },
            
            arrowUp3(e){
                if (this.showList3) {
                    this.showList3 = false;
                }
                if (this.showList) {
                    this.showList = false;
                } 
                if (this.showList2) {
                    this.showList2 = false;
                }
            },
	   },
	  
	  	mounted() {
	      window.addEventListener('scroll', this.menu);
	      
	    },
	
	    beforeRouteLeave(to, from, next) { 
				 let position = window.scrollY //记录离开页面的位置 
				 if (position == null) position = 0 
				 this.$store.commit('changeRecruitScrollY', position) //离开路由时把位置存起来 
				 next() 
		}, 
	 	 watch:{
            '$store.getters.getClickRootNum': function () {
                if (this.showList){
                    this.showList = false;
                }
                if (this.showList2) {
                    this.showList2 = false;
                }
                if (this.showList3) {
                    this.showList3 = false;
                }
            },
             '$route' (to, from) { 
			 if (to.name === 'List') {//跳转的的页面的名称是"NewRecruit",这里就相当于我们listview页面，或者原始页面 
				
				 let recruitScrollY = this.$store.state.recruitScrollY
				 document.documentElement.scrollTop = recruitScrollY
				 document.body.scrollTop = recruitScrollY
				 } 
        	}
        }
}

</script>