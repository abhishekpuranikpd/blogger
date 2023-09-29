import { getCurrentUser } from '../../lib/session'
import React from 'react'
import { redirect } from "next/navigation"
import Navbar from "../../components/navbar"
import { db } from '../../lib/db'
import Link from 'next/link'

async function getposts() {
  const data = await db.Post.findMany({
    include: {
      user: true,
    },
  });
  return data;
}

const Dashboard = async () => {
  const user = await getCurrentUser()

  if (!user) {
    redirect("/auth/login")
  }

  const posts = await getposts();

  return (
    <div>
      
      <div className="bg-gray-700 min-h-screen">
      <Navbar />
        <div className="container mx-auto">
          {posts.map((post) => (
            <section className="py-8" key={post.id}>
              <div className="flex justify-center">
                <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-8">
                  
                  <h1 className="text-3xl font-medium text-gray-900 mb-6">
                    {post.title}
                  </h1>
                  <p className="text-gray-700 leading-relaxed mb-5">
                    {post.description.slice(0, 100)}
                  </p>
                  <div className="flex justify-between items-center">
  <h2 className="text-indigo-500 text-xs font-medium tracking-widest mb-4">
    {post.category}
  </h2>
  <Link href={`/blog/${post.id}`} className='text-indigo-500 hover:underline'>Read More</Link>
</div>
                  <br />
                  <span className="text-gray-900">Author: {post.user.name}</span>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
