import React from 'react'

import {useDrag} from 'react-dnd'

export default function Image({item,index,imageType,onDropImage,onClick}) {
	const [{isDragging}, dragRef] = useDrag({
		item:{
			type:imageType,
			index
		},
		end : (item,monitor)=>{
			const dropResult = monitor.getDropResult()
			if(item && dropResult){
				onDropImage(item)
			}
		},
		collect : (monitor)=>({
			isDragging : monitor.isDragging()
		})
	})

	const itemClassName = `draggable ${imageType==='category' ? 'image-item' : 'carousal-image'}`
	return (
		<div
			index={index}
			className={itemClassName}
			draggable={true}
			ref={dragRef}
		>
			<img
				src={item.urls.small} 
				alt={item.description}
				className="image-skeleton"
				onClick={onClick} 
			/>
		</div>
	)
}