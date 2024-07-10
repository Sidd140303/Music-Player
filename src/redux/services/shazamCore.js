import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const spotify23 = createApi({
    reducerPath: 'spofity',
    baseQuery: fetchBaseQuery({
        baseUrl: "https://spotify23.p.rapidapi.com/",
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', 'f442710fdcmshd6a280a3d773e6bp1bceb9jsned9881470463')
            return headers;
        }
    }),
    endpoints: (builders) => ({
        getRecommendation: builders.query({ query: () => 'recommendations/?limit=18&seed_tracks=0c6xIDDpzE81m2q797ordA&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=classical,country' }),
        getSongsBySearch: builders.query({ query: (searchterm) => `https://spotify23.p.rapidapi.com/search/?q=${searchterm}&type=multi&offset=0&limit=10&numberOfTopResults=5` })
    })
});

export const {
    useGetRecommendationQuery, useGetSongsBySearchQuery
} = spotify23; 