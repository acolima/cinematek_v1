import MovieSearchResult from '../../components/MovieSearchResult'
import Header from '../../components/Header'
import Loader from '../../components/Loader'
import MenuBar from '../../components/Menu'

import { Box, Typography } from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'

import { useState } from 'react'
import useMenu from '../../hooks/useMenu'
import useAuth from '../../hooks/useAuth'

import styles from './styles'
import api from '../../services/api'

export interface MoviesResult {
	id: number
	poster_path: string | undefined
	title: string
	release_date: string
	vote_average: number
}

function Search() {
	const { showMenu } = useMenu()
	const [movieName, setMovieName] = useState('')
	const [movies, setMovies] = useState<MoviesResult[] | null>(null)
	const [loading, setLoading] = useState(false)
	const { auth } = useAuth()

	async function getMovies() {
		try {
			await api.validateToken(auth?.token)

			try {
				const { data } = await api.findMoviesByName(movieName)
				setMovies(data.results)
			} catch (error: any) {
				console.log('External API error')
			}

			setLoading(false)
		} catch (error: Error | any) {
			console.log(error)
			// redireciona para /
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

interface NoResultsProps {
	movieName: string
}

function NoResults({ movieName }: NoResultsProps) {
	return (
		<Typography sx={styles.results}>
			No results found for '{movieName}'
		</Typography>
	)
}

function SearchIcon() {
	return (
		<Box sx={styles.searchIconBox}>
			<SearchOutlined fontSize='large' sx={styles.searchIcon} />
			<Typography sx={styles.text}>Type the name of the movie</Typography>
		</Box>
	)
}

interface MoviesListProps {
	movies: MoviesResult[]
}

function MoviesList({ movies }: MoviesListProps) {
	return (
		<>
			<Typography sx={styles.results}>
				Search results({movies?.length})
			</Typography>

			<Box sx={styles.moviesList}>
				{movies?.map((movie) => (
					<MovieSearchResult movie={movie} key={movie.id} />
				))}
			</Box>
		</>
	)
}

export default Search
