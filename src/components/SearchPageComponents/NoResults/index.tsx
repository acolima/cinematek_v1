import { Typography } from '@mui/material'

interface NoResultsProps {
	movieName: string
}

function NoResults({ movieName }: NoResultsProps) {
	return (
		<Typography sx={styles.results}>
			No results found for '{movieName}'
		</Typography>
	)
}

const styles = {
	results: {
		paddingBottom: '10px',
		fontFamily: 'Poppins',
		fontSize: '16px',
		width: '90%',
		margin: '0 auto'
	}
}

export default NoResults
