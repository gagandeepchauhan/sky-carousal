import React,{useState,useEffect} from 'react'

import api from '../api'

import {useError} from '../contexts/ErrorContext'

import Image from './Image'

export default function CategoryImages({bg,carousalImages,setCarousalImages,selectedCategory,categoryImages,setCategoryImages,removeFromCarousalRef,onDropImage}) {
	const [page,setPage] = useState(1)
	const [limit,setLimit] = useState(5)
	const [hasPrev,setHasPrev] = useState(null)
	const [hasNext,setHasNext] = useState(null)
	const {setError,setLoading} = useError()

	async function fetchCategoryImages(page){
		try{
			setLoading(true)
			const result = await api.get(`/categories/${selectedCategory}?page=${page}&limit=${limit}`)
			if(carousalImages?.length===0){
				setCarousalImages(result.data?.data?.slice(0,4))
				setCategoryImages(result.data?.data?.slice(4))
			}else{
				const catData = result.data?.data?.filter((item)=>{
					if(carousalImages.find(car=>car.id===item.id)){
						return false
					}
					return true
				})
				setCategoryImages(catData)
			}
			setHasPrev(result.data?.prev)
			setHasNext(result.data?.next)
		}catch(err){
			setError(err.toString())
		}
		setLoading(false)
	}
	function showPrevBtn(){
		return hasPrev ? true : false
	}
	function showNextBtn(){
		return hasNext ? true : false
	}
	function loadImages(){
		if(selectedCategory){
			if(page===1){
				fetchCategoryImages(page)
			}else{
				setPage(1)
			}
		}
	}

	useEffect(()=>{
		loadImages()
	},[selectedCategory])
	useEffect(()=>{
		if(selectedCategory){
			fetchCategoryImages(page)
		}
	},[page])
	useEffect(() => {
		loadImages()
	}, [limit])

	if(!selectedCategory){
		return(
			<div className="category-images">
				<div className="category-images-section category-images-skeleton">
					Category images goes here
				</div>
			</div>
		)
	}
	return (
		<div className="category-images-section">
			<div className="category-images">
				<div className="category-head">
					<h4>{selectedCategory}</h4>
					<select 
						value={limit} 
						onChange={(e)=>setLimit(e.target.value)}
					>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={20}>20</option>
						<option value={25}>25</option>
						<option value={30}>30</option>
					</select>
				</div>
				<div 
					className={`images-list styled-scrollbar ${bg}`}
					ref={removeFromCarousalRef}
				>
					{categoryImages?.map((item,idx)=>(
						<Image 
							key={item.id} 
							index={idx}
							imageType="category"
							onDropImage={onDropImage}
							item={item}
							onClick={()=>{}}
						/>
					))}
				</div>
				<div className="btn-group">
					<button 
						className="page-btn" 
						disabled={!showPrevBtn()} 
						onClick={()=>setPage(prev=>prev-1)} >
							Prev
					</button>
					<small className="light-para">Page - {page}</small>
					<button 
						className="page-btn" 
						disabled={!showNextBtn()} 
						onClick={()=>setPage(prev=>prev+1)} >
							Next
					</button>
				</div>
			</div>
		</div>
	)
}