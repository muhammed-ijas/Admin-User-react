import { apiSlice } from "./apiSlice";
import { logout } from "./authSlice";

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
    })
})

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } = userApiSlice