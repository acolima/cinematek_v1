const styles = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '10px',
		paddingTop: '100px',
		'@media (max-width: 600px)': {
			paddingTop: '70px'
		}
	},
	iconButton: {
		alignSelf: 'flex-end',
		marginRight: '15px'
	},
	icons: {
		fontSize: '1.5em',
		color: '#fff'
	},
	emptyListText: {
		paddingTop: '100px',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		opacity: '0.7',
		fontFamily: 'Poppins',
		fontSize: '1.3em'
	}
}

export default styles
