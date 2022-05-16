const styles = {
	page: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: '20px',
		paddingBottom: '15px',
		paddingTop: '100px',
		'@media (max-width: 600px)': {
			paddingTop: '70px'
		}
	},
	title: {
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '24px',
		color: '#fff',
		width: '80%',
		paddingTop: '20px',
		textAlign: 'left',
		'@media (max-width: 600px)': {
			fontSize: '18px'
		}
	},
	imageList: {
		width: '80%',
		height: '100%'
	},
	imageListItem: {
		cursor: 'pointer'
	},
	flex: {
		display: 'flex',
		flexDirection: 'column'
	},
	alert: {
		marginTop: '200px',
		width: '60%',
		alignSelf: 'center'
	}
}

export default styles
