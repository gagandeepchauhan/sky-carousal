import React,{ useState, useEffect } from 'react'

import api from '../api'

import {useError} from '../contexts/ErrorContext'

import Navigation from '../components/Navigation'
import Categories from '../components/Categories'
import CategoryImages from '../components/CategoryImages'
import MainSection from '../components/MainSection'
import CarousalImages from '../components/CarousalImages'
import ErrorSection from '../components/ErrorSection'
import LoadingSection from '../components/LoadingSection'

export default function HomeScreen() {
	const [categories,setCategories] = useState([])
	const [selectedCategory,setSelectedCategory] = useState(null)
	const [carousalImages,setCarousalImages] = useState([])
	const [mainImageIndex,setMainImageIndex] = useState(0)
	const {setError,setLoading} = useError()

	async function fetchCategories(){
		try{
			setLoading(true)
			const result = await api.get('/categories/')
			setCategories(result.data)
		}catch(err){
			setError(err.toString())
		}
		setLoading(false)
	}

	useEffect(()=>{
		fetchCategories()
	},[])

	return (
		<>
			<ErrorSection/>
			<LoadingSection />
			<Navigation 
				carousalImages={carousalImages}
				setCarousalImages={setCarousalImages} 
			/>
			<div className="main">
				<div className="sidebar" >
					<Categories 
						categories={categories} 
						setSelectedCategory={setSelectedCategory} 
					/>
					<CategoryImages 
						selectedCategory={selectedCategory} 
						setCarousalImages={setCarousalImages} 
					/>
				</div>
				<div className="carousal">
					<MainSection 
						carousalImages={carousalImages} 
						mainImageIndex={mainImageIndex} 
						setMainImageIndex={setMainImageIndex} 
					/>
					<CarousalImages 
						carousalImages={carousalImages} 
						setMainImageIndex={setMainImageIndex}
					/>
				</div>
			</div>
		</>
	)
}