import React from 'react'

export default function CarousalImages({carousalImages,setMainImageIndex}) {
	if(carousalImages.length===0){
		return (
			<div className="carousal-images-section styled-scrollbar">
				<div className="carousal-skeleton">
					Carousal images goes here
				</div>
			</div>
		)
	}
	return (
		<div className="carousal-images-section styled-scrollbar">
			{carousalImages?.map((item,index)=>(
				<div key={item.id} className="carousal-image">
					<img 
						draggable={true} 
						src={item.urls.small} 
						alt={item.description} 
						onClick={()=>setMainImageIndex(index)} 
					/> 
				</div>
			))}
		</div>
	)
}