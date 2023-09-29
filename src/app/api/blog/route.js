import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import { Post } from "@prisma/client";
import { getCurrentUser } from '../../../lib/session'

export async function  GET(request){
    let data 
        try {
           
         data = await db.post.findMany();
        } catch (error) {
            data = {success:false}
        }
        console.log(data);
        return NextResponse.json({data,success:true})
    }

export async function POST(request){
    
    const {title,description,category} = await request.json();
    const user = await getCurrentUser()
    console.log(user);
    
    console.log(title,"Post");
    

    const post = await db.Post.create({ data: {title,description,category,UserId:user.id}})
    return NextResponse.json({result: "New blog Posted",success:true ,post},{status:200})
}