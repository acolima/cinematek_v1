import {
	Avatar,
	Box,
	Divider,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	SwipeableDrawer,
	Typography
} from '@mui/material'
import { BookmarkAdd, Favorite } from '@mui/icons-material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LogoutIcon from '@mui/icons-material/Logout'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'

import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import styles from './styles'
import api from '../../services/api'

interface Props {
	toggleDrawer: () => void
	showMenu: boolean
}

const options = [
	{ icon: <Favorite />, name: 'Favorites', path: 'favorites' },
	{ icon: <CheckCircleIcon />, name: 'Watched', path: 'watched' },
	{ icon: <BookmarkAdd />, name: 'Watchlist', path: 'watchlist' },
	{ icon: <ThumbDownIcon />, name: 'Nope', path: 'abandoned' }
]

function Menu({ toggleDrawer, showMenu }: Props) {
	const { auth, signOut } = useAuth()
	let navigate = useNavigate()

	function handleLogout() {
		api.validateToken(auth!.token).then(() => {
			signOut()
			navigate('/')
		})
	}

	return (
		<div>
			<SwipeableDrawer
				anchor='right'
				open={showMenu}
				onClose={toggleDrawer}
				onOpen={toggleDrawer}
			>
				<Box sx={styles.listBox} onClick={toggleDrawer}>
					<List>
						<ListItem disablePadding>
							<Avatar
								alt={auth?.username}
								src={auth?.pictureUrl}
								sx={styles.avatar}
							/>
							<Typography sx={styles.username}>{auth?.username}</Typography>
						</ListItem>
					</List>

					<Divider />

					<List>
						{options.map((option) => (
							<ListItem
								key={option.name}
								disablePadding
								onClick={() => navigate(`/movies/user/${option.path}`)}
							>
								<ListItemButton>
									<ListItemIcon>{option.icon}</ListItemIcon>
									<ListItemText primary={option.name} />
								</ListItemButton>
							</ListItem>
						))}
					</List>

					<Divider />

					<List>
						<ListItem disablePadding onClick={handleLogout}>
							<ListItemButton>
								<ListItemIcon>
									<LogoutIcon />
								</ListItemIcon>
								<ListItemText primary='Logout' />
							</ListItemButton>
						</ListItem>
					</List>
				</Box>
			</SwipeableDrawer>
		</div>
	)
}

export default Menu
