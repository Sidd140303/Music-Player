import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': 'cfd7a68f7amsh92053712c4dbbd9p1f6976jsn9120821d35ca',
        'x-rapidapi-host': 'spotify23.p.rapidapi.com'
    }
};

fetch('https://spotify23.p.rapidapi.com/recommendations/?limit=20&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_ge=', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

export const spotify23 = createApi({
    reducerPath: 'spofity',
    baseQuery: fetchBaseQuery({
        baseUrl: "",
    })
})