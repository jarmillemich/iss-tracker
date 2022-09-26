<template>
  <header>
    <div class="wrapper">

      <!-- <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
      </nav> -->
    </div>
  </header>

  <router-view />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
