import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Main, Movie, Search, SignIn, SignUp, UserPage } from './pages/index'

function PageRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<SignIn />} />
				<Route path='/sign-up' element={<SignUp />} />
				<Route path='/movies' element={<Main />} />
				<Route path='/movies/:id' element={<Movie />} />
				<Route path='/movies/user/:category' element={<UserPage />} />
				<Route path='/search' element={<Search />} />
			</Routes>
		</BrowserRouter>
	)
}

export default PageRoutes
