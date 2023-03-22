import React from 'react'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
const styles = {
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		zIndex: '10000'
	},
	paper: {
		maxHeight: '90vh',
		outline: 'none',
		borderRadius: '5px',
		background: 'transparent'
	}
}

export default function CustomModal({ open = false, children, handleClose, ...rest }) {
	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				style={styles.modal}
				open={open}
				onClose={(event, reason) => {
					if (reason === 'backdropClick') {
						handleClose && handleClose()
					}
				}}
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500
				}}
				{...rest}
			>
				<Fade in={open}>
					<div style={styles.paper}>{children}</div>
				</Fade>
			</Modal>
		</div>
	)
}
