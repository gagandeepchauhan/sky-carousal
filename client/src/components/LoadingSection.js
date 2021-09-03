import React from 'react'

import {useError} from '../contexts/ErrorContext'

export default function LoadingSection() {
	const {loading} = useError()

	if(!loading){
		return null
	}
	return (
		<div className="loading-section">
			<div className="donutSpinner"></div>
		</div>
	)
}