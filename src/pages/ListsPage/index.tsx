import { Box, IconButton, Typography } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import Header from '../../components/Header'
import Lists from '../../components/ListsPage/Lists'
import Loader from '../../components/Loader'
import MenuBar from '../../components/Menu'
import useMenu from '../../hooks/useMenu'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import api from '../../services/api'
import styles from './styles'

export interface Movie {
	movies: {
		tmdbId: number
		title: string
		posterPath: string
	}
}

export interface ListResult {
	id: number
	name: string
	listMovies: Movie[]
}

function ListPage() {
	const [lists, setLists] = useState<ListResult[]>([])
	const [loading, setLoading] = useState(true)

	const { auth } = useAuth()
	const { showMenu } = useMenu()

	let navigate = useNavigate()

	useEffect(() => {
		const promise = api.getLists(auth?.token)

		promise.then((response) => {
			setLists(response.data)
			setLoading(false)
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

				{loading && <Loader />}

				{lists?.length === 0 && !loading && <NoLists />}

				{lists.map((list) => (
					<Lists key={list.id} list={list} />
				))}
			</Box>
		</>
	)
}

function NoLists() {
	return (
		<Typography sx={styles.emptyListText}>Create your first list!</Typography>
	)
}

export default ListPage
