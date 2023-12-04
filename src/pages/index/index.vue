<template>
  <CustomNabar></CustomNabar>
  <!-- 轮播图 -->
  <XtxSwiper :list="swiperList"></XtxSwiper>
  <!-- 猜你喜欢-商品 -->
  <XtxGuess :list="HomeGoodsGuessLikeList"></XtxGuess>
</template>

<script setup lang="ts">
import CustomNabar from "./components/CustomNavbar.vue";
import XtxSwiper from "./components/XtxSwiper.vue";
import XtxGuess from "./components/XtxGuess.vue";
import { onLoad } from '@dcloudio/uni-app'
import {getSwiperAPI,getHomeGoodsGuessLikeAPI} from "@/services/home";
import type { SwiperItem,GuessItem } from "@/types/home";
import type {PageResult} from "@/types/global";
import {ref} from 'vue'

// 获取轮播图数据
const swiperList = ref<SwiperItem[]>([]);
const getSwiperData =async () => {
  const res = await getSwiperAPI();
  swiperList.value = res.result;
}

// 获取猜你喜欢的数据
const HomeGoodsGuessLikeList = ref<GuessItem[]>();
const getHomeGoodsGuessLikeData =async () => {
  const res = await getHomeGoodsGuessLikeAPI();
  HomeGoodsGuessLikeList.value = res.result.items;
}

// 页面加载
onLoad(async () => {
  await Promise.all([getSwiperData(),getHomeGoodsGuessLikeData()])
})

</script>

<style lang="scss">

</style>
