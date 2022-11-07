import { API_KEY, API_ROOT } from '@env'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: API_ROOT,
        prepareHeaders: (headers, {getState}) => {
            headers.set('Authorization',API_KEY)
            return headers
        }
    }),
    endpoints: (builder) => ({
        //test root
        welcome: builder.query({
            query: () => '/',
        }),
        // endpoint for getting password cypher
        cypher: builder.mutation({
            query: (pwd) => ({
                url: '/get-pwd-cypher',
                method: 'GET',
                headers:{
                    'pwd': pwd,
                }
            })
        }),
        // endpoint for auth token
        auth: builder.mutation({
            query: (arg) => {
                const { userId, encryptedPwd } = arg;
                return {
                  url: '/auth-user',
                  method: 'POST',
                  body: {
                    'userid': userId,
                    'encryptedpwd': encryptedPwd
                  }
                };
              },
        }),
        
    })
})

export const {
    useWelcomeQuery,
    useCypherMutation,
    useAuthMutation
} = apiSlice