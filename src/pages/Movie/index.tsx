import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined'
import { Box, Chip, List, Tooltip, Typography } from '@mui/material'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import api from '../../services/api'
import styles from './styles'

interface Genre {
	id: number
	name: string
}

interface MovieResult {
	backdrop_path: string | undefined
	genres: Genre[]
	id: number
	imdb_id: string | null
	original_title: string
	overview: string | null
	popularity: number
	poster_path: string | undefined
	release_date: string
	runtime: number | null
	status: string
	tagline: string | null
	title: string
	vote_average: number
	vote_count: number
}

function Movie() {
	const { id } = useParams()
	const { auth } = useAuth()
	const [movie, setMovie] = useState<MovieResult | null>(null)

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

			<Box sx={styles.backButton}>
				<FavoriteBorderOutlinedIcon fontSize='large' />
			</Box>

			<Box sx={styles.favoriteButton}>
				<ArrowBackOutlinedIcon fontSize='large' />
			</Box>

			<Box sx={styles.movieInfoBox}>
				<Typography sx={styles.movieTitle}>{movie.title}</Typography>

				<Box sx={styles.movieGenres}>
					{movie.genres.map((genre) => (
						<Chip label={genre.name} color='primary' />
					))}
				</Box>

				<Typography sx={styles.movieOverview}>{movie.overview}</Typography>

				<Typography sx={styles.movieRuntime}>
					Duration: {movie.runtime} minutes
				</Typography>

				<List sx={styles.buttonsList}>
					<Tooltip title='Watched'>
						<CheckCircleOutlineIcon fontSize='large' />
					</Tooltip>

					<Tooltip title='Watchlist'>
						<BookmarkAddOutlinedIcon fontSize='large' />
					</Tooltip>

					<Tooltip title='Nope'>
						<ThumbDownAltOutlinedIcon fontSize='large' />
					</Tooltip>
				</List>
			</Box>
		</Box>
	)
}

export default Movie
