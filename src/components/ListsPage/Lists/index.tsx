import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	Grid,
	Typography
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import Movies from '../Movies'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'

import api from '../../../services/api'
import { errorAlert } from '../../../utils/toastifyAlerts'
import { ListResult } from '../../../pages/ListsPage'

interface ListsProps {
	list: ListResult
	reloadLists: boolean
	setReloadLists: React.Dispatch<React.SetStateAction<boolean>>
	setLists: React.Dispatch<React.SetStateAction<ListResult[]>>
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

function Lists({
	list,
	reloadLists,
	setReloadLists,
	setLists,
	setLoading
}: ListsProps) {
	const listCover = list.listMovies[0].movies.posterPath
	const [showDialog, setShowDialog] = useState(false)
	const { auth, signOut } = useAuth()

	let navigate = useNavigate()

	async function handleDeleteList() {
		try {
			await api.deleteList(auth?.token, list.id)
			setLoading(true)
			setLists([])
			setReloadLists(!reloadLists)
		} catch {
			signOut()
			errorAlert('Session expired. Please, log in again')
			navigate('/')
		}
	}

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
				<Button sx={styles.deleteButton} onClick={() => setShowDialog(true)}>
					<Typography sx={styles.deleteButtonText}>Delete list</Typography>
				</Button>

				<Dialog open={showDialog}>
					<DialogTitle fontSize={'16px'}>Are you sure?</DialogTitle>
					<DialogActions>
						<Button
							sx={styles.dialogButton}
							onClick={() => setShowDialog(false)}
						>
							No, I'm not
						</Button>
						<Button sx={styles.dialogButton} onClick={handleDeleteList}>
							Yes, I am
						</Button>
					</DialogActions>
				</Dialog>
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
		maxHeight: '300px',
		overflowY: 'scroll',
		'::-webkit-scrollbar': {
			display: 'none'
		}
	},
	deleteButton: {
		width: '100%',
		display: 'flex',
		textAlign: 'right'
	},
	deleteButtonText: {
		paddingTop: '10px',
		fontFamily: 'Poppins',
		fontSize: '14px'
	},
	dialogButton: { fontSize: '0.9em' }
}

export default Lists
