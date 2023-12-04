<template>
  <button
    hover-class="button-hover"
    @click="getData"
  >
  测试请求
</button>

</template>

<script lang="ts" setup>
// 导入拦截器进行测试，后续改为全局
import '@/utils/http';

const getData = () =>{
  uni.request({
    method:'GET',
    url:'/my/my'
  })
}
</script>

<style lang="less" scoped>

</style>