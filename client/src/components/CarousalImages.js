import React from 'react'

import Image from './Image'

export default function CarousalImages({bg,selectedCategory,carousalImages,setMainImageIndex, addToCarousalRef, onDropImage}) {

	if(!selectedCategory){
		return (
			<div className="carousal-images-section styled-scrollbar">
				<div className="carousal-skeleton">
					Carousal images goes here
				</div>
			</div>
		)
	}
	return (
		<div 
			className={`carousal-images-section styled-scrollbar ${bg}`}
			ref={addToCarousalRef}
		>
			{carousalImages?.map((item,idx)=>(
				<Image 
					key={item.id} 
					index={idx}
					imageType="carousal"
					onDropImage={onDropImage}
					item={item}
					onClick={()=>setMainImageIndex(idx)}
				/>
			))}
		</div>
	)
}