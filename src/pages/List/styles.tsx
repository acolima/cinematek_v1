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
	accordion: {
		width: '90%'
	},
	movieBox: {
		boxSizing: 'border-box',
		width: '90%',
		height: '200px',
		margin: '0 auto',
		padding: '10px 0',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		border: '1px solid #282D47',
		marginBottom: '25px',
		borderRadius: '20px',
		cursor: 'pointer'
	},
	title: {
		fontFamily: 'Poppins',
		textAlign: 'center',
		paddingTop: '5px',
		overflow: 'hidden',
		wordBreak: 'break-word'
	}
}

export default styles
