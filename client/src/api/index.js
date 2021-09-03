import axios from 'axios'

const API_URL = process.env.NODE_ENV === 'development' ?
				process.env.REACT_APP_DEV_SERVER_URL :
				process.env.REACT_APP_PROD_SERVER_URL

const api = axios.create({
	baseURL:API_URL,
	headers:{
		'Content-Type':'application/json'
	}
})

export default api