const styles = {
	page: {
		paddingTop: '100px',
		'@media (max-width: 600px)': {
			paddingTop: '70px'
		}
	},
	movieBox: {
		width: '80%',
		height: '250px',
		margin: '0 auto',
		padding: '10px 0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#282D47',
		marginBottom: '25px',
		borderRadius: '20px',
		cursor: 'pointer'
	},
	title: {
		fontFamily: 'Poppins',
		textAlign: 'center',
		paddingTop: '5px',
		overflow: 'hidden'
	}
}

export default styles
