import { createRouter, createWebHistory } from 'vue-router';
import HomeApliPage from '../views/HomeApliPage.vue'; // Importez la nouvelle page
import SignupPage from '../views/connexion/SignupPage.vue'; // Importez la nouvelle page
import SigninPage from '../views/connexion/SigninPage.vue'; // Importez la nouvelle page
import NavbarComponent from '../components/forum/NavbarComponent.vue'; // Importez le composant NavBar
import HomeForumPage from '../views/forum/HomeForumPage.vue';
import PostArticleForumPage from '../views/forum/PostArticleForumPage.vue';
import SingleArticleForumPage from '../views/forum/SingleArticleForumPage.vue';
import { requireAuth } from '../utils/authGuard';
const routes = [
  {
    path: '/signup', // Chemin pour accéder à la nouvelle page
    name: 'SignupPage', // Nom de la route
    component: SignupPage, // Composant à utiliser pour cette page
  },
  {
    path: '/signin', // Chemin pour accéder à la nouvelle page
    name: 'SigninPage', // Nom de la route
    component: SigninPage, // Composant à utiliser pour cette page
  },
  {
    path: '/', // Chemin pour accéder à la nouvelle page
    name: 'Home', // Nom de la route
    component: HomeApliPage, // Composant à utiliser pour cette page
  },
  {
    path: '/forum',
    redirect: '/forum/home',
    beforeEnter: requireAuth,
    component: NavbarComponent, // Utilisez NavBar ici
    children: [
      {
        path: 'home', // Notez le chemin relatif
        name: 'HomeForumPage',
        component: HomeForumPage,
      },
      {
        path: 'article/:id', // Notez le chemin relatif
        name: 'SingleArticleForumPage',
        component: SingleArticleForumPage,
      },
      {
        path: 'post-article', // Notez le chemin relatif
        name: 'PostArticleForumPage',
        component: PostArticleForumPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
