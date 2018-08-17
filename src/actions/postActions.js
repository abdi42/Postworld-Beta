import { FETCH_POSTS, FETCH_POSTS_SUCCESS,GET_MAP_FEATURES,FETCH_POSTS_FAILURE,ADD_POST,GET_USER,POST_VOTE,ADD_COMMENT,COMMENT_VOTE,GET_POST,GET_POST_SUCCESS,GET_POST_FAILURE,ADD_REQUEST,FETCH_MY_POSTS,FETCH_MY_POSTS_SUCCESS,FETCH_MY_POSTS_ERROR } from './types'
import { AsyncStorage } from 'react-native'
import { normalize, schema } from 'normalizr'
import config from '@Root/config.js'
import fetchApi from '@services/api/fetchApi'
import { getMyPosts } from '@services/api'

const postSchema = new schema.Entity('posts',{})
const commentSchema = new schema.Entity('comments',{})

const postListSchema = new schema.Array(postSchema)
const commentsListSchema = new schema.Array(commentSchema)

const setParams = (url,params) => {
	let endPoint  = new URLSearchParams()

	const keys = Object.keys(params)

	for (let i = 0; i < keys.length; ++i) {
		const key = keys[i]

		if(params[key]){
			endPoint.append(key,params[key])
		}

	}

	return endPoint.toString()
}

export const getUserState = () => dispatch => {
	AsyncStorage.getItem('userToken').then((result) => {
		dispatch({
			type:GET_USER,
			payload:JSON.parse(result)
		})
	})
}

export const fetchPosts = (orderByNew,geo) => (dispatch,getState) => {
	let user = getState().auth.user

	dispatch({
		type:FETCH_POSTS
	})

	const params = {
		latitude:geo[1],
		longitude:geo[0],
		orderByNew,
		userId:user._id
	}


	fetchApi('/posts',params,'get',{})
		.then((response) => {

			dispatch({
				type:FETCH_POSTS_SUCCESS,
				payload:{
					posts:normalize(response.data,postListSchema),
					user:user,
					route:'feed'
				}
			})
		})
		.catch((error) => {
			dispatch({
				type:FETCH_POSTS_FAILURE
			})
		})
}

export const fetchMyPosts = (cb) => (dispatch,getState) => {
	let user = getState().auth.user

	dispatch({
		type:FETCH_MY_POSTS
	})

	getMyPosts(user._id)
		.then((response) => {

			console.log(response)

			dispatch({
				type:FETCH_MY_POSTS_SUCCESS,
				payload:response.data
			})

			cb()
		})
		.catch((error) => {
			dispatch({
				type:FETCH_MY_POSTS_ERROR
			})
		})

}

export const getMapFeatures =  () => (dispatch,getState) => {
	let state = getState()
	let posts = state.posts.byId
	let mapPosts = state.posts.allIds

	dispatch({
		type:GET_MAP_FEATURES,
		payload:mapPosts.filter((id) => posts[id].map === true)
	})
}

export const getPost = (id) => (dispatch,getState) => {
	var user = getState().auth.user
	dispatch({
		type:GET_POST,
		payload:{
			id,
		}
	})
	fetch( config.url + '/posts/'+id+'/comments?userId=' + user._id)
		.then(res => res.json())
		.then((comments) => {
			dispatch({
				type:GET_POST_SUCCESS,
				payload:{
					comments:normalize(comments,commentsListSchema),
					id
				}
			})
		})
		.catch(() => {
			dispatch({
				type:GET_POST_FAILURE
			})
		})
}

export const getUser = (cb) => (dispatch) => {
	AsyncStorage.getItem('userToken',(err,result) => {
		if(result !== null){
			result = JSON.parse(result)

			dispatch({
				type:GET_USER,
				payload:result
			})
			cb()
		}
	})
}

export const createPost = (postContent,geo,map=false) => (dispatch,getState) => {
	var user = getState().auth.user

	dispatch({
		type:ADD_REQUEST
	})
	fetch( config.url + '/posts',{
		method:'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({
			latitude:geo[1],
			longitude:geo[0],
			content:postContent,
			userId:user._id,
			map:map
		})
	})
		.then(res => res.json())
		.then((response) => {
			dispatch({
				type:ADD_POST,
				payload:normalize(response.savedPost,postSchema)
			})

		})


}

export const postVote = (id,dir) => (dispatch,getState) => {
	var user = getState().auth.user



	dispatch({
		type:POST_VOTE,
		payload:{
			id,
			dir,
			userId:user._id
		}
	})

	fetch( config.url + '/posts/' + id +'/votes',{
		method:'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({
			userId:user._id,
			dir:dir,
		})
	})

}

export const commentVote = (id,commentId,dir) => (dispatch,getState) => {
	var user = getState().auth.user

	dispatch({
		type:COMMENT_VOTE,
		payload:{
			id,
			dir,
			commentId
		}
	})

	fetch(config.url + '/posts/' + id +'/comments/' + commentId +'/votes',{
		method:'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({
			userId:user._id,
			dir:dir,
		})
	})

}

export const addComment = (username,comment,post,content,cb) => (dispatch,getState) => {
	var user = getState().auth.user

	fetch( config.url + '/posts/' + post._id +'/comments',{
		method:'POST',
		headers:{
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body:JSON.stringify({
			userId:user._id,
			content:content,
		})
	})
		.then(res => res.json())
		.then((comment) => {
			dispatch({
				type:ADD_COMMENT,
				payload:{
					comment:normalize(comment,commentSchema),
					id:post.id
				}
			})
			cb()
		})
}


// export const getPost = (postId) => dispatch => {
//   dispatch({
//     type:GET_POST,
//     payload:{
//       postId
//     }
//   })
// }
