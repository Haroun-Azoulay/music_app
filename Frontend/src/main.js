import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js'; // Importez le fichier de configuration des routes

const app = createApp(App);
app.use(router); // Utilisez Vue Router dans votre application

app.mount('#app');
