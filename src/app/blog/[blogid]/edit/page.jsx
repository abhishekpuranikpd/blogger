import React from 'react'
import {getCurrentUser} from '../../../../lib/session'
import { db } from '../../../../lib/db'
import EditpageForm from '../../../../components/updateform'

const getdata =async(id)=>{
    try {

     const data = await db.post.findFirst({where:{id}}) 
     console.log(data);
     return data
     
        
    } catch (error) {
        throw new Error("Blog Not Found")
    }
}


const EditFormPage = async({params}) => {
    const id = params.blogid
    const user = await getCurrentUser()

    if (!user) {
      redirect("/auth/login")
    }
     const data = await getdata(id)
     console.log(data);

  return (
   <EditpageForm   data={data}/>
  )
}

export default EditFormPage