import React,{useState,useEffect,useRef} from 'react'

export default function Navigation({carousalImages,setCarousalImages}) {
	const exportRef = useRef()
	
	function importJSON(e){
		console.log("import")
	}
	function showExportBtn(){
		return carousalImages?.length===0 ? false : true
	}
	function showImportBtn(){
		return true
	}
	function exportJSON(){
		const exportedData = carousalImages.map(item=>{
			return {
				description: item?.description,
				urls: {
					regular: item?.urls?.regular,
					small: item?.urls?.small
				}
			}
		})
		const blob = new Blob([JSON.stringify(exportedData,null,2)],{type:"text/json"})
		exportRef.current.href = URL.createObjectURL(blob)
		console.log(JSON.stringify(exportedData,null,2))
	}

	useEffect(()=>{
		if(carousalImages?.length!==0){
			exportJSON()
		}
	},[carousalImages])

	return (
		<div className="navigation-section">
			<div className="heading">
				Sky Carousal
			</div>
			<div className="action-group">
				<a  download="carousalImages.json" ref={exportRef} disabled={!showExportBtn()} className="btn-outline" >Export</a>
				<button disabled={!showImportBtn()} className="btn-outline" onClick={importJSON} >Import</button>
			</div>
		</div>
	)
}