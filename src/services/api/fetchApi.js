import axios from 'axios'
import config from '@Root/config'

const initHeaders = {
	Accept: 'application/json',
	'Content-Type': 'application/json',
	'Access-Control-Allow-Origin': '*'
}

const fetchApi = (endPoint, payload = {}, method = 'get', headers = initHeaders) => {
	const keys = Object.keys(payload)
	const request = {
		method:method.toLowerCase(),
		url:`${config.url}${endPoint}`,
	}

	for (let i = 0; i < keys.length; ++i) {
		const key = keys[i]
		if(!payload[key]){
			delete payload[key]
		}
	}

	if(method.toLowerCase() === 'get'){
		request.params = payload
	} else {
		request.header = headers
		request.data = payload
	}


	return axios(request)

}

export default fetchApi
