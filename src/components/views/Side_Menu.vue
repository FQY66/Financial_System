<template>
  <div>
    <el-aside :width="asideWidth" style="min-height: 100vh;height: 100%;background: #00071D" >
      <div
        style="height:60px;color:white;display: flex;align-items:center;justify-content: center">
        <img src="@/assets/logo/logo1.jpg" width="40px">
        <span class="logo_title" v-show="!iscollapse" >菜单导航栏</span>
      </div>
      <el-menu style="border: none" :collapse="iscollapse" :collapse-transition="false" background-color="#00071D" text-color="#f6f6f6" active-text-color="#08d9d6" router :default-active="$route.path" >
        <el-menu-item index="/Welcome">
          <i class="el-icon-house"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-menu-item index="/User">
          <i class="el-icon-user"></i>
          <span slot="title">账户管理</span>
        </el-menu-item>
        <el-menu-item index="/Finace">
          <i class="el-icon-caiwu"></i>
          <span slot="title">财务信息</span>
        </el-menu-item>
        <el-menu-item index="/Income">
          <i class="el-icon-shouzhiguanli"></i>
          <span slot="title">收支管理</span>
        </el-menu-item>
        <el-menu-item index="/Loan">
          <i class="el-icon-zjiedai"></i>
          <span slot="title">借贷管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  name:'Side_Menu',
  data(){
    return {
    }
  },
  methods:{
  },
  props:["iscollapse","handlecollapse","asideWidth"]

};
</script>

<style>
.el-menu-item:hover,.el-submenu__title:hover{
  color: #08d9d6 !important;
}
.el-submenu__title:hover i{
  color: #08d9d6 !important;
}
.el-menu-item:hover i{
  color: #08d9d6 !important;
}
.el-menu-item.is-active{
  background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%) !important;

  border-radius: 10px;
}
.el-menu-item{
  height: 40px;
  line-height: 40px;

}
.el-submenu__title{
  height: 40px;
  line-height: 40px;

}

.el-submenu .el-menu-item{
  padding-left: 21px!important;
}
.el-header {
  padding-left: 0;
}
.el-aside{
  transition: width .3s;

  box-shadow: 2px 2px 4px rgba(0,0,0,.6);

}
.logo_title{
  transition: all.3s;
  color: #f6f6f6;
  font-size: 20px;
}
.el-header{
  box-shadow: 0 0 2px 2px rgba(71,167,235,.86);
  display: flex;
  align-items: center;
}
</style>
