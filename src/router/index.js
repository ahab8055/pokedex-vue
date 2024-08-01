import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../views/HomeView.vue';
import PokedexView from '../views/PokedexView.vue';
import LegendaryView from '../views/LegendaryView.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/pokedex',
    name: 'PokedexView',
    component: PokedexView
  },
  {
    path: '/legendary',
    name: 'LegendaryView',
    component: LegendaryView
  },
  {
    path: "/:notFound",
    name: 'NotFoundView',
    component: NotFound,
    meta: { disableNavbar: true }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;