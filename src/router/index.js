import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/breeds/:breedId',
    name: 'breed',
    component: () => import('@/views/BreedView.vue'),
  },
  {
    path: '/favourite-dogs',
    name: 'favourite',
    component: () => import('@/views/FavouriteDogs.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/NotFoundView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
});

export default router;
