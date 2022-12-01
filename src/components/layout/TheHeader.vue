<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <RouterLink to="/" class="header__logo">
          <LogoIcon />
        </RouterLink>

        <nav class="header__nav">
          <BreedSwitcher
            class="header__breed"
            default="Breed"
            :options="selectOptions"
            @input="setBreed" />

          <RouterLink to="/favourite-dogs" class="menu-link">
            <FavouriteIcon />
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
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

  // Logic to send chosen breed to global state
  const breedStore = useBreedStore();
  const setBreed = (option) => {
    breedStore.setBreed(option);
  };

  onMounted(() => {
    loadBreeds();
  });
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: @ronchi;
    z-index: 100;
    &__body {
      display: grid;
      grid-template-columns: 40px 1fr;
      align-items: center;
      gap: 30px;
      padding: 15px 0;
    }
    &__logo {
      &:focus-visible {
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
      fill: @burnt-sienna;
    }
    &:focus-visible {
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
      fill: @mine-shaft-hover;
    }
  }
</style>
