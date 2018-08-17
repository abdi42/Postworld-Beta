import fetchApi from './fetchApi'

export const fetchUser = id => fetchApi(`/users/${id}`,{},'get',{})

export const signUpUser = (handle,phoneNumber) => fetchApi('/users',{handle,phoneNumber,},'post')

export const verifyTwoFactor = (handle,token) => fetchApi('/users/twofactor',{handle,token,},'post')

export const sendSms = (handle,phoneNumber) => fetchApi('/users/sendCode',{handle,phoneNumber,},'post')

export const uploadImage = (formData,userId) => fetchApi(`/users/${userId}/image`,formData,'post',{})

export const getMyPosts = (userId) => fetchApi(`/users/${userId}/posts`,{},'get',{})
