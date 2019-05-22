<template>
    <div class="main">
		 <transition :name="transitionName">
			<router-view></router-view>
		</transition>
        <tab-bar></tab-bar>
	</div>
</template>

<script>
import TabBar from '../components/TabBar'
export default {
 name: 'Main',
 components: {TabBar},
 data() {
 return {
    transitionName: 'forward'
 }
 },
 created(){},
 mounted(){},
 methods:{}
}
</script>

<style lang='less' scoped>
.main{
	width: 100%;
	height: 100%;
}
</style>
