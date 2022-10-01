<template>
    <div :class="{ 'nav-display': !childMenu }" class="navigation">
      <div class="burger-header">
        <div @click="updateMenu(childMenu)" class="burger-container">
          <HamburgerBar :is-activated="childMenu"></HamburgerBar>
        </div>
        <div class="navbar">
          <div class="nav-items">
            <ul>
              <li><router-link to="/">Home</router-link></li>
              <li><router-link to="/about">About</router-link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import HamburgerBar from "./HamburgerBar.vue";
  
  //const emits = defineEmits(["UpdateIsMenu"]);
  
  let childMenu = ref(true);
  
  function updateMenu(childMenuUpdate: Boolean) {
    childMenu.value = !childMenuUpdate;
  }
  </script>
  
  <style lang="scss">
  .burger-header {
    min-height: 50px;
  }
  .burger-container {
    padding: 30px 40px;
    position: absolute;
    z-index: 30;
  }
  .navigation {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    min-height: 125px;
    height: 125px;
  }
  .navbar {
    position: fixed;
    display: flex;
    overflow: hidden;
    justify-content: center;
    height: 100%;
    background: black;
    width: 70%;
    opacity: 85%;
    margin-right: -600px;
    z-index: 5;
    transition: margin 0.5s ease-in-out;
  }
  @media (min-width: 320px) and (max-width: 767px) {
    .nav-display {
      .burger-container {
        position: fixed;
      }
      .navbar {
        margin-right: 0px;
      }
    }
    // .navigation {
    //   display: flex;
    //   justify-content: flex-end;
    //   width: 100%;
    //   min-height: 125px;
    //   height: 125px;
    // }
    .nav-items {
      height: fit-content;
      width: 200px;
      position: relative;
      top: 200px;
      color: white;
      li {
        a {
          color: white;
          text-decoration: none;
        }
        padding: 15px 0px;
      }
    }
    .burger-header {
      display: flex;
      justify-content: flex-end;
      // align-items: center;
      z-index: 10;
      min-height: max-content;
      width: 100%;
    }
  }
  </style>
  