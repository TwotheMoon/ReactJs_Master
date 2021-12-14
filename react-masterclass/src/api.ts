const BASE_URL = `https://api.coinpaprika.com/v1`;

export function fetchCoins() {
    return fetch(`${BASE_URL}/coins`).then((response) =>
        response.json()
    );
}

export function fetchCoinInfo(coinId: string) {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
        response.json()
    );
}

export function fetchCoinTickers(coinId: string) {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
        response.json()
    );
}

export function fetchCoinHistory(coinId: string) {
    const endDate = Math.floor(Date.now() / 1000); // 무조건 내림 초
    const startDate = endDate - 60 * 60 * 24 * 7 * 2;    // endDate 현재 시점으로 2주전 60초*60분*24시간*7
    return fetch(`${BASE_URL}/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response) =>
        response.json()
    );
}