<template>
  <TheGrid>
    <template #title>Cute random dogs</template>

    <template #tap-hint>
      <p class="tap-hint">Tap twice to toggle favourite!</p>
    </template>

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

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import TheGrid from '@/components/layout/TheGrid.vue';
  import DogsCard from '@/components/common/DogsCard.vue';
  import BaseButton from '@/components/common/BaseButton.vue';
  import useFetch from '@/composables/useFetch';
  import { useBreedStore } from '@/stores/BreedStore';

  const randomImages = ref<string[]>([]);
  const store = useBreedStore();
  const API = new useFetch('https://dog.ceo/api/');

  const getDogImages = (): void => {
    store.startLoading();
    API.get('breeds/image/random/21')
      .then((data) => {
        store.stopLoading();
        data.message?.forEach((item: string) => {
          randomImages.value.push(item);
        });
      })
      .catch(() => {
        store.error = 'Failed to fetch data. Please, try again later!';
      });
  };
  const refreshImages = (): void => {
    randomImages.value = [];
    getDogImages();
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
