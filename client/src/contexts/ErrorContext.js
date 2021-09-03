import React,{useState,useContext} from 'react'

const ErrorContext = React.createContext() 

export function useError(){
	return useContext(ErrorContext)
}

export default function ErrorProvider({children}) {
	const [error,setError] = useState(null)
	const [loading,setLoading] = useState(false)
	return (
		<ErrorContext.Provider value={{error,setError,setLoading,loading}} >
			{children}
		</ErrorContext.Provider>
	)
}