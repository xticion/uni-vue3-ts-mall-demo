<script setup lang="ts">
import type { SwiperItem } from '@/types/home.d.ts'
import { ref } from 'vue'

// ref 用于创建响应式数据，在发生改变时会重新触发渲染
// const 和let声明变量的区别在于，const声明的变量不可变，而let声明的变量可变
// let y = 10; y = 20; 可行
// const y = 10 ; y = 20; 报错，但是其中的值可以发生变化，比如下面修改 activeIndex.value
// 有点类似于java中引用传递
const activeIndex = ref(0)
// 当 swiper 下标发生变化时触发
const onChange: UniHelper.SwiperOnChange = (ev) => {
  // ! 非空断言，主观上排除掉空值情况
  activeIndex.value = ev.detail.current
}

// 定义props 接收
defineProps<{
  list: SwiperItem[]
}>()
</script>

<template>
  <!-- 轮播图组件-->
  <!-- 能够根据后端传入的数据，加载图片，和跳转链接-->
  <view class="carousel">
    <swiper :circular="true" :autoplay="false" :interval="3000" @change="onChange">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image mode="aspectFill" class="image" :src="item.imgUrl"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 指示点 -->
    <view class="indicator">
      <text
        v-for="(item, index) in list"
        :key="item.id"
        class="dot"
        :class="{ active: index === activeIndex }"
      ></text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.carousel {
  height: 280rpx;
  position: relative;
  overflow: hidden;
  transform: translateY(0);
  background-color: #efefef;
  .indicator {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16rpx;
    display: flex;
    justify-content: center;
    .dot {
      width: 30rpx;
      height: 6rpx;
      margin: 0 8rpx;
      border-radius: 6rpx;
      background-color: rgba(255, 255, 255, 0.4);
    }
    .active {
      background-color: #fff;
    }
  }
  .navigator,
  .image {
    width: 100%;
    height: 100%;
  }
}
</style>
