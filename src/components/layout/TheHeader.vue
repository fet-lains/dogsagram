<template>
  <header class="header">
    <div class="container">
      <div class="header__body">
        <RouterLink to="/" class="header__logo" aria-label="home page">
          <LogoIcon />
        </RouterLink>

        <nav class="header__nav">
          <BreedSwitcher
            class="header__breed"
            default="Breed"
            :options="selectOptions" />

          <RouterLink
            to="/favourite-dogs"
            class="menu-link"
            aria-label="favourite dogs page">
            <FavouriteIcon />
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import BreedSwitcher from '@/components/header/BreedSwitcher.vue';
  import LogoIcon from '@/components/icons/LogoIcon.vue';
  import FavouriteIcon from '@/components/icons/FavouriteIcon.vue';
  import useFetch from '@/composables/useFetch.js';

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
</script>

<style lang="less" scoped>
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: var(--header);
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
        outline: var(--outline) solid 2px;
      }
    }
    &__logo svg {
      fill: var(--text);
    }
    &__nav {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
  .menu-link {
    fill: var(--text);
    transition: fill @anim-slow;
    margin-left: 20px;
    &.active {
      fill: var(--heart);
    }
    &:focus-visible {
      outline: var(--outline) solid 2px;
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
      fill: var(--text-hover);
    }
  }
</style>
