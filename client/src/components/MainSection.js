import React,{useState,useEffect} from 'react'

export default function MainSection({selectedCategory,carousalImages,mainImageIndex,setMainImageIndex}) {
	const [play,setPlay] = useState(false)
	const [cb,setCb] = useState(null)

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
	function start(){
		console.log("started")
		setPlay(true)
		setCb(setInterval(nextSlide,2000))
	}
	function pause(){
		console.log("stopped")
		setPlay(false)
		clearInterval(cb)
	}

	useEffect(()=>{
		pause()
		setMainImageIndex(0)
	},[carousalImages])

	if(!selectedCategory){
		return (
			<div className='main-section'>
				<div className="main-skeleton">
					Select Category
				</div>
			</div>
		)
	}
	if(carousalImages.length===0){
		return (
			<div className='main-section'>
				<div
					style={{height:"100%",width:"100%"}}
					className="image-skeleton"
				></div>
			</div>
		)
	}

	return (
		<div className='main-section'>
			<img 
				src={carousalImages?.[mainImageIndex]?.urls.regular} 
				alt={carousalImages?.[mainImageIndex]?.description} 
				className="image-skeleton" 
			/>
			<div className="slide-btn prev-slide" onClick={prevSlide} >
				<i className="fas fa-arrow-left"></i>
			</div>
			<div className="slide-btn play-pause" onClick={play ? pause : start} >
				{ play ? 
					<i className="fas fa-pause"></i>
				: 
					<i className="fas fa-play"></i>
				}
			</div>
			<div className="slide-btn next-slide" onClick={nextSlide} >
				<i className="fas fa-arrow-right"></i>
			</div>
		</div>
	)
}