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

function signIn(body: Omit<UserData, 'pictureUrl'>) {
	return axios.post(`${BASE_URL}/sign-in`, body)
}

const api = {
	signIn,
	signUp
}

export default api
