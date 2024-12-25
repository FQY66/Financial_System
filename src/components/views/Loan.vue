<template>
<div>
  loan界面
  <el-input v-model="inputdata">

  </el-input>
  <el-button @click="writeToFile">Submit</el-button>
</div>
</template>

<script>
export default {
  name:"Loan",
  data() {
    return {
      inputdata: ''
    }
  },
  methods: {
    writeToFile() {
      console.log("该写入文件事件被触发");
      const fs = require('fs');
      const data = {
        name: 'John Doe',
        age: 30,
        email: 'johndoe@example.com'
      };
      var inputdata = this.inputdata;
      localStorage.setItem('userData', JSON.stringify(inputdata));
      var item = localStorage.getItem('userData');
      console.log(item);
    }
  }
}
</script>

<style scoped>

</style>
