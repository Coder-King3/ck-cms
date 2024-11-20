<template>
  <el-form
    ref="fromRef"
    :model="account"
    :rules="rules"
    class="login-account"
    label-position="left"
    status-icon
  >
    <!-- label-width="70px" -->
    <el-form-item prop="name" style="margin-top: 40px">
      <span class="svg-container svg-container-admin">
        <svg-icon type="user" />
      </span>
      <el-input v-model="account.name" placeholder="请输入用户名" />
    </el-form-item>
    <el-form-item prop="password">
      <span class="svg-container">
        <svg-icon type="lock" />
      </span>
      <el-input
        :key="passwordType"
        ref="password"
        v-model="account.password"
        :type="passwordType"
        placeholder="请输入密码"
      />
      <span
        v-if="passwordType === 'password'"
        class="show-password"
        @click="handlePassword"
      >
        <svg-icon type="eye-slash" />
      </span>
      <span v-else class="show-password" @click="handlePassword">
        <svg-icon type="eye" />
      </span>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts" name="PanelAccount">
import { reactive, ref, nextTick } from 'vue'
import { ElForm } from 'element-plus'
import { KElMessage } from '@/utils'
import { rules } from '../config/account-config'
import { localCache } from '@/utils/cache'
import useLoginStore from '@/store/login/login'
import type { IAccountType } from '@/types'
import Crypto from '@/utils/crypto'

const emit = defineEmits(['handleLoadling'])

/* 定义内部数据 */
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
const account = reactive<IAccountType>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: Crypto.decrypt(localCache.getCache(CACHE_PASSWORD) ?? '')
})
const passwordRef = ref()
const passwordType = ref('password')

const handlePassword = () => {
  passwordType.value === 'password'
    ? (passwordType.value = '')
    : (passwordType.value = 'password')
  nextTick(() => {
    passwordRef.value.focus()
  })
}

/* 定义登录逻辑 */
const fromRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
const loginAction = (isKeepPassword: boolean) => {
  fromRef.value?.validate((valid) => {
    // 是否通过校验
    if (valid) {
      emit('handleLoadling', true)
      // 1.获取用户输入的帐号和密码
      const name = account.name
      const password = account.password

      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore
        .accountLoginAction({ name, password })
        .then(() => {
          // 3.判断是否需要记住密码
          if (isKeepPassword) {
            localCache.setCache(CACHE_NAME, name)
            localCache.setCache(CACHE_PASSWORD, Crypto.encrypt(password))
          } else {
            localCache.deleteCache(CACHE_NAME)
            localCache.deleteCache(CACHE_PASSWORD)
          }
          emit('handleLoadling', false)
        })
        .catch((error) => {
          KElMessage('error', error)
          emit('handleLoadling', false)
        })
    } else {
      KElMessage('error', '请填写正确格式的账户密码！')
    }
  })
}

/* 定义暴露的属性方法 */
defineExpose({ loginAction })
</script>

<style lang="less" scoped>
.svg-container {
  position: absolute;
  top: calc(50%- 16px / 2);
  left: 15px;
  z-index: 999;
  font-size: 16px;
  color: #d7dee3;
  cursor: pointer;
  user-select: none;
}

.show-password {
  position: absolute;
  top: calc(50%- 16px / 2);
  right: 25px;
  font-size: 16px;
  color: #d7dee3;
  cursor: pointer;
  user-select: none;
}

::v-deep {
  .el-form-item {
    padding-right: 0;
    margin: 20px 0;
    color: #454545;
    background: transparent;
    border: 1px solid transparent;
    border-radius: 2px;

    &__content {
      min-height: 32px;
      line-height: 32px;
    }

    &__error {
      position: absolute;
      top: 100%;
      left: 18px;
      font-size: 12px;
      line-height: 18px;
      color: #f34d37;
    }
  }

  .el-input {
    box-sizing: border-box;

    &__wrapper {
      padding: 0;
    }

    &__suffix {
      background: #f6f4fc;
      .el-input__validateIcon {
        display: none;
        width: 0;
        height: 0;
      }
    }

    input {
      height: 58px;
      padding-left: 45px;
      font-size: 14px;
      line-height: 58px;
      color: #606266;
      background: #f6f4fc;
      border: 0;
      caret-color: #606266;
    }
  }
}

// .el-form-item {
//   padding-right: 0;
//   margin: 20px 0;
//   color: #454545;
//   background: transparent;
//   border: 1px solid transparent;
//   border-radius: 2px;
// }
</style>
