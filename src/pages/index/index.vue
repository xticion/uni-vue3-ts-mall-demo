<template>
  <CustomNabar></CustomNabar>
  <!-- 轮播图 -->
  <XtxSwiper :list="swiperList"></XtxSwiper>
</template>

<script setup lang="ts">
import CustomNabar from "./components/CustomNavbar.vue";
import XtxSwiper from "./components/XtxSwiper.vue";
import { onLoad } from '@dcloudio/uni-app'
import {getSwiperAPI} from "@/services/home";
import type { SwiperItem } from "@/types/home";
import {ref} from 'vue'

// 获取轮播图数据

const swiperList = ref<SwiperItem[]>([]);

const getSwiperData =async () => {
  const res = await getSwiperAPI();
  swiperList.value = res.result;
}

// 页面加载
onLoad(async () => {
  await Promise.all([getSwiperData()])
})

</script>

<style lang="scss">

</style>
