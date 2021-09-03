import React,{useState,useEffect} from 'react'

export default function MainSection({carousalImages,mainImageIndex,setMainImageIndex}) {
	
	function prevSlide(){
		setMainImageIndex(prev=>{
			return (prev-1+carousalImages.length)%carousalImages.length
		})
	}
	function nextSlide(){
		setMainImageIndex(prev=>{
			return (prev+1)%carousalImages.length
		})
	}

	useEffect(()=>{
		setMainImageIndex(0)
	},[carousalImages])

	if(carousalImages.length===0){
		return (
			<div className='main-section'>
				<div className="main-skeleton">
					Select Category
				</div>
			</div>
		)
	}

	return (
		<div className='main-section'>
			<img 
				src={carousalImages?.[mainImageIndex]?.urls.regular} 
				alt={carousalImages?.[mainImageIndex]?.description} 
			/>
			<div className="prev-slide" onClick={prevSlide} >prev</div>
			<div className="next-slide" onClick={nextSlide} >next</div>
		</div>
	)
}