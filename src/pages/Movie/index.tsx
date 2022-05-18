import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import { Box, Button, Chip, Typography } from '@mui/material'

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import api from '../../services/api'
import styles from './styles'
import MovieActions from '../../components/Actions/WatchActions'
import FavoriteAction from '../../components/Actions/Favorite'

interface Genre {
	id: number
	name: string
}

interface MovieResult {
	id: number
	title: string
	overview: string | null
	poster_path: string | undefined
	backdrop_path: string | undefined
	runtime: number | null
	genres: Genre[]
}

function Movie() {
	const { id } = useParams()
	const { auth } = useAuth()
	const [movie, setMovie] = useState<MovieResult | null>(null)

	let navigate = useNavigate()
	console.log(movie)

	useEffect(() => {
		getMovie()
		// eslint-disable-next-line
	}, [])

	async function getMovie() {
		try {
			await api.validateToken(auth?.token)

			try {
				const { data } = await api.getMovie(Number(id))
				setMovie(data)
			} catch (error: any) {
				console.log('External API error')
			}
		} catch (error: Error | any) {
			console.log(error)
		}
	}

	if (!movie) return <h1>loading</h1>

	return (
		<Box sx={styles.page}>
			<img
				src={`https://image.tmdb.org/t/p/w400/${movie?.backdrop_path}`}
				alt={movie.title}
				style={styles.backdrop}
			/>
			<Box sx={styles.poster}>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie?.poster_path}`}
					alt={movie.title}
					width='150'
				/>
			</Box>

			<Button sx={styles.backButton} onClick={() => navigate(-1)}>
				<ArrowBackOutlinedIcon sx={styles.icons} />
			</Button>

			<FavoriteAction />

			<Box sx={styles.movieInfoBox}>
				<Typography sx={styles.movieTitle}>{movie.title}</Typography>

				<Box sx={styles.movieGenres}>
					{movie.genres.map((genre) => (
						<Chip label={genre.name} color='primary' key={genre.id} />
					))}
				</Box>

				<Typography sx={styles.movieOverview}>{movie.overview}</Typography>

				<Typography sx={styles.movieRuntime}>
					Duration: {movie.runtime} minutes
				</Typography>

				<MovieActions />
			</Box>
		</Box>
	)
}

export default Movie
