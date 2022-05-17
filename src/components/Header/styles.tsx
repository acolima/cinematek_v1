const styles = {
	logoBox: {
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
		fontSize: '40px',
		cursor: 'pointer',
		'@media (max-width: 600px)': { fontSize: '28px' }
	}
}

export default styles
