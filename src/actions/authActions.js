import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR,SET_IMAGE,FETCH_KARMA} from './types'
import { fetchUser,signUpUser } from '@Root/services/api/'
import { AsyncStorage } from 'react-native'

export const getUser =  () => (dispatch) => {

	dispatch({
		type:AUTH_REQUEST
	})

	AsyncStorage.getItem('userToken').then((result) => {
		var user = JSON.parse(result)

		fetchUser(user._id)
			.then((response) => {
				dispatch({
					type:AUTH_SUCCESS,
					payload:response.data
				})
			})

	})
}

export const getKarma = (cb) => (dispatch,getState) => {
	var user = getState().posts.user

	fetchUser(user._id)
		.then((response) => {
			dispatch({
				type:FETCH_KARMA,
				payload:response.data
			})
			cb()
		})
}

export const signUp = (handle,phoneNumber,cb,errCb) => (dispatch) => {
	dispatch({
		type:SIGNUP_REQUEST
	})

	signUpUser(handle,phoneNumber)
		.then((response) => {
			dispatch({
				type:SIGNUP_SUCCESS,
				payload:response.user
			})
			cb(response)
		})
		.catch((err) => {
			errCb(err)
		})

}

export const signUpRequest = () => (dispatch) => {
	dispatch({type:SIGNUP_REQUEST})
}
export const signUpSuccess = (user) => (dispatch) => {
	dispatch({type:SIGNUP_SUCCESS,payload:user})
}

export const setImage = (user) => (dispatch) => {
	dispatch({
		type:SET_IMAGE,
		payload:user
	})
}
