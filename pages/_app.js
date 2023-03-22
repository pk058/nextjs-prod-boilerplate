import { useEffect } from 'react'
import '@styles/main.scss'
import dynamic from 'next/dynamic'

const ProtectedRoute = dynamic(() => import('@services/database/auth'), {
	ssr: false
})

const ReduxProvider = dynamic(() => import('@services/store/ReduxProvider'), {
	ssr: false
})

const QueryProvider = dynamic(() => import('@services/connectors/reactquery'), {
	ssr: false
})

const ReactQueryDevtools = dynamic(
	() => import('@tanstack/react-query-devtools').then((module) => module.ReactQueryDevtools),
	{
		ssr: false
	}
)


function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<ReduxProvider>
			<QueryProvider>
				<ProtectedRoute>
					<div className='w-full h-full'>
						<div className='max-w-[1440px] mx-auto h-full'>
							<Component {...pageProps} />
						</div>
					</div>
				</ProtectedRoute>
				{(process.env.NEXT_PUBLIC_ENV === 'dev' || process.env.NEXT_PUBLIC_ENV === 'stag') && (
					<ReactQueryDevtools initialIsOpen={false} position='bottom-left' />
				)}
			</QueryProvider>
		</ReduxProvider>
	)
}

export default MyApp
