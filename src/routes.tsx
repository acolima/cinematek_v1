import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main, SignIn, SignUp } from './pages/index'

function PageRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignIn />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/movies' element={<Main />} />
			</Routes>
		</BrowserRouter>
	)
}

export default PageRoutes
