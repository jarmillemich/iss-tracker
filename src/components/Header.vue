<template>
    <div class="header">
      <hamburger></hamburger>
      <h1>Just The Ducks</h1>
      <!-- <img src="/public/icons/earth.ico"/> -->
      
      <div class="feature-menu">
        <div :class="{ vis: !isAboutPath() }" class="earth"></div>
        <h3 class="icon-padding hidden-mobile">Home</h3>
      </div>
      
      <!-- <div class="nav">
        <router-link to="/">Home</router-link>
      </div> -->
    </div>
</template>
  
<script setup lang="ts">
  import {useRoute} from 'vue-router'
  import Hamburger from './Hamburger.vue'
  function isAboutPath(){
    const route = useRoute();
    return route.fullPath.includes('about');
  }
</script>
<style scoped lang="scss">
  .icon-padding{
    padding-right: 10px;
  }
    .vis{
      visibility: hidden;
    }

    .feature-menu{
      display: flex;
      align-items: center;
    }

    .header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 80px;
      background-color: black;
      padding-right: 20px;
    }

  @media (max-width: 767px) {
    .hidden-mobile{
      display: none;
    }
  }

</style>