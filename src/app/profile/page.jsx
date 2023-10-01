import React from 'react';
import { getCurrentUser } from '../../lib/session';
import { db } from '../../lib/db';
import { redirect } from 'next/navigation';
import Navbar from '../../components/navbar';
import Link from 'next/link';
import Deleteblog from '../../components/deleteblog'

const ProfilePage = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/auth/login');
  }

  const userid = user.id;

  const userData = await db.user.findUnique({
    where: {
      id: userid,
    },
    include: {
      Post: true,
    },
  });

  const { name, email, Post } = userData;

  return (
    <div className="bg-gray-700 min-h-screen">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-indigo-500 text-xs font-medium tracking-widest mb-4">
                  {user.id}
                </h2>
                <h1 className="text-3xl font-medium text-gray-900 mb-6">
                  {name}
                </h1>
                <p className="text-gray-700 leading-relaxed mb-8">{email}</p>
              </div>
              <div className="rounded-lg shadow-lg p-4">
                <h2 className="text-2xl font-medium text-white mb-4">
                  Posts by You!!
                </h2>
              </div>
              {Post.map((post) => (
                <div key={post.id} className="mb-10">
                  <div className="bg-white rounded-lg shadow-lg p-10 relative">
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-700">{post.description}</p>
                    <div className="absolute top-2 right-16 space-x-2">
                     <Link href={`/blog/${post.id}/edit`} ><button className="border border-blue-500 text-blue-500 px-3 py-1 rounded">
                        Edit
                      </button></Link> </div>
                      <div className="absolute  right-16 space-x-2">
                      <Deleteblog id={post.id} />
                   </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;
