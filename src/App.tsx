import { AuthProvider } from './contexts/authContext'
import { MenuDrawerProvider } from './contexts/menuDrawerContext'
import PageRoutes from './routes'

function App() {
	return (
		<AuthProvider>
			<MenuDrawerProvider>
				<PageRoutes />
			</MenuDrawerProvider>
		</AuthProvider>
	)
}

export default App
