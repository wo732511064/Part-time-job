import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import Content from '@/views/content'
import Release from '@/views/Release'
import News from '@/views/News'
import My from '@/views/My'
import List from '@/components/List'
import PartDetails from '@/components/PartDetails'
import Personal from '@/components/Login/Personal'
import Register from '@/components/Login/Register'
import Info from '@/components/Info'
import XinXi from '@/components/InFo/XinXi'
import PianHao from '@/components/InFo/PianHao'
import XiangXi from '@/components/InFo/XiangXi'
import JingLi from '@/components/InFo/JingLi'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      children:[
      	{
    			
	    		path:'/',
	    		component:Content,
	    		children:[
	    			{
	    				path:'/',
			    		name:'List',
			    		component:List,
	    			}
	    		]
    		},
    		
    		{
    			path:'Release',
	    		name:'Release',
	    		component:Release,
    		},
    		{
    			path:'news',
	    		name:'news',
	    		component:News,
    		},
    		{
    			path:'My',
	    		name:'My',
	    		component:My,
    		},
    		{
					path:'PartDetails',
		    	name:'PartDetails',
		    	component:PartDetails,
				},
				{
					path:'Personal',
		    	name:'Personal',
		    	component:Personal,
				},
				{
					path:'Register',
		    	name:'Register',
		    	component:Register,
				},
				{
					path:'Info',
		    	name:'Info',
		    	component:Info,
				},
				{
					path:'Info/XinXi',
		    	component:XinXi,
				},
				{
					path:'Info/PianHao',
		    	name:'PianHao',
		    	component:PianHao,
				},
				{
					path:'Info/JingLi',
		    	name:'JingLi',
		    	component:JingLi,
				},
				{
					path:'Info/XiangXi',
		    	name:'XiangXi',
		    	component:XiangXi,
				},
    	]
    }
  ]
})


