import React,{useState,useEffect} from 'react'

import api from '../api'

import {useError} from '../contexts/ErrorContext'

export default function CategoryImages({selectedCategory,setCarousalImages}) {
	const [page,setPage] = useState(1)
	const [limit,setLimit] = useState(5)
	const [catImages,setCatImages] = useState([])
	const {setError,setLoading} = useError()

	async function fetchCategoryImages(page){
		try{
			setLoading(true)
			const result = await api.get(`/categories/${selectedCategory}?page=${page}&limit=${limit}`)
			setCatImages(result.data)
			setCarousalImages(result.data?.data)
		}catch(err){
			setError(err.toString())
		}
		setLoading(false)
	}
	function showPrevBtn(){
		return catImages.prev ? true : false
	}
	function showNextBtn(){
		return catImages.next ? true : false
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
	function handleImageDrag(e){
		console.log('Drag started',e)
		e.target.style.opacity=0.5
	}
	function handleImageDrop(e){
		console.log('Drag ended',e)
		e.target.style.opacity=1
	}
	function handleImageDragOver(e){
		e.preventDefault()
		console.log("dragging over",e)
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
					<select value={limit} onChange={(e)=>setLimit(e.target.value)}>
						<option value={5}>5</option>
						<option value={10}>10</option>
						<option value={15}>15</option>
						<option value={20}>20</option>
						<option value={25}>25</option>
						<option value={30}>30</option>
					</select>
				</div>
				<div onDragOver={handleImageDragOver} className="images-list styled-scrollbar">
					{catImages.data?.map((item)=>(
						<div key={item.id} className="image-item">
							<img onDragEnd={handleImageDrop} onDragStart={handleImageDrag} draggable={true} src={item.urls.small} alt={item.description} /> 
							<div className="image-desc">
								{item.description?.substr(0,15)}...
							</div>
						</div>
					))}
				</div>
				<div className="btn-group">
					<button className="page-btn" disabled={!showPrevBtn()} onClick={()=>setPage(prev=>prev-1)} >Prev</button>
					<small>Page - {page}</small>
					<button className="page-btn" disabled={!showNextBtn()} onClick={()=>setPage(prev=>prev+1)} >Next</button>
				</div>
			</div>
		</div>
	)
}