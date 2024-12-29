<template>
  <div>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in imglist" :key="item.id">
      <el-image :src="item.idView" style="width: 100%;height: auto"></el-image>
    </el-carousel-item>
  </el-carousel>
  <div><h>欢迎你，2200540317李硕</h></div>
  </div>
</template>
<script>
export default {
  name:'Welcome',
  data () {
    return {
      imglist:[
        {id:0,idView:'static/1.jpg'},
        {id:1,idView:'static/2.jpg'},
        {id:2,idView:'static/3.jpg'},
      ]
    }
  },
  methods:{

  }
}
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
