<template>
  <view class="navbar" :style="{paddingTop: safeAreaInsets?.top + 'px'}">
    <view  class="logo">
        <!-- logo文字 -->
        <image class="logo-image" src="@/static/logo.png" />  
        <text class="logo-text">新鲜 · 亲民 · 快捷</text>
    </view>
    <view>
      <!-- 搜索条 -->
    </view>
  </view>
</template>

<script lang="ts" setup>
  // 获取屏幕边界到安全区域的距离，用于导航栏高度的适配
  const {safeAreaInsets} = uni.getSystemInfoSync();
  console.log(safeAreaInsets?.bottom)

</script>

<style lang="scss" scoped>
/* 自定义导航条 */
.navbar {
  background-color: green;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  padding-top: 20px;
  .logo {
    display: flex;
    align-items: center;
    height: 64rpx;
    padding-left: 30rpx;
    padding-top: 20rpx;
    .logo-image {
      width: 166rpx;
      height: 39rpx;
    }
    .logo-text {
      flex: 1;
      line-height: 28rpx;
      color: #fff;
      margin: 2rpx 0 0 20rpx;
      padding-left: 20rpx;
      border-left: 1rpx solid #fff;
      font-size: 26rpx;
    }
  }
  .search {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10rpx 0 26rpx;
    height: 64rpx;
    margin: 16rpx 20rpx;
    color: #fff;
    font-size: 28rpx;
    border-radius: 32rpx;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .icon-search {
    &::before {
      margin-right: 10rpx;
    }
  }
  .icon-scan {
    font-size: 30rpx;
    padding: 15rpx;
  }
}
</style>