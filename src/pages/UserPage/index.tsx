import { useParams } from 'react-router-dom'

function UserPage() {
	const { category } = useParams()

	return <h1>{category}</h1>
}

export default UserPage
