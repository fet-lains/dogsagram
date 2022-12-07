<template>
  <TheGrid>
    <template #title>Favourite dogs</template>

    <template #favourite-hint>
      <p class="favourite-hint" v-if="!store.favouriteImages.length">
        Add some dogs to favourites first!
      </p>
    </template>

    <template #tap-hint>
      <p class="tap-hint" v-if="store.favouriteImages.length">
        Tap twice to toggle favourite!
      </p>
    </template>

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

<script setup lang="ts">
  import TheGrid from '@/components/layout/TheGrid.vue';
  import DogsCard from '@/components/common/DogsCard.vue';
  import { useBreedStore } from '@/stores/BreedStore';

  const store = useBreedStore();
</script>
