
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {IPost} from "../../../app/types/IPost"
import {IComments} from "../../../app/types/IComments";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({baseUrl: BASE_URL}),
    endpoints: (build) => ({
        fetchCommentsBelowPost: build.query<IComments[], number>({
            query: (id: number = 1) => ({
                url: `/posts/${id}/comments`,
            }),
        }),
        fetchAllPosts: build.query<{apiResponse: IPost[], totalCount: number}, {limit: number, page: number}>({
            query: ({limit = 10, page = 1}) => ({
                url: '/posts',
                params: {
                    _limit: limit,
                    _page: page,
                },
            }),
            transformResponse(apiResponse: IPost[], meta) {
                return { apiResponse, totalCount: Number(meta?.response?.headers.get('X-Total-Count')) }
            }
        }),
        fetchOnePosts: build.query<IPost, number>({
            query: (id: number = 5) => ({
                url: `/posts/${id}`,
            })
        }),
    })
})