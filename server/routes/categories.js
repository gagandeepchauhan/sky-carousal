const express = require('express')
const router = express.Router()

const unsplash = require('../api/unsplash')

const categories = require('../api/hardCoded')
const paginate = require('../middlewares/paginate')

const LIMIT = 10

router.get('/',(req,res)=>{
	const result = Object.keys(categories)
	res.status(200).json(result)
})

router.get('/fetch-category', async (req,res)=>{
    try {
        let { query } = req.query
        let page = 1
        if (!query) {
            return res.json({
                message: "please provide query to fetch images"
            })
        }
        query = query.toLowerCase()
        if(query in categories){
        	page = Math.floor(categories[query].length/LIMIT) + 1
        }

        const result = await unsplash.get(`/search/photos`, {
            params: {
                query,
                page,
                per_page: LIMIT
            }
        })
        // console.log(result.data)
        if(result.data.results.length===0){
        	return res.json({
                message: "no images found for provided category"
            })
        }

        const photos = result.data.results.map(photo => {
            return {
                id: photo.id,
                color: photo.color,
                blur_hash: photo.blur_hash,
                description: photo.description,
                alt_description: photo.alt_description,
                urls: photo.urls,
                likes: photo.likes,
                user: { name: photo.user.name }
            }
        })

        if(!(query in categories)){
        	categories[query] = photos
        }
        else{
        	categories[query].push(...photos)
        }

        res.status(201).json(photos)

    } catch (err) {
        res.json(err)
    }
})

router.get('/:category', paginate(categories), (req,res)=>{
	res.status(200).json(req.result)
})

module.exports = router