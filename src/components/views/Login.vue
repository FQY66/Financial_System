<script>
export default {
  name:'Login',
  data(){
    return {
      username:'',
      password:'',
    }
  },
  methods:{
    login(){
      this.$router.push({ path: '/Home' })
    }
  }
}
</script>

<template>
  <body>
  <div id="app">
    <div class="login-container">
      <h2 class="login-title">登录</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" v-model="username" id="username" name="username" required>
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <input type="password" v-model="password" id="password" name="password" required>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <button type="submit" class="login-button" @click="login">登录</button>
        </div>

      </form>
    </div>
  </div>
  </body>
</template>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #71b7e6, #9b59b6);
}

.login-container {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  width: 350px;
}

.login-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #007BFF;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #007BFF;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #0056b3;
}
</style>
