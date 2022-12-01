<template>
  <TheGrid>
    <template #title>Favourite dogs</template>

    <template #default>
      <TransitionGroup appear name="cards-scale">
        <DogsCard
          v-for="(image, i) in store.favouriteImages"
          :key="i"
          :image-url="image"
          favourite />
      </TransitionGroup>
    </template>
  </TheGrid>
</template>

<script setup>
  import TheGrid from '@/components/layout/TheGrid.vue';
  import DogsCard from '@/components/common/DogsCard.vue';
  import { useBreedStore } from '@/stores/BreedStore.js';

  const store = useBreedStore();
</script>
