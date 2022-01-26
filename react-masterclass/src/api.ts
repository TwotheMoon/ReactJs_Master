const API_KEY = "d0f275c0a96c3c0542cd3149a66bee14";
const BASE_PATH = "https://api.themoviedb.org/3"

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
    release_date: string;
    vote_average: string;

}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}

export function getSimilarMovies(movieId: number) {
    return fetch(`${BASE_PATH}/movie/${movieId}/similar?api_key=${API_KEY}&language=ko`).then((response) => response.json());
}

export function getPopularMovies() {
    return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko&page=10`).then((response) => response.json());
}

export function getSearchMovies(keyword: string) {
    return fetch(`${BASE_PATH}/search/movie?api_key=${API_KEY}&language=ko&query=${keyword}&include_adult=true`).then((response) => response.json());
}
export function getSearchTv(keyword: string) {
    return fetch(`${BASE_PATH}/search/tv?api_key=${API_KEY}&language=ko&query=${keyword}&include_adult=true`).then((response) => response.json());
}
