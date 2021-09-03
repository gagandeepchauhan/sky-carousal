import React from 'react'

import {useError} from '../contexts/ErrorContext'

export default function ErrorSection() {
	const {error} = useError()

	if(!error){
		return null
	}
	return (
		<div className="error-section">
			{error}
		</div>
	)
}