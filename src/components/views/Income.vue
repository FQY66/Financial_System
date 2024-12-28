<script>
export default {
  name: "Income",
  data() {
    return {
      input: '',
      index:'',
      incomedata: [],
      userdata: [],
      dialogVisible_add: false,
      dialogVisible_edit: false,
      dialogVisible_delete: false,
      value:'',
      user:{
        name:'',
        value:'',
      },
      newincome: {
        name: '',
        type: '',
        money: '',
        date: '',
        user: '',
      },
    }
  },
  methods: {
    showForm(dialogVisible,index,income){
      if('add'===dialogVisible){
        console.log("添加账单业务被启动");
        this.dialogVisible_add=true;
        this.newincome={
          name: '',
          type: '',
          money: '',
          date:'',
          user: '',
        }
      }
      if('edit'===dialogVisible){
        console.log("编辑账单按钮被触发之前"+index);
        this.dialogVisible_edit=true;
        if (localStorage.getItem('incomedata')) {
          this.userdata = JSON.parse(localStorage.getItem('incomdedata'));
          this.index=index;
          this.newincome=this.incomedata[this.index];
        }
      }
      if('delete'===dialogVisible){
        console.log("删除账单业务被启动");
        this.dialogVisible_delete=true;
        this.index=index;
      }
    },
    add(){
      if(localStorage.getItem('incomedata')){
        this.incomedata = JSON.parse(localStorage.getItem('incomedata'));
      }
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate()
      if (month < 10) month = `0${month}`
      if (strDate < 10) strDate = `0${strDate}`
      let hour= date.getHours() //获取当前小时(0 ~ 23)
      let minute=date.getMinutes() //获取当前分钟(0 ~ 59)
      let second =date.getSeconds() //获取当前秒数(0 ~ 59)
      this.newincome.date=`${year}年${month}月${strDate}日${hour}时${minute}分${second}秒`

      this.incomedata.push(this.newincome);
      localStorage.setItem('incomedata',JSON.stringify(this.incomedata));
      this.dialogVisible_add=false;
      this.newincome={
        name: '',
        type: '',
        money: '',
        date: '',
        user: '',
      }
    },
    deletebill(){
      console.log("删除确认函数被调用");
      console.log("当前index索引"+this.index);
      if(localStorage.getItem('incomedata')){
        this.incomedata=JSON.parse(localStorage.getItem('incomedata'));
        console.log("拿到incomedata数据",this.incomedata);
        if(this.index!==-1){
          this.incomedata.splice(this.index,1);
          localStorage.setItem('incomedata',JSON.stringify(this.incomedata));
          this.index=-1;
          this.dialogVisible_delete=false;
        }
      }
    },
    edit(){
      console.log("编辑账单确认按钮被触发后"+this.index);
      if (this.index !== -1) {
        this.incomedata[this.index]=this.newincome;
        localStorage.setItem('incomedata', JSON.stringify(this.incomedata));
        this.index=-1;
        this.dialogVisible_edit=false;
      }
    },
    cancel(){
      if (!localStorage.getItem('incomedata')) {
        console.log('在localstorage中创建incomedata');
        localStorage.setItem('incomedata', this.incomedata);
      }else{
        console.log('拿到incomedata');
        this.incomedata=JSON.parse(localStorage.getItem('incomedata'));
        console.log('incomedata为',this.incomedata);
      }
      console.log("cancel方法被调用");
      this.dialogVisible_delete=false;
      this.dialogVisible_add=false;
      this.dialogVisible_edit=false;
    }
  },
  mounted() {
    console.log("挂载函数被调用");
    if (!localStorage.getItem('incomedata')) {
      console.log('在localstorage中创建incomedata');
      localStorage.setItem('incomedata', this.incomedata);
    }else{
      console.log('拿到incomedata');
      this.incomedata=JSON.parse(localStorage.getItem('incomedata'));
      console.log('incomedata为',this.incomedata);
    }
    if (localStorage.getItem('userdata')) {
      console.log("拿到userdata数据");
      this.userdata = JSON.parse(localStorage.getItem('userdata'));
    }
  }
}
</script>

<template>
  <div>
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
      <el-table :data="incomedata" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="账单名称"
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
          prop="user"
          label="账户"
          width="180">
        </el-table-column>
        <el-table-column label="操作" width="349">
          <template v-slot="scope">
            <el-tooltip content="编辑账单" placement="top" :enterable="false">
              <el-button style="width: 80px;" type="warning" icon="el-icon-edit" @click="showForm('edit',scope.$index)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除账单" placement="top" :enterable="false">
              <el-button style="width: 80px;" type="danger" icon="el-icon-delete" @click="showForm('delete',scope.$index)"></el-button>
            </el-tooltip>

            <el-dialog title="编辑账单" :visible.sync="dialogVisible_edit">
              <el-form :model="newincome">
                <el-form-item>
                  <el-input v-model="newincome.name"></el-input>
                </el-form-item>
                <el-form-item label="账单类型" prop="type">
                  <el-radio v-model="newincome.type" label="收入">收入</el-radio>
                  <el-radio v-model="newincome.type" label="支出">支出</el-radio>
                </el-form-item>
                <el-form-item label="金额" prop="money">
                  <el-input v-model="newincome.money"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="edit">确 定</el-button>
            </span>
            </el-dialog>
            <el-dialog title="删除账单" :visible.sync="dialogVisible_delete">
              <span>你确定是否要删除该用户?</span>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="deletebill()">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="新增账单" :visible.sync="dialogVisible_add">
        <el-form :model="newincome">
          <el-form-item label="账单名称" prop="name">
            <el-input v-model="newincome.name"></el-input>
          </el-form-item>
          <el-form-item label="账单类型" prop="type">
            <el-radio v-model="newincome.type" label="收入">收入</el-radio>
            <el-radio v-model="newincome.type" label="支出">支出</el-radio>
          </el-form-item>
          <el-form-item label="金额" prop="money">
            <el-input v-model="newincome.money"></el-input>
          </el-form-item>
          <el-form-item label="账户" prop="user">
            <el-select v-model="newincome.user" placeholder="请选择">
              <el-option
                v-for="item in this.userdata"
                :key="item.name"
                :label="item.name"
                :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="add">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped>

</style>
