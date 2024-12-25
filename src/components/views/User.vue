<script>
export default {
  name: 'User',
  data() {
    return {
      input:' ',
      tabledata:[]
    }
  },
  methods:{

  },
  created() {
    console.log("该方法被调用")
    // this.$axios.get('static/userdata.json').then(res=>{
    //   this.tabledata=res.data.tabledata;
    // })

  }
}

</script>

<template>
  <div>
    <el-card>
      <div slot="header">
        <el-row :gutter="220">
          <el-col :span="6">
            <el-input v-model="input" placeholder="请输入内容" style="width: 380px" suffix-icon="el-icon-search"></el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary">添加用户</el-button>
          </el-col>
        </el-row>
      </div>
      <el-table :data="tabledata" style="width: 100%" border>
        <el-table-column type="index"></el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>

        <el-table-column
          prop="address"
          label="地址"
          width="280">
        </el-table-column>

        <el-table-column
          prop="user"
          label="账号"
          width="180">
        </el-table-column>

        <el-table-column
          prop="finace"
          label="余额"
          width="180">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>

</style>
