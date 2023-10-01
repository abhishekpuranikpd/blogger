"use client"

import { useRouter } from "next/navigation";
import React from 'react'

const Deleteblog = (props) => {
    const router =useRouter()
    console.log(props.id);

const deletepost =async()=>{
    const res = await fetch(`/api/blog/${props.id}`,{
        method: "DELETE",

    })
    const data = await res.json()
    if(res.success){
        alert("deleted",data)
     }
     router.refresh()
     router.push("/profile")
}


  return (
    <div><button onClick={deletepost} className="border border-red-500 text-red-500 px-4 py-1 rounded">Delete</button></div>
  )
}

export default Deleteblog