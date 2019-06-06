<template>
    <div class="main">
		 <transition :name="transitionName">
			<router-view></router-view>
		</transition>
        <tab-bar></tab-bar>
		<add-shortcut @change="shortcut"></add-shortcut>
	</div>
</template>

<script>
import TabBar from '../components/TabBar'
import AddShortcut from './components/AddShortcut'
export default {
 name: 'Main',
 components: {TabBar, AddShortcut},
 data() {
 return {
    transitionName: 'forward'
 }
 },
 created(){},
 mounted(){},
 methods:{
	 shortcut(c){
		 let url=''
		 switch(c){
			 //创建日程提醒
			 case 'rc': url='/addSchedule'
			 break;
			 //提交审批
			 case 'sp': url='/Review'
			 break;
			 //添加项目
			 case 'xm': url='/addProjects'
			 break;
		 }

		this.$router.push({
				path:url
			})
	   
	 }
 }
}
</script>

<style lang='less' scoped>
.main{
	width: 100%;
	height: 100%;
}
</style>
