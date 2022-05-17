import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL
const API_KEY = process.env.REACT_APP_TMDB_API_KEY

function createConfig(token: string | undefined) {
	return { headers: { Authorization: `Bearer ${token}` } }
}

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

function validateToken(token: string | undefined) {
	const config = createConfig(token)

	return axios.post(`${BASE_URL}/sign-out`, {}, config)
}

function getTrendingMovies() {
	return axios.get(
		`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
	)
}

function getMovie(movieId: number) {
	return axios.get(
		`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
	)
}

const api = {
	getMovie,
	getTrendingMovies,
	signIn,
	signUp,
	validateToken
}

export default api
