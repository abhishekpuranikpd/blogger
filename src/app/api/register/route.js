// import { connectionstr } from "@/lib/db";
// import User from "@/lib/model/user";
// import mongoose from "mongoose";
import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"

export async function POST(request){
    
    const {name,email,password} = await request.json();
    const hashedpassword = await bcrypt.hash(password,10);
    
    console.log(email);
    console.log(password);
   // // await mongoose.connect(connectionstr)
    const user = await db.user.create({ data: {name,email,password:hashedpassword}})
    return NextResponse.json({result: "New User Created",success:true},{status:200})
}

