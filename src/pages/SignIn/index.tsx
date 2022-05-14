import {
	Alert,
	Box,
	Button,
	IconButton,
	InputAdornment,
	OutlinedInput,
	Typography
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

import styles from '../../pages/SignUp/styles'
import api from '../../services/api'

function SignIn() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const [passwordLengthError, setPasswordLengthError] = useState(false)
	const [requestError, setRequestError] = useState('')

	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)

	const { signIn } = useAuth()

	let navigate = useNavigate()

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setPasswordLengthError(false)
		setLoading(true)
		setDisabled(true)
		setRequestError('')

		if (password.length < 6) {
			setPasswordLengthError(true)
			setLoading(false)
			setDisabled(false)
			return
		}

		try {
			const { data } = await api.signIn({ username, password })
			signIn(data)
			navigate('/movies')
		} catch (error: Error | any) {
			setRequestError(error.response.data)
			setLoading(false)
			setDisabled(false)
		}
	}

	return (
		<Box sx={styles.page}>
			<Box sx={styles.logoBox}>
				<Typography sx={styles.logo}>CINEMATEK</Typography>
			</Box>

			<Box component='form' onSubmit={handleSubmit} sx={styles.form}>
				<OutlinedInput
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					sx={styles.input}
					disabled={disabled}
					required
				/>

				<PasswordInput
					password={password}
					setPassword={setPassword}
					showPassword={showPassword}
					setShowPassword={setShowPassword}
					disabled={disabled}
				/>

				{passwordLengthError && (
					<Alert severity='error'>
						Password must be at least 6 caracters long
					</Alert>
				)}

				{requestError && <Alert severity='error'>{requestError}</Alert>}

				<LoadingButton
					variant='outlined'
					type='submit'
					loading={loading}
					sx={styles.loadingButton}
				>
					Log In
				</LoadingButton>

				<Button
					sx={styles.button}
					size='small'
					onClick={() => navigate('/sign-up')}
				>
					First time? Create an account
				</Button>
			</Box>
		</Box>
	)
}

function PasswordInput({
	password,
	setPassword,
	showPassword,
	setShowPassword,
	disabled
}: any) {
	return (
		<>
			<OutlinedInput
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				type={showPassword ? 'text' : 'password'}
				sx={styles.input}
				disabled={disabled}
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
