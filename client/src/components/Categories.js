import React,{useState} from 'react'

export default function Categories({categories,setSelectedCategory}) {
	const [cat,setCat] = useState('')
	const [showCat,setShowCat] = useState(false)

	function handleCategorySelection(index){
		setCat(categories[index])
		setSelectedCategory(categories[index])
		setShowCat(false)
	}

	return (
		<div className="categories-section">
			<div className="categories">
				<h4>Select category</h4>
				<div className="category-input">
					<input type="text" value={cat} disabled placeholder="select category" />
					<div className="drop-icon" onClick={()=>setShowCat(prev=>!prev)} >
						icon
					</div>
				</div>
				{showCat &&
					<div className="category-list styled-scrollbar">
						{categories.map((cat,index)=>(
							<li key={index} onClick={()=>handleCategorySelection(index)} >{cat}</li>
						))}
					</div>
				}
			</div>
		</div>
	)
}