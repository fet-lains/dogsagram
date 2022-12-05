<template>
  <TheGrid>
    <template #title>Cute random dogs</template>

    <template #default>
      <TransitionGroup appear name="cards-scale">
        <DogsCard
          v-for="(image, i) in randomImages"
          :key="i"
          :image-url="image" />
      </TransitionGroup>
    </template>

    <template #refresh>
      <div class="refresh">
        <BaseButton @custom-action="refreshImages">Refresh</BaseButton>
      </div>
    </template>
  </TheGrid>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import TheGrid from '@/components/layout/TheGrid.vue';
  import DogsCard from '@/components/common/DogsCard.vue';
  import BaseButton from '@/components/common/BaseButton.vue';
  import useFetch from '@/composables/useFetch.js';
  import { useBreedStore } from '@/stores/BreedStore.js';

  const randomImages = ref([]);
  const store = useBreedStore();
  const API = new useFetch('https://dog.ceo/api/');

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
  const refreshImages = () => {
    randomImages.value = [];
    getDogImages();
  };

  onMounted(() => {
    getDogImages();
  });
</script>

<style lang="less" scoped>
  .refresh {
    display: grid;
    place-items: center;
    margin-top: 30px;
  }
</style>
