<!--
 * @Author: HYI
 * @Date: 2023-06-09 14:55:29
 * @LastEditors: HYI110100 53818512+HYI110100@users.noreply.github.com
 * @LastEditTime: 2024-01-31 17:41:17
 * @Description: Home
-->
<script setup lang="ts">
import request from '@/utils/request';
function getData() {
  request.get('https://jsonplaceholder.typicode.com/todos/1', { repeatCancelConfig: { range: 1 } })
}
</script>

<template>
  <button @click="getData">122</button>
</template>
