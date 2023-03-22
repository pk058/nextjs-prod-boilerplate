import classes from '@styles/components/custom/Input.module.scss'
import { useEffect, useState } from 'react'
export const Input = ({ label, value, onChange, placeholder, type, error, className, readOnly, dark, ...props }) => {
	const [inputValue, setInputValue] = useState(value)
	useEffect(() => {
		setInputValue(value)
	}, [value])

	return (
		<div className={`w-full relative ${className}`}>
			<div className={`xl:text-sm text-xs font-medium mb-2  text-left ${dark ? 'text-white' : 'text-gray700'}`}>
				{label}
			</div>
			<input
				className={`${dark ? classes.dark_input : classes.input} mb-5 w-full ${
					readOnly ? classes.read_only : dark ? null : classes.input_hover
				}`}
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value)
					onChange && onChange(e)
				}}
				placeholder={placeholder}
				type={type}
				readOnly={readOnly}
				{...props}
			/>
			<div className='absolute bottom-[4px] left-0 text-red-500  ml-1 text-xs'>{error}</div>
		</div>
	)
}
