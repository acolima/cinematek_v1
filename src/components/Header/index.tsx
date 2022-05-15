import { Box, Typography } from '@mui/material'
import { Menu, Search } from '@mui/icons-material'
import styles from './styles'
import { useNavigate } from 'react-router-dom'

interface Props {
	toggleDrawer: () => void
}

function Header({ toggleDrawer }: Props) {
	let navigate = useNavigate()

	return (
		<Box sx={styles.logoBox}>
			<Search sx={styles.icons} onClick={() => navigate('/search')} />
			<Typography sx={styles.logo}>CINEMATEK</Typography>
			<Menu sx={styles.icons} onClick={toggleDrawer} />
		</Box>
	)
}

export default Header
