import { seterror, setloadinguser, setuser } from '@services/store/slices/authSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import firebase, { auth } from '@services/connectors/firebase'
import { getRegister } from '@services/restapis/registration/register'
import { getLogin } from '@services/restapis/registration/login'
import { emailVerify } from '@services/restapis/registration/emailVerify'
import { passwordReset } from '@services/restapis/registration/passwordReset'
import { mapAuthErrors } from 'constants/mapAuthErrors'

export const getIdToken = async () => {
	try {
		if (auth.currentUser) {
			const token = await auth.currentUser.getIdToken(false)
			return token
		}
	} catch (error) {
		console.error(error)
	}
}
export const googleSignIn = async (userType, router, dispatch) => {
	try {
		if (auth.currentUser) {
			await auth.signOut()
		}
		const provider = new firebase.auth.GoogleAuthProvider()
		const result = await auth.signInWithPopup(provider)
		if (result.credential) {
			const userData = {
				id: result.user.uid,
				displayName: result.user.providerData[0]?.displayName || result.user.displayName,
				email: result.user.providerData[0]?.email || result.user.email,
				phoneNumber: result.user.phoneNumber,
				photoUrl: result.user.providerData[0]?.photoURL || result.user.photoURL,
				emailVerified: true,
				providerData: result.user.providerData
			}

			dispatch(setuser({ ...userData }))
			return result
		}
	} catch (error) {
		dispatch(seterror(mapAuthErrors(error.code)))
		console.log(error)
	}
}

export const emailRegister = async (name, email, password, userType, router, dispatch) => {
	try {
		const result = await auth.createUserWithEmailAndPassword(email, password)
		const user = auth.currentUser
		await user.updateProfile({
			displayName: name
		})
		return result
	} catch (error) {
		dispatch(seterror(mapAuthErrors(error.code)))
		console.log(error)
	}
}

export const emailSignIn = async (email, password, dispatch, userType, router) => {
	try {
		const result = await auth.signInWithEmailAndPassword(email, password)
		return result
	} catch (error) {
		dispatch(seterror(mapAuthErrors(error.code)))
		console.log(error.message)
	}
}

export const logOut = async (dispatch) => {
	try {
		await auth.signOut()
	} catch (error) {
		dispatch(seterror(mapAuthErrors(error.code)))
		console.log(error.message)
	}
}

const ProtectedRoute = ({ children }) => {
	const dispatch = useDispatch()
	useEffect(async () => {
		//*! Sigma Rule: Never do routing in onAuthStateChanged, It behaves very differently
		auth.onAuthStateChanged(async (currentUser) => {
			dispatch(setloadinguser(true))
			if (currentUser) {
				const userData = {
					id: currentUser.uid,
					displayName: currentUser.displayName,
					email: currentUser.providerData[0]?.email || currentUser.email,
					phoneNumber: currentUser.phoneNumber,
					photoUrl: currentUser.providerData[0]?.photoURL || currentUser.photoURL,
					emailVerified: currentUser.emailVerified,
					providerData: currentUser.providerData
				}

				dispatch(setuser({ ...userData }))
				dispatch(setloadinguser(false))
			} else {
				dispatch(setloadinguser(false))
			}
		})
	}, [])
	return <>{children}</>
}

export default ProtectedRoute

export const resetPassword = async (email, dispatch) => {
	try {
		await passwordReset({ email }, dispatch)
	} catch (error) {
		dispatch(seterror(mapAuthErrors(error.code)))
		console.log(error)
	}
}

export const emailVerification = async (email, name, dispatch) => {
	try {
		await emailVerify({ email, name }, dispatch)
	} catch (error) {
		dispatch(seterror(mapAuthErrors(error.code)))
		console.log(error)
	}
}

export const updateUserPassword = async (oldPassword, newPassword, dispatch) => {
	try {
		const user = auth.currentUser
		const credential = firebase.auth.EmailAuthProvider.credential(user.email, oldPassword)
		await user.reauthenticateWithCredential(credential)
		await user.updatePassword(newPassword)
		return credential
	} catch (error) {
		dispatch(seterror(mapAuthErrors(error.code)))
		console.log(error.message)
	}
}
