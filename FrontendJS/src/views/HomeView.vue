<template>
  <div class="bg-gray-100 min-h-screen">
    <Navbar />
    <div class="my-8 flex justify-center items-center">
      <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <img class="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
        </a>
        <div class="p-5">
          <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Bienvenue sur fest-noz</h5>
          </a>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Nous allons vous montrez les evenements musicaux à venir</p>
          <div class="text-center"> <!-- Ajout de la classe text-center pour centrer le bouton -->
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              En savoir plus
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
    <MapboxMap />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
// @ts-ignore
import ApiService from "@/services/ApiService";
import MapboxMap from '@/components/Map.vue'; 
import Navbar from '../components/Navbar.vue';

</script>
