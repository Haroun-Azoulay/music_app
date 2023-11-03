<template>
  <container class="text-center">
    <h1>Bienvenue sur le forum</h1>
    <p>Derniers articles</p>
    <div class="p-6" v-for="article in articles.slice(-5)" :key="article.id">
      {{ article.title }}
      <button
        @click="goToLookArticle(article.id)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Read Article
      </button>
    </div>
  </container>
</template>

<script setup>
import "../../css/index.scss";
import { ref, onMounted } from "vue";
import ApiService from "/src/services/ApiService";
import { useRouter } from "vue-router";

const router = useRouter();
const articles = ref([]); // Créez une référence réactive pour stocker les articles

const goToLookArticle = (articleId) => {
  console.log(articleId); // Vérifiez la valeur de articleId
  router.push(`article/${articleId}`);
};

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
        Origin: "http://localhost:9000",
      },
    };

    const response = await ApiService.get("/posts/get-all-posts", config);

    // Mettez à jour la liste des articles avec les données de la réponse
    articles.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});
</script>
