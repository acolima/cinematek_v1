import {
	Alert,
	Box,
	Button,
	ImageList,
	ImageListItem,
	ImageListItemBar,
	Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import Header from '../../components/Header'
import Loader from '../../components/Loader'
import Menu from '../../components/Menu'

import styles from './styles'
import api from '../../services/api'

export interface MoviesResult {
	poster_path: string | undefined
	id: number
	title: string
	backdrop_path: string | undefined
	vote_count: number
	vote_average: number
}

function MainPage() {
	const [movies, setMovies] = useState<MoviesResult[] | null>(null)
	const [showMenu, setShowMenu] = useState(false)
	const { auth, signOut } = useAuth()

	const [authError, setAuthError] = useState(false)

	let navigate = useNavigate()
	let columns = 1

	function toggleDrawer() {
		setShowMenu(!showMenu)
	}

	useEffect(() => {
		getMovies()
		// eslint-disable-next-line
	}, [])

	async function getMovies() {
		try {
			await api.validateToken(auth?.token)

			try {
				const { data } = await api.getTrendingMovies()
				setMovies(data.results)
			} catch (error: any) {
				console.log('External API error')
			}
		} catch (error: Error | any) {
			setAuthError(true)
			signOut()
		}
	}

	function handleAuthError() {
		setAuthError(false)
		navigate('/')
	}

	if (window.screen.width > 600) columns = 2

	if (!movies)
		return (
			<Box sx={styles.flex}>
				<Header toggleDrawer={toggleDrawer} />
				{authError ? (
					<Alert
						severity='error'
						sx={styles.alert}
						action={
							<Button color='error' size='small' onClick={handleAuthError}>
								OK
							</Button>
						}
					>
						Try to login again
					</Alert>
				) : (
					<Loader />
				)}
			</Box>
		)

	return (
		<>
			<Header toggleDrawer={toggleDrawer} />
			{showMenu && <Menu toggleDrawer={toggleDrawer} showMenu={showMenu} />}
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
