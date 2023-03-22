import { createSlice } from '@reduxjs/toolkit'
import {
	googleSignIn,
	emailRegister,
	emailSignIn,
	logOut,
	resetPassword,
	emailVerification
} from '@services/database/auth'

const initialState = {
	user: {
		email: null,
		authenticated: false,
		isLoading: true
	},
	showAuth: false,
	error: null,
	success: null,
	warning: null
}

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setuser: (state, action) => {
			state.user = {
				...state.user,
				authenticated: true,
				...action.payload
			}
		},
		signout: (state) => {
			state.user = {
				authenticated: false
			}
		},
		setloadinguser: (state, action) => {
			state.user.isLoading = action.payload
		},
		setshowauth: (state, action) => {
			state.showAuth = action.payload
		},
		seterror: (state, action) => {
			state.error = action.payload
		},
		setsuccess: (state, action) => {
			state.success = action.payload
		},
		setwarning: (state, action) => {
			state.warning = action.payload
		}
	}
})

export const { setuser, signout, setloadinguser, setshowauth, seterror, setsuccess, setwarning } = slice.actions

export default slice.reducer

export const signinWithGoogle = (userType, router) => async (dispatch) => {
	const result = await googleSignIn(userType, router, dispatch)
	return result
}

export const registerWithEmail = (name, email, password, userType, router) => async (dispatch) => {
	const result = await emailRegister(name, email, password, userType, router, dispatch)
	return result
}

export const signinWithEmail = (email, password, userType, router) => async (dispatch) => {
	const result = await emailSignIn(email, password, dispatch, userType, router)
	return result
}

export const sendResetPasswordMail = (email) => async (dispatch) => {
	await resetPassword(email, dispatch)
}

export const sendEmailVerificationMail = (email, name) => async (dispatch) => {
	await emailVerification(email, name, dispatch)
}

export const signOut = () => async (dispatch) => {
	await dispatch(signout())
	await logOut(dispatch)
}
