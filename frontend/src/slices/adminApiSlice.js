import { apiSlice } from "./apiSlice";

const ADMIN_URL = '/api/admins';

export const adminApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        adminLogin: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/auth`,
                method: 'post',
                body: data
            })
        }),
        adminRegister: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/register`,
                method: 'post',
                body: data
            })
        }),
        adminLogout: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/logout`,
                method: 'post',
            })
        }),

        getUsers: builder.mutation({
            query: () => ({
                url: `${ADMIN_URL}/getUsers`,
                method: 'get'
            })
        }),
        adminDeleteUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/deleteUser`,
                method: 'delete',
                body: data
            })
        }),
        adminAdduser: builder.mutation({
            query: (data) => {
                const { name, email, password, image } = data
                const formData = new FormData()
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)
                formData.append('image', image)
                return {
                    url: `${ADMIN_URL}/addUser`,
                    method: 'post',
                    body: formData
                }
            },
        }),
        adminEditUser: builder.mutation({
            query: (data) => {
                const { _id, name, email, password, image } = data
                const formData = new FormData()
                formData.append('_id', _id)
                formData.append('name', name)
                formData.append('email', email)
                formData.append('password', password)
                formData.append('image', image)
                return {
                    url: `${ADMIN_URL}/editUser`,
                    method: 'PUT',
                    body: formData
                }
            },
        }),
        getOneUser: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/getUser/${data}`,
                method: "GET",
            }),
        }),
    })
})

export const { useAdminLoginMutation, useAdminRegisterMutation, useAdminLogoutMutation, useGetUsersMutation, useAdminDeleteUserMutation, useAdminAdduserMutation, useAdminEditUserMutation, useGetOneUserMutation } = adminApiSlice