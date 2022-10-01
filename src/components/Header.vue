<template>
    <div class="header">
      <h3>hamburger</h3>
      <h1>Just The Ducks</h1>
      <!-- <img src="/public/icons/earth.ico"/> -->
      <div :class="{ visibility: isAboutPath() }">
        <i class="earth"></i>
        <h3>Home</h3>
      </div>
      
      <!-- <div class="nav">
        <router-link to="/">Home</router-link>
      </div> -->
    </div>
</template>
  
<script setup lang="ts">
  import {useRoute} from 'vue-router'
  function isAboutPath(){
    const route = useRoute();
    return route.fullPath.includes('about');
  }
</script>
<style scoped lang="scss">
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 80px;
        background-color: black;
      }
</style>