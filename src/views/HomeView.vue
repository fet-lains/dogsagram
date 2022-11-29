<template>
  <TheGrid>
    <template #title>Cute dogs</template>

    <template #default>
      <DogsCard
        v-for="(image, i) in randomImages"
        :key="i"
        :image-url="image" />
    </template>
  </TheGrid>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import TheGrid from '@/components/layout/TheGrid.vue';
  import DogsCard from '@/components/common/DogsCard.vue';
  import useFetch from '@/composables/useFetch.js';
  import { useBreedStore } from '@/stores/BreedStore.js';

  const randomImages = ref([]);
  const store = useBreedStore();
  const API = new useFetch('https://dog.ceo/api/');

  onMounted(() => {
    getDogImages();
  });

  const getDogImages = () => {
    store.startLoading();
    API.get('breeds/image/random/21')
      .then((data) => {
        store.stopLoading();
        data.message?.forEach((item) => {
          randomImages.value.push(item);
        });
      })
      .catch(() => {
        store.error = 'Failed to fetch data. Please, try again later!';
      });
  };
</script>
