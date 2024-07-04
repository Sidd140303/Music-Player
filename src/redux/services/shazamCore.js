import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const spotify23 = createApi({
    reducerPath: 'spofity',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://spotify23.p.rapidapi.com/",
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'cfd7a68f7amsh92053712c4dbbd9p1f6976jsn9120821d35ca')
            return headers;
        }
    }),
    endpoints: (builders) => ({
        getRecommendation: builders.query({ query: () => 'recommendations/?limit=18&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical,country' }),
        getArtists: builders.query({ query: (id) => `artists/?ids=${id}` }),
    })
});

export const {
    useGetRecommendationQuery, useGetArtistsQuery
} = spotify23; 