<script>

import * as echarts from "echarts";

export default {
  name:"Finace",
  data(){
    return{
      user:0,
      message:0,
      finace:0,
      userdata:[],
      incomedata:[],
      loandata:[],
    }
  },
  methoeds:{

  },
  mounted() {
    if(localStorage.getItem('userdata')){
      this.userdata=JSON.parse(localStorage.getItem('userdata'));
      this.user=this.userdata.length;
      console.log(this.userdata);
      for(let i=0;i<this.userdata.length;i++){
        this.finace+=Number(this.userdata[i].finace);
      }
    }
    if(localStorage.getItem('incomedata')&&localStorage.getItem('loandata')){
      this.incomedata=JSON.parse(localStorage.getItem('incomedata'));
      this.loandata=JSON.parse(localStorage.getItem('loandata'));
      console.log(this.loandata.length);
      console.log(this.incomedata.length);
      this.message=this.loandata.length+this.incomedata.length;
    }
    echarts.init(document.getElementById("line")).setOption(option);
  }
}
const option = {
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: '财务信息表',
          fontSize: 80,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: '#000',
          lineWidth: 1
        },
        keyframeAnimation: {
          duration: 3000,
          loop: true,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0]
              }
            },
            {
              // Stop for a while.
              percent: 0.8,
              style: {
                fill: 'transparent'
              }
            },
            {
              percent: 1,
              style: {
                fill: 'black'
              }
            }
          ]
        }
      }
    ]
  }
};
</script>

<template>
<div style="height: 100%">
  <el-row :gutter="10">
    <el-col :span="8" >
      <el-card style="height: 300px">
        <div style="display: flex;">
          <el-image src="static/user.png" style="width: 150px;margin-end: 100px;margin-top: 50px"></el-image>
          <div class="text" style="margin-top: 60px;display: flex;flex-direction: column">
            <span>User</span><br>
            <span>{{user}}</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card style="height: 300px">
        <div style="display: flex;">
          <el-image src="static/message.png" style="width: 150px;margin-end: 100px;margin-top: 50px"></el-image>
          <div class="text" style="margin-top: 60px;display: flex;flex-direction: column">
            <span>Message</span><br>
            <span>{{message}}</span>
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="8">
      <el-card style="height: 300px">
        <div style="display: flex;">
          <el-image src="static/finace.png" style="width: 150px;margin-end: 100px;margin-top: 50px"></el-image>
          <div class="text" style="margin-top: 60px;display: flex;flex-direction: column">
            <span>Finace</span><br>
            <span>{{finace}}</span>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
  <el-card >
    <div id="line" style="width: 100%;height: 300px"></div>
  </el-card>
</div>
</template>

<style scoped>
.text{
  font-size: 30px;
}
</style>
