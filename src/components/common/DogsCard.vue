<template>
  <article class="card" ref="dogsCard">
    <div class="card__image ibg">
      <img :src="imageUrl" alt="" />
    </div>
    <div class="card__action">
      <button
        type="button"
        class="icon"
        :class="{ 'icon--favourite': isFavourite || props.favourite }"
        @click="toggleFavourite">
        <FavouriteIconVue />
      </button>
    </div>
  </article>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import FavouriteIconVue from '@/components/icons/FavouriteIcon.vue';
  import useDoubleTap from '@/composables/useDoubleTap.js';
  import { useBreedStore } from '@/stores/BreedStore.js';

  const props = defineProps({
    imageUrl: {
      type: String,
      required: true,
    },
    favourite: {
      type: Boolean,
      default: false,
    },
  });

  const isFavourite = ref(false);
  const store = useBreedStore();
  const toggleFavourite = () => {
    if (store.favouriteImages.includes(props.imageUrl)) {
      const filteredArray = store.favouriteImages.filter(
        (item) => item !== props.imageUrl,
      );
      store.favouriteImages = filteredArray;
      isFavourite.value = false;
    } else {
      store.favouriteImages.push(props.imageUrl);
      isFavourite.value = true;
    }

    store.saveFavouriteImages();
  };
  const setFavouriteIcon = () => {
    if (store.favouriteImages.includes(props.imageUrl)) {
      isFavourite.value = true;
    } else {
      isFavourite.value = false;
    }
  };

  // Double tap logic to toggle favourite
  const dogsCard = ref(null);

  onMounted(() => {
    setFavouriteIcon();
    useDoubleTap(dogsCard.value, toggleFavourite);
  });
</script>

<style lang="less" scoped>
  .card {
    position: relative;
    background-color: @ronchi-light;
    padding: 15px;
    border-radius: 5px;
    &__image {
      height: 250px;
      border-radius: 5px;
      overflow: hidden;
    }
    &__action {
      position: absolute;
      top: calc(50% - 40px);
      left: calc(50% - 40px);
      opacity: 0;
      visibility: hidden;
      transform: scale(0.9);
      transition: opacity @anim-slow, visibility @anim-slow,
        transform @anim-slow;
      .icon {
        width: 80px;
        height: 80px;
        svg {
          width: 100%;
          fill: @white;
          transition: fill @anim-fast;
        }
        &--favourite {
          svg {
            fill: @burnt-sienna;
          }
        }
      }
    }
  }
  @media @md {
    .card {
      &__image {
        height: 330px;
      }
    }
  }
  @media @hover {
    .card:hover .card__action {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
</style>
