<template>
  <TheGrid>
    <template #title>{{ store.breed }}</template>

    <template #default>
      <DogsCard v-for="(image, i) in breedImages" :key="i" :image-url="image" />
    </template>
  </TheGrid>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import TheGrid from '@/components/layout/TheGrid.vue';
  import DogsCard from '@/components/common/DogsCard.vue';
  import useFetch from '@/composables/useFetch.js';
  import { useBreedStore } from '@/stores/BreedStore.js';

  const breedImages = ref([]);
  const store = useBreedStore();
  const API = new useFetch('https://dog.ceo/api/');

  onMounted(() => {
    getDogImages();
  });

  const getDogImages = () => {
    store.startLoading();
    const chosenBreed = store.breed;
    API.get(`breed/${chosenBreed}/images`)
      .then((data) => {
        store.stopLoading();
        data.message?.forEach((item) => {
          breedImages.value.push(item);
        });
      })
      .catch(() => {
        store.error = 'Failed to fetch data. Please, try again later!';
      });
  };
</script>
