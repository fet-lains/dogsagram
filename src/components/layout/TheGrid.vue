<template>
  <section class="dogs">
    <div class="container">
      <h1 class="dogs__title">
        <slot name="title" />
      </h1>
      <p class="dogs__hint">Tap twice to toggle favourite!</p>
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
      color: var(--text-content);
      transition: color @anim-slow;
    }
    &__hint {
      text-align: center;
      color: var(--text-content);
      margin-top: 20px;
      transition: color @anim-slow;
    }
    &__grid {
      display: grid;
      gap: 30px;
      margin-top: 20px;
    }
    &__error {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      color: var(--text-content);
      margin-top: 20px;
    }
  }

  @media @sm {
    .dogs {
      padding: 40px 0;
      &__title {
        font-size: 2.6rem;
      }
      &__hint {
        margin-top: 30px;
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
  @media @md {
    .dogs {
      &__hint {
        display: none;
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
      &__error {
        margin-top: 40px;
      }
    }
  }
</style>
