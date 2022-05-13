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
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/logo.png'
import styles from './styles'
import api from '../../services/api'

function SignUp() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [passwordConfirmation, setPasswordConfirmation] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [image, setImage] = useState<any>()

	const [passwordLengthError, setPasswordLengthError] = useState(false)
	const [passwordMismatchError, setPasswordMismatchError] = useState(false)
	const [profilePictureMissing, setProfilePictureMissing] = useState(false)
	const [requestError, setRequestError] = useState('')

	const [loading, setLoading] = useState(false)
	const [disabled, setDisabled] = useState(false)

	let navigate = useNavigate()

	function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		setPasswordLengthError(false)
		setPasswordMismatchError(false)
		setProfilePictureMissing(false)
		setLoading(true)
		setDisabled(true)
		setRequestError('')

		if (password.length < 6) {
			setPasswordLengthError(true)
			setLoading(false)
			setDisabled(false)
			return
		}

		if (password !== passwordConfirmation) {
			setPasswordMismatchError(true)
			setLoading(false)
			setDisabled(false)
			return
		}

		if (!image) {
			setProfilePictureMissing(true)
			setLoading(false)
			setDisabled(false)
			return
		}

		const pictureUrl = URL.createObjectURL(image)

		api
			.signUp({ username, password, pictureUrl })
			.then(() => {
				navigate('/')
			})
			.catch((err) => {
				setRequestError(err.response.data)
				setLoading(false)
				setDisabled(false)
			})
	}

	return (
		<Box>
			<Box sx={styles.logo}>
				<img src={logo} alt='Logo' />
			</Box>
			<Box sx={styles.page}>
				{requestError && <Alert severity='error'>{requestError}</Alert>}
				<Box
					component='form'
					onSubmit={handleSubmit}
					method='post'
					encType='multipart/form-data'
					sx={styles.form}
				>
					<TextField
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
					<PasswordInput
						password={passwordConfirmation}
						setPassword={setPasswordConfirmation}
						showPassword={showPassword}
						setShowPassword={setShowPassword}
						disabled={disabled}
					/>
					{passwordMismatchError && (
						<Alert severity='error'>Passwords are different</Alert>
					)}
					<FileSelector setImage={setImage} image={image} />
					{profilePictureMissing && (
						<Alert severity='error'>Please select a profile picture</Alert>
					)}
					<LoadingButton variant='outlined' type='submit' loading={loading}>
						Sign Up
					</LoadingButton>
					<Button size='small' onClick={() => navigate('/')}>
						Already have an account? Log In{' '}
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
				required
				disabled={disabled}
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

// interface FileProps {
// 	setImage: React.SetStateAction<FileList>
// 	image: FileList
// }

function FileSelector({ setImage, image }: any) {
	return (
		<>
			<input
				style={{ display: 'none' }}
				id='raised-button-file'
				type='file'
				onChange={(e) => setImage(e.target.files![0])}
			/>
			<label
				htmlFor='raised-button-file'
				style={{
					display: 'flex',
					justifyContent: 'space-around',
					alignItems: 'center',
					color: 'gray'
				}}
			>
				<p>Select a Profile Picture</p>
				{image && <p>check</p>}
				<Button variant='outlined' component='span'>
					Upload
				</Button>
			</label>
		</>
	)
}

export default SignUp
