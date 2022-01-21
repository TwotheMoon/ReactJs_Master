const API_KEY = "d0f275c0a96c3c0542cd3149a66bee14";
const BASE_PATH = "https://api.themoviedb.org/3"

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then((response) => response.json());
}