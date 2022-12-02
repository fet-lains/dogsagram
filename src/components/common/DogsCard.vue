<template>
  <article class="card" ref="dogsCard">
    <div class="card__image ibg">
      <img :src="imageUrl" alt="" />
    </div>
    <div class="card__action">
      <button
        type="button"
        class="like-button"
        :class="{ 'like-button--favourite': isFavourite || props.favourite }"
        @click="toggleFavourite">
        <FavouriteIcon />
      </button>
    </div>
  </article>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import FavouriteIcon from '@/components/icons/FavouriteIcon.vue';
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
    background-color: var(--card-background);
    padding: 15px;
    border-radius: 5px;
    &__image {
      aspect-ratio: 1/1;
      border-radius: 5px;
      overflow: hidden;
    }
    &__action {
      position: absolute;
      right: 20px;
      bottom: 20px;
      transition: opacity @anim-slow, visibility @anim-slow;
      .like-button {
        width: 25px;
        height: 25px;
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
      &__action {
        right: calc(50% - 40px);
        bottom: calc(50% - 40px);
        opacity: 0;
        visibility: hidden;
        .like-button {
          width: 80px;
          height: 80px;
        }
      }
    }
  }
  @media @hover {
    .card:hover .card__action {
      opacity: 1;
      visibility: visible;
    }
  }
</style>
