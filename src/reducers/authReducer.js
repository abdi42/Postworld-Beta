import { AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR,SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR, SET_IMAGE,FETCH_SAVED_POST,FETCH_SAVED_POST_FAILURE,FETCH_SAVED_POST_SUCCESS,FETCH_KARMA} from '../actions/types'

const initialState = {
	user:null,
	loading:false,
	savedPost:null,
	posts:null
}

function fetchPosts(state,action) {
	return {
		...state,
		byId:action.payload.posts.entities.posts,
		allIds:action.payload.posts.result,
		item:{},
		loading:false
	}
}

export default function(state = initialState,action) {

	switch(action.type){
	case AUTH_REQUEST:
		return {
			...state,
			loading:true
		}
	case AUTH_SUCCESS:
		return {
			...state,
			loading:false,
			user:action.payload
		}
	case FETCH_KARMA:
		return {
			...state,
			user:{
				...state.user,
				karma:action.payload.karma
			}
		}
	case SIGNUP_REQUEST:

		return {
			...state,
			loading:true
		}
	case SIGNUP_SUCCESS:

		return {
			...state,
			loading:false,
			user:action.payload
		}
	case SET_IMAGE:
		return {
			...state,
			user:action.payload
		}



	case FETCH_SAVED_POST:
		return {
			...state,
			loading:true
		}
	case FETCH_SAVED_POST_FAILURE:
		return {
			...state,
			error:{
				message:'Sorry about this! We could not load the data'
			}
		}
	case FETCH_SAVED_POST_SUCCESS:
		return fetchPosts(state,action)


	default:
		return state
	}

}
