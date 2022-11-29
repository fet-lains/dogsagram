<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <router-link to="/" class="header__logo">
          <LogoIcon />
        </router-link>

        <nav class="header__nav">
          <BreedSwitcher
            class="header__breed"
            default="Breed"
            :options="selectOptions"
            @input="setBreed" />

          <router-link to="/favourite-dogs" class="menu-link">
            <FavouriteIcon />
          </router-link>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import BreedSwitcher from '@/components/common/BreedSwitcher.vue';
  import LogoIcon from '@/components/icons/LogoIcon.vue';
  import FavouriteIcon from '@/components/icons/FavouriteIcon.vue';
  import useFetch from '@/composables/useFetch.js';
  import { useBreedStore } from '@/stores/BreedStore.js';

  // Logic to get the list of breeds
  const selectOptions = ref([]);
  const API = new useFetch('https://dog.ceo/api/');
  const loadBreeds = () => {
    API.get('breeds/list/all')
      .then((data) => {
        const breeds = data.message;
        const breedsList = Object.keys(breeds);
        selectOptions.value = [];

        breedsList.forEach((breed) => {
          selectOptions.value.push(breed);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onMounted(() => {
    loadBreeds();
  });

  // Logic to send chosen breed to global state
  const breedStore = useBreedStore();
  const router = useRouter();
  const setBreed = (option) => {
    breedStore.setBreed(option);
    router.push({ name: 'breed', params: { breedId: option } });
  };
  if (!breedStore.breed) router.push({ name: 'home' });
</script>

<style lang="less" scoped>
  .header {
    background-color: @gallery;
    &__body {
      display: grid;
      grid-template-columns: 40px 1fr;
      align-items: center;
      gap: 30px;
      padding: 15px 0;
    }
    &__logo {
      &:focus {
        outline: @cornflower-blue solid 2px;
      }
    }
    &__nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .menu-link {
    fill: @mine-shaft;
    transition: fill @anim-slow;
    margin-left: 20px;
    &.active {
      fill: @ronchi;
    }
    &:focus {
      outline: @cornflower-blue solid 2px;
    }
  }
  @media @md {
    .header {
      &__body {
        position: relative;
        grid-template-columns: 60px 1fr;
        padding: 10px 0;
      }
    }
    .menu-link {
      font-size: 1.8rem;
    }
  }
  @media @hover {
    .menu-link:not(.active):hover {
      fill: @ronchi;
    }
  }
</style>
