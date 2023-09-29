"use client"
import { signIn } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { db } from '../../../lib/db'

const Login = () => {
	const router =useRouter();
	const [email, setemail] = useState("")
	const [password, setpassword] = useState("")
	const handlesubmit = async (e) => {
		e.preventDefault();
		const res = await signIn("credentials", { email, password, redirect: false })
		if(res?.error){
			alert("invalid credential")
		}else{
			alert("login...success!!")
			router.refresh()
		}
	}
	return (
		<div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-900 dark:text-gray-100">
			<div className="mb-8 text-center">
				<h1 className="my-3 text-4xl font-bold">Sign in</h1>
				<p className="text-sm dark:text-gray-400">Sign in to access your account</p>
			</div>
			<form novalidate="" action="" className="space-y-12" onSubmit={handlesubmit}>
				<div className="space-y-4">
					<div>
						<label for="email" className="block mb-2 text-sm">Email address</label>
						<input type="email" name="email" value={email} id="email" onChange={(e) => setemail(e.target.value)} placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
					</div>
					<div>
						<div className="flex justify-between mb-2">
							<label for="password" className="text-sm">Password</label>
							<a rel="noopener noreferrer" href="#" className="text-xs hover:underline dark:text-gray-400">Forgot password?</a>
						</div>
						<input type="password" name="password" value={password} id="password" onChange={(e) => setpassword(e.target.value)} placeholder="*****" className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" />
					</div>
				</div>
				<div className="space-y-2">
					<div>
						<button type="submit" className="w-full px-8 py-3 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">Sign in</button>
					</div>
					<p className="px-6 text-sm text-center dark:text-gray-400">Don't have an account yet?
						<a rel="noopener noreferrer" href="/auth/register" className="hover:underline dark:text-violet-400">Sign up</a>.
					</p>
				</div>
			</form>
		</div>
	)
}

export default Login