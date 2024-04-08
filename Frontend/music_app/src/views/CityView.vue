<template>
      <HeaderPage></HeaderPage>
      <div id="map" style="position: absolute; width: 100%; height: 100%"></div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import mapboxgl, { Map, Marker } from 'mapbox-gl';
  import ApiService from "@/services/ApiService";
  import HeaderPage from '../components/Header/HeaderPage.vue';
  
  interface Maps {
    id: number;
    longitude: number;
    latitude: number;
    text: string;
    address: string;
    color: string;
    region_name: string;
    region_geo_json:string;
  }
  
  // Initialisation de points avec un tableau vide
  const points = ref<Maps[]>([]);
  
  const addPoint = ref<Maps>({
    id: 0,
    longitude: 0,
    latitude: 0,
    text: '',
    address: '',
    color: '',
    region_name:'',
    region_geo_json:''
  });
  
  const center = ref<Coordinates>({ longitude: 2.3522, latitude: 48.8566 });
  const zoom = ref<number>(10.5);
  
  let map: Map | null = null;
  
  const createMap = () => {
    const token: string = "pk.eyJ1IjoiYmVjaGFyaTkzIiwiYSI6ImNscGFleXpqYzA1eHgycW5rdGdma2JoOGwifQ.3I3YPCqSxPKBgvwyksQRwg";
    console.log('Clé Mapbox :', token);
    mapboxgl.accessToken = token;
    map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [center.value.longitude, center.value.latitude],
      zoom: zoom.value,
    });
  };
  

  const addMarkers = () => {
  if (map) {
    points.value.forEach((point) => {
      const marker = new mapboxgl.Marker({ color: point.color })
        .setLngLat([point.longitude, point.latitude])
        .addTo(map);

      // Ajoutez la popup avec le texte et l'adres<se
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<section><h1>${point.text}</h1> <br> <p>${point.region_name}</p> <br> ${point.region_geo_json}</section>`);
        
        console.log(point.address)
      marker.setPopup(popup);
    });
  }
};


  onMounted(async () => {
    createMap();
    
    const authToken = localStorage.getItem("authToken");
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
  
    try {
      const response = await ApiService.get("/city/get-all-points", config);
      points.value = response.data;
      addMarkers();
    } catch (error) {
      console.error("Erreur lors de la requête :", error);
    }
  });
  
  
  
  
  const postPoints = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      console.log("Token d'authentification :", authToken);
      if (!authToken) {
        console.error("L'utilisateur n'est pas authentifié.");
        return;
      }
  
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          Origin: "http://localhost:5173",
        },
      };
  
      console.log("Configuration de la requête :", config, addPoint);
  
      await ApiService.post("/maps/create-point", addPoint.value, config);
      window.location.reload();
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };
  
  </script>
  
  
  
  <style scoped>
  
  </style>
  