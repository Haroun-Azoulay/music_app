<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="/" class="flex items-center justify-center">
        <img src="../../assets/logo.png" style="height: 200px">
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
          <li v-if="!isLoggedIn">
            <button class="ButtonPrimary w-80 h-12 px-12 m-5
                      py-2.5 bg-violet-600 rounded-lg flex-col
                      justify-center items-center gap-2.5 flex" @click="goToSignupPage">
              <div class="Frame590 px-2 justify-center items-center gap-2.5 inline-flex">
                <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                  S'inscrire
                </span>
              </div>
            </button>
          </li>
          <li v-if="!isLoggedIn">
            <button class="ButtonPrimary w-80 h-12 px-12 m-5
                      py-2.5 bg-violet-600 rounded-lg flex-col
                      justify-center items-center gap-2.5 flex" @click="goToSigninPage">
              <div class="Frame590 px-2 justify-center items-center gap-2.5 inline-flex">
                <span class="ButtonSecondary text-center text-white text-base font-bold font-['Roboto']">
                  Se connecter
                </span>
              </div>
            </button>
          </li>
          <li v-if="isLoggedIn">
            <div class="py-1">
              <a href="#"
                 @click="logout"
                 class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">
                Deconnexion
              </a>
            </div>
            <div v-if="isAdmin">
              <p>ok</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import ApiService from "@/services/ApiService";

const router = useRouter();
const isLoggedIn = ref(false);
const isAdmin = ref<boolean>(false);


const goToSigninPage = () => {
  router.push({ path: '/signin' })
}

const goToSignupPage = () => {
  router.push({ path: '/signup' })
}

const logout = () => {
  // Supprimer le token en local (localStorage) lors de la déconnexion
  localStorage.removeItem("authToken");
  // Mettre à jour l'état de connexion
  isLoggedIn.value = false;
  window.location.reload();
  // Rediriger vers la page de connexion après la déconnexion
};

onMounted(() => {
  // Vérifier si l'utilisateur est connecté lors du montage du composant
  isLoggedIn.value = localStorage.getItem("authToken") !== null;
  
});
onMounted(async () => {
  try {
    const authToken = localStorage.getItem("authToken");
    console.log("Token d'authentification :", authToken);
    if (!authToken) {
      console.error("L'utilisateur n'est pas authentifié.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
        Origin: "http://localhost:5173",
      },
    };

    const response = await ApiService.get("/admin/all-users", config);
    isAdmin.value = response.data.some((user: any) => user.role === 'admin');
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
