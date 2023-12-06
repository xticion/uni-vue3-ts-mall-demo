<template>
  <view class="viewport">
    <CustomNabar />
    <!-- 添加滚动容器 -->
    <scroll-view
      class="scroll-view"
      enable-back-to-top
      refresher-enabled
      @refresherrefresh="onRefresh"
      :refresher-triggered="isTriggered"
      scroll-y
      @scrolltolower="onScrolltolower"
    >
      <template>
        <!-- 轮播图 -->
        <XtxSwiper :list="swiperList"></XtxSwiper>
        <!-- 猜你喜欢-商品 -->
        <XtxGuess ref="guessRef"></XtxGuess>
      </template>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import CustomNabar from './components/CustomNavbar.vue'
import XtxSwiper from './components/XtxSwiper.vue'
import XtxGuess from './components/XtxGuess.vue'
import { onLoad } from '@dcloudio/uni-app'
import { getSwiperAPI } from '@/services/home'
import type { SwiperItem } from '@/types/home'
import { ref } from 'vue'

// 获取轮播图数据
const swiperList = ref<SwiperItem[]>([])
const getSwiperData = async () => {
  const res = await getSwiperAPI()
  swiperList.value = res.result
}

// 获取猜你喜欢实例
// 变量名称需要和组件中的全等，才能获取到dom实例，否则会显示undefined
const guessRef = ref<InstanceType<typeof XtxGuess>>()
// 下拉刷新
const isTriggered = ref(false)
// 自定义下拉刷新触发
const onRefresh = async () => {
  console.log('触发下拉刷新')
  isTriggered.value = true
  guessRef.value?.resetData()
  await Promise.all([getSwiperData(), guessRef.value?.getMore()])
  isTriggered.value = false
}
// 滚动触底时，进行下一次的分页查询
const onScrolltolower = () => {
  console.log('触发触底加载')
  console.log(guessRef.value)
  guessRef.value?.getMore()
}

// 页面加载
onLoad(async () => {
  await Promise.all([getSwiperData()])
})
</script>

<style lang="scss" scoped>
page {
  background-color: #f7f7f7;
  height: 100%;
  overflow: hidden;
}

.viewport {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
