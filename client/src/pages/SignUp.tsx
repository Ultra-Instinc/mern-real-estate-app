import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { useSelector } from "react-redux";

export default function SignUp() {
	const navigate = useNavigate();
	const [formdata, setFormData] = useState({
		email: "",
		username: "",
		password: "",
	});
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const { currentUser } = useSelector((state) => state?.user);

	const handleInputChange = (e) => {
		setFormData({ ...formdata, [e.target.id]: e.target.value });
	};
	const handleFormSubmit = async (e) => {
		e.preventDefault();
		try {
			setLoading(true);
			const res = await fetch(
				`http://localhost:${
					import.meta.env.VITE_FIREBASE_PORT
				}/api/auth/signup`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(formdata),
				}
			);
			const data = await res.json();
			if (data.success === false) {
				setLoading(false);
				setError(data.message);
				return;
			}
			setLoading(false);
			setError(null);
			navigate("/sign-in");
		} catch (error) {
			setLoading(false);
			setError(error.message);
		}
	};
	return (
		<div className='h-[80vh] flex items-center justify-center'>
			<div className='p-3 max-w-lg w-full mx-auto text-mern-test font-semibold'>
				{!currentUser ? (
					<div>
						<h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
						<form
							onSubmit={handleFormSubmit}
							className='flex flex-col gap-4 '>
							<input
								type='text'
								placeholder='username'
								className='border p-3 rounded-lg outline-none bg-blue-100 focus:bg-slate-100 placeholder:text-mern-text text-mern-text md:focus:scale-105 duration-300 '
								id='username'
								onChange={handleInputChange}
							/>
							<input
								type='email'
								placeholder='email'
								className='border p-3 rounded-lg outline-none bg-blue-100 focus:bg-slate-100 placeholder:text-mern-text text-mern-text md:focus:scale-105 duration-300 '
								id='email'
								onChange={handleInputChange}
							/>
							<input
								type='password'
								placeholder='password'
								className='border p-3 rounded-lg outline-none bg-blue-100 focus:bg-slate-100 placeholder:text-mern-text text-mern-text md:focus:scale-105 duration-300 '
								id='password'
								onChange={handleInputChange}
							/>
							<button
								disabled={
									loading ||
									!formdata?.email ||
									!formdata?.password ||
									!formdata?.username
								}
								className='bg-mern-text text-blue-100  disabled:hover:cursor-not-allowed p-3 rounded-lg uppercase hover:scale-105 duration-200 focus:scale-90 disabled:bg-mern-bg_grad_1 '>
								{loading ? "Loading" : "Sign Up"}
							</button>
							<OAuth />
						</form>
						<div className='flex gap-2 mt-5 text-lg'>
							<p>Have an account?</p>
							<Link to={"/sign-in"}>
								<span className='text-blue-700'>Sign in</span>
							</Link>
						</div>
						{error && <p className='text-red-500 mt-5'>{error}</p>}
					</div>
				) : (
					<Navigate to={"/"} />
				)}
			</div>
		</div>
	);
}
