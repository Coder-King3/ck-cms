<template>
  <div class="login">
    <el-row>
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <login-panel id="login-panel" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="Login">
import LoginPanel from './cpns/login-panel.vue'
</script>

<style scoped lang="less">
.login {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // width: 100vw;
  height: 100vh;
  background: url('@/assets/img/login-bg.jpg') 50% fixed no-repeat;
  background-size: cover;
}
</style>
