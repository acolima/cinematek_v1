const styles = {
	box: {
		backgroundColor: '#fff',
		width: '100%',
		height: '90vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '6px',
		padding: '5px 0'
	},
	listNameInput: {
		width: '90%',
		height: '40px',
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '24px',
		color: 'rgba(0, 0, 0, 1)'
	},
	searchMovieNameInput: {
		width: '90%',
		height: '40px',
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '24px',
		color: 'rgba(0, 0, 0, 1)',
		background: '#C4C4C4',
		borderRadius: '20px'
	},
	resultsBox: {
		width: '90%',
		flex: 1,
		overflowY: 'scroll',
		'::-webkit-scrollbar': {
			display: 'none'
		}
	},
	buttonsGroup: {
		width: '90%',
		display: 'flex',
		justifyContent: 'flex-end'
	},
	searchresult: {
		marginBottom: '3px',
		paddingRight: '5px',
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: '10px',
		border: '1px solid #0c174b',
		borderRadius: '15px'
	},
	moviePoster: {
		width: '40px',
		borderRadius: '15px 0 0 15px'
	},
	movieTitle: {
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontWeight: 'bold',
		color: '#0c174b'
	},
	movieReleaseDate: {
		fontFamily: 'Poppins',
		fontSize: '12px',
		color: '#0c174b'
	},
	addedMoviesBox: {
		width: '90%',
		flex: 1,
		overflowY: 'scroll',
		'::-webkit-scrollbar': {
			display: 'none'
		},
		backgroundColor: '#c4c4c4'
	}
}

export default styles
