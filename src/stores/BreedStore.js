import { defineStore } from 'pinia';
import { ref, onMounted } from 'vue';

export const useBreedStore = defineStore('breedStore', () => {
  // Genaral state for loading images
  const isLoading = ref(false);
  const startLoading = () => {
    isLoading.value = true;
  };
  const stopLoading = () => {
    isLoading.value = false;
  };

  // General state for errors
  const error = ref('');
  const setError = (message) => {
    error.value = message;
  };

  // Logic to handle favourite images
  const favouriteImages = ref([]);
  const saveFavouriteImages = () => {
    localStorage.setItem('favourites', JSON.stringify(favouriteImages.value));
  };
  const loadFavouriteImages = () => {
    const favouriteDogs = JSON.parse(
      localStorage.getItem('favourites') || '[]',
    );

    favouriteImages.value = favouriteDogs;
  };

  onMounted(() => {
    loadFavouriteImages();
  });

  return {
    isLoading,
    error,
    favouriteImages,
    startLoading,
    stopLoading,
    setError,
    saveFavouriteImages,
  };
});
