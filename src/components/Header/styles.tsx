const styles = {
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
		width: '100%',
		height: '100px',
		position: 'fixed',
		zIndex: 1,
		background: '#0c174b',
		'@media (max-width: 600px)': {
			height: '70px'
		}
	},
	logo: {
		fontFamily: 'Koulen',
		fontWeight: '700',
		fontSize: '60px',
		color: '#790918',
		'@media (max-width: 600px)': {
			fontSize: '40px'
		}
	},
	icons: {
		fontSize: '2em',
		cursor: 'pointer'
	},
	searchBar: {
		width: '70%',
		height: '40px',
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '14px',
		lineHeight: '24px',
		color: 'rgba(0, 0, 0, 1)',
		background: '#C4C4C4',
		borderRadius: '20px'
	}
}

export default styles
