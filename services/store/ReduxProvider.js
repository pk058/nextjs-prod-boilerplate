import { Provider } from 'react-redux'
import React from 'react'
import store from '@services/store'

function ReduxProvider({ children }) {
	return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
