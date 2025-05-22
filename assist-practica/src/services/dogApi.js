import axios from 'axios'; //pentru cereri HTTP (GET, POST, DELETE, etc.)

//crearea unei instante configurate a axios
const API = axios.create({
   baseURL: 'https://api.thedogapi.com/v1', //URL-ul de baza pentru API
    timeout: 10000, //timpul de asteptare pentru cerere (10 secunde)
    headers: {
        'x-api-key': 'live_bsq4G0jKDCZz8T2y2Z4NzFi3NFCG0AW05nuz0tbHK1yjUFBdnpMPCNqBLSCEtwh2', //cheia API pentru autentificare
    },
});

//geteri
export const getAllBreeds = () => API.get('/breeds'); //cerere GET pentru a obtine toate rasele de caini

export const getRandomImage = () => API.get('/images/search'); //cerere GET pentru a obtine o imagine aleatoare de caine

export const getImageByBreed = (breedId) => API.get(`/images/search?breed_id=${breedId}&limit=8`); //cerere GET pentru a obtine o imagine de caine dupa ID-ul rasei

// Obține mai multe imagini diferite pentru o rasă
export const getImagesByBreed = (breedId) => API.get(`/images/search?breed_id=${breedId}&limit=6`);

