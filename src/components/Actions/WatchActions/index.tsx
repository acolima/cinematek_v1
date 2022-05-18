import { Button, List } from '@mui/material'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useEffect, useState } from 'react'

function MovieActions() {
	const [watched, setWatched] = useState(false)
	const [watchlist, setWatchlist] = useState(false)

	useEffect(() => {}, [watched, watchlist])

	function handleWatchedClick() {
		setWatched(!watched)
	}

	function handleWatchlistClick() {
		setWatchlist(!watchlist)
	}

	return (
		<List sx={styles.list}>
			{watched ? (
				<Button onClick={handleWatchedClick}>
					<CheckCircleIcon sx={styles.icons} />
				</Button>
			) : (
				<Button onClick={handleWatchedClick}>
					<CheckCircleOutlineIcon sx={styles.icons} />
				</Button>
			)}

			{watchlist ? (
				<Button onClick={handleWatchlistClick}>
					<BookmarkAddIcon sx={styles.icons} />
				</Button>
			) : (
				<Button onClick={handleWatchlistClick}>
					<BookmarkAddOutlinedIcon sx={styles.icons} />
				</Button>
			)}
		</List>
	)
}

export default MovieActions

const styles = {
	list: { display: 'flex', justifyContent: 'space-evenly' },
	icons: { fontSize: '2.5em', cursor: 'pointer', color: '#fff' }
}
