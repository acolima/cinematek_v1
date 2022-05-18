import { Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import { useEffect, useState } from 'react'

function FavoriteAction() {
	const [favorite, setFavorite] = useState(false)

	useEffect(() => {}, [favorite])

	function handleFavoriteClick() {
		setFavorite(!favorite)
	}
	return (
		<>
			{favorite ? (
				<Button sx={styles.favoriteButton} onClick={handleFavoriteClick}>
					<FavoriteIcon sx={styles.icons} />
				</Button>
			) : (
				<Button sx={styles.favoriteButton} onClick={handleFavoriteClick}>
					<FavoriteBorderOutlinedIcon sx={styles.icons} />
				</Button>
			)}
		</>
	)
}

export default FavoriteAction

const styles = {
	favoriteButton: {
		position: 'absolute',
		top: '10px',
		right: '10px'
	},
	icons: {
		fontSize: '2.5em',
		cursor: 'pointer',
		color: '#fff'
	}
}
