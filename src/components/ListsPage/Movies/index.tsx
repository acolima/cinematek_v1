import { Box, Grid, Typography } from '@mui/material'
import { Movie } from '../../../pages/ListsPage'

import { useNavigate } from 'react-router-dom'

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

const styles = {
	movieBox: {
		boxSizing: 'border-box',
		width: '90%',
		height: '200px',
		margin: '0 auto',
		padding: '10px 0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		border: '1px solid #282D47',
		marginBottom: '25px',
		borderRadius: '20px',
		cursor: 'pointer'
	},
	title: {
		fontFamily: 'Poppins',
		textAlign: 'center',
		paddingTop: '5px',
		overflow: 'hidden',
		wordBreak: 'break-word'
	}
}

export default Movies
