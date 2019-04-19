<template>

    <div class="">

     <!-- 头部导航栏 -->
     <div class="toolBar">

             <el-row>
                  <el-col   :span="19">
                     <el-row>
                       <el-col  class="ht" :span="6">
                         <img class="logoPic" src="">
                         <label class="toolbarTitle" for="">后台管理模版</label>
                         <sub class="versionInfo">V0.80</sub>

                       </el-col>
                     </el-row>
                  </el-col>

                  <el-col   :span="2">
                     <label class="loginUser">当前用户 :  {{currentLoginUser}}</label>
                  </el-col>
                  <el-col :span="3"  >
                        <el-menu   mode="horizontal" class="el-menu-demo">

                          <el-menu-item v-on:click="$store.commit('change_dialogPasswordVisible',true)" index="1">修改密码</el-menu-item>

                          <el-menu-item index="3" @click="userLogout">退出</el-menu-item>
                        </el-menu>
                  </el-col>

           </el-row>

     </div>

     <!-- 左侧菜单栏 -->
    <div class="navTest">
        <el-menu  default-active="2" mode="vertical" :router="true">
             <el-submenu  class="navFirstItem" v-bind:key="item.id" v-bind:menuId="item.id" v-for="(item,index) in firstMenus" :index="item.menuCmd">
                <template slot="title">
                <i class="iconClass" v-bind:class="item.iconCls"></i>
                <span>{{item.text}}</span>
               </template>
               <SubMenuTemp :menuId="item.id"></SubMenuTemp>
              </el-submenu>
       </el-menu>

       <!--  主内容区-->
     <div class="mainContent">
          <el-tabs :value="tablePanelActive" type="card" @tab-click="tabClick" closable @tab-remove="removeTab">
            <el-tab-pane
               v-for="(item, index) in tabPanes"
               v-bind:key="item.id"
               :label="item.title"
               v-bind:id="item.menuCmd"
               v-bind:name="item.menuCmd"
               ref="item.name"
               >
           </el-tab-pane>
         </el-tabs>


            <div class="main-content">


                      <router-view ></router-view>
                      <h1 v-if="mainText">欢迎使用管理后台模版</h1>
                      <ChangePassword v-if="changePassword"></ChangePassword>



             </div>
    </div>
  </div>
</div>

</template>

<script>

import SubMenuTemp from './SubMenuTemp'
import ChangePassword from './views/ChangePassword'

export default {
  name: 'HelloWorld',
  data () {
    return {
      getFirstMenuUrl:"/api/getMainMenu",
      active:1,
      httpAddress:"",
      httpAddressInput:"",
      firstMenus:[],
      tabIndex: 0,
      changePassworddialogVisible:true,
      currentLoginUser:'',
      showLoading:false,
    }
  },

  methods:{
     dialogVisible:function(){
         this.httpAddress=this.httpAddressInput;
     },



     getFirstMenu:function(){
             this.$axios.get("/api/getMainMenu")
             .then((res)=>{
                  this.firstMenus=res.data;
             })
             .catch( function() {console.log("get mainMenu error1")})
     },
    removeTab(tab) {
        for (let i=0;i<this.tabPanes.length;i++){
          if (this.tabPanes[i].menuCmd===tab)
            {this.tabPanes.pop(i)}

        }

        if (this.tabPanes.length>0)  {

             let i=this.tabPanes.length;
             this.$store.state.tablePanelActive=this.tabPanes[i-1].menuCmd
             this.$router.push({path: "/main/"+this.tabPanes[i-1].menuCmd});
        }else {
           this.$router.push({path: "/main/"})
           this.$store.commit('display_mainText',true)
        }


      },

    tabClick (tab) {
      let path = tab.$el.id;
      this.$router.push({path: path});
    },

    userLogout(){
      this.$axios.post("/api/logout")
       .then(res=>{
            if  ((res.data.success===true) && (res.data.msg==="logoutSuccess"))
              {this.$notify({title:"温馨提示",
                          message:"你已成功退出,请重新登录!",
                          duration:1500,
                          type:"success"})
               //称除可能已存的localStorage项目
               try {
                   LocalStorageUtils.remove("reportQueryDates")


               } catch(e){}

               localStorage.removeItem("username")
               this.$router.push({path:"/login"})
              } else{

                this.$notify({title:"温馨提示",
                          message:"你已成功退出,请重新登录!",
                          duration:1500,
                          type:"success"})
               localStorage.removeItem("username")

               //称除可能已存的localStorage项目
               try {

                   LocalStorageUtils.remove("reportQueryDates")


               } catch(e){}
               this.$router.push({path:"/login"})

              }

       }).catch(error=>{
            localStorage.removeItem("username")
            this.$router.push({path:"/login"})
       })


    }



  },
  //加载主菜单
  created:function(){


    var username=''
    try{
       var vals=localStorage.getItem("usernameAndTime")
       var usernameAndTime=JSON.parse(vals)
       username=usernameAndTime.username
    } catch(e){
       this.$notify({title:"温馨提示",
                          message:"请先登录系统",
                          duration:1500,
                          type:"warning"})
       this.$router.push({path:"/login"})
    }

    if (username!==''){
         this.$axios.post('/api/getMainMenu',{node:'root'}).then((res) => {
                   this.firstMenus=res.data;
                }).catch(function(error){  })
         this.$axios.post('/api/getCurrentUser').then((res) => {
                   this.currentLoginUser=res.data.data
                }).catch(function(error){ console.log("/api/getCurrentUser error")})
    }



  },
  components:{
    SubMenuTemp,
    ChangePassword,
  },
  computed:{
    tabPanes(){
       return this.$store.state.tabPanes;
    },
    tablePanelActive(){
      return this.$store.state.tablePanelActive;
    },
    changePassword(){
       return this.$store.state.dialogPasswordVisible;
    },
    mainText(){
       return this.$store.state.mainText;
    }

  },
  init:function(){

  },
  mounted:function(){
       this.showLoading=false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.navTest {
   display:flex;
   height: 100%;

}

.toolBar{
  background-color:#293C5A;

}

.el-menu-demo{
   background-color:#293C5A;

}


.navTest .el-menu  {

  background-color:#fcfcfc;
  text-align: center;
  min-height: 920px;
  max-height: 1500px;
   flex: 0 0 200px;
}

.el-submenu  {
      text-align: center;

}

.cTest{
    -webkit-box-flex:1;-ms-flex:1; flex:1;background-color: #fff; padding: 20px 10px;text-align: center;
  height: 100%;
}

.toolbarTitle{
  line-height: 200%;
  font-size:25px;
  text-align: center;
  color: #fcfcfc

}
.mainContent{
  border-left: solid 2px #293C5A
}


.el-menu-demo .el-menu-item{
  color:#fcfcfc
}

.el-menu-demo .el-menu-item:hover{
   background-color:#293C5A;

}
.mainContent{
  width:100%;
}

.loginUser{
  color:#fcfcfc;
  line-height: 370%;
}

h1{
  margin-top: 20%;
  margin-left:30%;
}

.logoPic{

  padding:1.5%;
  float: left;
}

.versionInfo{
  color:#fcfcfc;
}

.navFirstItem{
  background-color: #EEF1F6;
  border-top: solid 1px #DEE3E8;
  border-bottom: solid 1px #DEE3E8;




}

.navFirstItem span{
   font-size:15px;
   font-weight: 550;

}
.iconClass{
  margin-right: 8px;
}



</style>
