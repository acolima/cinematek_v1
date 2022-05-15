import { Box, Typography } from '@mui/material'
import { Menu, Search } from '@mui/icons-material'
import styles from './styles'

function Header() {
	return (
		<Box sx={styles.logoBox}>
			<Search sx={styles.icons} />
			<Typography sx={styles.logo}>CINEMATEK</Typography>
			<Menu sx={styles.icons} />
		</Box>
	)
}

export default Header
