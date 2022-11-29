<template>
  <section class="dogs">
    <div class="container">
      <h1 class="dogs__title">
        <slot name="title" />
      </h1>
      <AppLoader v-if="store.isLoading" />
      <p class="dogs__error" v-else-if="!store.isLoading && store.error">
        {{ store.error }}
      </p>

      <div class="dogs__grid" v-else>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
  import { useBreedStore } from '@/stores/BreedStore.js';
  import AppLoader from '@/components/common/AppLoader.vue';
  const store = useBreedStore();
</script>

<style lang="less" scoped>
  .dogs {
    padding: 30px 0;
    &__title {
      font-size: 2.2rem;
      text-align: center;
      text-transform: uppercase;
      margin-bottom: 20px;
    }
    &__grid {
      display: grid;
      gap: 30px;
    }
    &__error {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
    }
  }

  @media @md {
    .dogs {
      padding: 40px 0;
      &__title {
        font-size: 2.6rem;
        margin-bottom: 30px;
      }
      &__grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
  @media @lg {
    .dogs {
      padding: 50px 0;
      &__title {
        margin-bottom: 40px;
      }
      &__grid {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
</style>
