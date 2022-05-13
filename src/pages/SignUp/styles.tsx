const styles = {
	logo: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#0c174b',
		width: '100%',
		height: '215px'
	},
	page: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: '35px',
		width: '100%'
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '15px',
		width: '400px',
		'@media (max-width:601px)': { width: '80%' }
	},
	input: {
		fontFamily: 'Poppins',
		fontWeight: '500',
		fontSize: '16px',
		lineHeight: '24px',
		color: 'rgba(0, 0, 0, 0.8)'
	}
}

export default styles
