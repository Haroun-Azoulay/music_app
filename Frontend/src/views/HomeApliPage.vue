<template>
  <main class="text-center">
    <h1 className="text-3xl font-bold underline center mb-8">
      Welcome in Application
    </h1>
      <section class="flex justify-center gap-1 mb-8">
      <button
        @click="goToSignupPage"
        class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Map
      </button>
      <button
        @click="goToHomeForumPage"
        class="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Forum
      </button>
      </section>
    <section class="flex justify-center gap-1">
      <button
        @click="goToSignupPage"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Signup
      </button>
      <button
        @click="goToSigninPage"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Signin
      </button>
    </section>
    <HelloWorld />
  </main>
</template>

<script setup>
import HelloWorld from "@/components/HelloWorld.vue"; // Assurez-vous de spécifier le bon chemin d'importation
import '../css/index.scss';
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSignupPage = () => {
  router.push({ path:'signup' })
};

const goToSigninPage = () => {
  router.push({ path:'signin' })
};

const goToHomeForumPage = () => {
  router.push({ path:'forum/home' })
}
</script>
