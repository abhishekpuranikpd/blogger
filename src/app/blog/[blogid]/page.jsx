import React from 'react';
import { db } from '../../../lib/db';
import Navbar from '../../../components/navbar';

const BlogView = async ({ params }) => {
  const blogid = params.blogid;
  const data = await db.post.findFirst({
    where: {
      id: blogid,
     },
     include : {
      user :true,
    },
  });

  return (
    
    <div className="bg-gray-700 min-h-screen">
      <Navbar/>
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
              <h2 className="text-indigo-500 text-xs font-medium tracking-widest mb-4">
                {data.category}
              </h2>
              <h1 className="text-3xl font-medium text-gray-900 mb-6">
                {data.title}
              </h1>
              <p className="text-gray-700 leading-relaxed mb-8">
                {data.description}
              </p>
            
              <div className="text-gray-900">
                Author: {data.user.name}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogView;
