export const validateMobile = (phone = '') => {
	{
		const regex = /^[0-9.+ ()-]+$/
		if (regex.test(phone) || phone === '') {
			return true
		} else {
			return false
		}
	}
}
