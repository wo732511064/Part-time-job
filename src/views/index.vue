<template>
    <div class="all">
    
    	<router-view></router-view>
    
 		<nav-footer></nav-footer>
    </div>
</template>
<script>
	import '@/assets/css/index.css'
	import '@/assets/css/reset.css'
	import '@/assets/css/magic-input.min.css'
	import '@/assets/js/rem.js'
	import NavFooter from '@/components/NavFooter'
	import {setCookie,getCookie} from '@/assets/js/cookie.js'
    export default{
        data(){
            return {

            }
        },
        components:{
        	NavFooter,
        	
        },
        methods:{
        	
        },
    }
    
</script>
