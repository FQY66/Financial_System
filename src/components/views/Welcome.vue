

<template>
  <div>
    <el-button @click="cmounted">触发</el-button>
    Welcome!
    {{msg}}
  </div>
</template>
<script>
export default {
  name:'Welcome',
  data () {
    return {
      msg:"no change"
    }
  },
  methods:{
    cmounted(){
      console.log("该按钮已被触发");
      this.$axios.get('static/tdata.json').then(res=>{
        console.log(res.data);
        this.msg=res.data.data.items[0].name;
      })
    }
  }
}
</script>
<style >

</style>
