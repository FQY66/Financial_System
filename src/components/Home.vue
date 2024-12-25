<template>
  <div>
    <el-container>
      <Side_Menu :iscollapse="iscollapse" :asideWidth="asideWidth" :handlecollapse="handlecollapse"></Side_Menu>
      <el-container>
        <el-header >
          <div style="cursor: pointer">
            <i class="el-icon-s-fold" v-show="!iscollapse" style="font-size: 30px" @click="handlecollapse"></i>
            <i class="el-icon-s-unfold" v-show="iscollapse" style="font-size: 30px" @click="handlecollapse"></i>
          </div>
          <!--            <el-breadcrumb separator="/">-->
          <!--              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
          <!--              <el-breadcrumb-item :to="{ path: '/' }">活动管理</el-breadcrumb-item>-->
          <!--              <el-breadcrumb-item :to="{ path: '/' }">活动列表</el-breadcrumb-item>-->
          <!--              <el-breadcrumb-item :to="{ path: '/' }">活动详情</el-breadcrumb-item>-->
          <!--              <el-breadcrumb-item ></el-breadcrumb-item>-->
          <!--            </el-breadcrumb>-->
          <div style="display: flex;align-items: center;justify-content: end;">
            <i class="el-icon-xitong" style="font-size: 40px"></i>
            <h1 style="padding-left: 10px">个人财务系统</h1>
          </div>
          <div style="flex: 1;width: 0;display: flex;align-items: center;justify-content: end">
            <el-dropdown placement="bottom">
              <div style="display: flex;align-items: center; cursor:default">

                <img src="@/assets/logo2.png" style="width: 40px; ">
                <span>管理员</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main >
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>
import Side_Menu from "./views/Side_Menu.vue";
export default {
  name: "Home",
  components: {Side_Menu},
  data(){
    return {
      iscollapse:false,
      asideWidth:'200px'
    }
  },
  methods:{
    handlecollapse(){
      this.iscollapse=!this.iscollapse;
      this.asideWidth = this.iscollapse?'64px':'200px';
    }
  }
};
</script>
<style>

.el-header{
  padding-left: 0;
  box-shadow: 0 0 2px 2px rgba(71,167,235,.86);
  display: flex;
  align-items: center;
}
</style>
