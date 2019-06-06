<template>
 <div class="add-shortcut">
     <ul v-if="isShade" class="add-shortcut_menu">
        <li v-for="(vo, index) in menu" :key="index" :class="[`bg-${vo.type}`]"  @click="addShortcut(vo.type)">
           <label v-text="vo.title"></label>
           <span><img :src="vo.url" :class="isShade ? 'rotate-left-animation' : 'rotate-right-animation'"/></span>
        </li>
     </ul>
     <div @click="open" class="add-shortcut_major">
         <x-icon type="ios-close-empty" size="30" class="i-plus-empty"  :class="isShade ? 'rotate-left-animation' : 'rotate-right-animation'"></x-icon>
     </div>
     <div v-if="isShade" class="add-shortcut_shade"></div>
 </div>
</template>

<script>
import cookie from '@/utils/cookie'
export default {
 name: 'AddShortcut',
 data() {
 return {
   isShade:false,
   menu:[ 
     {title:'创建日程提醒', url:'/webdemo/h5/res/images/ico_rca.png', type:'rc'},
     {title:'提交审批', url:'/webdemo/h5/res/images/icon_sp.png', type:'sp'},
     {title:'添加项目', url:'/webdemo/h5/res/images/icon_tjxiangmu.png', type:'xm'},
   ],
   flag: cookie.readCookie('permissionType')
 }
 },
 created(){
   if(this.flag === '2' || this.flag === '3'){
      this.menu=[{
        title:'创建日程提醒', url:'/webdemo/h5/res/images/ico_rca.png', type:'rc'
      }]
   }
 },
 mounted(){},
 methods:{
     open(){
       this.isShade=! this.isShade
     },
     addShortcut(type){
       this.$emit('change', type)
     }
 }
}
</script>

<style lang='less' scoped>
.add-shortcut{
  .add-shortcut_menu{
     position: fixed;
     bottom: 10rem;
     right: 2rem;
     z-index: 70;
     display:flex;
     flex-direction:column;
     li{
         height: 3rem;
         display:flex;
         justify-content:flex-end;
         align-items:center;
         margin-top:1rem;
         label{
           display:inline-block;
           padding:.5rem 1rem;
           border-radius:.4rem;
           border-bottom:1px solid #c7c7c7;
           background: #fff;
         }
         span{
           display:inline-block;
           width: 3rem;
           height: 3rem;
           border-radius:100%;
           display:flex;
           justify-content:center;
           align-items:center;
           margin-left:.5rem;
           img{
              width: 1rem;
              height: 1rem;
           }
         }      
     }
     .bg-rc{
        label{
          color:#777;
        }
        span{
          background:#d94217;
        }
     }
     .bg-sp{
          label{
          color:#293694;
        }
        span{
          background:#293694;
        }
     }
     .bg-xm{
         label{
          color:#299429;
        }
        span{
          background:#299429;
        }
     }
  }
  .add-shortcut_major{
      width: 4rem;
      height: 4rem;
      border-radius:100%;
      background:#e95468;
      display:flex;
      justify-content:center;
      align-items:center;
      position: fixed;
      bottom: 5rem;
      right: 1.5rem;
      z-index: 70;
      box-shadow: #999 0px 0px 10px;
      .i-plus-empty{
          fill: #fff;
      }
  }
  .add-shortcut_shade{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 60;
    background-color: #fff;
    opacity: 0.4;
  }
  .rotate-left-animation{
    animation: rotateL 0.2s ease-in-out;
    animation-fill-mode: forwards;
  } 
  .rotate-right-animation{
      transform:rotate(45deg);
  }
}

@keyframes rotateL{
   0%{
     transform:rotate(45deg)
   }
   100%{
      transform:rotate(0deg)
   }
}

</style>
