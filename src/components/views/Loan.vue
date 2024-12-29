<script>
import * as echarts from 'echarts'
export default {
  name: "Loan",
  data() {
    return {
      input: '',
      index:'',
      loandata: [],
      userdata: [],
      dialogVisible_add: false,
      dialogVisible_edit: false,
      dialogVisible_delete: false,
      value:'',
      line_xdata:[],
      line_ydata:[],
      newloan: {
        user: '',
        type: '',
        money: '',
        date: '',
        target:'',
      },
    }
  },
  methods: {
    getdata(){
      console.log("getdata函数被调用");
      if (!localStorage.getItem('loandata')) {
        console.log('在localstorage中创建loandata');
        localStorage.setItem('loandata', this.loandata);
      }else{
        console.log('拿到loandata');
        this.loandata=JSON.parse(localStorage.getItem('loandata'));
        console.log('loandata为',this.loandata);
      }
      if (localStorage.getItem('userdata')) {
        console.log("拿到userdata数据");
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
      }
      this.line_ydata=[];
      this.line_xdata=[];
    },
    showForm(dialogVisible,index){
      if('add'===dialogVisible){
        console.log("添加款项业务被启动");
        this.dialogVisible_add=true;
        this.newloan={
          user:'',
          type: '',
          money: '',
          date:'',
          target:''
        }
      }
      if('edit'===dialogVisible){
        console.log("编辑款项按钮被触发之前"+index);
        this.dialogVisible_edit=true;
        if (localStorage.getItem('loandata')) {
          this.userdata = JSON.parse(localStorage.getItem('loandata'));
          this.index=index;
          this.newloan=this.loandata[this.index];
        }
      }
      if('delete'===dialogVisible){
        console.log("删除款项业务被启动");
        this.dialogVisible_delete=true;
        this.index=index;
      }
    },
    add(){
      this.getdata();
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate()
      if (month < 10) month = `0${month}`
      if (strDate < 10) strDate = `0${strDate}`
      let hour= date.getHours();
      let minute=date.getMinutes();
      let second =date.getSeconds();
      this.newloan.date=`${year}年${month}月${strDate}日${hour}时${minute}分${second}秒`;
      this.loandata.push(this.newloan);
      localStorage.setItem('loandata',JSON.stringify(this.loandata));
      this.dialogVisible_add=false;
      this.newloan={
        user:'',
        type: '',
        money: '',
        date: '',
        target: '',
      }
      this.update();
    },
    deleteloan(){
      this.getdata();
      console.log("删除确认函数被调用");
      console.log("当前index索引"+this.index);
      if(localStorage.getItem('loandata')){
        this.loandata=JSON.parse(localStorage.getItem('loandata'));
        console.log("loandata",this.loandata);
        if(this.index!==-1){
          this.loandata.splice(this.index,1);
          localStorage.setItem('loandata',JSON.stringify(this.loandata));
          this.index=-1;
          this.dialogVisible_delete=false;
        }
      }
      this.update();
    },
    edit(){
      this.getdata();
      console.log("编辑款项确认按钮被触发后"+this.index);
      if (this.index !== -1) {
        this.loandata[this.index]=this.newloan;
        localStorage.setItem('loandata', JSON.stringify(this.loandata));
        this.index=-1;
        this.dialogVisible_edit=false;
      }
      console.log("在edit函数内，折线图数据",option1.series[0].data);
      this.update();
    },
    cancel(){
      this.getdata();
      this.dialogVisible_delete=false;
      this.dialogVisible_add=false;
      this.dialogVisible_edit=false;
    },
    update(){
      console.log("update函数被调用");
      this.getdata();
      let totalsum=0;
      for(let i=0;i<this.userdata.length;i++){
        let usersum=0;
        for(let j=0; j<this.loandata.length; j++){
          if(this.loandata[j].user===this.userdata[i].user){
            if("贷"===this.loandata[j].type){
              console.log("贷被调用");
              usersum+=Number(this.loandata[j].money);
              totalsum+=Number(this.loandata[j].money)
            }
            if("借"===this.loandata[j].type){
              console.log("借被调用");
              usersum-=Number(this.loandata[j].money);
              totalsum-=Number(this.loandata[j].money);
            }
            console.log("usersum的值为"+usersum);
            console.log("totalsum的值为"+totalsum);
            console.log("折线图数据拿到之前");
            this.line_xdata.push(this.loandata[j].type);
            this.line_ydata.push(totalsum.toString());
          }
        }
        this.userdata[i].finace=usersum.toString();
      }
      option1.xAxis.data=this.line_xdata;
      option1.series[0].data=this.line_ydata;
      console.log("在update函数内，折线图数据",option1.series[0].data);
      option3.xAxis.data=this.line_xdata;
      option3.series[0].data=this.line_ydata;
      echarts.init(document.getElementById("stack")).setOption(option3);
      // echarts.init(document.getElementById("line")).setOption(option1);
      echarts.init(document.getElementById("pie")).setOption(option2);
    }
  },
  created() {
    this.getdata();
    this.update();
  },
  mounted() {
    console.log("挂载函数被调用");
    console.log("在挂载函数内，折线图数据",option1.series[0].data);
    // echarts.init(document.getElementById("line")).setOption(option1);
    echarts.init(document.getElementById("stack")).setOption(option3);
  }
}
const option1 = {
  title: {
    text: '借贷总额'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name:"当前账户余额",
      data: [],
      type: 'line'
    },
  ]
};
const option2 = {
  title: {
    text: 'Referer of a Website',
    subtext: 'Fake Data',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
const option3 = {
  title: {
    text: '借贷图'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  legend: {
    data: []
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'Email',
      type: 'line',
      stack: 'Total',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: []
    },
  ]
};
</script>

<template>
  <div style="height: 100%">
        <el-card>
          <div id="stack" style="width: 100%;height: 300px"></div>
        </el-card>
    <el-row>
      <el-card>
        <div slot="header">
          <el-row :gutter="220">
            <el-col :span="6">
              <el-input v-model="input" placeholder="请输入内容" style="width: 380px"
                        suffix-icon="el-icon-search"></el-input>
            </el-col>
            <el-col :span="6">
              <el-button type="primary" icon="el-icon-plus" @click="showForm('add')">新增</el-button>
            </el-col>
          </el-row>
        </div>
        <el-table :data="loandata" style="width: 100%" border>
          <el-table-column type="index"></el-table-column>
          <el-table-column
            prop="user"
            label="自己账户"
            width="180">
          </el-table-column>
          <el-table-column
            prop="type"
            label="账单类型"
            width="180">
          </el-table-column>
          <el-table-column
            prop="money"
            label="金额"
            width="180">
          </el-table-column>
          <el-table-column
            prop="date"
            label="日期"
            width="280">
          </el-table-column>
          <el-table-column
            prop="target"
            label="目标账户"
            width="180">
          </el-table-column>
          <el-table-column label="操作" width="349">
            <template v-slot="scope">
              <el-tooltip content="编辑款项" placement="top" :enterable="false">
                <el-button style="width: 80px;" type="warning" icon="el-icon-edit" @click="showForm('edit',scope.$index)"></el-button>
              </el-tooltip>
              <el-tooltip content="删除款项" placement="top" :enterable="false">
                <el-button style="width: 80px;" type="danger" icon="el-icon-delete" @click="showForm('delete',scope.$index)"></el-button>
              </el-tooltip>

              <el-dialog title="编辑款项" :visible.sync="dialogVisible_edit">
                <el-form :model="newloan">
                  <el-form-item label="自己用户">
                  </el-form-item>
                  <el-form-item label="账单类型" prop="type">
                    <el-radio v-model="newloan.type" label="借">借</el-radio>
                    <el-radio v-model="newloan.type" label="贷">贷</el-radio>
                  </el-form-item>
                  <el-form-item label="金额" prop="money">
                    <el-input v-model="newloan.money"></el-input>
                  </el-form-item>
                  <el-form-item label="目标账户" prop="target">
                    <el-input v-model="newloan.target"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="edit">确 定</el-button>
            </span>
              </el-dialog>
              <el-dialog title="删除款项" :visible.sync="dialogVisible_delete">
                <span>你确定是否要删除该款项?</span>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="cancel">取 消</el-button>
                  <el-button type="primary" @click="deleteloan">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="新增款项" :visible.sync="dialogVisible_add">
          <el-form :model="newloan">
            <el-form-item label="自己账户" prop="user">
              <el-select v-model="newloan.user" placeholder="请选择">
                <el-option
                  v-for="item in this.userdata"
                  :key="item.user"
                  :label="item.user"
                  :value="item.user">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="借/贷" prop="type">
              <el-radio v-model="newloan.type" label="借">借</el-radio>
              <el-radio v-model="newloan.type" label="贷">贷</el-radio>
            </el-form-item>
            <el-form-item label="金额" prop="money">
              <el-input v-model="newloan.money"></el-input>
            </el-form-item>
            <el-form-item label="目标账户" prop="target">
              <el-input v-model="newloan.target"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
        </span>
        </el-dialog>
      </el-card>
    </el-row>

  </div>
</template>

<style scoped>

</style>
