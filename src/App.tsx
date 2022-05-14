import { AuthProvider } from './contexts/authContext'
import PageRoutes from './routes'

function App() {
	return (
		<AuthProvider>
			<PageRoutes />
		</AuthProvider>
	)
}

export default App
