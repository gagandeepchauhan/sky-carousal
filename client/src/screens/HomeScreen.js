import React,{ useState, useEffect } from 'react'
import { useDrop } from 'react-dnd'

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
	const [categoryImages,setCategoryImages] = useState([])
	const [mainImageIndex,setMainImageIndex] = useState(0)
	const {setError,setLoading} = useError()

	const [ { isOver }, addToCarousalRef ] = useDrop({
		accept : "category",
		collect : (monitor) => ({
			isOver : !!monitor.isOver()
		})
	})

	const [ { isOver : isCategoryOver }, removeFromCarousalRef ] = useDrop({
		accept : "carousal",
		collect : (monitor) => ({
			isOver : !!monitor.isOver()
		})
	})

	const moveImage = (item)=>{
		// console.log(item)
		if(item && item.type==="category"){
			// adding image to carousal
			setCarousalImages(prev=>[...prev,categoryImages[item.index]])
			setCategoryImages(prev=>prev.filter((_,idx)=>idx!==item.index))
		}else{
			// remove image from carousal
			setCategoryImages(prev=>[...prev,carousalImages[item.index]])
			setCarousalImages(prev=>prev.filter((_,idx)=>idx!==item.index))
		}
	}

	const dragHoverCarousalBg = isOver ? 'hover-container' : ''
	const dragHoverCategoryBg = isCategoryOver ? 'hover-container' : ''

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
			<ErrorSection />
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
						categoryImages={categoryImages} 
						carousalImages={carousalImages} 
						setCarousalImages={setCarousalImages}
						setCategoryImages={setCategoryImages} 
						removeFromCarousalRef={removeFromCarousalRef}
						onDropImage={moveImage}
						bg={dragHoverCategoryBg}
					/>
				</div>
				<div className="carousal">
					<MainSection 
						carousalImages={carousalImages} 
						mainImageIndex={mainImageIndex} 
						setMainImageIndex={setMainImageIndex} 
						selectedCategory={selectedCategory}
					/>
					<CarousalImages 
						selectedCategory={selectedCategory}
						carousalImages={carousalImages} 
						setMainImageIndex={setMainImageIndex}
						addToCarousalRef={addToCarousalRef}
						onDropImage={moveImage}
						bg={dragHoverCarousalBg}
					/>
				</div>
			</div>
		</>
	)
}