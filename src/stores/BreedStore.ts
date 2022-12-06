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
  const setError = (message: string) => {
    error.value = message;
  };

  // Logic to handle favourite images
  const favouriteImages = ref<[] | string[]>([]);
  const saveFavouriteImages = () => {
    localStorage.setItem('favourites', JSON.stringify(favouriteImages.value));
  };
  const loadFavouriteImages = (): void => {
    const favouriteDogs: [] | string[] = JSON.parse(
      localStorage.getItem('favourites') || '[]',
    );
    console.log(favouriteDogs);

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
