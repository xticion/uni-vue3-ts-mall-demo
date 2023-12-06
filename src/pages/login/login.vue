<script setup lang="ts">
import { onLoad } from '@dcloudio/uni-app'
import { postLoginWxMinSimpleAPI } from '../../services/login'
import { useMemberStore } from '../../stores'

let code
onLoad(async () => {
  const res = await wx.login()
  code = res.code
  console.log(code)
})

const getPhoneNumber = async (e) => {
  // 获取参数
  const iv = e.detail.iv;
  const encryptedData = e.detail.encryptedData;
  // 请求后端进行解密，获取到用户手机号(此处使用的测试接口)
  const res = await postLoginWxMinSimpleAPI('15586651483');
  // 将用户信息存储到pinia中
  useMemberStore().setProfile(res.result);
  console.log(useMemberStore().profile)
  // 进行成功提示
  uni.showToast({
    icon:'success',
    title:'登录成功'
  })
  // 页面跳转
  setTimeout(()=>{
    uni.switchTab({ url: '/pages/index/index' })
  },500)
}

</script>

<template>
  <view class="viewport">
    <view class="logo">
      <image src="../../static/logo.png"></image>
    </view>
    <view class="login">
      <!-- 小程序端授权登录 -->
      <button
        class="button phone"
        open-type="getPhoneNumber"
        @getphonenumber="getPhoneNumber"
      >
        手机号一键登录
      </button>
      <view class="tips">登录/注册即视为你同意《服务条款》</view>
    </view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
}

.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20rpx 40rpx;
}

.logo {
  flex: 1;
  text-align: center;
  image {
    width: 220rpx;
    height: 220rpx;
    margin-top: 15vh;
  }
}

.login {
  display: flex;
  flex-direction: column;
  height: 60vh;
  padding: 40rpx 20rpx 20rpx;

  .input {
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    border: 1px solid #ddd;
    padding-left: 30rpx;
    margin-bottom: 20rpx;
  }

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 80rpx;
    font-size: 28rpx;
    border-radius: 72rpx;
    color: #fff;
    .icon {
      font-size: 40rpx;
      margin-right: 6rpx;
    }
  }

  .phone {
    background-color: #28bb9c;
  }

  .wechat {
    background-color: #06c05f;
  }

  .extra {
    flex: 1;
    padding: 70rpx 70rpx 0;
    .caption {
      width: 440rpx;
      line-height: 1;
      border-top: 1rpx solid #ddd;
      font-size: 26rpx;
      color: #999;
      position: relative;
      text {
        transform: translate(-40%);
        background-color: #fff;
        position: absolute;
        top: -12rpx;
        left: 50%;
      }
    }

    .options {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 70rpx;
      button {
        padding: 0;
        background-color: transparent;
      }
    }

    .icon {
      font-size: 24rpx;
      color: #444;
      display: flex;
      flex-direction: column;
      align-items: center;

      &::before {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 80rpx;
        height: 80rpx;
        margin-bottom: 6rpx;
        font-size: 40rpx;
        border: 1rpx solid #444;
        border-radius: 50%;
      }
    }
    .icon-weixin::before {
      border-color: #06c05f;
      color: #06c05f;
    }
  }
}

.tips {
  position: absolute;
  bottom: 80rpx;
  left: 20rpx;
  right: 20rpx;
  font-size: 22rpx;
  color: #999;
  text-align: center;
}
</style>
