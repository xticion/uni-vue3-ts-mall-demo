<template>
  <CustomNabar></CustomNabar>
  <!-- 轮播图 -->
  <XtxSwiper :list="swiperList"></XtxSwiper>
  <!-- 添加滚动容器 -->
  <scroll-view scroll-y @scrolltolower="onScrolltolower">
    <view>
        <!-- 猜你喜欢-商品 -->
  <XtxGuess ref="guessRef"></XtxGuess>
    </view>
  </scroll-view>

</template>

<script setup lang="ts">
import CustomNabar from "./components/CustomNavbar.vue";
import XtxSwiper from "./components/XtxSwiper.vue";
import XtxGuess from "./components/XtxGuess.vue";
import { onLoad } from '@dcloudio/uni-app'
import {getSwiperAPI,getHomeGoodsGuessLikeAPI} from "@/services/home";
import type { SwiperItem,GuessItem } from "@/types/home";
import {ref} from 'vue'

// 获取轮播图数据
const swiperList = ref<SwiperItem[]>([]);
const getSwiperData =async () => {
  const res = await getSwiperAPI();
  swiperList.value = res.result;
}

// 获取猜你喜欢实例
const guessInstence = ref<InstanceType<typeof XtxGuess>>()

// 滚动触底时，进行下一次的分页查询
const onScrolltolower = ()=>{
  console.log("触发触底加载")
  guessInstence.value?.getMore()
}

// 页面加载
onLoad(async () => {
  await Promise.all([getSwiperData()])
})

</script>

<style lang="scss">
.scroll-view {
  flex: 1;
  overflow: hidden;
}
</style>
