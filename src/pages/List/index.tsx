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
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import useAuth from '../../hooks/useAuth'

interface Movie {
	movies: {
		tmdbId: number
		title: string
		posterPath: string
	}
}

interface ListResult {
	id: number
	name: string
	listMovies: Movie[]
}

function ListPage() {
	const { showMenu } = useMenu()
	const [lists, setLists] = useState<ListResult[]>([])
	const { auth } = useAuth()

	let navigate = useNavigate()

	useEffect(() => {
		const promise = api.getLists(auth?.token)

		promise.then((response) => {
			setLists(response.data)
		})
	}, [auth])

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

				{lists.map((list) => (
					<Lists key={list.id} list={list} />
				))}
			</Box>
		</>
	)
}

interface ListsProps {
	list: ListResult
}

function Lists({ list }: ListsProps) {
	const listCover = list.listMovies[0].movies.posterPath

	return (
		<Accordion sx={styles.accordion}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<img
					alt={list.name}
					width='80'
					src={`https://image.tmdb.org/t/p/w400${listCover}`}
				/>
				<Typography
					sx={{
						width: '100%',
						paddingLeft: '10px',
						display: 'flex',
						alignItems: 'center'
					}}
				>
					{list.name}
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
					{list.listMovies?.map((movie) => (
						<Movies key={movie.movies.tmdbId} movieData={movie} />
					))}
				</Grid>
			</AccordionDetails>
		</Accordion>
	)
}

interface Props {
	movieData: Movie
}

function Movies({ movieData }: Props) {
	const movie = movieData.movies
	let navigate = useNavigate()
	return (
		<Grid item xs={6}>
			<Box
				sx={styles.movieBox}
				onClick={() => navigate(`/movies/${movie.tmdbId}`)}
			>
				<img
					src={`https://image.tmdb.org/t/p/w400/${movie.posterPath}`}
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

export default ListPage
