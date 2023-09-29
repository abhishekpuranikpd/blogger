"use client"
import React, { useState , useEffect} from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../../../lib/db';
import { Post } from '@prisma/client';

const UpdateForm = ({params}) => {
    const editid = params.blogid;
    console.log(editid);
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');

    useEffect(()=>{
    const getdetails = async()=>{
        const data = await db.Post.findUnique({
            where : {
                id :blogid
            },
        })
    }    
    
       getdetails()   
    
    })
    
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const res = await fetch(`/api/blog/${blogid}`, {
          method: 'PUT',
          body: JSON.stringify({ title, description, category }),
        });
        const data = await res.json();
        alert('Blog Posted!!');
  
        router.push('/blog');
      } catch (error) {
        alert('Something Went Wrong');
      }
    };
  
    return (
      <div className="flex justify-center bg-gray-700 items-center h-screen">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-medium text-black mb-6">Create Post</h1>
          <form
            noValidate
            action=""
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <div>
              <label htmlFor="title" className="block mb-2 text-sm font-bold">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add your post title"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label htmlFor="description" className="block mb-2 text-sm font-bold">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2.5 border rounded-lg"
                placeholder="Write your Description here..."
              ></textarea>
            </div>
            <div>
              <label htmlFor="category" className="block mb-2 text-sm font-bold">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                name="category"
                placeholder="Type your blog post category"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2.5 rounded-lg text-sm"
              >
                Update Your Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default UpdateForm