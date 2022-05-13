import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn, SignUp } from './pages/index'

function PageRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignIn />} />
				<Route path='/sign-up' element={<SignUp />} />
			</Routes>
		</BrowserRouter>
	)
}

export default PageRoutes
