<template>
  <section class="dogs">
    <div class="container">
      <h1 class="dogs__title">
        <slot name="title" />
      </h1>

      <slot name="favourite-hint" />

      <slot name="tap-hint" v-if="!store.error" />

      <AppLoader v-if="store.isLoading" />

      <p class="error" v-else-if="!store.isLoading && store.error">
        {{ store.error }}
      </p>

      <div class="dogs__grid" v-else>
        <slot />
      </div>

      <slot name="refresh" />
    </div>
  </section>
</template>

<script setup lang="ts">
  import AppLoader from '@/components/common/AppLoader.vue';
  import { useBreedStore } from '@/stores/BreedStore';
  const store = useBreedStore();
</script>

<style lang="less" scoped>
  .dogs {
    padding: 30px 0;
    &__title {
      font-size: 2.2rem;
      text-align: center;
      text-transform: uppercase;
      color: var(--text-content);
      transition: color @anim-slow;
    }
    &__grid {
      display: grid;
      gap: 30px;
      margin-top: 20px;
    }
  }

  @media @sm {
    .dogs {
      padding: 40px 0;
      &__title {
        font-size: 2.6rem;
      }
      &__grid {
        grid-template-columns: repeat(2, 1fr);
        margin-top: 30px;
      }
      &__error {
        margin-top: 30px;
      }
    }
  }
  @media @lg {
    .dogs {
      padding: 50px 0;
      &__grid {
        grid-template-columns: repeat(3, 1fr);
        margin-top: 40px;
      }
    }
  }
</style>
