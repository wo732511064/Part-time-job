<template>
	<div class="index">
		<div class="header">
			<div class="header-select">
				<router-link to='' class="header-address">广州▼</router-link>
				<span></span>
				<input type="search" placeholder="查找">
				<img src="../../static/search.png">
			</div>
		</div>
		
		<div class="index-top clearfix">
			<div v-model="name"></div>
			<div class="index-top-chunk"><div class="index-top-ico ye"><img src="../../static/money.png"></div>高薪全职</div>
			<div class="index-top-chunk"><div class="index-top-ico or"><img src="../../static/fujin.png"></div>离你最近</div>
			<div class="index-top-chunk"><div class="index-top-ico bl"><img src="../../static/game.png"></div>边玩边赚</div>
			<div class="index-top-chunk"><div class="index-top-ico pu"><img src="../../static/shangban.png"></div>极速上岗</div>
			<div class="index-top-chunk"><div class="index-top-ico re"><img src="../../static/zhaopin1.png"></div>周末急招</div>
		</div>
		
		<div class="index-list">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
        </div>    

		
		
	</div>
</template>
<style>
.index-popur{z-index:1;position:absolute;left:0;width:100%;top:1.2rem;height:100%;min-height: 11rem;background:rgba(0,0,0,.5);overflow:hidden;transition:all .3s}
.index-list-block{background:#fff;padding:0 .2rem;box-sizing:border-box;width:100%;color:#666;background:#fff;transition: all 0.5s;}
.index-list-block-line{height:.8rem;width:100%;font-size:.3rem;border-bottom:1px solid #ccc;line-height:.8rem}
.index-list-block-line:last-child{border:0}
.triangle{display:inline-block;position:absolute;top:.4rem;right:.05rem;cursor:pointer}
.triangleHidden{border-left:.1rem solid transparent;border-right:.1rem solid transparent;border-bottom:.16rem solid #676F7F}
.triangleShow{border-left:.1rem solid transparent;border-right:.1rem solid transparent;border-top:.16rem solid #676F7F}
</style>
<script>
	import Vue from 'vue'
	import { setCookie,getCookie,delCookie } from '@/assets/js/cookie.js'
	export default{
		data(){
            return {
                name: '',
                userId:'',
            };

　　　　},
　　methods: {	
            
   },
   mounted(){
            /*页面挂载获取保存的cookie值，渲染到页面上*/
            let uname = getCookie('username')
            let uid = getCookie('userId')
            this.name = uname
            this.userId = uid
        },
	
       
 }

	
</script>