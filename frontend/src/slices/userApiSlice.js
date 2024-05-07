import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'post',
                body: data
            })
        }),
        register: builder.mutation({
            query: (data) => {
                const { name, email, password, image } = data
                const formData = new FormData()
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)
                formData.append('image', image)
                return {
                    url: `${USERS_URL}/`,
                    method: 'post',
                    body: formData
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'post',
            })
        }),
        updateUser: builder.mutation({
            query: (data) => {
                const { name, email, password, image } = data
                const formData = new FormData()
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)
                formData.append('image', image)
                return {
                    url: `${USERS_URL}/profile`,
                    method: 'PUT',
                    body: formData
                }
            },

        }),

    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation } = userApiSlice