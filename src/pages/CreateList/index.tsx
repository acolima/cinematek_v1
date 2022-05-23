import {
	Box,
	Button,
	ButtonGroup,
	Container,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Typography
} from '@mui/material'

import ClearIcon from '@mui/icons-material/Clear'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { MoviesResult } from '../Search'
import api from '../../services/api'
import styles from './styles'
import dayjs from 'dayjs'
import useAuth from '../../hooks/useAuth'

function CreateList() {
	const [movieName, setMovieName] = useState('')
	const [listName, setListName] = useState('')
	const [movies, setMovies] = useState<MoviesResult[] | null>(null)
	const [addedMovies, setAddedMovies] = useState<MoviesResult[]>([])
	const [clearSearch, setClearSearch] = useState(false)
	const { auth } = useAuth()
	let navigate = useNavigate()

	useEffect(() => {
		if (!movieName) {
			setMovies([])
			setClearSearch(false)
		}
		// eslint-disable-next-line
	}, [clearSearch])

	async function getMovies(name: string) {
		setMovieName(name)

		try {
			const { data } = await api.findMoviesByName(name)
			setMovies(data.results)
		} catch (error) {
			console.log('External API error')
		}
	}

	async function handleNewList() {
		if (!listName) {
			alert("List name can't be empty")
			return
		}

		const movies = addedMovies.map((movie) => {
			return {
				tmdbId: movie.id,
				title: movie.title,
				posterPath: movie.poster_path
			}
		})

		try {
			await api.createList(auth?.token, {
				name: listName,
				movies: movies
			})
			//alert
			navigate('/lists')
		} catch (error) {
			console.log(error)
		}
	}

	function clearInput() {
		setMovieName('')
		setClearSearch(true)
	}

	return (
		<Container sx={{}}>
			<Typography sx={styles.pageTitle}>New List</Typography>
			<Box sx={styles.box}>
				<OutlinedInput
					placeholder='List name'
					sx={styles.listNameInput}
					onChange={(e) => setListName(e.target.value)}
					value={listName}
					required={true}
				/>

				<OutlinedInput
					placeholder='Start typing the movie name'
					onChange={(e) => getMovies(e.target.value)}
					value={movieName}
					sx={styles.searchMovieNameInput}
					endAdornment={
						<InputAdornment position='end'>
							<IconButton edge='end' onClick={clearInput}>
								<ClearIcon />
							</IconButton>
						</InputAdornment>
					}
				/>

				<Box sx={styles.resultsBox}>
					{movies?.map((movie) => (
						<SearchResults
							key={movie.id}
							movie={movie}
							setAddedMovies={setAddedMovies}
							addedMovies={addedMovies}
						/>
					))}
				</Box>

				<Box sx={styles.addedMoviesBox}>
					{addedMovies?.map((movie) => (
						<AddedMovies key={movie.id} movie={movie} />
					))}
				</Box>

				<ButtonGroup sx={styles.buttonsGroup}>
					<Button variant='text' onClick={() => navigate('/lists')}>
						Cancel
					</Button>
					<Button
						disabled={addedMovies.length === 0}
						variant='contained'
						sx={{ backgroundColor: '#0c174b' }}
						onClick={handleNewList}
					>
						Save
					</Button>
				</ButtonGroup>
			</Box>
		</Container>
	)
}

interface SearchResultProps {
	movie: MoviesResult
	addedMovies: MoviesResult[]
	setAddedMovies: React.Dispatch<React.SetStateAction<MoviesResult[]>>
}

function SearchResults({
	movie,
	addedMovies,
	setAddedMovies
}: SearchResultProps) {
	const [addMovie, setAddMovie] = useState(true)

	function handleAddMovie(movie: MoviesResult) {
		const movies = [...addedMovies]
		movies.push(movie)
		setAddedMovies([...movies])

		setAddMovie(false)
	}

	function handleRemoveMovie(movie: MoviesResult) {
		let movies = [...addedMovies]
		movies = movies.filter((m) => movie !== m)
		setAddedMovies([...movies])

		setAddMovie(true)
	}

	return (
		<Box sx={styles.searchresult}>
			<img
				src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
				alt={movie.title}
				style={styles.moviePoster}
			/>
			<Box sx={{ flex: 1 }}>
				<Typography sx={styles.movieTitle}>{movie.title}</Typography>
				<Typography sx={styles.movieReleaseDate}>
					Release date: {dayjs(movie.release_date).format('DD/MM/YYYY')}
				</Typography>
			</Box>

			{addMovie ? (
				<IconButton onClick={() => handleAddMovie(movie)}>
					<AddCircleIcon />
				</IconButton>
			) : (
				<IconButton onClick={() => handleRemoveMovie(movie)}>
					<RemoveCircleIcon />
				</IconButton>
			)}
		</Box>
	)
}

interface AddedMoviesProps {
	movie: MoviesResult
}

function AddedMovies({ movie }: AddedMoviesProps) {
	return (
		<Box sx={styles.searchresult}>
			<img
				src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
				alt={movie.title}
				style={styles.moviePoster}
			/>
			<Box sx={{ flex: 1 }}>
				<Typography sx={styles.movieTitle}>{movie.title}</Typography>
				<Typography sx={styles.movieReleaseDate}>
					Release date: {dayjs(movie.release_date).format('DD/MM/YYYY')}
				</Typography>
			</Box>
		</Box>
	)
}

export default CreateList
