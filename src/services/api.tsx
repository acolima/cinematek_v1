import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_KEY = process.env.REACT_APP_API_KEY

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

function getTrendingMovies() {
	return axios.get(
		`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
	)
}

const api = {
	getTrendingMovies,
	signIn,
	signUp
}

export default api
