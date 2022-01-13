const BASE_URL = `https://api.coinpaprika.com/v1`;

export async function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then(respone => respone.json());

}

export async function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then(respone => respone.json());

}

export async function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then(respone => respone.json());

}
