const styles = {
	page: {
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		boxSizing: 'borderBox'
	},
	backdrop: {
		opacity: '0.6',
		width: '100vw',
		height: '200px'
	},
	poster: {
		position: 'absolute',
		zIndex: '1',
		top: 25,
		alignSelf: 'center'
	},
	backButton: {
		position: 'absolute',
		top: '10px',
		right: '10px'
	},
	favoriteButton: {
		position: 'absolute',
		top: '10px',
		left: '10px'
	},
	movieInfoBox: {
		marginTop: '70px',
		display: 'flex',
		flexDirection: 'column',
		gap: '20px'
	},
	movieTitle: {
		fontFamily: 'Poppins',
		fontSize: '16px',
		fontWeight: '500',
		textTransform: 'uppercase',
		textAlign: 'center',
		boxSizing: 'borderBox'
	},
	movieGenres: {
		display: 'flex',
		justifyContent: 'space-evenly'
	},
	movieOverview: {
		width: '85%',
		textAlign: 'justify',
		fontFamily: 'Poppins',
		fontSize: '16px',
		boxSizing: 'borderBox',
		margin: '0 auto'
	},
	movieRuntime: {
		width: '85%',
		fontFamily: 'Poppins',
		fontSize: '12px',
		margin: '0 auto'
	},
	buttonsList: {
		display: 'flex',
		justifyContent: 'space-evenly'
	}
}

export default styles
