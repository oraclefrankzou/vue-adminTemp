<template>

  <div id="app">
     <router-view > </router-view>


  </div>



</template>

<script>

import dragVerify from 'vue-drag-verify'

export default {

  data(){
       return {

       }

  },
  
  created:function(){
    try {
      var vals=localStorage.getItem("usernameAndTime")
      var dataObj = JSON.parse(vals)
      var username=dataObj.username
    } catch(e){
       this.$router.push({path:"/login"})
    }
  }

}
</script>

<style>
body{
  background-color: #FCFCFC
}

.changePassword .el-dialog{
  width: 400px
}

.el-form {
  background-color:   #EEF1F6;
  margin-bottom: 10px
}
.el-form .el-form-item{
  margin-top:1%;
}

.el-pagination{
  margin-top:10px;
  margin-left:30%;
}

.el-button{
  width: 80px;
}

</style>
