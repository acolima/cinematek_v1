import { Box, Grid, Typography } from '@mui/material'
import Header from '../../components/Header'
import MenuBar from '../../components/Menu'

import { useEffect, useState } from 'react'
import useAuth from '../../hooks/useAuth'
import useMenu from '../../hooks/useMenu'
import { useParams } from 'react-router-dom'

import api from '../../services/api'
import styles from './styles'

interface MovieObject {
	tmdbId: number
	title: string
	posterPath: string
}

interface MovieResult {
	id: number
	movies: MovieObject
}

function UserPage() {
	const { category } = useParams()
	const { showMenu } = useMenu()
	const { auth } = useAuth()
	const [movies, setMovies] = useState<MovieResult[] | null>(null)

	useEffect(() => {
		getUserMovies()
		// eslint-disable-next-line
	}, [category])

	async function getUserMovies() {
		const { data } = await api.getUserMovies(auth?.token, category!)
		setMovies(data)
	}

	return (
		<>
			<Header page={category!} />

			{showMenu && <MenuBar />}

			{movies?.length === 0 && <p>Não tem filme</p>}

			<Grid container sx={styles.page}>
				{movies?.map((movie) => (
					<Grid key={movie.id} item xs={6} md={4}>
						<Movie movie={movie.movies} />
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default UserPage

interface Props {
	movie: MovieObject
}

function Movie({ movie }: Props) {
	return (
		<Box sx={styles.movieBox}>
			<img
				src={`https://image.tmdb.org/t/p/w400/${movie.posterPath}`}
				alt={movie.title}
				style={{
					width: '100px'
				}}
			/>
			<Typography sx={styles.title}>{movie.title}</Typography>
		</Box>
	)
}
