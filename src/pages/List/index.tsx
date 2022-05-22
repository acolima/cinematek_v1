import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Grid,
	IconButton
} from '@mui/material'
import Header from '../../components/Header'
import MenuBar from '../../components/Menu'
import useMenu from '../../hooks/useMenu'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import styles from './styles'

import { useEffect, useState } from 'react'

import Typography from '@mui/material/Typography'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

interface MoviesResult {
	poster_path: string | undefined
	id: number
	title: string
	backdrop_path: string | undefined
	vote_count: number
	vote_average: number
	release_date: string
}

function ListPage() {
	const { showMenu } = useMenu()
	const [movies, setMovies] = useState<MoviesResult[]>([])

	let navigate = useNavigate()

	useEffect(() => {
		const promise = axios.get(
			`https://api.themoviedb.org/3/search/movie?api_key=5c04c2f18d200a55005544edf78ffc19&query=batman&include_adult=false`
		)

		promise.then((response) => {
			setMovies(response.data.results)
		})
	}, [])

	return (
		<>
			<Header page='Lists' />

			{showMenu && <MenuBar />}

			<Box sx={styles.page}>
				<IconButton
					sx={styles.iconButton}
					onClick={() => navigate('/create-list')}
				>
					<AddCircleIcon sx={styles.icons} />
				</IconButton>

				<Accordion sx={styles.accordion}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<img
							alt='{movies[0].title}'
							width='80'
							src={
								'https://image.tmdb.org/t/p/w400/74xTEgt7R36Fpooo50r9T25onhq.jpg'
							}
						/>
						<Typography
							sx={{
								width: '100%',
								paddingLeft: '10px',
								display: 'flex',
								alignItems: 'center'
							}}
						>
							Filmes do Batman
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Grid
							container
							sx={{
								height: '300px',
								overflowY: 'scroll',
								'::-webkit-scrollbar': {
									display: 'none'
								}
							}}
						>
							{movies?.map((movie) => (
								<Movies movie={movie} />
							))}
						</Grid>
					</AccordionDetails>
				</Accordion>
			</Box>
		</>
	)
}

export default ListPage

interface Props {
	movie: MoviesResult
}

function Movies({ movie }: Props) {
	return (
		<Grid item xs={6}>
			<Box
				sx={styles.movieBox}
				//onClick={() => navigate(`/movies/${movie.tmdbId}`)}
			>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
					alt={movie.title}
					style={{
						width: '80px'
					}}
				/>
				<Typography sx={styles.title}>{movie.title}</Typography>
			</Box>
		</Grid>
	)
}
