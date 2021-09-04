import React,{useState,useEffect,useRef} from 'react'

import { Modal } from 'react-bootstrap'

const IMPORT_PLACEHOLDER = JSON.stringify([{"description": "image description","urls":{"regular": "https://regular-image-url","small": "https://small-image-url"}}],null,4)

export default function Navigation({carousalImages,setCarousalImages}) {
	const [exportedData,setExportedData] = useState([])
	const [importedData,setImportedData] = useState('')
	const [ showExportModal, setShowExportModal ] = useState(false)
	const [ showImportModal, setShowImportModal ] = useState(false)
	const exportRef = useRef()
	
	function showImportBtn(){
		return true
	}
	function importJSON(e){
		console.log("import")
		console.log(importedData)
		setImportedData('')
		setShowImportModal(false)
	}
	function showExportBtn(){
		return carousalImages?.length===0 ? false : true
	}
	function exportJSON(){
		const data = carousalImages.map(item=>{
			return {
				description: item?.description,
				urls: {
					regular: item?.urls?.regular,
					small: item?.urls?.small
				}
			}
		})
		setExportedData(data)
		// console.log(JSON.stringify(exportedData,null,2))
	}

	useEffect(() => {
		if(showExportModal){
			const blob = new Blob([JSON.stringify(exportedData,null,2)],{type:"text/json"})
			exportRef.current.href = URL.createObjectURL(blob)
		}
	}, [showExportModal])
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
				<button  
					onClick={()=>setShowExportModal(true)} 
					disabled={!showExportBtn()} 
					className="btn-outline" 
				>
					Export
				</button>
				<button 
					onClick={ ()=>setShowImportModal(true) }
					disabled={!showImportBtn()} 
					className="btn-outline"
				>
					Import
				</button>
			</div>
			<Modal show={showExportModal} onHide={ ()=>setShowExportModal(false) } >
				<Modal.Header className="modal-header">
					Export Json
				</Modal.Header>
				<Modal.Body>
					<pre className="export-area styled-scrollbar">
						{JSON.stringify(exportedData,null,2)}
					</pre>
					<a 
						download="carousal_images.json"
						ref={exportRef}
						style={{marginLeft:0}}
						className="mt-2 btn-outline"
					>
						Download
					</a>
					<button
						onClick={()=>setShowExportModal(false)}
						className="modal-close"
					>close</button>
				</Modal.Body>
			</Modal>
			<Modal show={showImportModal} onHide={ ()=>setShowImportModal(false) } >
				<Modal.Header className="modal-header">
					Import Json
				</Modal.Header>
				<Modal.Body>
					<textarea 
						value={importedData} 
						rows={10}
						placeholder={`/* UNDER CONSTRUCTION */ \n\n${IMPORT_PLACEHOLDER}`}
						onChange={(e)=>setImportedData(e.target.value)}
						className="import-area styled-scrollbar"
					>
					</textarea>
					<button 
						onClick={importJSON}
						style={{marginLeft:0}}
						className="mt-2 btn-outline"
					>
						Import
					</button>
					<button
						onClick={()=>setShowImportModal(false)}
						className="modal-close"
					>close</button>
				</Modal.Body>
			</Modal>
		</div>
	)
}


