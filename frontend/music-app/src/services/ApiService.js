import axios from 'axios';

// Créez une instance Axios avec la configuration personnalisée
const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Mettez à jour l'URL de base avec votre point de terminaison API

});

// Créez un objet de service avec des méthodes pour les requêtes HTTP courantes
const ApiService = {
    // Requête GET
    get(endpoint, config = {}) {
        console.log("ok")
        console.log(config)
        console.log("Contenu de headers :", config.headers);
        return axiosInstance.get(endpoint, config);
    },

    // Requête POST
    post(endpoint, data = {}, config = {}) {
        console.log(config)
        console.log(config.headers)
        console.log(data)
        return axiosInstance.post(endpoint, data, config);
    },

    // Requête PUT
    put(endpoint, data = {}, config = {}) {
        console.log(data)
        console.log(config)
        console.log(config.headers)
        return axiosInstance.put(endpoint, data, config);
    },

    // Requête DELETE
    delete(endpoint, config = {}) {
        return axiosInstance.delete(endpoint, config);
    }

    // Ajoutez plus de méthodes au besoin pour votre API
};

export default ApiService;
