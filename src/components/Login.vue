<template>

    <div class="login" @mousemove="slidBarEvent">
             <el-form :model="form" :rules="rules"  status-icon label-width="30px">
                <div class="loginMainTitle">
                 <img class="loginLogoPic" src="">
                 <label class="loginTitle">后台管理模版</label>
                </div>
                 <h5>系统登录</h5>

                 <el-form-item   prop="username" >
                       <el-input v-model="form.username" placeholder="帐号">
                       <template slot="append"><i class="iconfont iconuser"></i></template>
                       </el-input>

                  </el-form-item>

                 <el-form-item  prop="username" width="100px">
                     <el-input type="password"  v-model="form.password" placeholder="密码">
                       <template slot="append"><i class="iconfont iconpassword"></i></template>
                       </el-input>
                  </el-form-item>

                    <div class="forgetPassWord">
                       <a href="" @click.prevent="open_forgetPassword">忘记密码?</a>
                    </div>
                <div class="slidBar">
                    <drag-verify
                       :width="270"
                       :height="40"
                       handlerIcon='el-icon-d-arrow-right'
                       successIcon='el-icon-check'
                       text="请将滑块拖动到右侧"
                       success-text="验证成功"
                       background="#ddd"
                       progress-bar-bg="#2ACBF8"
                       text-size="14px"
                       ref="Verify">
                    </drag-verify>
                  </div>

                   <el-form-item style="width:100%;" center>
                       <el-button :disabled="loginButtonDisabled"   style="width:100%;" type="primary" @click="userLogin">登 &nbsp  &nbsp 录</el-button>
                  </el-form-item>

             </el-form>

             <router-view></router-view>

  </div>



</template>


<script>

// 引入本地存储
import LocalStorageUtils from '../utils/localStorageUtils.js'

// 引入滑动验证框
import dragVerify from 'vue-drag-verify'


export default {

   data() {
      return {
         value2:0,
         loginButtonDisabled:true,
         form:{username:'',         password:''},
         error:{hasError:false,msgError:''},
         okk:"ddf",
         rules:{
            username:[ { required: true, message: '用户名不能为空',trigger: 'blur' },
                  ],
            password:[ { required: true, message: '密码不能为空',trigger: 'blur' },
                  ],


         }
      };
    },
  components:{
    dragVerify
  },
  methods:{
     userLogin(){
         const params={
           username:this.form.username,
           password:this.form.password
         }
         this.$axios.post("/api/login",params
         ).then(res=>{
            if ((res.data.success===false) && (res.data.msg==="userNotExists"))
              {this.$notify({title:"温馨提示",
                          message:"用户不存在!",

                          type:"warning"})
              }
            else if  ((res.data.success===false) && (res.data.msg==="passwordIncorent"))
              {this.$notify({title:"温馨提示",
                          message:"密码不正确!",

                          type:"warning"})
              }
            else if  ((res.data.success===false) && (res.data.msg==="userLocked"))
              {this.$notify({title:"温馨提示",
                          message:"用户被锁定!",
                          type:"warning"})
              }
            if  ((res.data.success===true) && (res.data.msg==="loginSuccess"))
                 {  this.$message({
                             message:"恭喜:  您已经成功登录平台!",
                             duration:2000,
                             type:"success"})
                  //称除可能已存的localStorage项目
                  try {
                      LocalStorageUtils.remove("reportQueryDates")

                  } catch(e){

                  }
                  this.$store.state.tabPanes=[]
                  var usernameAndTime=JSON.stringify({
                     username:this.form.username,
                     activeTime:new Date().getTime()
                  })
                  localStorage.setItem("usernameAndTime",usernameAndTime)
                  this.$router.push({path:"/main"})
                }


         }).catch(function(res){

         })
     },
    open_forgetPassword(){
       this.$alert('请联络系统支持部DBA组63!', '忘记密码', {confirmButtonText: '确定'});
    },
    slidBarEvent(){
      if (this.$refs.Verify.isPassing) {
                this.loginButtonDisabled=false
            }
    }

},


created:function(){
           try{
           localStorage.removeItem("usernameAndTime")}
           catch(e){

           }

}



}
</script>
<style scoped>
.login{
    background-color:#EEF1F6;
    margin: 8% auto;
    width:300px;
    padding: 40px 40px 15px 30px;
    border-radius: 10px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}

 .el-form{
   margin-top: 5px;
   width: 300px;
   background-color:#EEF1F6;
 }

.el-form-item{
  margin-top: 30px
}

h5{
  text-align: center;
  margin-top: 10px;
  margin-bottom: 20px;
}
.loginTitle{
  line-height: 100%;
  text-align: center;
  margin-top:10%;
  font-size:25px;


}
.loginLogoPic{
     float: left;
     margin-right:2%;

}
.loginMainTitle{
  margin-left:15%;
}

.forgetPassWord{
  font-size: 13px;
  margin-left:80%
}
.slidBar{
  margin-top:5px;
  margin-left:30px;
}

</style>

