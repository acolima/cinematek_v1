import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	Typography
} from '@mui/material'
import { ListResult } from '../../../pages/ListsPage'

import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Movies from '../Movies'

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
				<Typography sx={styles.listName}>{list.name}</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Grid container sx={styles.listContainer}>
					{list.listMovies?.map((movie) => (
						<Movies key={movie.movies.tmdbId} movieData={movie} />
					))}
				</Grid>
			</AccordionDetails>
		</Accordion>
	)
}

const styles = {
	accordion: {
		width: '90%'
	},
	listName: {
		width: '100%',
		paddingLeft: '10px',
		display: 'flex',
		alignItems: 'center',
		fontFamily: 'Poppins',
		fontSize: '18px'
	},
	listContainer: {
		height: '300px',
		overflowY: 'scroll',
		'::-webkit-scrollbar': {
			display: 'none'
		}
	}
}

export default Lists
