


<template>
    <div class="subMenu">
          <el-menu-item   class="navSecondItem"  style="padding-left: 85px;" v-for="data in datas" v-bind:id="data.menuCmd" :index="data.menuCmd"
          v-on:click="$store.commit('add_tabs',[data.text,data.menuCmd]),activeTab(data.menuCmd)">
          {{data.text}}</el-menu-item>

    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import { add_tabs } from '../store/index.js'

export default {
    data(){
        return {
          datas:[],

        }
    },
    props:['menuId'],


    methods:{
        activeTab(path){

             this.$router.push({path: '/main/' + path})
        }
    },

    created:function() {


        this.$axios.post('/api/getMainMenu',{node:this.menuId}).then((res) => {
                   this.datas=res.data;
                }).catch(function(error){
                        console.lor(error);
                    })



    }

}
</script>

<style scoped>
.el-tabs__header{
   background-color: #EEF1F6;
}


.navSecondItem{

  border-top: solid 1px #FAFAFA;



}




</style>
