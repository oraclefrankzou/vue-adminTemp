

<template>

   <div class="changePassword" width="400px">

      <el-dialog center=true :show-close=false :visible.sync=dialogPasswordVisible  title="修改密码" width="100%">
        <el-card>
         <el-form :model="changePasswordForm" :rules="rules">
           <el-form-item prop="oldpassword">
             <el-input type="password" placeholder="输入旧密码" v-model="changePasswordForm.oldpassword"  @change="passwordValid"></el-input>
          </el-form-item>
           <el-form-item prop="password">
             <el-input type="password" placeholder="输入新密码" v-model="changePasswordForm.password"  @change="passwordValid"></el-input>
          </el-form-item>
          <el-form-item prop="repeatPassword" >
            <el-input type="password" placeholder="确认新密码" v-model="changePasswordForm.repeatPassword"  @change="passwordValid"></el-input>
          </el-form-item>
       </el-form>
      </el-card>
       <div slot="footer" class="dialog-footer">
           <el-button type="warning"  v-on:click="$store.commit('change_dialogPasswordVisible')">取 消</el-button>
           <el-button :disabled.sync=this.changePasswordSubmitBtn type="primary" v-on:click="changePasswordSubmit('changePasswordForm'),  $store.commit('change_dialogPasswordVisible');">确 定</el-button>
        </div>
      </el-dialog>


  </div>


</template>

<script>
export default {
   data(){
     var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
          this.changePasswordSubmitBtn=true;
        } else if (value !== this.changePasswordForm.password) {
          callback(new Error('两次输入密码不一致!'));
          this.changePasswordSubmitBtn=true;
        }
       else {
           this.changePasswordSubmitBtn=false;
          callback();
        }
      }   ;
     return{
       dialogPasswordVisible:true,
       changePasswordSubmitBtn:true,
       changePasswordForm:{password:'',repeatPassword:''},
       rules:{
          oldpassword:[ { required: true, message: '旧密码不能为空',trigger: 'blur' }],
          password:[ { required: true, message: '密码不能为空',trigger: 'blur' },  { min: 6, max: 12, message: '密码长度6-12个字符', trigger: 'blur' }],
          repeatPassword:[ { required: true, message: '密码不能为空',trigger: 'blur' },
           { min: 6, max: 12, message: '密码长度6-12个字符', trigger: 'blur' },
           { validator: validatePass2, trigger: 'blur' }],
       }
     }
   },

   methods:{
     closeDialog(){
       this.dialogVisible=false;

     },
     passwordValid(){

       if ((this.changePasswordForm.repeatPassword===this.changePasswordForm.password)
           && (this.changePasswordForm.repeatPassword.length>=6)
           && (this.changePasswordForm.oldpassword.length>0)){
             this.changePasswordSubmitBtn=false;
       }
       else{
         this.changePasswordSubmitBtn=true;
       }
     },
     changePasswordSubmit(form){
           const params={
           oldpassword:this.changePasswordForm.oldpassword,
           newpassword:this.changePasswordForm.password,
         }
         this.$axios.post("/api/changepassword",params)
           .then(res=>{
             if ((res.data.success===true) && (res.data.msg==="changepasswordSuccess")){
               this.$notify({title:"温馨提示",
                          message:"密码修改成功,请重新登录!",
                          duration:1500,
                          type:"success"})
               localStorage.removeItem("username")
               this.$router.push({path:"/login"})
             }

            if ((res.data.success===false) && (res.data.msg==="changepasswordFailure")){
               this.$notify({title:"温馨提示",
                          message:"旧密码输入不正确",
                          duration:1500,
                          type:"warning"})
             }
           }).catch(function (res){
             console.log("changepasswordError")
           })

     }
   }

}
</script>

<style  scoped>



.el-form{
  background-color: transparent
}

</style>
