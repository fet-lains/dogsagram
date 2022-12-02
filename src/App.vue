<template>
  <TheHeader />
  <main class="main">
    <RouterView :key="$route.path" />
  </main>
  <TheFooter />
</template>

<script setup>
  import TheHeader from '@/components/layout/TheHeader.vue';
  import TheFooter from '@/components/layout/TheFooter.vue';
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
    color: var(--text);
    background-color: var(--background);
    transition: background-color @anim-slow;
    overflow-x: hidden;
  }

  #app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .main {
    flex-grow: 1;
    flex-shrink: 1;
    padding-top: 82px;
    padding-bottom: 60px;
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

  // Cards transition
  .cards-scale-enter-active {
    animation: scale @anim-slow;
  }
  .cards-scale-leave-active {
    animation: scale @anim-slow reverse;
  }
  @keyframes scale {
    0% {
      opacity: 0;
      transform: scale(0.7);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media @md {
    .main {
      padding-top: 92px;
    }
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
