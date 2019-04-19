<template>

  <div class="reportQuery">

      <el-card>
                     <el-form :inline="true" >

                        <el-form-item>
                             <!-- <IpAddrs   ref="ipAddrs" ></IpAddrs> -->
                        </el-form-item>
                        <el-form-item>
                             <el-date-picker
                                v-model="reportDate"
                                type="date"
                                placeholder="报表日期"
                                align="right"
                               value-format="yyyy-MM-dd" >
                             </el-date-picker>
                        </el-form-item>
                        <el-form-item>
                           <el-button :inline="true" class="queryButton"  type="primary"  v-on:click="getReportQueryDates(1)">查询</el-button>
                           <el-button :inline="true" class="cleanButton"  type="warning"  v-on:click="cleanForm">清空</el-button>
                        </el-form-item>
                      </el-form>

         <el-table :data="reportQueryDates" stripe border>

            <el-table-column  prop="ip" label="IP地址"></el-table-column>
            <el-table-column prop="reportDate" label="报表日期"></el-table-column>
            <el-table-column prop="tableName"  label="表名字"></el-table-column>
            <el-table-column  prop="size" label="数量"></el-table-column>
         </el-table>

          <div class="block">
           <el-pagination
             layout="total, sizes, prev, pager, next, jumper"
             @current-change="handleCurrentChange"
             @size-change="handleSizeChange"
             :page-size="pageSize"
             :page-sizes="[15, 30, 45, 100]"
            :total="total">
          </el-pagination>
         </div>

      </el-card>

      <!-- <StatusCard id="StatusCard"  v-show="statusCardShow" :cardobj="cardobj" :cardType="cardType" ></StatusCard> -->

  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import LocalStorageUtils from '../../utils/localStorageUtils.js'
import { parse } from 'url';

export default {
  data(){
    return{
      reportQueryDates:[],
      ipAddr: '',
      total:0,
      currentPage:0,
      pageSize:15,
      reportDate:'',
      error:"ok",
      statusCardShow:false,
      cardobj:{msg:"ok",reportDate:""},
      cardType:"normal",
    }
  },
  methods:{
     getStatusCard(data){
            let total=data.reportQueryDates.length;
            let flag;
            let cardReportDate;


            if ((total===4)){
                          for (let i=0; i<total; i++){
                                  if (data.reportQueryDates[i]["size"]<1){
                                      flag=false;
                                      cardReportDate=data.reportQueryDates[i]["reportDate"]

                                  }else{
                                      flag=true
                                      cardReportDate=data.reportQueryDates[i]["reportDate"]
                                  }

                          }
                          if (flag){
                             this.statusCardShow=true;
                             this.cardType="normal"
                             this.cardobj.msg="正常"
                             this.cardobj.reportDate=cardReportDate

                          }else{
                             this.statusCardShow=true;
                             this.cardType="exception"
                             this.cardobj.msg="异常"
                             this.cardobj.reportDate=cardReportDate

                          }

                     }else{
                          for (let i=0; i<total; i++){
                                  if (data.reportQueryDates[i]["size"]<1){
                                      flag=false;
                                      cardReportDate=data.reportQueryDates[i]["reportDate"]

                                  }else{
                                      flag=true
                                      cardReportDate=data.reportQueryDates[i]["reportDate"]
                                  }

                          }
                          this.statusCardShow=true;
                          this.cardType="exception"
                          this.cardobj.msg="异常"
                          this.cardobj.reportDate=cardReportDate
                     }


    },
    getReportQueryDates(page){

          const params={
            ip:this.$refs.ipAddrs.ipAddr,
            page:page,
            limit:this.pageSize,
            reportDate:this.reportDate,

          };

          this.$axios.post("/api/queryReportDataApi",
                      params
                      )
              .then((res)=>{
                  if ((res.data.total===0) && (res.data.msg==="dataReturnSucess")){
                        this.$notify({
                          title:"温馨提示",
                          message:"没有数据返回!",
                          type:"warning"
                        })
                     this.reportQueryDates=[]
                     this.total=0
                     this.statusCardShow=false;


                  } else if  ((res.data.total>0) && (res.data.msg==="dataReturnSucess")){
                     this.reportQueryDates=res.data.results
                     this.total=res.data.total
                     this.getStatusCard(this)
                     LocalStorageUtils.set('reportQueryDates',this.reportQueryDates)

                  } else if (res.data.msg==="userNoPriv"){
                        this.$notify({
                          title:"温馨提示",
                          message:"没有权限!",
                          type:"warning"
                        })
                     this.reportQueryDates=[]
                     this.total=0
                     this.statusCardShow=false;
                  }else{
                   this.$notify({
                          title:"温馨提示",
                          message:"服务器返回错误",
                          type:"warning"
                        })
                  }

             })
             .catch( function(error) {
               console.log("getReportQueryError")
               console.dir(error)
               }
             )
    },

    handleCurrentChange(val){
         let page=val
         this.getReportQueryDates(page)
    },
    cleanForm(){
      this.$refs.ipAddrs.ipAddr='';
      this.reportDate='';
    },
    handleSizeChange(val){
      this.pageSize=val
    }
  },
  created:function(){
    this.$store.commit('display_mainText',false)
  },
  mounted:function(){
      try {
          this.reportQueryDates=LocalStorageUtils.get("reportQueryDates")
          this.getStatusCard(this)
      } catch (e) {

      }

  },
  components:{
    /* IpAddrs,StatusCard */
  }

}
</script>

<style>

.el-card{
  margin: 5px;
}

.queryButton{

  display: inline
}

#StatusCard{
  width: 350px;

  margin: 30px auto;
}



</style>
