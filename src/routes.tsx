import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main, Movie, SignIn, SignUp } from './pages/index'

function PageRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignIn />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/movies' element={<Main />} />
				<Route path='/movies/:id' element={<Movie />} />
			</Routes>
		</BrowserRouter>
	)
}

export default PageRoutes
