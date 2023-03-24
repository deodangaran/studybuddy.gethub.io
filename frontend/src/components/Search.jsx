import React, {useEffect, useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom"

export default function Search({ className, hidden }) {
    const [value, setValue] = useState('')
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    
    const search = () => {
       const path=`/products?keyword=${value}&page=1`
       navigate(path)
    }

    useEffect(()=> {
        const keyword = searchParams.get('keyword')
        if(keyword) {
            setValue(keyword, keyword)
        }
    },[searchParams])

    return (
        <div className={`${className} flex float-right`}>
            <input
                type="text"
                className="mr-2 w-full h-10 md:w-40 lg:w-80 px-4 py-2 text-sm bg-white border rounded-md focus:border-primary focus:outline-none"
                placeholder="Search..."
                value={value} onChange={(evt) => { setValue(evt.target.value) }}
                onKeyDown={event => {if(event.key === 'Enter') {search()}}}
            />
            <button onClick={search} className={`${hidden ? "hidden" : "visible"} m-0  h-10 px-4 py-2 text-sm text-white bg-primary border-l rounded`}>
                Search
            </button>
        </div>
    )
}