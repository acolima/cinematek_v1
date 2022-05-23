import { Box } from '@mui/material'

import Header from '../../components/Header'
import Loader from '../../components/Loader'
import MenuBar from '../../components/Menu'
import MoviesList from '../../components/SearchPageComponents/MoviesList'
import NoResults from '../../components/SearchPageComponents/NoResults'
import SearchIcon from '../../components/SearchPageComponents/SearchIcon'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import useMenu from '../../hooks/useMenu'

import api from '../../services/api'
import { errorAlert } from '../../utils/toastifyAlerts'

export interface MoviesResult {
	id: number
	poster_path: string | undefined
	title: string
	release_date: string
	vote_average: number
}

function Search() {
	const [movieName, setMovieName] = useState('')
	const [movies, setMovies] = useState<MoviesResult[] | null>(null)

	const [loading, setLoading] = useState(false)

	const { auth, signOut } = useAuth()
	const { showMenu } = useMenu()

	let navigate = useNavigate()

	async function getMovies() {
		try {
			await api.validateToken(auth?.token)

			try {
				const { data } = await api.findMoviesByName(movieName)
				setMovies(data.results)
			} catch (error) {
				errorAlert('External API error. Try again later')
			}
			setLoading(false)
		} catch (error) {
			signOut()
			errorAlert('Session expired. Please, log in again')
			navigate('/')
		}
	}

	function handleSearch() {
		setLoading(true)
		getMovies()
	}

	return (
		<>
			<Header
				page='search'
				movieName={movieName}
				setMovieName={setMovieName}
				handleSearch={handleSearch}
			/>
			{showMenu && <MenuBar />}

			{loading ? (
				<Loader />
			) : (
				<Box sx={styles.page}>
					{movies?.length === 0 && <NoResults movieName={movieName} />}

					{!movies && <SearchIcon />}

					{movies?.length !== 0 && movies && <MoviesList movies={movies} />}
				</Box>
			)}
		</>
	)
}

const styles = {
	page: {
		paddingTop: '70px'
	}
}

export default Search
