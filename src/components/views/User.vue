<script>
export default {
  name: 'User',
  data() {
    return {
      input: ' ',
      userdata: [],
      dialogVisible_adduser:false,
      dialogVisible_edituser:false,
      dialogVisible_deleteuser:false,
      dialogVisible:false,
      idx:-1,
      newUser:{
        name:'',
        pwd:'',
        bank:'',
        user:'',
        finace:'',
      },
    }
  },
  methods: {
    showForm(dialog,index,user){
      if(dialog==="dialogVisible_adduser"){
        console.log("添加用户界面被调用")
        this.dialogVisible_adduser=true;
        this.newUser = {
          name: '',
          pwd: '',
          bank: '',
          finace: '',
        }
      }
      if(dialog==="dialogVisible_edituser"){
        console.log("编辑用户按钮被触发之前"+index);
        this.dialogVisible_edituser=true;
        if (localStorage.getItem('userdata')) {
          this.userdata = JSON.parse(localStorage.getItem('userdata'));
          this.idx=index;
          this.newUser=this.userdata[this.idx];
        }
      }
      if(dialog==="dialogVisible_deleteuser"){
        this.dialogVisible_deleteuser=true;
        this.idx=index;
        console.log("删除前用户的index",this.idx);
      }
    },
    saveNewUser(){
      if (localStorage.getItem('userdata')) {
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
      }
      this.userdata.push(this.newUser);
      localStorage.setItem('userdata', JSON.stringify(this.userdata));
      this.dialogVisible_adduser = false;
      this.newUser = {
        name: '',
        pwd: '',
        bank: '',
        finace: '',
      };
    },
    editConfirm(index,user){
      console.log("编辑用户确认按钮被触发后"+index);
      if (this.idx !== -1) {
        this.userdata[this.idx]=this.newUser;
        localStorage.setItem('userdata', JSON.stringify(this.userdata));
        this.idx=-1;
        this.dialogVisible_edituser=false;
      }
    },
    cancel(){
      if (!localStorage.getItem('userdata')) {
        console.log('在localstorage中创建userdata');
        localStorage.setItem('userdata',this.userdata);
      }
      if (localStorage.getItem('userdata')) {
        console.log("拿到userdata数据")
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
      }
      this.dialogVisible_edituser=false;
      this.dialogVisible_deleteuser=false;
      this.dialogVisible_adduser=false;
    },
    deleteUser(){
      console.log("删除后的用户的index",this.idx);
      if (localStorage.getItem('userdata')) {
        this.userdata = JSON.parse(localStorage.getItem('userdata'));
        console.log("拿到userdata数据",this.userdata);
        if (this.idx !== -1) {
          this.userdata.splice(this.idx, 1);
          localStorage.setItem('userdata', JSON.stringify(this.userdata));
          this.idx=-1;
          this.dialogVisible_deleteuser=false;
        }
      }
    }
  },
  created() {
    console.log("created方法被调用")
    if (!localStorage.getItem('userdata')) {
      console.log('在localstorage中创建userdata');
      localStorage.setItem('userdata',this.userdata);
    }
    if (localStorage.getItem('userdata')) {
      console.log("拿到userdata数据")
      this.userdata = JSON.parse(localStorage.getItem('userdata'));
    }
  },

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
            <el-button type="primary" @click="showForm('dialogVisible_adduser')">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="userdata" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="账户"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pwd"
          label="密码"
          width="330">
        </el-table-column>
        <el-table-column
          prop="bank"
          label="银行"
          width="310">
        </el-table-column>
        <el-table-column
          prop="finace"
          label="余额"
          width="200">
        </el-table-column>
        <el-table-column label="操作" width="349">
          <template v-slot="scope">
           <el-tooltip content="编辑用户" placement="top" :enterable="false">
             <el-button style="width: 80px;" type="primary" icon="el-icon-edit" @click="showForm('dialogVisible_edituser',scope.$index,scope.row)"></el-button>
           </el-tooltip>
            <el-tooltip content="删除用户" placement="top" :enterable="false">
              <el-button style="width: 80px"  type="danger" icon="el-icon-delete" @click="showForm('dialogVisible_deleteuser',scope.$index)"></el-button>
            </el-tooltip>
            <el-dialog >
            </el-dialog>
            <el-dialog title="编辑用户" :visible.sync="dialogVisible_edituser" @close="cancel">
              <el-form>
                <el-form-item label="账户" required>
                  <el-input v-model="newUser.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" required>
                  <el-input v-model="newUser.pwd"></el-input>
                </el-form-item>
                <el-form-item label="银行" required>
                  <el-input v-model="newUser.bank"></el-input>
                </el-form-item>
                <el-form-item label="余额" required>
                  <el-input v-model="newUser.finace"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="editConfirm(scope.$index,scope.row)">确 定</el-button>
              </div>
            </el-dialog>
            <el-dialog title="删除用户" :visible.sync="dialogVisible_deleteuser" @close="cancel">
              <span>你确定是否要删除该用户?</span>
              <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="deleteUser">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="添加用户" :visible.sync="dialogVisible_adduser" @close="cancel">
        <el-form>
          <el-form-item label="账户" required>
            <el-input v-model="newUser.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" required>
            <el-input v-model="newUser.pwd"></el-input>
          </el-form-item>
          <el-form-item label="银行" required>
            <el-input v-model="newUser.bank"></el-input>
          </el-form-item>
          <el-form-item label="余额" required>
            <el-input v-model="newUser.finace"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="saveNewUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<style scoped>

</style>
