<template>
    <HeaderPage></HeaderPage>
    <section></section>
    <input type="text" v-model="searchQuery" @keyup.enter="searchLocation" placeholder="Recherchez un lieu..." />
  <div id="map" class="map-container"></div>
  </template>
  

<script setup lang="ts">
import HeaderPage from '../components/Header/HeaderPage.vue';
import { ref, onMounted } from 'vue';
import mapboxgl, { Map, Marker } from 'mapbox-gl';
const searchQuery = ref('');

const center = ref({ latitude: 45.4215, longitude: -75.6972 });
const zoom = ref(12); 
let map; 
onMounted(() => {
  mapboxgl.accessToken = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNscGFleXpqYzA1eHgycW5rdGdma2JoOGwifQ.3I3YPCqSxPKBgvwyksQRwg"
  createMap();
});

const createMap = () => {
  map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11', 
    center: [center.value.longitude, center.value.latitude],
    zoom: zoom.value,
  });
};

const searchLocation = async () => {
  const accessToken = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNscGFleXpqYzA1eHgycW5rdGdma2JoOGwifQ.3I3YPCqSxPKBgvwyksQRwg";
  const query = encodeURIComponent(searchQuery.value);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${accessToken}&limit=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const [longitude, latitude] = data.features[0].center;

    // Mise à jour du centre de la carte et du zoom
    map.flyTo({
      center: [longitude, latitude],
      zoom: 15
    });
  } catch (error) {
    console.error('Erreur lors de la recherche :', error);
  }
};

</script>
<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
  