import React from 'react'
import './Gallary.css'
export default function({pic}){
    return(
        <div className="gallary">
            {console.log(pic)}
            {pic?pic.map((item)=>{
            return(    <img src={item.photo}
                     alt={item.title} />
            )}):null}
        </div>
    )
}