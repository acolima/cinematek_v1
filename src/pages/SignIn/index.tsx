import {
	Alert,
	Box,
	Button,
	IconButton,
	InputAdornment,
	OutlinedInput,
	TextField
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import logo from '../../assets/logo.png'
import styles from '../../pages/SignUp/styles'
import { useNavigate } from 'react-router-dom'

function SignIn() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const [passwordLengthError, setPasswordLengthError] = useState(false)

	let navigate = useNavigate()

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setPasswordLengthError(false)

		if (password.length < 6) {
			setPasswordLengthError(true)
			return
		}
	}

	return (
		<Box>
			<Box sx={styles.logo}>
				<img src={logo} alt='Logo' />
			</Box>
			<Box sx={styles.page}>
				<Box component='form' onSubmit={handleSubmit} sx={styles.form}>
					<TextField
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						sx={styles.input}
						required
					/>

					<PasswordInput
						password={password}
						setPassword={setPassword}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>

					{passwordLengthError && (
						<Alert severity='error'>
							Password must be at least 6 caracters long
						</Alert>
					)}

					<LoadingButton variant='outlined' type='submit'>
						Log In
					</LoadingButton>

					<Button size='small' onClick={() => navigate('/sign-up')}>
						First time? Create an account
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

function PasswordInput({
	password,
	setPassword,
	showPassword,
	setShowPassword
}: any) {
	return (
		<>
			<OutlinedInput
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type={showPassword ? 'text' : 'password'}
				sx={styles.input}
				required
				endAdornment={
					<InputAdornment position='end'>
						<IconButton
							onClick={() => setShowPassword(!showPassword)}
							edge='end'
						>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				}
			/>
		</>
	)
}
export default SignIn
