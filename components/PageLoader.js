import Image from 'next/image'
import React from 'react'

function PageLoader({ height = '500px', width = '500px', contHeight = '100%' }) {
	return (
		<div className='w-full flex items-center justify-center' style={{ height: contHeight }}>
			<Image src='/page_loader.svg' alt='Loader' height={height} width={width} />
		</div>
	)
}

export default PageLoader
