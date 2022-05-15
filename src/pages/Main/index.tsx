import {
	Box,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import Header from '../../components/Header'
import styles from './styles'
import api from '../../services/api'
import Loader from '../../components/Loader'
import { useNavigate } from 'react-router-dom'

export interface MoviesResult {
	poster_path: string | undefined
	adult: boolean
	overview: string
	release_date: string
	genre_ids: number[]
	id: number
	original_title: string
	original_language: string
	title: string
	backdrop_path: string | undefined
	popularity: number
	vote_count: number
	video: boolean
	vote_average: number
	total_pages: number
	total_results: number
}

function MainPage() {
	const [movies, setMovies] = useState<MoviesResult[] | null>(null)

	let navigate = useNavigate()
	let columns = 1

	useEffect(() => {
		const promise = api.getTrendingMovies()

		promise.then((response) => {
			setMovies(response.data.results)
		})
	}, [])

	if (window.screen.width > 600) columns = 2

	if (!movies)
		return (
			<>
				<Header />
				<Loader />
			</>
		)

	return (
		<>
			<Header />
			<Box sx={styles.page}>
				<Typography sx={styles.title}>Trending</Typography>
				<ImageList cols={columns} sx={styles.imageList}>
					{movies.map((movie) => (
						<ImageListItem
							key={movie.id}
							sx={styles.imageListItem}
							onClick={() => navigate(`/movies/${movie.id}`)}
						>
							<img
								src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
								alt={movie.title}
							/>
							<ImageListItemBar title={movie.title} />
						</ImageListItem>
					))}
				</ImageList>
			</Box>
		</>
	)
}

export default MainPage
