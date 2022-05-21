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

interface MovieData {
	id: number
	title: string | undefined
	posterPath: string | undefined
}

function signUp(body: UserData) {
	return axios.post(`${BASE_URL}/register`, body)
}

function signIn(body: Omit<UserData, 'pictureUrl'>) {
	return axios.post(`${BASE_URL}/sign-in`, body)
}

function validateToken(token: string | undefined) {
	const config = createConfig(token)

	return axios.post(`${BASE_URL}/token`, {}, config)
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

function findMoviesByName(name: string) {
	return axios.get(
		`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}&include_adult=false`
	)
}

function findUserMovie(token: string | undefined, id: number) {
	const config = createConfig(token)

	return axios.get(`${BASE_URL}/users/movies/${id}`, config)
}

function getUserMovies(token: string | undefined, filter: string) {
	const config = createConfig(token)

	return axios.get(`${BASE_URL}/users/movies/list/${filter}`, config)
}

function updateAction(
	token: string | undefined,
	action: string,
	status: boolean,
	movieData: MovieData
) {
	const config = createConfig(token)

	return axios.post(
		`${BASE_URL}/movies/${movieData.id}/${action}/${status}`,
		{ title: movieData.title, posterPath: movieData.posterPath },
		config
	)
}

const api = {
	findMoviesByName,
	findUserMovie,
	getMovie,
	getTrendingMovies,
	getUserMovies,
	signIn,
	signUp,
	updateAction,
	validateToken
}

export default api
