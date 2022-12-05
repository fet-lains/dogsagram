<template>
  <article class="card" ref="dogsCard">
    <div class="card__image ibg">
      <img :src="imageUrl" alt="" />
    </div>
    <div class="card__footer">
      <h2 class="breed-title">{{ breed }}</h2>
      <button
        type="button"
        class="like-button"
        aria-label="like button"
        :class="{ 'like-button--favourite': isFavourite || props.favourite }"
        @click="toggleFavourite">
        <FavouriteIcon />
      </button>
    </div>
  </article>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue';
  import FavouriteIcon from '@/components/icons/FavouriteIcon.vue';
  import useDoubleTap from '@/composables/useDoubleTap.js';
  import useGetBreed from '@/composables/useGetBreed.js';
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

  // Logic to get breed from url
  const breed = computed(() => {
    return useGetBreed(props.imageUrl);
  });

  // Double tap logic to toggle favourite
  const dogsCard = ref(null);

  onMounted(() => {
    setFavouriteIcon();
    useDoubleTap(dogsCard.value, toggleFavourite);
  });
</script>

<style lang="less" scoped>
  .card {
    background-color: var(--card-background);
    padding: 15px;
    border-radius: 5px;
    &__image {
      aspect-ratio: 1/1;
      border-radius: 5px;
      overflow: hidden;
    }
    &__footer {
      display: grid;
      grid-template-columns: 1fr 25px;
      align-items: center;
      gap: 20px;
      padding-top: 15px;
      transition: opacity @anim-slow, visibility @anim-slow;
      .like-button {
        &:focus-visible {
          outline: var(--outline) solid 2px;
        }
        svg {
          width: 100%;
          fill: var(--heart-blank);
          transition: fill @anim-fast;
        }
        &--favourite {
          svg {
            fill: var(--heart);
            animation: pulse @anim-slow;
          }
        }
      }
      .breed-title {
        font-size: 1.6rem;
        color: var(--card-title);
        transition: color @anim-slow;
        &::first-letter {
          text-transform: uppercase;
        }
      }
    }
  }
  @keyframes pulse {
    0% {
      transform: scale(0.7);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
  @media @md {
    .card {
      &__footer {
        grid-template-columns: 1fr 30px;
        .breed-title {
          font-size: 1.8rem;
        }
      }
    }
  }
  @media @hover {
    .card {
      &__footer {
        .like-button:not(.like-button--favourite) {
          svg:hover {
            fill: var(--heart-hover);
          }
        }
      }
    }
  }
</style>
