<template>
  <main>
    <section class="text-center">
  <p>{{ articles.title }}</p>
  <p>{{ articles.content }}</p>
  <p>{{ articles }}</p>
  </section>
</main>
</template>

<script setup>
import "../../css/index.scss";
import "../../css/index.scss";
import { ref, onMounted } from "vue";
import ApiService from "/src/services/ApiService";
import { useRouter } from 'vue-router';

const router = useRouter();
console.log(router)
const articleId = router.currentRoute.value.params.id;
console.log(articleId)
console.log("tttt")
const articles = ref([]); // Créez une référence réactive pour stocker les articles

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

    const response = await ApiService.get(`/posts/get-post/${articleId}`, config);
    articles.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la requête :", error);
  }
});
</script>
