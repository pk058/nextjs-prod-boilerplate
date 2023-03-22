import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import caseReducer from './slices/caseSlice'
import clientReducer from './slices/clientSlice'
const rootReducer = combineReducers({
	authSlice: authReducer,
	clientSlice: clientReducer,
	caseSlice: caseReducer
})

const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: false
	}),
	devTools: true
})

export default store
