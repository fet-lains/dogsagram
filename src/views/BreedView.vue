<template>
  <TheGrid>
    <template #title>{{ breed }}</template>

    <template #tap-hint>
      <p class="tap-hint">Tap twice to toggle favourite!</p>
    </template>

    <template #default>
      <TransitionGroup appear name="cards-scale">
        <DogsCard
          v-for="(image, i) in breedImages"
          :key="i"
          :image-url="image" />
      </TransitionGroup>
    </template>
  </TheGrid>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import TheGrid from '@/components/layout/TheGrid.vue';
  import DogsCard from '@/components/common/DogsCard.vue';
  import useFetch from '@/composables/useFetch';
  import { useBreedStore } from '@/stores/BreedStore';
  import { useRoute } from 'vue-router';

  const breedImages = ref<string[]>([]);
  const store = useBreedStore();
  const API = new useFetch('https://dog.ceo/api/');
  const breed: string | string[] = useRoute().params.breedId;

  const getDogImages = (): void => {
    store.startLoading();
    let derivedBreed = breed;

    if (breed.includes('-') && typeof breed === 'string') {
      derivedBreed = breed.replaceAll('-', '/');
    }

    API.get(`breed/${derivedBreed}/images`)
      .then((data: any) => {
        store.stopLoading();
        data.message?.forEach((item: string) => {
          breedImages.value.push(item);
        });
      })
      .catch(() => {
        store.error = 'Failed to fetch data. Please, try again later!';
      });
  };

  onMounted(() => {
    getDogImages();
  });
</script>
