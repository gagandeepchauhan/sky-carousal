const MAX_LIMIT = 30

function paginate(categories){
	return (req,res,next)=>{
		const { category } = req.params
	
		if( !category || !(category in categories) ){
			return res.status(400).json({
				error: "Bad request"
			})
		}
	
		const categoryData = categories[category]
	
		const page = Number(req.query.page) || 1
		let limit = Number(req.query.limit) || 10 
	
		if( page<1 || limit<1 ){
			return res.status(400).json({
				error: "Bad request"
			})
		}
		if(limit > MAX_LIMIT) limit = MAX_LIMIT
		let num_of_pages = Math.ceil(categoryData.length/limit)
		if( page>num_of_pages ){
			return res.status(404).json({
				error: "Page not found"
			})
		}
	
		const startIndex = (page-1)*limit
		const endIndex = page*limit
	
		const result= {}
		if(page>1) result.prev = page-1
		if(page<num_of_pages) result.next = page+1
	
		result.limit = limit
		result.page = page
	
		const data = categoryData.slice(startIndex,endIndex)
		result.data= data
		req.result = result
	
		next()
	}
}

module.exports = paginate