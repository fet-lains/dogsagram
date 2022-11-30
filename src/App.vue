<template>
  <TheHeader />
  <main class="main">
    <RouterView :key="$route.path" />
  </main>
</template>

<script setup>
  import TheHeader from '@/components/layout/TheHeader.vue';
</script>

<style lang="less">
  :root {
    font-size: 10px;
  }

  body {
    min-width: 320px;
    font-family: @font;
    font-size: 1.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.2;
    font-feature-settings: 'pnum' on, 'lnum' on;
    word-wrap: break-word;
    overflow-wrap: break-word;
    color: @mine-shaft;
    background-color: @white;
    overflow-x: hidden;
  }

  .container {
    max-width: 1260px;
    width: 100%;
    padding: 0 15px;
    margin: 0 auto;
  }

  .ibg {
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-position: 50% 50%;
      object-fit: cover;
    }
  }

  @media @md {
    .container {
      padding: 0 20px;
    }
  }
  @media @lg {
    .container {
      padding: 0 30px;
    }
  }
</style>
