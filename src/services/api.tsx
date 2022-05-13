import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL

interface UserData {
	username: string
	password: string
	pictureUrl: string
}

function signUp(body: UserData) {
	return axios.post(`${BASE_URL}/sign-up`, body)
}

const api = {
	signUp
}

export default api
