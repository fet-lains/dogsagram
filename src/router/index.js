import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/:breedId',
    name: 'breed',
    component: () => import('@/views/BreedView.vue'),
  },
  {
    path: '/favourite-dogs',
    name: 'favourite',
    component: () => import('@/views/FavouriteDogs.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
