<template>
  <TheGrid>
    <template #title>{{ breed }}</template>

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

<script setup>
  import { ref, onMounted } from 'vue';
  import TheGrid from '@/components/layout/TheGrid.vue';
  import DogsCard from '@/components/common/DogsCard.vue';
  import useFetch from '@/composables/useFetch.js';
  import { useBreedStore } from '@/stores/BreedStore.js';
  import { useRoute } from 'vue-router';

  const breedImages = ref([]);
  const store = useBreedStore();
  const API = new useFetch('https://dog.ceo/api/');
  const breed = useRoute().params.breedId;

  const getDogImages = () => {
    store.startLoading();

    let fetchBreed = breed;

    if (breed.includes('-')) {
      fetchBreed = breed.replaceAll('-', '/');
    }

    API.get(`breed/${fetchBreed}/images`)
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

  onMounted(() => {
    getDogImages();
  });
</script>
